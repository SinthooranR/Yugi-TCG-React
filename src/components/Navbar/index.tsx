"use client";

import { useAuth } from "@/util/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UserIcon from "../Icons/UserIcon";

const Navbar = () => {
  const path = usePathname();
  const { logout, user } = useAuth();
  const disabledList = ["/", "/login"];

  return (
    <>
      {!disabledList.includes(path) && (
        <nav className="flex w-full justify-evenly items-center fixed z-50 p-4 bg-slate-900 text-white wrap">
          <div className="flex gap-6">
            <Link href="/cards">Cards</Link>
            {user && <Link href="/decks">Decks</Link>}
            <Link href="/threads">Threads</Link>
          </div>

          <div className="flex gap-6">
            {user ? (
              <>
                <button className="cursor-pointer">
                  <UserIcon />
                </button>
                {/* <Link href="/profile">Profile</Link>
                <button onClick={() => logout()}>Logout</button>{" "} */}
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
