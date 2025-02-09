import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { nextauth } = req as any; // Extract NextAuth session

    // If user is not an admin, redirect them

    if (nextauth?.token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Allow logged-in users
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"], // Protect all routes under /admin
};
