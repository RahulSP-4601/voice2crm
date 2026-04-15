const waveBars = [
  18, 28, 44, 72, 108, 74, 46, 28, 18, 22, 36, 62, 94, 68, 38, 22, 18, 24, 40,
  70, 104, 74, 42, 24, 18,
];

export function CollaborationCenter() {
  return (
    <div className="relative flex min-h-[56rem] items-center justify-center lg:pt-8">
      <svg
        className="pointer-events-none block w-full max-w-[92rem] select-none"
        viewBox="0 0 860 600"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="center-ribbon-a" x1="14" y1="265" x2="846" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#D5C0AB" stopOpacity="0" />
            <stop offset="0.18" stopColor="#D5C0AB" stopOpacity="0.32" />
            <stop offset="0.5" stopColor="#D5C0AB" stopOpacity="0.12" />
            <stop offset="0.82" stopColor="#D5C0AB" stopOpacity="0.28" />
            <stop offset="1" stopColor="#D5C0AB" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="center-ribbon-b" x1="10" y1="315" x2="852" y2="304" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#D9C4D9" stopOpacity="0" />
            <stop offset="0.18" stopColor="#D9C4D9" stopOpacity="0.28" />
            <stop offset="0.48" stopColor="#D9CFC3" stopOpacity="0.1" />
            <stop offset="0.76" stopColor="#D9C4D9" stopOpacity="0.22" />
            <stop offset="1" stopColor="#D9CFC3" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="center-ribbon-c" x1="18" y1="214" x2="844" y2="334" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#D5C0AB" stopOpacity="0" />
            <stop offset="0.2" stopColor="#D5C0AB" stopOpacity="0.18" />
            <stop offset="0.58" stopColor="#D9C4D9" stopOpacity="0.22" />
            <stop offset="1" stopColor="#D5C0AB" stopOpacity="0" />
          </linearGradient>
          <filter id="center-ribbon-blur" x="-20" y="180" width="900" height="180" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="center-orb-aura" x="88" y="-42" width="684" height="684" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="76" />
          </filter>
          <radialGradient id="center-aura-fill" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(430 300) rotate(90) scale(200)">
            <stop stopColor="#E2D3C7" stopOpacity="0.3" />
            <stop offset="0.62" stopColor="#D8C7D7" stopOpacity="0.14" />
            <stop offset="1" stopColor="#D8C7D7" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="center-wire-blue" x1="164" y1="148" x2="742" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#CDB59A" stopOpacity="0" />
            <stop offset="0.28" stopColor="#CDB59A" />
            <stop offset="0.88" stopColor="#CDB59A" />
            <stop offset="1" stopColor="#CDB59A" stopOpacity="0.24" />
          </linearGradient>
          <linearGradient id="center-wire-purple" x1="164" y1="446" x2="350" y2="334" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#D4BED5" stopOpacity="0" />
            <stop offset="0.42" stopColor="#D4BED5" />
            <stop offset="1" stopColor="#CDB59A" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="center-orb-fill" x1="316" y1="190" x2="546" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#E7D9CC" />
            <stop offset="0.36" stopColor="#D6C1AA" />
            <stop offset="0.7" stopColor="#CDB6D0" />
            <stop offset="1" stopColor="#E2D2E3" />
          </linearGradient>
          <radialGradient id="center-highlight-left" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(365 244) rotate(90) scale(48 42)">
            <stop stopColor="white" stopOpacity="0.86" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="center-highlight-right" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(506 224) rotate(90) scale(58 50)">
            <stop stopColor="white" stopOpacity="0.95" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="center-wave-fill" x1="334" y1="300" x2="526" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#D0B697" />
            <stop offset="0.46" stopColor="#C7B1C8" />
            <stop offset="1" stopColor="#DCC6DB" />
          </linearGradient>
          <filter id="center-wave-glow" x="232" y="100" width="396" height="400" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="3.6" />
          </filter>
          <filter id="center-soften" x="150" y="58" width="576" height="502" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="5.4" />
          </filter>
          <filter id="center-wave-core-glow" x="246" y="124" width="368" height="352" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="1.3" />
          </filter>
          <filter id="center-sparkle" x="548" y="206" width="104" height="64" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>

        <g filter="url(#center-ribbon-blur)" opacity="0.96">
          <g className="collab-ribbon collab-ribbon-slow">
            <path
              d="M14 274C106 240 191 233 272 252C348 270 412 291 494 288C595 284 672 225 760 225C799 225 828 231 846 237"
              stroke="url(#center-ribbon-a)"
              strokeWidth="16"
              strokeLinecap="round"
            />
          </g>
          <g className="collab-ribbon collab-ribbon-delay">
            <path
              d="M10 324C96 338 176 313 257 290C328 269 394 265 466 279C548 295 623 334 706 334C758 334 806 318 852 294"
              stroke="url(#center-ribbon-b)"
              strokeWidth="13"
              strokeLinecap="round"
            />
          </g>
          <g className="collab-ribbon collab-ribbon-fast">
            <path
              d="M18 236C91 267 166 303 247 300C328 297 394 244 475 236C550 229 622 260 705 305C752 330 799 347 844 352"
              stroke="url(#center-ribbon-c)"
              strokeWidth="9"
              strokeLinecap="round"
            />
          </g>
        </g>

        <g opacity="0.97">
          <path d="M114 110C258 110 330 212 392 290" stroke="url(#center-wire-blue)" strokeWidth="6.8" strokeLinecap="round" />
          <path d="M114 300C282 300 346 300 392 300" stroke="url(#center-wire-blue)" strokeWidth="6.8" strokeLinecap="round" />
          <path d="M114 490C258 490 334 388 392 312" stroke="url(#center-wire-purple)" strokeWidth="6.8" strokeLinecap="round" />
          <path d="M468 300C628 300 730 300 796 300" stroke="url(#center-wire-blue)" strokeWidth="6.8" strokeLinecap="round" />

          <g className="collab-signal-dot">
            <circle cx="114" cy="110" r="6.8" fill="#CDB59A" />
          </g>
          <g className="collab-signal-dot collab-signal-dot-delay">
            <circle cx="114" cy="300" r="6.8" fill="#CDB59A" />
          </g>
          <g className="collab-signal-dot collab-signal-dot-late">
            <circle cx="114" cy="490" r="6.8" fill="#D4BED5" />
          </g>
          <g className="collab-signal-dot collab-signal-dot-delay">
            <circle cx="796" cy="300" r="6.8" fill="#CDB59A" />
          </g>
        </g>

        <g filter="url(#center-orb-aura)">
          <circle cx="430" cy="300" r="200" fill="url(#center-aura-fill)" />
        </g>

        <g className="collab-orb-float">
          <circle cx="430" cy="300" r="188" fill="url(#center-orb-fill)" stroke="rgba(255,255,255,0.58)" strokeWidth="3.2" />

          <g opacity="0.96">
            <ellipse cx="336" cy="220" rx="72" ry="84" fill="url(#center-highlight-left)" />
            <ellipse cx="542" cy="190" rx="92" ry="104" fill="url(#center-highlight-right)" />
          </g>

          <g filter="url(#center-soften)" opacity="0.86">
            <path d="M302 160C358 96 448 72 536 98" stroke="#D6C1AA" strokeOpacity="0.44" strokeWidth="22" strokeLinecap="round" />
            <path d="M480 94C558 76 640 114 688 176" stroke="#D8C3D8" strokeOpacity="0.46" strokeWidth="22" strokeLinecap="round" />
            <path d="M332 490C414 522 506 516 592 478" stroke="#D9C7D6" strokeOpacity="0.28" strokeWidth="26" strokeLinecap="round" />
          </g>

          <g filter="url(#center-wave-glow)" opacity="0.9">
            <g className="collab-wave-bars" opacity="0.95">
              {waveBars.map((height, index) => {
                const x = 254 + index * 13.8;
                return (
                  <line
                    key={`glow-${x}-${height}`}
                    x1={x}
                    y1={300 - (height * 2.15) / 2}
                    x2={x}
                    y2={300 + (height * 2.15) / 2}
                    stroke="url(#center-wave-fill)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    style={{ animationDelay: `${index * 70}ms` }}
                  />
                );
              })}
            </g>
          </g>

          <g filter="url(#center-wave-core-glow)">
            <g className="collab-wave-bars">
              {waveBars.map((height, index) => {
                const x = 254 + index * 13.8;
                return (
                  <line
                    key={`core-${x}-${height}`}
                    x1={x}
                    y1={300 - (height * 1.95) / 2}
                    x2={x}
                    y2={300 + (height * 1.95) / 2}
                    stroke="white"
                    strokeOpacity="0.92"
                    strokeWidth="5.2"
                    strokeLinecap="round"
                    style={{ animationDelay: `${index * 70}ms` }}
                  />
                );
              })}
            </g>
          </g>
        </g>

        <g filter="url(#center-sparkle)" opacity="0.96">
          <g className="collab-sparkles">
            <circle cx="560" cy="212" r="2.2" fill="#D3BEA4" />
            <circle cx="576" cy="218" r="2" fill="#D3BEA4" />
            <circle cx="592" cy="223" r="1.8" fill="#D7C1D6" />
            <circle cx="608" cy="228" r="1.6" fill="#D3BEA4" />
            <circle cx="624" cy="234" r="1.5" fill="#D3BEA4" />
            <circle cx="640" cy="240" r="1.8" fill="#D7C1D6" />
          </g>
        </g>
      </svg>
    </div>
  );
}
