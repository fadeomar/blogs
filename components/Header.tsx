import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import ButtonLogout from "./ButtonLogout";

const Header = async () => {
  const user = await getCurrentUser();
  // console.log({ user });
  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex justify-between items-center  max-w-4xl mx-auto">
        <Link href="/" className="text-white text-2xl font-bold">
          My Blogs
        </Link>

        <ul className="flex space-x-4 items-center">
          <li>
            <Link href="/blogs" className="text-white hover:underline">
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/games/snake" className="text-white hover:underline">
              Snake Game
            </Link>
          </li>
          {user && user?.role && user.role === "ADMIN" && (
            <li>
              <Link
                href="/admin/dashboard"
                className="text-white hover:underline"
              >
                Dashboard
              </Link>
            </li>
          )}
          {user?.id ? (
            <ButtonLogout user={user} />
          ) : (
            <li>
              <Link
                href="/api/auth/signin"
                className="text-white hover:underline"
              >
                login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
