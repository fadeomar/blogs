"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    image: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 🔹 Step 1: Create user via API
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Sign up failed");
      }

      // 🔹 Step 2: Sign in the user
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.image,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // 🔹 Step 3: Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const onGoogleSubmit = () => {
    signIn("google");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="image"
          placeholder="image"
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>

      <div className="my-4 text-center text-gray-600">or</div>

      <Button onClick={onGoogleSubmit} className="w-full" variant="outline">
        Continue with Google
      </Button>
    </div>
  );
}
