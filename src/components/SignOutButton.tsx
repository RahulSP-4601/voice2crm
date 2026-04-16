"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="rounded-lg border border-[#DDD2C8] bg-white px-4 py-2 text-sm font-medium text-[#3B2F26] transition hover:bg-[#F9F8F6]"
    >
      Sign out
    </button>
  );
}
