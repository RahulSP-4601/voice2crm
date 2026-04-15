import type { CSSProperties } from "react";

import { CollaborationCenter } from "@/components/collaboration-center";
import { VerticalSwitcher } from "@/components/vertical-switcher";

const signalCards = [
  {
    label: "Instant Voice Capture",
    description: "Log appointments, notes, and tasks naturally.",
    accent: "from-[#F6EFE7] via-[#E9DDD2] to-transparent",
    border: "border-[#D8C5B1]",
  },
  {
    label: "AI-Powered Parsing",
    description: "Turn speech into clean fields, owners, and next steps.",
    accent: "from-[#F3ECE8] via-[#E6D8D6] to-transparent",
    border: "border-[#D6C7C3]",
  },
  {
    label: "Seamless Collaboration",
    description: "Share context and assign work in real time.",
    accent: "from-[#EEF2EC] via-[#DCE5DB] to-transparent",
    border: "border-[#CCD7CB]",
  },
  {
    label: "Adaptive Workflows",
    description: "Shape the schema around how your team actually operates.",
    accent: "from-[#F7F1EA] via-[#EADFD2] to-transparent",
    border: "border-[#DDCEBC]",
  },
];

const heroWaveHeights = [
  12, 18, 26, 44, 78, 52, 24, 14, 10, 16, 28, 48, 72, 42, 22, 14, 10, 15, 30,
  58, 84, 56, 30, 16, 12, 18, 32, 54, 76, 50, 28, 16, 12,
];

const workflowCards = [
  {
    icon: "◌",
    eyebrow: "Contact",
    title: "Emma Stone",
    subtitle: "14 Cedar Lane",
    lines: ["Showing Booked", "Confirm Saturday"],
    badge: "Synced",
    badgeClassName: "bg-[#EAF3EC] text-[#58715A] ring-1 ring-[#C8DACB]",
    badgeDotClassName: "bg-[#8CB493]",
  },
  {
    icon: "✓",
    eyebrow: "Task",
    title: "David Kim",
    subtitle: "Riverfront Condo",
    lines: ["Offer Review", "Send counter terms"],
    badge: "Real-time",
    badgeClassName: "bg-[#F1ECE7] text-[#6B5A4E] ring-1 ring-[#D7C5B5]",
    badgeDotClassName: "bg-[#C0A58B]",
  },
  {
    icon: "$",
    eyebrow: "Budget",
    title: "Lena Hart",
    subtitle: "Westside Loft",
    lines: ["New Inquiry", "Qualify budget"],
    badge: "Awaiting confirmation",
    badgeClassName: "bg-[#F4EEE2] text-[#776243] ring-1 ring-[#DDCFB1]",
    badgeDotClassName: "bg-[#D0B481]",
  },
];

