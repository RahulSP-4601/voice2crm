import { redirect } from "next/navigation";
import { getUser } from "@/app/actions/auth";
import { getCurrentProfile } from "@/app/actions/crm";
import InviteUserContent from "@/components/crm/InviteUserContent";

export default async function InvitePage() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/signin");
  }

  // Only Owner and Admin can access this page
  if (profile.role === "employee") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#F9F8F6]">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <InviteUserContent currentUserRole={profile.role} companyId={profile.company_id || ""} />
      </div>
    </main>
  );
}
