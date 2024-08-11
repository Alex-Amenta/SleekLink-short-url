"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signupUser } from "@/actions/user";
import { toast } from "react-toastify";
import useLoading from "@/hooks/useLoading";
import Loader from "@/components/ui/loader/Loader";
import { useActionState } from "react";

const RegisterPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


  // const { loading, startLoading, stopLoading } = useLoading();

  // const router = useRouter();

  // const onSubmit = handleSubmit(async (data) => {
  //   startLoading();
  //   const res = await signupUser(data);

  //   if (res.success) {
  //     toast.success("Usuario creado exitosamente");
  //     router.push("/auth/login");
  //     router.refresh();
  //   } else {
  //     toast.error(res.message);
  //   }

  //   stopLoading();
  // });

  return (
    <form
      action={signupUser}
      className="min-h-screen mt-[-4rem] flex justify-center items-center"
    >
      <section className="py-10 bg-white dark:bg-black/50 rounded-md shadow-xl w-full sm:w-[30rem] flex flex-col justify-center items-center">
        <h2 className="mb-3 text-center font-bold text-3xl">Registrarse</h2>
        <p className="text-black/60 dark:text-white/60 text-center text-sm text-pretty w-[60%]">
          Registrate, para tener todos tus enlaces controlados!.
        </p>

        <div className="mt-5 flex flex-col justify-start items-stretch w-[70%]">
          <label htmlFor="">Image</label>
          <input
            
            className="p-2 rounded-md border"
            type="text"
            name="image"
            placeholder="https://url-de-imagen"
          />
          {errors.image && (
            <p className="mt-2 text-sm text-red-500">{errors.image.message}</p>
          )}

          <label className="mt-5" htmlFor="">
            Nombre
          </label>
          <input
            className="p-2 rounded-md border"
            type="text"
            name="name"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
          )}

          <label className="mt-5" htmlFor="">
            Email
          </label>
          <input

            name="email"
            className="p-2 rounded-md border"
            type="email"
            placeholder="tuemail@gmail.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}

          <label className="mt-5" htmlFor="">
            Contraseña
          </label>
          <input
          
            name="password"
            className="p-2 rounded-md border"
            type="password"
            placeholder="******"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="mt-10 bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg"
          >
            <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            registrarse
          </button>

          <p className="mt-5 text-black/50 dark:text-white/50 text-sm text-center">
            Ya tienes una cuenta?{" "}
            <Link
              className="text-green-500 hover:underline underline-offset-2 animation"
              href="/auth/login"
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
