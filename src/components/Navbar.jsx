"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalUser from "./ui/ModalUser";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const userObj = JSON.parse(userData);
        setUser(userObj);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <nav className="flex justify-between items-center py-3 px-10 lg:px-48">
      <Link href="/">
        <div className="">
          <img
            src="/logo-shorturl.webp"
            alt="Logo oficial de ShortUrl"
            width={150}
            height={150}
          />
        </div>
      </Link>
      <div>
        {user ? (
          <ModalUser userData={user} />
        ) : (
          <Link
            href="/login"
            className="p-2 px-6 bg-green-500 text-white hover:shadow-md hover:border border-green-600 hover:shadow-green-500 rounded transition"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
