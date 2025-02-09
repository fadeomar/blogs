"use client";

import { signOut } from "next-auth/react";
import Avatar from "./Avatar";
const ButtonLogout = ({ user }) => {
  return (
    <>
      <button onClick={() => signOut()} className="text-white hover:underline">
        Logout
      </button>
      <Avatar src={user?.image} />
    </>
  );
};

export default ButtonLogout;
