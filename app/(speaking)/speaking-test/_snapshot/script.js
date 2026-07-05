  /* ============================================================
     ZedLevel speaking test — single-file, no backend needed.
     After the (demo) recording, the student picks how to be
     evaluated: AI (paused) or Human via WhatsApp. WhatsApp
     opens a chat pre-filled with level + reading text + the
     two questions; the student records ONE voice note inside
     WhatsApp (reading + answers) and sends it.

     WhatsApp number — international format, digits only.
     Kept in sync with the site's central config (site.whatsapp.number):
     the route reads it from the .speaking-root wrapper's data-wa attribute,
     so it never drifts from the rest of the site. Fallback below is the
     site's real number: +966 56 708 6238 -> 966567086238
     ============================================================ */
  const WHATSAPP_NUMBER =
    (document.querySelector(".speaking-root")?.dataset.wa) || "966567086238";

  /* ---------------------------------------------------------------
     SOURCE / REFERRAL CODE — give each promoter a short numeric link.
     Simplest form (recommended) — just a number after "?":
       speaking.zedlevel.app/?1      -> المصدر: 1
       speaking.zedlevel.app/?7      -> المصدر: 7
     Also works:  ?s=1  ?source=1  #1  #s=1
     You keep a table mapping 1..N to each promoter.
     No value at all -> "مباشر" (direct).
     --------------------------------------------------------------- */
  function getSource(){
    try {
      var raw = (location.search || "").replace(/^\?/, "");
      var hash = (location.hash || "").replace(/^#/, "");
      // 1) named param: s / source / ref / utm_source (in query or hash)
      var p = new URLSearchParams(location.search);
      var s = p.get("s") || p.get("source") || p.get("ref") || p.get("utm_source");
      if(!s && hash){
        var mh = hash.match(/(?:^|&)(?:s|source|ref)=([^&]+)/);
        if(mh) s = decodeURIComponent(mh[1]);
      }
      // 2) bare form: ?1  or  #1  (first token, before any & or =)
      if(!s){
        var bare = (raw || hash).split("&")[0].split("=")[0];
        if(bare) s = decodeURIComponent(bare);
      }
      s = (s || "").trim().slice(0, 40);
      return s || "مباشر";
    } catch(e){ return "مباشر"; }
  }
  const SOURCE = getSource();

  // reading texts per level
  const TEXTS = {
    "A1-A2": "My name is Sara. I live in Riyadh with my family. Every morning I drink tea and go to school. I like reading books and playing with my friends. On Friday, we visit my grandmother. She makes very good food. I am happy with my life.",
    "B1-B2": "Learning a new language is not always easy, but it is very rewarding. At first, you may feel nervous when you speak, and that is completely normal. The secret is to practise a little every day and not to be afraid of mistakes. Over time, your confidence grows, and you start to understand more than you expected.",
    "C1-C2": "Fluency is often misunderstood as the ability to speak quickly, when in reality it is about communicating ideas clearly and naturally under pressure. A truly proficient speaker can adapt their tone, navigate unfamiliar topics, and convey subtle meaning without hesitation. Achieving this level demands not only vocabulary, but also a deep familiarity with the rhythm and culture of the language."
  };
  const LVL_LABEL = { "A1-A2":"A1·A2", "B1-B2":"B1·B2", "C1-C2":"C1·C2" };

  /* Q1 is a fixed easy warm-up (all levels). Q2 is level-specific. */
  const EASY_Q = "Why do you want to improve your English?";
  const Q2 = {
    "A1-A2": "What do you like to do with your friends?",
    "B1-B2": "What is the best way to improve a language, and why?",
    "C1-C2": "In your own words, what does true fluency really mean?"
  };

  const $ = function(id){ return document.getElementById(id); };
  const s1=$("s1"), s3=$("s3"), s4=$("s4");
  const lvlTag=$("lvlTag");
  const stepsBar=$("stepsBar");
  const promptBox=$("promptBox"), promptKind=$("promptKind"), promptText=$("promptText");
  const hintSm=$("hintSm");
  const restart=$("restart");
  const mic=$("mic");
  const ovChoose=$("ovChoose"), ovWa=$("ovWa");
  const optAI=$("optAI"), aiMsg=$("aiMsg"), optWA=$("optWA");
  const waBtn=$("waBtn"), waClose=$("waClose"), chooseClose=$("chooseClose");
  const statusEl=$("status"), prog=$("prog"), timer=$("timer");
  const card=document.querySelector(".card"), note=$("configNote");

  let currentLevel="A1-A2", currentText=TEXTS["A1-A2"];
  let PARTS = [];      // the 3 ordered parts of the test
  let partIdx = 0;     // which part we're recording now (0..2)
  if(WHATSAPP_NUMBER==="00000000000" || WHATSAPP_NUMBER==="") note.classList.add("show");

  function go(from,to){ from.classList.remove("active","in"); to.classList.add("active","in"); }
  function openOv(ov){ ov.classList.add("show"); }
  function closeOv(ov){ ov.classList.remove("show"); }

  function buildParts(){
    PARTS = [
      { kind:"سؤال 1 · سهل", type:"q",    text:EASY_Q },
      { kind:"سؤال 2",        type:"q",    text:Q2[currentLevel] },
      { kind:"قراءة النص",    type:"read", text:currentText }
    ];
  }

  function renderStepsBar(){
    stepsBar.innerHTML = PARTS.map(function(p,i){
      var cls = i<partIdx ? "b done" : (i===partIdx ? "b cur" : "b");
      return '<span class="'+cls+'"></span>';
    }).join("");
  }

  // load the current part into the record screen
  function loadPart(){
    var p = PARTS[partIdx];
    renderStepsBar();
    promptKind.textContent = p.kind;
    promptText.textContent = p.text;
    promptBox.classList.toggle("reading", p.type==="read");
    hintSm.textContent = "";
    resetRecorder();
    armAutoPopup();
  }

  // even if the student doesn't press record, show the popup after 3s
  let autoTimer=null;
  function armAutoPopup(){
    if(autoTimer) clearTimeout(autoTimer);
    autoTimer = setTimeout(function(){ showChoose(); }, 3000);
  }
  function cancelAutoPopup(){ if(autoTimer){ clearTimeout(autoTimer); autoTimer=null; } }

  // pick level -> go straight to the recording screen (part 1)
  document.querySelectorAll(".level").forEach(function(el){
    el.addEventListener("click",function(){
      currentLevel=el.dataset.level; currentText=TEXTS[currentLevel];
      lvlTag.textContent=LVL_LABEL[currentLevel];
      buildParts(); buildWa(); partIdx=0; loadPart(); go(s1,s3);
    });
  });

  function buildWa(){
    // discreet reference code — only shown when a source code is present
    // (e.g. ?1 -> "مرجع: #ZL-1"). Direct visits (no code) show no ref line.
    var refLine = (SOURCE === "مباشر") ? "" : ("مرجع: #ZL-" + SOURCE + "\n");
    const msg =
      "تقييم مستوى المحادثة — أكاديمية ZedLevel\n"+
      "المستوى: "+currentLevel+"\n"+
      refLine + "\n"+
      "السؤال 1:\n"+EASY_Q+"\n\n"+
      "السؤال 2:\n"+Q2[currentLevel]+"\n\n"+
      "فقرة القراءة:\n"+currentText+"\n\n"+
      "🎤 سأرسل الآن تسجيلاتي الصوتية (إجابة السؤالين + قراءة النص).";
    waBtn.href="https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(msg);
  }

  /* ---- recorder (demo animation) ---- */
  let ti=null; const CIRC=446;
  function resetRecorder(){
    card.classList.remove("recording");
    statusEl.textContent="انقر للبدء"; timer.textContent="0:00"; timer.classList.add("idle");
    prog.style.strokeDashoffset=CIRC; if(ti){ clearInterval(ti); ti=null; }
    aiMsg.classList.remove("show");
  }
  // open the choose-evaluation popup (single entry point)
  function showChoose(){
    cancelAutoPopup();
    openOv(ovChoose);
  }
  mic.addEventListener("click",function(){
    cancelAutoPopup();
    // start the recording animation AND show the popup right away
    card.classList.add("recording");
    statusEl.textContent="جارٍ التسجيل…"; timer.classList.remove("idle");
    let s=0; if(ti) clearInterval(ti);
    ti=setInterval(function(){ s++; timer.textContent="0:"+String(s).padStart(2,"0"); },1000);
    let start=performance.now();
    (function stepFn(now){
      let p=Math.min((now-start)/1600,1); prog.style.strokeDashoffset=CIRC*(1-p);
      if(p<1) requestAnimationFrame(stepFn);
    })(start);
    showChoose();
  });

  // redo current part / change level — available throughout the recording flow
  $("redoBtn").addEventListener("click",function(){ closeOv(ovChoose); resetRecorder(); armAutoPopup(); });
  $("changeLvlBtn").addEventListener("click",function(){ closeOv(ovChoose); cancelAutoPopup(); resetRecorder(); go(s3,s1); });

  /* ---- popup A: choose evaluation ---- */
  // AI is clickable but paused -> shows inline message
  optAI.addEventListener("click",function(){
    aiMsg.classList.add("show");
  });
  // Human -> go to whatsapp steps popup
  optWA.addEventListener("click",function(){
    aiMsg.classList.remove("show");
    closeOv(ovChoose); openOv(ovWa);
  });
  // close choose popup (X or backdrop) -> stay on record screen, allow retry
  chooseClose.addEventListener("click",function(){ closeOv(ovChoose); aiMsg.classList.remove("show"); });
  ovChoose.addEventListener("click",function(e){ if(e.target===ovChoose){ closeOv(ovChoose); aiMsg.classList.remove("show"); } });

  /* ---- popup B: whatsapp steps ---- */
  // pressing the WA button opens WhatsApp AND advances to confirmation
  waBtn.addEventListener("click",function(){
    cancelAutoPopup();
    closeOv(ovWa);
    go(s3,s4);
  });
  // close (X or backdrop) -> back to choose options (don't lose their place)
  waClose.addEventListener("click",function(){ closeOv(ovWa); openOv(ovChoose); });
  ovWa.addEventListener("click",function(e){ if(e.target===ovWa){ closeOv(ovWa); openOv(ovChoose); } });

  restart.addEventListener("click",function(){ resetRecorder(); go(s4,s1); });

  // Esc closes any open overlay
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){ closeOv(ovWa); closeOv(ovChoose); aiMsg.classList.remove("show"); }
  });
