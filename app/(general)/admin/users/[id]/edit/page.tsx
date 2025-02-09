// app/admin/users/[id]/edit/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import UserForm from "@/components/UserForm";
import { getUserById } from "../../actions";

export default function EditUserPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id as string);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/admin/users");
      }
    };

    fetchUser();
  }, [id, router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit User</h1>
        <UserForm user={user} />
      </div>
    </div>
  );
}
