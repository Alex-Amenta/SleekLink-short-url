"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center py-3 px-10 lg:px-48">
      <div className="flex justify-center items-center gap-2 font-bold text-green-900">
        <img
          src="/logo-shorturl.png"
          alt="Logo oficial de ShortUrl"
          width={70}
          height={70}
        />
        <p>.FastURLs</p>
      </div>
      <div>
        {session?.user ? (
          <div className="flex justify-center items-center gap-2">
            <img
              src={session.user.image}
              alt={`Imagen de usuario ${session.user.name}`}
              className="rounded-full w-12 shadow-md"
            />
            <p className="font-bold">{session.user.name}</p>
            <button
            onClick={() => signOut()}
            className="bg-red-700 rounded p-1 px-4 text-white text-bold border-2 border-white/50 hover:scale-110 hover:bg-red-900 transition"
          >
            Logout
          </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-green-700 rounded p-1 px-4 text-white text-bold border-2 border-white/50 hover:scale-110 hover:bg-green-900 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
