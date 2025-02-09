// src/app/auth/signin/page.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, update } = useSession(); // Get session and update function

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent NextAuth from redirecting automatically
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
        return;
      }

      // 🔹 Fetch updated session after login
      const response = await fetch("/api/auth/session");
      const session = await response.json();

      if (!session) {
        toast.error("Failed to get session data.");
        return;
      }

      let redirectPath = "/"; // Default path

      if (session.user.role === "ADMIN") {
        redirectPath = "/admin/dashboard";
      } else if (session.user.role === "USER") {
        redirectPath = "/blogs";
      }

      window.location.href = redirectPath;
    } catch (error) {
      toast.error("Authentication failed");
    }
  };

  const onGoogleSubmit = async () => {
    try {
      // Show loading toast
      const toastId = toast.loading("Signing in with Google...");

      const result = await signIn("google", { callbackUrl: "/" });

      if (result?.error) {
        toast.error("Google sign-in failed", {
          description: result.error,
          id: toastId,
        });
      } else {
        toast.success("Google sign-in successful!", {
          id: toastId,
        });
        // router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Authentication failed", {
        description: "An unexpected error occurred during Google sign-in",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="mt-1"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1"
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            // onClick={() => signIn("google")}
            onClick={onGoogleSubmit}
            disabled={isSubmitting}
          >
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <div className="mt-8 relative flex justify-center text-xs uppercase ">
            <span className="bg-background px-2 text-muted-foreground ">
              don&apos;t have an account,{" "}
              <Link
                className="underline font-bold decoration-blue-500"
                href={"/auth/signup"}
              >
                sign up
              </Link>{" "}
              new account now
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
