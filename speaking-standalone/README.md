# Standalone Speaking Test — live snapshot

Byte-identical copy of the production https://speaking.zedlevel.app/ page
(snapshot 2026-07-05). Self-contained single file — no build, no deps.

Kept here as an alternative to the React page at `app/speaking-test/`:
- To serve it from this site: copy `index.html` → `public/speaking.html`
  (then it's live at `/speaking.html`), or
- Replace `app/speaking-test/` with a redirect to the subdomain, or
- Deploy it anywhere as-is.

Config: `WHATSAPP_NUMBER` inside the `<script>` (currently 966561350651 —
note: the main site uses 966567086238).
