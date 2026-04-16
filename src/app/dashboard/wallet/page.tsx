import { redirect } from "next/navigation";
import { getUser } from "@/app/actions/auth";
import { getCurrentProfile } from "@/app/actions/crm";
import WalletContent from "@/components/crm/WalletContent";

export default async function WalletPage() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/signin");
  }

  // Only Owner and Admin can access wallet
  if (profile.role === "employee") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#F9F8F6]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <WalletContent profile={profile} />
      </div>
    </main>
  );
}
