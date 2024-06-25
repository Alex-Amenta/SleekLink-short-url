"use client";
import { useUserStore } from "@/zustand/store";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { error, login, user } = useUserStore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const success = await login(email, password);

    if (success) {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen px-10 lg:px-48 mt-[-4rem] flex justify-center items-center"
    >
      <section className="py-10 bg-white rounded-md shadow-xl w-full md:w-[50%] flex flex-col justify-center items-center">
        <h2 className="mb-3 text-center font-bold text-3xl">Iniciar Sesión</h2>
        <p className="text-black/60 text-center text-sm text-prettyp w-[60%]">
          ¡Bienvenido de vuelta! Por favor, inicia sesión para continuar.
        </p>

        <div className="mt-5 flex flex-col justify-start items-stretch w-[70%]">
          <button
            onClick={() => signIn()}
            className="mt-2 mb-10 p-2 flex justify-center items-center gap-3 bg-white shadow-md border border-slate-300 rounded-md hover:border hover:border-slate-500 transition"
          >
            <Image
              src="/google.svg"
              alt="Icono de google"
              width={20}
              height={20}
            />
            Iniciar Sesión con Google
          </button>

          <label htmlFor="">Email</label>
          <input
            className="mb-5 p-2 rounded-md border"
            type="email"
            placeholder="tuemail@gmail.com"
            name="email"
          />
          <label htmlFor="">Password</label>
          <input
            className="p-2 rounded-md border"
            type="password"
            placeholder="******"
            name="password"
          />

          {error && <p className="mt-4 text-red-700 text-sm text-center italic">{error}</p>}

          <button
            type="submit"
            className="mt-10 bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg"
          >
            <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Iniciar Sesión
          </button>
          <p className="mt-5 text-black/50 text-sm text-center">
            Todavia no tenes una cuenta?{" "}
            <Link
              className="text-green-500 hover:underline underline-offset-2 animation"
              href="/signup"
            >
              Registrate
            </Link>
          </p>
        </div>
      </section>
    </form>
  );
};

export default LoginPage;
