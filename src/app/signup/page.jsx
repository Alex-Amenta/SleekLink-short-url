"use client";

import { useUserStore } from "@/zustand/store";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validations } from "./validations";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const { signup } = useUserStore();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password } = userData;

    if (!name || !email || !password) {
      setError({
        emptyData: "Por favor completa todos los campos!",
      });
    } else {
      const success = await signup(name, email, password);

      if (success) {
        alert("Te registrate con exito, inicia sesión.");
        router.push("/login");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Realizar la validación solo para el campo modificado
    const fieldError = validations({ ...userData, [name]: value })[name];

    // Actualizar el estado de error solo para el campo modificado
    setError((prevError) => ({
      ...prevError,
      [name]: fieldError,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen px-5 lg:px-48 mt-[-4rem] flex justify-center items-center"
    >
      <section className="py-10 bg-white border rounded-md shadow-xl w-full md:w-[50%] flex flex-col justify-center items-center">
        <h2 className="mb-3 text-center font-bold text-3xl">Registrarse</h2>
        <p className="text-black/60 text-center text-sm text-prettyp w-[60%]">
          Registrate, para tener todos tus enlaces controlados!.
        </p>

        <div className="mt-5 flex flex-col justify-start items-stretch gap-3 w-[70%]">
          <label htmlFor="">Nombre</label>
          <input
            className="p-2 rounded-md border"
            type="text"
            placeholder="John Doe"
            name="name"
            onChange={handleChange}
          />
          {error.name && <p className=" italic text-red-700">{error.name}</p>}

          <label htmlFor="">Email</label>
          <input
            className="p-2 rounded-md border"
            type="email"
            placeholder="tuemail@gmail.com"
            name="email"
            onChange={handleChange}
          />
          {error.email && <p className="italic text-red-700">{error.email}</p>}

          <label htmlFor="">Contraseña</label>
          <input
            className="p-2 rounded-md border"
            type="password"
            placeholder="******"
            name="password"
            onChange={handleChange}
          />
          {error.password && (
            <p className="italic text-red-700">{error.password}</p>
          )}

          <button
            type="submit"
            className="mt-5 bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg"
          >
            <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Registrarse
          </button>
          {error.emptyData && (
            <p className="italic text-red-700">{error.emptyData}</p>
          )}
          <p className="mt-5 text-center text-black/50 text-sm">
            Ya tienes una cuenta?{" "}
            <Link
              className="text-green-500 hover:underline underline-offset-2 animation"
              href="/login"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </section>
    </form>
  );
};

export default RegisterPage;
