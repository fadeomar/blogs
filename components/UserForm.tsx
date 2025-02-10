// components/UserForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type FormData = {
  name: string;
  email: string;
  role: string;
  password?: string;
};

export default function UserForm({
  user,
  isNew,
}: {
  user?: Partial<User>;
  isNew?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: user,
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const url = isNew ? "/api/admin/users" : `/api/admin/users/${user?.id}`;
      const method = isNew ? "POST" : "PATCH";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save user");

      router.push("/admin/users");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save user");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          {...register("name", { required: true })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && (
          <span className="text-sm text-red-600">Name is required</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <span className="text-sm text-red-600">Valid email is required</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <select
          {...register("role", { required: true })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Profile Image URL, ex: https://loremflickr.com/640/480
      </label>
      <input
        type="text"
        {...register("image")}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="https://example.com/avatar.jpg"
      />
      {!isNew && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password (leave blank to keep existing)
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}
      {isNew && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: isNew })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && (
            <span className="text-sm text-red-600">Password is required</span>
          )}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          {isNew ? "Create User" : "Update User"}
        </button>
        <Link
          href="/admin/users"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
