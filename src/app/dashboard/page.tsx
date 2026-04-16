import { redirect } from "next/navigation";
import { getUser } from "@/app/actions/auth";
import { getDashboardStats, getLeads, getCurrentProfile, getCompanyUsers } from "@/app/actions/crm";
import DashboardStats from "@/components/crm/DashboardStats";
import LeadsList from "@/components/crm/LeadsList";
import CreateLeadButton from "@/components/crm/CreateLeadButton";
import SignOutButton from "@/components/SignOutButton";
import ProfileDropdown from "@/components/ProfileDropdown";
import FollowUpWidget from "@/components/crm/FollowUpWidget";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/signin");
  }

  const statsResult = await getDashboardStats();
  const leadsResult = await getLeads();
  const usersResult = await getCompanyUsers();

  const stats = statsResult.data;
  const leads = leadsResult.data || [];
  const users = usersResult.data || [];

  return (
    <main className="min-h-screen bg-[#F9F8F6]">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between rounded-2xl border border-[#DDD2C8] bg-white/80 px-6 py-4 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#D9CFC7] to-[#C9B59C] ring-1 ring-[#C9B59C]/30">
                <span className="text-sm font-semibold text-[#3B2F26]">
                  {profile.company_name?.charAt(0) || "C"}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#3B2F26]">
                  {profile.company_name}
                </h1>
                <p className="text-sm text-[#8B7768]">
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)} Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ProfileDropdown
                userRole={profile.role}
                userName={profile.company_name || user.email?.split("@")[0] || "User"}
              />
              <SignOutButton />
            </div>
          </div>
        </header>

        {/* Stats */}
        {stats && <DashboardStats stats={stats} />}

        {/* Follow-Up Widget */}
        <div className="mt-8">
          <FollowUpWidget leads={leads} />
        </div>

        {/* Leads Section */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#3B2F26]">
              Leads
            </h2>
            <CreateLeadButton />
          </div>

          <LeadsList
            initialLeads={leads}
            userRole={profile.role}
            teamMembers={users}
          />
        </div>
      </div>
    </main>
  );
}
