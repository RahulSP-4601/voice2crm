import { VerticalSwitcher } from "@/components/vertical-switcher";

const bentoCards = [
  {
    eyebrow: "Voice-to-Data",
    title: "From spoken thought to structured pipeline in seconds.",
    description:
      "Capture appointments, follow-ups, notes, and next steps naturally. voice2crm turns everyday speech into clean records your team can actually use.",
    className: "lg:col-span-2",
    visual: (
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.8rem] bg-[#111936] p-5 text-white shadow-[0_24px_70px_rgba(17,25,54,0.32)]">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7091E6] text-sm font-semibold text-[#0F1635]">
              AI
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Voice Note</p>
              <p className="text-sm text-[#ADBBDA]">
                &ldquo;Follow up with Maria after Friday&apos;s showing.&rdquo;
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-[1.45rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[#ADBBDA]">
              Recognition
            </p>
            <div className="mt-4 flex items-end gap-3">
              <span className="h-8 w-8 rounded-full bg-[#7091E6]" />
              <span className="h-12 w-12 rounded-full bg-[#8697C4]" />
              <span className="h-16 w-16 rounded-full bg-white/80" />
            </div>
          </div>
        </div>
        <div className="rounded-[1.8rem] border border-[#D8E0F0] bg-[#F8FAFF] p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[#5A72BB]">
            Parsed output
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["Contact", "Maria Chen"],
              ["Task", "Post-showing follow-up"],
              ["Channel", "Voice capture"],
              ["Status", "Logged live"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.2rem] bg-white p-4 ring-1 ring-[#EDF1FA]">
                <p className="text-xs uppercase tracking-[0.22em] text-[#8697C4]">
                  {label}
                </p>
                <p className="mt-2 font-semibold text-[#0F1635]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Team Collaboration",
    title: "Shared context that feels effortless.",
    description:
      "Keep the whole team aligned with comments, ownership, and live activity history. Every update stays clear without adding admin overhead.",
    className: "",
    visual: (
      <div className="space-y-3 rounded-[1.8rem] border border-[#D8E0F0] bg-[#F8FAFF] p-5">
        {[
          ["Ava", "Assigned quote review to Marcus"],
          ["Marcus", "Left pricing notes for the team"],
          ["Nina", "Marked follow-up as high priority"],
        ].map(([name, update]) => (
          <div
            key={name}
            className="flex items-start gap-4 rounded-[1.2rem] bg-white p-4 ring-1 ring-[#EDF1FA]"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#3D52A0] text-sm font-semibold text-white">
              {name[0]}
            </div>
            <div>
              <p className="font-semibold text-[#0F1635]">{name}</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">{update}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "Custom Schema Builder",
    title: "Shape the CRM around your workflow, not the other way around.",
    description:
      "Create fields, statuses, and objects for your exact business model, whether you manage listings, clients, dispatches, or service tickets.",
    className: "lg:col-span-3",
    visual: (
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.8rem] border border-[#D8E0F0] bg-[#F8FAFF] p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Field", "Property Type", "Dropdown"],
              ["Field", "Lead Source", "Single Select"],
              ["Object", "Site Visit", "Custom"],
            ].map(([type, name, style]) => (
              <div key={name} className="rounded-[1.2rem] bg-white p-4 ring-1 ring-[#EDF1FA]">
                <p className="text-xs uppercase tracking-[0.22em] text-[#8697C4]">
                  {type}
                </p>
                <p className="mt-2 font-semibold text-[#0F1635]">{name}</p>
                <span className="mt-3 inline-flex rounded-full border border-[#ADBBDA] bg-[#F8FAFF] px-3 py-1 text-sm font-medium text-[#3D52A0]">
                  {style}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.8rem] bg-[linear-gradient(180deg,#3D52A0_0%,#253266_100%)] p-5 text-white shadow-[0_24px_70px_rgba(61,82,160,0.24)]">
          <p className="text-xs uppercase tracking-[0.24em] text-[#ADBBDA]">
            Flexible model
          </p>
          <div className="mt-4 space-y-3">
            {["Listings", "Clients", "Dispatches", "Service tickets"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[1rem] border border-white/10 bg-white/8 px-4 py-3"
                >
                  <p className="font-medium text-white">{item}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#EDE8F5] text-slate-950">
      <section className="relative overflow-hidden bg-[#0F1635] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(112,145,230,0.24),_transparent_28%),radial-gradient(circle_at_82%_18%,_rgba(173,187,218,0.18),_transparent_24%),linear-gradient(180deg,_#0F1635_0%,_#17204B_58%,_#1B2553_100%)]" />
        <div className="absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-[#7091E6]/18 blur-[120px] motion-safe:animate-float-slow" />
        <div className="absolute right-[-10rem] top-24 h-96 w-96 rounded-full bg-[#3D52A0]/28 blur-[160px] motion-safe:animate-float-delayed" />

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-6 sm:px-10 lg:px-12">
          <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl motion-safe:animate-rise">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-sm font-semibold text-[#0F1635]">
                V2
              </div>
              <div>
                <p className="text-lg font-semibold text-white sm:text-xl">voice2crm</p>
                <p className="text-base text-[#D6DEF5] sm:text-[1.05rem]">
                  The CRM that speaks your language.
                </p>
              </div>
            </div>
            <a
              href="#demo"
              className="rounded-full border border-white/14 bg-white/8 px-5 py-2.5 text-lg font-semibold text-white transition duration-300 hover:bg-white/14"
            >
              Join waitlist
            </a>
          </header>

          <div className="grid gap-16 pb-10 pt-16 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:pt-24">
            <div className="motion-safe:animate-rise-delayed">
              <div className="inline-flex rounded-full border border-[#7091E6]/35 bg-[#7091E6]/10 px-4 py-2 text-sm font-semibold text-[#EDE8F5]">
                The CRM that speaks your language.
              </div>
              <h1 className="mt-8 text-[3rem] font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-[3.6rem] lg:text-[4.25rem]">
                <span className="block whitespace-nowrap">The CRM that</span>
                <span className="block whitespace-nowrap">works the way</span>
                <span className="block whitespace-nowrap">you talk.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#D6DEF5] sm:text-[1.35rem]">
                Whether you sell houses, fix pipes, or manage a team, just talk
                to log your leads.
                <span className="block">No typing, no complexity.</span>
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#demo"
                  className="group inline-flex min-h-[4.5rem] items-center rounded-full bg-[#7091E6] px-12 py-4.5 text-[1.2rem] font-semibold tracking-[-0.02em] text-[#0F1635] shadow-[0_20px_50px_rgba(112,145,230,0.26)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#87a4ed]"
                >
                  Join waitlist
                  <span className="ml-2 transition duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>
            </div>

            <div className="relative motion-safe:animate-rise-late">
              <div className="absolute inset-x-20 top-0 h-24 rounded-full bg-[#7091E6]/25 blur-3xl" />
              <div className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_32px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
                <div className="rounded-[1.9rem] bg-[#111936] p-7 ring-1 ring-white/8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8697C4]">
                        Live capture
                      </p>
                      <p className="mt-3 max-w-md text-[2.35rem] font-semibold leading-tight tracking-[-0.05em] text-white">
                        Speak once. It&apos;s logged everywhere.
                      </p>
                    </div>
                    <div className="rounded-full bg-emerald-300/12 px-4 py-2 text-sm font-semibold text-emerald-200 ring-1 ring-emerald-300/14">
                      <span className="block whitespace-nowrap">Synced in</span>
                      <span className="block whitespace-nowrap">real time</span>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(112,145,230,0.16),rgba(255,255,255,0.03))] p-6">
                    <p className="text-sm uppercase tracking-[0.28em] text-[#ADBBDA]">
                      Transcript
                    </p>
                    <p className="mt-4 max-w-2xl text-xl leading-9 text-slate-100">
                      &ldquo;New plumbing lead. Sarah in Austin needs a full
                      bathroom quote next Tuesday. Budget is around twelve
                      thousand.&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                      ["Lead Name", "Sarah Brooks"],
                      ["Next Step", "Send estimate"],
                      ["Budget", "$12,000"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-[1.35rem] border border-white/8 bg-white/6 p-5"
                      >
                        <p className="text-xs uppercase tracking-[0.22em] text-[#8697C4]">
                          {label}
                        </p>
                        <p className="mt-3 text-base font-semibold text-white">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="demo"
        className="border-t border-[#D7DDED] bg-[linear-gradient(180deg,#F7FAFF_0%,#EDE8F5_100%)]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12">
          <div className="max-w-5xl">
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#0F1635] sm:text-5xl lg:text-[3.4rem] lg:whitespace-nowrap">
              One CRM, shaped to every business you run.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
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
        className="border-t border-[#D7DDED] bg-[#F5F7FC]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#0F1635] sm:text-5xl lg:text-[3.35rem]">
              <span className="block">Built for modern teams that need</span>
              <span className="block">clarity, speed, and control.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {bentoCards.map((card, index) => (
              <article
                key={card.title}
                className={`rounded-[2rem] border border-[#D8E0F0] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] p-7 shadow-[0_24px_80px_rgba(61,82,160,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(61,82,160,0.12)] motion-safe:animate-rise ${card.className}`}
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5A72BB]">
                  {card.eyebrow}
                </p>
                <h3 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-[#0F1635] sm:text-[2.2rem]">
                  {card.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  {card.description}
                </p>
                <div className="mt-8">{card.visual}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#233062] bg-[#0F1635] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:p-8">
            <div className="absolute -right-16 top-0 h-52 w-52 rounded-full bg-[#7091E6]/18 blur-[120px]" />
            <div className="absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-[#3D52A0]/22 blur-[110px]" />

            <div className="relative mx-auto max-w-6xl text-center">
              <h3 className="text-[2rem] font-semibold tracking-[-0.05em] text-white sm:text-[2.35rem] lg:whitespace-nowrap">
                Built for teams that want faster capture and cleaner follow-up.
              </h3>
            </div>
          </div>

          <div className="mt-10 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8697C4]">
                Product
              </p>
              <div className="mt-4 space-y-3 text-sm text-[#D6DEF5]">
                <a href="#features" className="block transition hover:text-white">
                  Features
                </a>
                <a href="#" className="block transition hover:text-white">
                  Pricing
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8697C4]">
                Company
              </p>
              <div className="mt-4 space-y-3 text-sm text-[#D6DEF5]">
                <a href="#" className="block transition hover:text-white">
                  About
                </a>
                <a href="#" className="block transition hover:text-white">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8697C4]">
                Legal
              </p>
              <div className="mt-4 space-y-3 text-sm text-[#D6DEF5]">
                <a href="#" className="block transition hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="block transition hover:text-white">
                  Terms of Service
                </a>
                <a href="#" className="block transition hover:text-white">
                  Cookie Policy
                </a>
                <a href="#" className="block transition hover:text-white">
                  Security
                </a>
                <a href="#" className="block transition hover:text-white">
                  GDPR
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[#8697C4] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 voice2crm. All rights reserved.</p>
            <p>Built for modern teams that want CRM without the admin drag.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
