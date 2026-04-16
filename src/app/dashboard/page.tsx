import { redirect } from "next/navigation";
import { getUser, signOut } from "@/app/actions/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F9F8F6] text-[#3B2F26]">
      <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#FAF8F4_0%,#F4EEE7_48%,#EFE7DE_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(201,181,156,0.12),transparent_22%),radial-gradient(circle_at_82%_24%,rgba(226,216,206,0.34),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.38),transparent_38%)]" />
        <div className="absolute left-[-8rem] top-40 h-72 w-72 rounded-full bg-[#D7C6B4]/20 blur-[120px] motion-safe:animate-float-slow" />
        <div className="absolute right-[-10rem] top-28 h-[24rem] w-[24rem] rounded-full bg-[#F4EEE7]/85 blur-[150px] motion-safe:animate-float-delayed" />

        <div className="relative mx-auto max-w-[90rem] px-6 py-8 sm:px-10 lg:px-12">
          <header className="animate-soft-pop">
            <div className="animate-ambient-breathe mx-auto flex w-full max-w-[86rem] flex-col gap-4 rounded-[1.9rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(249,246,241,0.92))] px-4 py-4 backdrop-blur-xl sm:px-6 md:min-h-[5.5rem] md:flex-row md:items-center md:justify-between md:gap-6 md:px-9">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-[1.2rem] bg-[linear-gradient(135deg,#D9CFC7_0%,#C9B59C_100%)] text-sm font-semibold text-[#3B2F26] ring-1 ring-[#C9B59C]/50 sm:h-13 sm:w-13 sm:rounded-[1.35rem]">
                  <span className="voice-bars" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
                <Link
                  href="/"
                  className="text-[1.45rem] font-semibold tracking-[-0.03em] text-[#3B2F26] transition hover:text-[#6E5C4F] sm:text-[1.7rem]"
                >
                  voice2crm
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <p className="text-sm text-[#6E5C4F]">{user.email}</p>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="inline-flex min-h-[3rem] items-center rounded-[1.15rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(244,238,231,0.92))] px-5 py-2 text-[0.98rem] font-semibold text-[#3B2F26] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-[#F1EBE4]"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          </header>

          <div className="animate-soft-pop-delayed relative z-10 mx-auto mt-12 max-w-[60rem]">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(249,246,241,0.92))] p-8 shadow-[0_28px_90px_rgba(125,98,70,0.12)] backdrop-blur-2xl sm:p-12">
              <div className="absolute inset-x-10 top-1/3 h-24 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,181,156,0.14),transparent_62%)] blur-2xl" />

              <div className="relative text-center">
                <div className="mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF3EC] ring-1 ring-[#C8DACB]">
                  <svg
                    className="h-10 w-10 text-[#58715A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h1 className="text-[2.5rem] font-semibold tracking-[-0.05em] text-[#3B2F26] sm:text-[3.5rem]">
                  Welcome to voice2crm!
                </h1>
                <p className="mt-4 text-lg leading-8 text-[#6E5C4F] sm:text-xl">
                  You're successfully signed in and ready to start managing your leads with voice.
                </p>

                <div className="mt-10 rounded-[1.5rem] border border-[#DDD2C8] bg-[#FCFAF7] p-6">
                  <h2 className="text-xl font-semibold text-[#3B2F26]">Account Information</h2>
                  <div className="mt-4 space-y-3 text-left">
                    <div className="flex justify-between border-b border-[#DDD2C8] pb-2">
                      <span className="text-sm font-medium text-[#8B7768]">Email:</span>
                      <span className="text-sm text-[#3B2F26]">{user.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#DDD2C8] pb-2">
                      <span className="text-sm font-medium text-[#8B7768]">User ID:</span>
                      <span className="text-sm font-mono text-[#3B2F26]">{user.id.slice(0, 8)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-[#8B7768]">Status:</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF3EC] px-3 py-1 text-xs font-medium text-[#58715A] ring-1 ring-[#C8DACB]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8CB493]" />
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[1.5rem] border border-[#F1ECE7] bg-[linear-gradient(180deg,rgba(253,251,247,0.98),rgba(243,237,230,0.94))] p-6">
                  <h3 className="text-lg font-semibold text-[#3B2F26]">Next Steps</h3>
                  <ul className="mt-4 space-y-2 text-left text-sm text-[#6E5C4F]">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9B59C]" />
                      <span>Set up your CRM workspace and customize your fields</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9B59C]" />
                      <span>Start capturing leads with voice input</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9B59C]" />
                      <span>Invite team members to collaborate</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/"
                  className="mt-8 inline-flex min-h-[3.5rem] items-center rounded-[1.15rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(244,238,231,0.92))] px-6 py-3 text-base font-semibold text-[#3B2F26] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-[#F1EBE4]"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
