/**
 * Accepted payment methods — inline, self-contained SVG marks so they always
 * render (no external images). Shown in the footer and near buy CTAs.
 * Order: مدى · Visa · Mastercard · Apple Pay · STC Pay · PayPal.
 */

function Chip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className="inline-flex h-8 w-[52px] items-center justify-center rounded-lg bg-white px-1.5 shadow-sm ring-1 ring-black/[0.06]"
    >
      {children}
    </span>
  );
}

export function PaymentMethods({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {/* مدى */}
      <Chip label="مدى">
        <svg viewBox="0 0 48 20" className="h-4 w-auto" aria-hidden>
          <text
            x="24"
            y="15"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#231f20"
            fontFamily="system-ui, sans-serif"
          >
            مدى
          </text>
        </svg>
      </Chip>

      {/* Visa */}
      <Chip label="Visa">
        <svg viewBox="0 0 48 16" className="h-3.5 w-auto" aria-hidden>
          <text
            x="24"
            y="13"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fontStyle="italic"
            fill="#1a1f71"
            fontFamily="Arial, sans-serif"
            letterSpacing="0.5"
          >
            VISA
          </text>
        </svg>
      </Chip>

      {/* Mastercard */}
      <Chip label="Mastercard">
        <svg viewBox="0 0 40 24" className="h-5 w-auto" aria-hidden>
          <circle cx="15" cy="12" r="9" fill="#eb001b" />
          <circle cx="25" cy="12" r="9" fill="#f79e1b" />
          <path
            d="M20 5.2a9 9 0 0 1 0 13.6 9 9 0 0 1 0-13.6z"
            fill="#ff5f00"
          />
        </svg>
      </Chip>

      {/* Apple Pay */}
      <Chip label="Apple Pay">
        <svg viewBox="0 0 60 24" className="h-4 w-auto" aria-hidden>
          <text
            x="30"
            y="17"
            textAnchor="middle"
            fontSize="15"
            fontWeight="600"
            fill="#000"
            fontFamily="-apple-system, system-ui, sans-serif"
          >
             Pay
          </text>
        </svg>
      </Chip>

      {/* STC Pay */}
      <Chip label="STC Pay">
        <svg viewBox="0 0 54 16" className="h-3.5 w-auto" aria-hidden>
          <text
            x="27"
            y="13"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#4f008c"
            fontFamily="Arial, sans-serif"
          >
            stc pay
          </text>
        </svg>
      </Chip>

      {/* PayPal */}
      <Chip label="PayPal">
        <svg viewBox="0 0 56 16" className="h-3.5 w-auto" aria-hidden>
          <text
            x="0"
            y="13"
            fontSize="13"
            fontWeight="800"
            fontStyle="italic"
            fontFamily="Arial, sans-serif"
          >
            <tspan fill="#003087">Pay</tspan>
            <tspan fill="#009cde">Pal</tspan>
          </text>
        </svg>
      </Chip>
    </div>
  );
}