const activityFeed = [
  {
    name: "Ava",
    time: "Just now",
    update: 'Ava added a note on Emma Stone: "Client requested balcony access."',
    accent: "bg-[#87B191]",
    avatar: "/team-ava.svg",
  },
  {
    name: "Marcus",
    time: "2 mins ago",
    update: 'Marcus updated status for David Kim to "Offer Review".',
    accent: "bg-[#C6AE93]",
    avatar: "/team-marcus.svg",
  },
  {
    name: "Nina",
    time: "5 mins ago",
    update: 'Nina assigned "Send counter terms" task for David Kim.',
    accent: "bg-[#87B191]",
    avatar: "/team-nina.svg",
  },
  {
    name: "Liam",
    time: "12 mins ago",
    update: "Liam viewed Lena Hart lead record.",
    accent: "bg-[#C6AE93]",
    avatar: "/team-liam.svg",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F9F8F6] text-[#3B2F26]">
      <section className="relative overflow-hidden border-b border-[#DDD2C8] bg-[linear-gradient(180deg,#FAF8F4_0%,#F4EEE7_48%,#EFE7DE_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(201,181,156,0.12),transparent_22%),radial-gradient(circle_at_82%_24%,rgba(226,216,206,0.34),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.38),transparent_38%)]" />
        <div className="absolute inset-x-0 top-[18rem] h-[26rem] bg-[radial-gradient(circle_at_center,rgba(201,181,156,0.12),transparent_62%)]" />
        <div className="absolute left-[-8rem] top-40 h-72 w-72 rounded-full bg-[#D7C6B4]/20 blur-[120px] motion-safe:animate-float-slow" />
        <div className="absolute right-[-10rem] top-28 h-[24rem] w-[24rem] rounded-full bg-[#F4EEE7]/85 blur-[150px] motion-safe:animate-float-delayed" />
        <div className="absolute bottom-20 left-1/2 h-40 w-[70rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(217,207,199,0.28),transparent_60%)] blur-3xl" />

        <div className="pointer-events-none absolute inset-x-0 bottom-24 opacity-55">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
            <div className="hero-wave h-48 w-full" />
          </div>
        </div>

        <div className="relative mx-auto max-w-[90rem] px-6 pb-24 pt-5 sm:px-10 lg:px-12">
          <header className="motion-safe:animate-rise">
            <div className="mx-auto flex min-h-[5.5rem] w-full max-w-[82rem] items-center justify-between gap-6 rounded-[1.9rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(249,246,241,0.92))] px-6 py-4 shadow-[0_16px_48px_rgba(125,98,70,0.08)] backdrop-blur-xl sm:px-9">
              <div className="flex items-center gap-3">
                <div className="grid h-13 w-13 place-items-center rounded-[1.35rem] bg-[linear-gradient(135deg,#D9CFC7_0%,#C9B59C_100%)] text-sm font-semibold text-[#3B2F26] ring-1 ring-[#C9B59C]/50">
                  <span className="voice-bars" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
                <p className="text-[1.7rem] font-semibold tracking-[-0.03em] text-[#3B2F26]">
                  voice2crm
                </p>
              </div>

              <nav className="hidden items-center gap-12 text-[1.12rem] text-[#6E5C4F] md:flex">
                <a href="#features" className="transition hover:text-[#3B2F26]">
                  Features
                </a>
                <a href="#demo" className="transition hover:text-[#3B2F26]">
                  Pricing
                </a>
                <a href="#about" className="transition hover:text-[#3B2F26]">
                  About
                </a>
              </nav>

              <a
                href="#demo"
                className="inline-flex min-h-[3.6rem] items-center rounded-[1.25rem] border border-[#C9B59C] bg-[linear-gradient(180deg,#D9C6AF_0%,#C5AC8E_100%)] px-7 py-3 text-[1.02rem] font-semibold text-[#2F251E] shadow-[0_12px_30px_rgba(125,98,70,0.16)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105"
              >
                Get started
              </a>
            </div>
          </header>

          <div className="grid gap-8 pb-12 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-8 lg:pt-24">
            <div className="relative z-10 motion-safe:animate-rise-delayed">
              <h1 className="max-w-none text-[3.4rem] font-semibold leading-[0.92] tracking-[-0.07em] text-[#3B2F26] sm:text-[4.35rem] lg:text-[4.9rem]">
                <span className="hidden lg:block">
                  The CRM that works
                  <br />
                  the way you talk
                </span>
                <span className="block lg:hidden">
                  The CRM that works
                  <br />
                  the way you talk
                </span>
              </h1>
              <p className="mt-7 max-w-none text-[1.1rem] leading-8 text-[#6B594D] sm:text-[1.4rem]">
                <span className="hidden lg:block">
                  Whether you sell houses, fix pipes, or manage a team, just talk to log your leads.
                </span>
                <span className="block lg:hidden">
                  Whether you sell houses, fix pipes, or manage a team, just talk to log your leads.
                </span>
                <span className="block">No typing, no complexity</span>
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#demo"
                  className="group inline-flex min-h-[4rem] items-center rounded-[1.2rem] bg-[linear-gradient(180deg,#D2B89A_0%,#BE9E7C_100%)] px-8 py-4 text-lg font-semibold text-[#2F251E] shadow-[0_20px_44px_rgba(125,98,70,0.18),0_0_0_1px_rgba(201,181,156,0.18)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105"
                >
                  Get started
                  <span className="ml-2 transition duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
                <a
                  href="#features"
                  className="inline-flex min-h-[4rem] items-center rounded-[1.2rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(244,238,231,0.92))] px-8 py-4 text-lg font-semibold text-[#3B2F26] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-[#F1EBE4]"
                >
                  Watch demo
                </a>
              </div>
            </div>

            <div className="relative min-h-[28rem] lg:pl-3 motion-safe:animate-rise-late">
              <div className="absolute inset-x-8 top-10 h-14 rounded-full bg-[#D8C6B4]/22 blur-3xl" />
              <div className="absolute bottom-6 right-10 h-52 w-52 rounded-full border border-[#DDD2C8]/60 bg-[#F3ECE4]/55 blur-[2px]" />
              <div className="absolute bottom-0 right-2 h-60 w-60 rounded-full bg-[#DDD2C8]/22 blur-[100px]" />
              <div className="absolute right-24 top-10 h-64 w-64 rounded-full bg-[#D4BEA5]/16 blur-[110px]" />
              <div className="absolute left-10 top-24 h-64 w-64 rounded-full bg-[#FBF8F4]/70 blur-[120px]" />
              <div className="absolute bottom-10 left-0 h-px w-[24rem] bg-[linear-gradient(90deg,rgba(201,181,156,0),rgba(201,181,156,0.3),rgba(201,181,156,0))]" />

              <div className="relative ml-auto max-w-[36rem] rounded-[2rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(244,238,231,0.82))] p-6 shadow-[0_0_0_1px_rgba(201,181,156,0.08),0_28px_90px_rgba(125,98,70,0.12)] backdrop-blur-2xl">
                <div className="rounded-[1.7rem] bg-[linear-gradient(180deg,#FCFAF7_0%,#F1EAE3_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[1.75rem] font-semibold tracking-[-0.04em] text-[#3B2F26]">
                      Live Capture
                    </p>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#D3C0AD] bg-[#F5EFE8] px-3 py-1.5 text-sm font-medium text-[#655549]">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#A58D75] shadow-[0_0_10px_rgba(165,141,117,0.4)]" />
                      Listening
                    </span>
                  </div>

                  <div className="relative mt-8 overflow-hidden rounded-[1.35rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,#F6F1EB_0%,#FCFAF7_100%)] px-6 py-7">
                    <div className="absolute inset-x-10 top-1/2 h-24 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,181,156,0.14),transparent_62%)] blur-2xl" />
                    <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,rgba(201,181,156,0),rgba(201,181,156,0.55),rgba(217,207,199,0.55),rgba(201,181,156,0))]" />
                    <div className="voice-wave" aria-hidden="true">
                      {heroWaveHeights.map((height, index) => (
                        <span
                          key={index}
                          style={
                            {
                              height: `${height}px`,
                              animationDelay: `${index * 0.06}s`,
                            } as CSSProperties
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 rounded-[1.3rem] border border-[#DDD2C8] bg-[#FCFAF7] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8B7768]">
                      Transcript
                    </p>
                    <p className="mt-4 max-w-xl text-[1.2rem] leading-9 text-[#4E3F34]">
                      New plumbing lead. Sarah in Austin needs a full bathroom
                      quote next Tuesday. Budget is around twelve thousand.
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Lead", "Sarah Brooks"],
                      ["Next step", "Send quote"],
                      ["Budget", "$12,000"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-[1.15rem] border border-[#DDD2C8] bg-[#FCFAF7] px-4 py-3"
                      >
                        <p className="text-xs uppercase tracking-[0.22em] text-[#8B7768]">
                          {label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-[#3B2F26]">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {signalCards.map((card, index) => (
              <article
                key={card.label}
                className={`group relative overflow-hidden rounded-[1.8rem] border ${card.border} bg-[linear-gradient(180deg,rgba(252,250,247,0.92),rgba(244,238,231,0.94))] p-5 shadow-[0_18px_40px_rgba(125,98,70,0.08)] backdrop-blur-xl motion-safe:animate-rise`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-80 transition duration-500 group-hover:scale-105`}
                />
                <div className="relative">
                  <div className="inline-flex rounded-2xl border border-[#D9CFC7] bg-[#F9F8F6]/90 px-3 py-2 text-sm font-semibold text-[#5F5145]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h2 className="mt-5 text-[1.65rem] font-semibold tracking-[-0.04em] text-[#3B2F26]">
                    {card.label}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-[#6E5C4F]">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="demo"
        className="relative overflow-hidden border-b border-[#DDD2C8] bg-[linear-gradient(180deg,#F6F1EB_0%,#FBF8F4_100%)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,181,156,0.12),transparent_28%),radial-gradient(circle_at_90%_36%,rgba(217,207,199,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-semibold tracking-[-0.06em] text-[#3B2F26] sm:text-5xl lg:text-[4rem]">
              One CRM, shaped to every business you run.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#6E5C4F] sm:text-[1.25rem]">
              Switch the industry and the data model adapts instantly. Same
              voice workflow, different schema, no replatforming required.
            </p>
          </div>

          <div className="mt-14">
            <VerticalSwitcher />
          </div>
        </div>
      </section>

      <section
        id="features"
        className="relative overflow-hidden border-b border-[#DDD2C8] bg-[linear-gradient(180deg,#FBF8F4_0%,#F5EEE7_100%)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(217,207,199,0.14),transparent_20%),radial-gradient(circle_at_88%_84%,rgba(201,181,156,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_35%)]" />
        <div className="absolute left-[-8rem] top-[2rem] h-[20rem] w-[20rem] rounded-full bg-[#F4EEE7]/80 blur-[140px]" />
        <div className="absolute right-[-10rem] bottom-[-3rem] h-[24rem] w-[24rem] rounded-full bg-[#D6C2AE]/12 blur-[150px]" />
        <div className="pointer-events-none absolute inset-x-0 top-[16.5rem] hidden h-[18rem] lg:block">
          <svg className="h-full w-full" viewBox="0 0 1440 360" fill="none" aria-hidden="true">
            <g filter="url(#collabGlowBlur)">
              <path d="M-52 236C100 284 244 286 395 242C519 205 617 164 736 164C870 164 968 246 1112 263C1238 279 1349 257 1492 214" stroke="url(#collabGlowA)" strokeWidth="8" strokeLinecap="round" opacity="0.32"/>
              <path d="M-46 270C90 221 232 196 345 218C431 234 489 270 583 270C690 270 764 221 848 220C938 219 1017 267 1110 276C1220 287 1329 260 1492 252" stroke="url(#collabGlowB)" strokeWidth="6" strokeLinecap="round" opacity="0.3"/>
            </g>
            <g filter="url(#collabSparkleBlur)" opacity="0.7">
              <circle cx="824" cy="195" r="2" fill="#D8C0D6" />
              <circle cx="844" cy="189" r="1.7" fill="#CDB79C" />
              <circle cx="862" cy="194" r="1.5" fill="#D8C0D6" />
              <circle cx="880" cy="188" r="1.5" fill="#D8C0D6" />
              <circle cx="1298" cy="196" r="2" fill="#D8C0D6" />
              <circle cx="1318" cy="191" r="1.7" fill="#D8C0D6" />
              <circle cx="1338" cy="194" r="1.5" fill="#CDB79C" />
            </g>
            <defs>
              <linearGradient id="collabGlowA" x1="-40" y1="207" x2="1484" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#CBB29A" stopOpacity="0" />
                <stop offset="0.16" stopColor="#CBB29A" />
                <stop offset="0.52" stopColor="#D7C1D6" />
                <stop offset="0.82" stopColor="#D7C1D6" />
                <stop offset="1" stopColor="#CBB29A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="collabGlowB" x1="-30" y1="253" x2="1484" y2="242" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D8C4B3" stopOpacity="0" />
                <stop offset="0.22" stopColor="#D8C4B3" />
                <stop offset="0.64" stopColor="#D4C2D8" />
                <stop offset="1" stopColor="#D8C4B3" stopOpacity="0" />
              </linearGradient>
              <filter id="collabGlowBlur" x="-80" y="120" width="1600" height="180" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="10" />
              </filter>
              <filter id="collabSparkleBlur" x="830" y="176" width="540" height="28" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="1" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="relative mx-auto max-w-[1140px] px-6 py-8 sm:px-10 lg:px-12 lg:py-10">
          <div className="mx-auto max-w-[72rem] text-center">
            <h2 className="text-[2.55rem] font-semibold leading-[1.04] tracking-[-0.07em] text-[#3B2F26] sm:text-[3.15rem] lg:text-[3.9rem]">
              AI Workflow and Team Collaboration
            </h2>
            <p className="mx-auto mt-3 max-w-[46rem] text-[1.15rem] leading-8 text-[#6E5C4F]">
              See your spoken words instantly transformed into actionable data
              and shared context.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[276px_minmax(460px,1fr)_310px] lg:items-start lg:gap-8">
            <div className="space-y-5 pt-6">
              {workflowCards.map((card, index) => (
                <article
                  key={card.title}
                  className="collab-card motion-safe:animate-rise"
                  style={{ animationDelay: `${index * 130}ms` }}
                >
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#8B7768]">
                        <span className="text-sm text-[#8B7768]">{card.icon}</span>
                        {card.eyebrow}
                      </p>
                      <h3 className="mt-3 text-[1.05rem] font-semibold tracking-[-0.04em] text-[#3B2F26] sm:text-[1.1rem]">
                        {card.title}
                      </h3>
                      <p className="mt-1 text-[0.92rem] text-[#6E5C4F]">{card.subtitle}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.82rem] font-medium ${card.badgeClassName}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${card.badgeDotClassName}`} />
                      {card.badge}
                    </span>
                  </div>
                  <div className="relative mt-3.5 space-y-0.5 text-[0.95rem] leading-[1.95rem] text-[#4E3F34]">
                    {card.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <CollaborationCenter />

            <div className="collab-panel mt-1">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#8B7768]">
                Team Activity
              </p>
              <div className="relative mt-5 space-y-4">
                {activityFeed.map((item) => (
                  <article
                    key={`${item.name}-${item.time}`}
                    className="activity-card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-[#D9CFC7]">
                        <img src={item.avatar} alt="" className="h-full w-full object-cover" />
                        <span
                          className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full ${item.accent} ring-4 ring-[#F9F8F6]`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[1rem] font-semibold text-[#3B2F26]">
                            {item.name}
                          </p>
                          <p className="text-[0.92rem] text-[#8B7768]">{item.time}</p>
                        </div>
                        <p className="mt-1.5 text-[0.96rem] leading-[1.95rem] text-[#4E3F34]">
                          {item.update}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <p
            id="about"
            className="mt-4 text-center text-sm leading-7 text-[#8B7768]"
          >
            Data is processed and visible to the team in under 2 seconds.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#DDD2C8] bg-[linear-gradient(180deg,#F6F1EA_0%,#EFE7DE_100%)] text-[#3B2F26]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(244,238,231,0.9))] p-7 shadow-[0_22px_64px_rgba(125,98,70,0.08)] backdrop-blur-xl lg:p-8">
            <div className="absolute -right-16 top-0 h-52 w-52 rounded-full bg-[#FAF7F2]/80 blur-[120px]" />
            <div className="absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-[#D1B99E]/16 blur-[110px]" />

            <div className="relative mx-auto max-w-6xl text-center">
              <h3 className="text-[2rem] font-semibold tracking-[-0.05em] text-[#3B2F26] sm:text-[2.35rem] lg:whitespace-nowrap">
                Built for teams that want faster capture and cleaner follow-up.
              </h3>
            </div>
          </div>

          <div className="mt-10 grid gap-10 border-t border-[#D9CFC7] pt-10 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8B7768]">
                Product
              </p>
              <div className="mt-4 space-y-3 text-sm text-[#6E5C4F]">
                <a href="#features" className="block transition hover:text-[#3B2F26]">
                  Features
                </a>
                <a href="#" className="block transition hover:text-[#3B2F26]">
                  Pricing
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8B7768]">
                Company
              </p>
              <div className="mt-4 space-y-3 text-sm text-[#6E5C4F]">
                <a href="#" className="block transition hover:text-[#3B2F26]">
                  About
                </a>
                <a href="#" className="block transition hover:text-[#3B2F26]">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8B7768]">
                Legal
              </p>
              <div className="mt-4 space-y-3 text-sm text-[#6E5C4F]">
                <a href="#" className="block transition hover:text-[#3B2F26]">
                  Privacy Policy
                </a>
                <a href="#" className="block transition hover:text-[#3B2F26]">
                  Terms of Service
                </a>
                <a href="#" className="block transition hover:text-[#3B2F26]">
                  Cookie Policy
                </a>
                <a href="#" className="block transition hover:text-[#3B2F26]">
                  Security
                </a>
                <a href="#" className="block transition hover:text-[#3B2F26]">
                  GDPR
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-[#D9CFC7] pt-6 text-sm text-[#8B7768] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 voice2crm. All rights reserved.</p>
            <p>Built for modern teams that want CRM without the admin drag.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
