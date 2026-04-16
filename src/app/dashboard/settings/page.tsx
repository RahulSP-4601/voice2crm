import { redirect } from "next/navigation";
import { getUser } from "@/app/actions/auth";
import { getCurrentProfile } from "@/app/actions/crm";
import SettingsContent from "@/components/crm/SettingsContent";

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-[#F9F8F6]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <SettingsContent
          user={user}
          profile={profile}
        />
      </div>
    </main>
  );
}
