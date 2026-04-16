"use client";

import { useState } from "react";
import { getCompanyUsers, updateUserRole } from "@/app/actions/crm";
import { useRouter } from "next/navigation";
import type { Profile } from "@/types/crm";
import InviteUserModal from "./InviteUserModal";

interface Props {
  users: Profile[];
  currentUserRole: string;
  currentUserId: string;
}

export default function TeamManagement({ users, currentUserRole, currentUserId }: Props) {
  const router = useRouter();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingUserId(userId);
    await updateUserRole(userId, newRole);
    setUpdatingUserId(null);
    router.refresh();
  };

  const canManageUser = (userRole: string) => {
    if (currentUserRole === "owner") return true;
    if (currentUserRole === "admin" && userRole === "employee") return true;
    return false;
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-700";
      case "admin":
        return "bg-blue-100 text-blue-700";
      case "employee":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Team Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            {users.length} team member{users.length !== 1 ? "s" : ""}
          </p>
        </div>

        {(currentUserRole === "owner" || currentUserRole === "admin") && (
          <button
            onClick={() => setIsInviteOpen(true)}
            className="rounded-lg bg-gradient-to-r from-[#D2B89A] to-[#BE9E7C] px-4 py-2 text-sm font-semibold text-[#2F251E] shadow-md hover:brightness-105"
          >
            + Invite User
          </button>
        )}
      </div>

      <div className="space-y-3">
        {users.map((user) => {
          const isCurrentUser = user.id === currentUserId;
          const canManage = canManageUser(user.role) && !isCurrentUser;

          return (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D9CFC7] to-[#C9B59C] text-sm font-semibold text-[#3B2F26]">
                    {user.company_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.company_name || "User"}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs text-gray-500">(You)</span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {canManage ? (
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    disabled={updatingUserId === user.id}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
                  >
                    {currentUserRole === "owner" && (
                      <>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                      </>
                    )}
                    {currentUserRole === "admin" && (
                      <option value="employee">Employee</option>
                    )}
                  </select>
                ) : (
                  <span
                    className={`rounded-full px-3 py-1.5 text-sm font-medium ${getRoleBadgeColor(
                      user.role
                    )}`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isInviteOpen && (
        <InviteUserModal
          isOpen={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
          currentUserRole={currentUserRole}
        />
      )}
    </div>
  );
}
