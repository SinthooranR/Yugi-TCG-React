"use client";

import { useAuth } from "@/util/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const path = usePathname();
  const { logout, user } = useAuth();
  const disabledList = ["/", "/login"];

  return (
    <>
      {!disabledList.includes(path) && (
        <nav className="flex w-full justify-evenly items-center fixed z-50 p-4 bg-slate-900 text-white">
          <div className="flex gap-6">
            <Link href="/cards">Cards</Link>
            {user && <Link href="/decks">My Decks</Link>}
            <Link href="/discussions">Discussion</Link>
          </div>

          <div className="flex gap-6">
            {user ? (
              <>
                <Link href="/profile">Profile</Link>
                <button onClick={() => logout()}>Logout</button>{" "}
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
