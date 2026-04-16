"use client";

import Link from "next/link";
import type { Profile } from "@/types/crm";

interface Props {
  profile: Profile;
}

export default function WalletContent({ profile }: Props) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-2 text-sm text-[#8B7768] hover:text-[#3B2F26]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-[#3B2F26]">Wallet & Billing</h1>
        <p className="mt-2 text-[#8B7768]">Manage your subscription and billing information</p>
      </div>

      {/* Current Plan */}
      <div className="mb-6 rounded-xl border border-[#DDD2C8] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="mb-2 text-xl font-semibold text-[#3B2F26]">Current Plan</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#3B2F26]">Free</span>
              <span className="text-sm text-[#8B7768]">/ month</span>
            </div>
            <p className="mt-2 text-sm text-[#8B7768]">
              You're currently on the free plan
            </p>
          </div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
            Active
          </span>
        </div>
      </div>

      {/* Plan Features */}
      <div className="mb-6 rounded-xl border border-[#DDD2C8] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-[#3B2F26]">Plan Features</h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[#3B2F26]">Unlimited leads</span>
          </li>
          <li className="flex items-center gap-3">
            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[#3B2F26]">Team collaboration</span>
          </li>
          <li className="flex items-center gap-3">
            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[#3B2F26]">Activity tracking</span>
          </li>
          <li className="flex items-center gap-3">
            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[#3B2F26]">Role-based access control</span>
          </li>
        </ul>
      </div>

      {/* Upgrade Section */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="mb-2 text-xl font-semibold text-[#3B2F26]">Upgrade to Pro</h2>
            <p className="mb-4 text-sm text-[#8B7768]">
              Get access to advanced features and priority support
            </p>
            <ul className="mb-4 space-y-2 text-sm text-[#3B2F26]">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span> Advanced analytics
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span> Custom integrations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span> Priority support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span> Custom branding
              </li>
            </ul>
            <button
              disabled
              className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 font-medium text-white opacity-50"
            >
              Coming Soon
            </button>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#3B2F26]">$29</div>
            <div className="text-sm text-[#8B7768]">per month</div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="mt-6 rounded-xl border border-[#DDD2C8] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-[#3B2F26]">Billing History</h2>
        <div className="text-center py-8 text-[#8B7768]">
          <svg
            className="mx-auto mb-3 h-12 w-12 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>No billing history yet</p>
        </div>
      </div>
    </div>
  );
}
