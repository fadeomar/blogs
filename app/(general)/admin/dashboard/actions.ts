// app/admin/actions.ts
"use server";

import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

// Generic count function with admin check
async function getCount(model: "user" | "post" | "comment") {
  const session = await getServerSession(authOptions);

  // Server-side role check

  // console.log("session from actions.ts ==> ", { session });
  if (!session?.user?.role || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized access");
  }

  switch (model) {
    case "user":
      return prisma.user.count();
    case "post":
      return prisma.post.count();
    case "comment":
      return prisma.comment.count();
    default:
      return 0;
  }
}

export async function getAdminStats() {
  try {
    const [userCount, postCount, commentCount] = await Promise.all([
      getCount("user"),
      getCount("post"),
      getCount("comment"),
    ]);

    return { userCount, postCount, commentCount };
  } catch (error) {
    console.error("Admin stats error:", error);
    return { error: "Failed to fetch statistics" };
  }
}
