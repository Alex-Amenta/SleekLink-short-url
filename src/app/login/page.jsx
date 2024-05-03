"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <form className="min-h-screen px-10 lg:px-48 mt-[-4rem] flex justify-center items-center">
      <section className="py-10 bg-white rounded shadow-xl w-full md:w-[50%] flex flex-col justify-center items-center">
          <h2 className="mb-3 text-center font-bold text-3xl">
            Iniciar Sesión
          </h2>
          <p className="text-black/60 text-center text-sm text-prettyp w-[60%]">
          ¡Bienvenido de vuelta! Por favor, inicia sesión para continuar.
          </p>

        <div className="mt-5 flex flex-col justify-start items-stretch w-[70%]">
          <label htmlFor="">Email</label>
          <input
            className="mb-5 p-2 rounded border"
            type="email"
            placeholder="tuemail@gmail.com"
          />
          <label htmlFor="">Password</label>
          <input
            className="p-2 rounded border"
            type="password"
            placeholder="******"
          />

          <button
            type="submit"
            className="mt-10 bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg"
          >
            <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Iniciar Sesión
          </button>
          <p className="mt-5 text-black/50 text-sm">
            Todavia no tenes una cuenta?{" "}
            <Link
              className="text-green-500 hover:underline underline-offset-2 animation"
              href="/signup"
            >
              Registrate
            </Link>
          </p>

          <button onClick={() => signIn()} className="mt-5 p-2 flex justify-center items-center gap-3 bg-white shadow-md border rounded">
            <Image
              src="/google.svg"
              alt="Icono de google"
              width={20}
              height={20}
            />
            Iniciar Sesión con Google
          </button>
        </div>
      </section>
    </form>
  );
};

export default LoginPage;
