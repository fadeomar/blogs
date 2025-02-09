// app/admin/page.tsx
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAdminStats } from "./actions";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<{
    userCount?: number;
    postCount?: number;
    commentCount?: number;
    error?: string;
  }>({});

  useEffect(() => {
    const fetchStats = async () => {
      if (session?.user?.role === "ADMIN") {
        const data = await getAdminStats();
        setStats(data);
      }
    };

    fetchStats();
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (session.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Access Denied 🔒
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Admin Portal,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {session.user?.name || "Admin"}! 👋
            </span>
          </h1>
          <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
            <span className="text-gray-600 mr-2">Your Role:</span>
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              {session.user?.role}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        {stats.error ? (
          <div className="text-red-500 text-center">{stats.error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/admin/users">
              <StatCard
                title="Total Users"
                value={stats.userCount}
                gradient="from-purple-600 to-blue-500"
              />
            </Link>
            <StatCard
              title="Total Posts"
              value={stats.postCount}
              gradient="from-green-500 to-cyan-500"
            />
            <StatCard
              title="Total Comments"
              value={stats.commentCount}
              gradient="from-orange-500 to-red-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({
  title,
  value,
  gradient,
}: {
  title: string;
  value?: number;
  gradient: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden transition-transform hover:scale-105">
      {/* Gradient Background Number */}
      <div
        className={`absolute -bottom-10 -right-0 text-[100px] font-bold 
        opacity-10 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
      >
        {value ?? 0}
      </div>

      {/* Content */}
      <h3 className="text-gray-500 text-lg font-medium mb-4">{title}</h3>
      <div className="text-4xl font-bold text-gray-900 relative z-10">
        {value ?? "--"}
      </div>
    </div>
  );
}
