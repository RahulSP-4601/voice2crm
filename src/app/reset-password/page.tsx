"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/app/actions/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage("");
    setErrors({
      password: "",
      confirmPassword: "",
    });

    try {
      const result = await updatePassword(formData.password);

      if (result.error) {
        // Check for specific errors
        if (result.error.toLowerCase().includes("signed in") ||
            result.error.toLowerCase().includes("expired")) {
          setErrors((prev) => ({
            ...prev,
            password: result.error + " You may need to request a new password reset link.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            password: result.error,
          }));
        }
      } else if (result.success) {
        setSuccessMessage(result.message || "Password updated successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Password update error:", error);
      setErrors((prev) => ({
        ...prev,
        password: "Network error. Please check your connection and try again.",
      }));
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
            </div>
          </header>

          <div className="animate-soft-pop-delayed relative z-10 mx-auto mt-12 max-w-[34rem]">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(249,246,241,0.92))] p-8 shadow-[0_28px_90px_rgba(125,98,70,0.12)] backdrop-blur-2xl sm:p-10">
              <div className="absolute inset-x-10 top-1/3 h-24 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,181,156,0.14),transparent_62%)] blur-2xl" />

              <div className="relative">
                <div className="text-center">
                  <h1 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[#3B2F26] sm:text-[2.8rem]">
                    Set new password
                  </h1>
                  <p className="mt-3 text-base leading-7 text-[#6E5C4F] sm:text-lg">
                    Choose a strong password for your account
                  </p>
                </div>

                {successMessage && (
                  <div className="mt-6 rounded-[1.1rem] border border-[#C8DACB] bg-[#EAF3EC] px-4 py-3 text-sm text-[#58715A]">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-semibold text-[#3B2F26]"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full rounded-[1.1rem] border ${
                        errors.password ? "border-red-400" : "border-[#DDD2C8]"
                      } bg-[#FCFAF7] px-4 py-3.5 text-[#3B2F26] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20`}
                      placeholder="Enter your new password"
                    />
                    {errors.password && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-semibold text-[#3B2F26]"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full rounded-[1.1rem] border ${
                        errors.confirmPassword ? "border-red-400" : "border-[#DDD2C8]"
                      } bg-[#FCFAF7] px-4 py-3.5 text-[#3B2F26] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20`}
                      placeholder="Confirm your new password"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group mt-6 inline-flex w-full min-h-[3.7rem] items-center justify-center rounded-[1.2rem] bg-[linear-gradient(180deg,#D2B89A_0%,#BE9E7C_100%)] px-6 py-3.5 text-base font-semibold text-[#2F251E] shadow-[0_20px_44px_rgba(125,98,70,0.18),0_0_0_1px_rgba(201,181,156,0.18)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isLoading ? "Updating Password..." : "Update Password"}
                    {!isLoading && (
                      <span className="ml-2 transition duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
