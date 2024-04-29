"use client";

import { signIn, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <nav className="flex justify-between items-center py-3 px-10 lg:px-48">
      <div>
        <img
          src="/logo-shorturl.png"
          alt="Logo oficial de ShortUrl"
          width={40}
          height={40}
          className="rounded-full "
        />
      </div>
      <div>
        {session?.user ? (
          <div>
            <img
              src={session.user.image}
              alt={`Imagen de usuario ${session.user.name}`}
            />
            <p>{session.user.name}</p>
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
