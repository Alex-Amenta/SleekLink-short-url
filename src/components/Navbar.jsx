"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalUser from "./ui/ModalUser";
import { useUserStore } from "@/zustand/store";

const Navbar = () => {
  const { user, setUser } = useUserStore();
  const { data: session } = useSession();

  console.log(user);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <nav className="navbar_blur sticky top-0 z-10 mb-5">
      <div className="flex justify-between items-center py-3">
        <Link href="/">
          <div className="">
            <img
              src="/logo-sleeklink.png"
              alt="Logo oficial de SleekLink"
              width={70}
              height={70}
            />
          </div>
        </Link>
        <div className="flex justify-center items-center gap-2">
        <a
          href="https://www.linkedin.com/in/alexander-amenta/"
          target="_blank"
          rel="noopener noreferrer "
          className="hover:bg-black/10 transition p-2 rounded-md"
        >
          <img src="/linkedin.svg" width={25} height={25} alt="Icono de LinkedIn" />
        </a>
        <a
          href="https://github.com/Alex-Amenta"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-black/10 transition p-2 rounded-md"
        >
          <img src="/github.svg" width={25} height={25} alt="Icono de Github" />
        </a>
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
