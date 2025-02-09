// app/admin/actions.ts
"use server";

import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

export async function getUsers() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized access");
  }

  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: [
      { createdAt: "desc" }, // First sort by createdAt (desc)
      { id: "desc" }, // If createdAt is null, sort by id (desc)
    ],
  });
}

export async function getUserById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized access");
  }

  return prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUser(id: string, data: Partial<User>) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized access");
  }

  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function createUser(
  data: Omit<
    User,
    | "id"
    | "emailVerified"
    | "image"
    | "accounts"
    | "sessions"
    | "posts"
    | "comments"
  >
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized access");
  }

  return prisma.user.create({
    data: {
      ...data,
      emailVerified: new Date(),
    },
  });
}
