"use client";

import { useState } from "react";
import Link from "next/link";
import { resetPassword } from "@/app/actions/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await resetPassword(email.trim());

      if (result.error) {
        // Show error (rate limiting, network issues, etc.)
        setError(result.error);
      } else if (result.success) {
        // Always show success for security (even if email doesn't exist)
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
                <Link
                  href="/signin"
                  className="inline-flex min-h-[3rem] items-center rounded-[1.15rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(244,238,231,0.92))] px-5 py-2 text-[0.98rem] font-semibold text-[#3B2F26] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-[#F1EBE4]"
                >
                  Back to Sign in
                </Link>
              </div>
            </div>
          </header>

          <div className="animate-soft-pop-delayed relative z-10 mx-auto mt-12 max-w-[34rem]">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(249,246,241,0.92))] p-8 shadow-[0_28px_90px_rgba(125,98,70,0.12)] backdrop-blur-2xl sm:p-10">
              <div className="absolute inset-x-10 top-1/3 h-24 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,181,156,0.14),transparent_62%)] blur-2xl" />

              <div className="relative">
                {!isSubmitted ? (
                  <>
                    <div className="text-center">
                      <h1 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[#3B2F26] sm:text-[2.8rem]">
                        Reset your password
                      </h1>
                      <p className="mt-3 text-base leading-7 text-[#6E5C4F] sm:text-lg">
                        Enter your email and we'll send you a link to reset your password
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-semibold text-[#3B2F26]"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          className={`w-full rounded-[1.1rem] border ${
                            error ? "border-red-400" : "border-[#DDD2C8]"
                          } bg-[#FCFAF7] px-4 py-3.5 text-[#3B2F26] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20`}
                          placeholder="name@company.com"
                        />
                        {error && (
                          <p className="mt-1.5 text-sm text-red-600">{error}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="group mt-6 inline-flex w-full min-h-[3.7rem] items-center justify-center rounded-[1.2rem] bg-[linear-gradient(180deg,#D2B89A_0%,#BE9E7C_100%)] px-6 py-3.5 text-base font-semibold text-[#2F251E] shadow-[0_20px_44px_rgba(125,98,70,0.18),0_0_0_1px_rgba(201,181,156,0.18)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                        {!isLoading && (
                          <span className="ml-2 transition duration-300 group-hover:translate-x-0.5">
                            →
                          </span>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF3EC] ring-1 ring-[#C8DACB]">
                      <svg
                        className="h-8 w-8 text-[#58715A]"
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

                    <h1 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[#3B2F26] sm:text-[2.8rem]">
                      Check your email
                    </h1>
                    <p className="mt-3 text-base leading-7 text-[#6E5C4F] sm:text-lg">
                      We've sent a password reset link to
                      <br />
                      <span className="font-semibold text-[#3B2F26]">{email}</span>
                    </p>

                    <div className="mt-8 space-y-3">
                      <p className="text-sm text-[#8B7768]">
                        Didn't receive the email? Check your spam folder or
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-sm font-medium text-[#6E5C4F] transition hover:text-[#3B2F26] underline"
                      >
                        try another email address
                      </button>
                    </div>

                    <Link
                      href="/signin"
                      className="mt-8 inline-flex min-h-[3.3rem] items-center rounded-[1.15rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(244,238,231,0.92))] px-6 py-3 text-[0.98rem] font-semibold text-[#3B2F26] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-[#F1EBE4]"
                    >
                      Back to Sign in
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
