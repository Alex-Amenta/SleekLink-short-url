"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalUser from "./ui/ModalUser";
import { useUserStore } from "@/zustand/store";
import ThemeSwitcher from "./ThemeSwitcher";
import GithubIcon from "./ui/icons/social/GithubIcon";
import LinkedinIcon from "./ui/icons/social/LinkedinIcon";

const Navbar = () => {
  const { user, setUser } = useUserStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <nav className="navbar_blur sticky top-0 z-10 mb-5 px-10 lg:px-48">
      <div className="flex justify-between items-center py-3">
        <Link href="/">
          <div className="flex items-center gap-2">
            <img
              src="/logo-sleeklink.png"
              alt="Logo oficial de SleekLink"
              width={70}
              height={70}
            />
            <p className="hidden text-2xl lg:flex font-semibold">SleekLink</p>
          </div>
        </Link>
        <div className="flex justify-center items-center gap-2">
          <a
            href="https://www.linkedin.com/in/alexander-amenta/"
            target="_blank"
            rel="noopener noreferrer "
            className="hover:bg-black/10 dark:hover:bg-white/10 transition p-2 rounded-md group"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://github.com/Alex-Amenta"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-black/10 dark:hover:bg-white/10 transition p-2 rounded-md group"
          >
            <GithubIcon />
          </a>

          <ThemeSwitcher />

          {user ? (
            <ModalUser userData={user} />
          ) : (
            <Link
              href="/login"
              className="p-2 px-3
            bg-green-700 text-white shadow-md 
            border border-green-600 hover:bg-green-900 rounded-md transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
