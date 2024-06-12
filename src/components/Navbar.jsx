"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalUser from "./ui/ModalUser";
import { useUserStore } from "@/zustand/store";

const Navbar = () => {
  const { user, setUser } = useUserStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <nav className="navbar_blur sticky top-0 z-10">
      <div className="flex justify-between items-center py-3 px-10 lg:px-48">
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
        <div>
          {user ? (
            <ModalUser userData={user} />
          ) : (
            <Link
              href="/login"
              className="p-2 px-6 text-black 
            hover:bg-green-700 hover:text-white shadow-md 
            border border-green-600 rounded transition"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
