// app/admin/users/create/page.tsx
"use client";
import UserForm from "@/components/UserForm";

export default function CreateUserPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Create New User
        </h1>
        <UserForm isNew />
      </div>
    </div>
  );
}
