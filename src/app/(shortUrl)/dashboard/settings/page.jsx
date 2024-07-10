"use client";

import DeleteIcon from "@/components/ui/icons/interface/DeleteIcon";
import SaveIcon from "@/components/ui/icons/interface/SaveIcon";
import { useUserStore } from "@/zustand/store";

const SettingsPage = () => {
  const { user } = useUserStore();

  return (
    <section className="min-h-screen mt-[4rem]">
      <div className="flex flex-col justify-center items-start p-4 rounded-md bg-white dark:bg-[#131313] dark:border-white/20 border shadow-lg">
        <h3 className="font-bold text-2xl">Configuración de cuenta</h3>
        <p className="mb-5 text-black/70 dark:text-white/70">Actualizá tu información personal:</p>

        <label className="mb-2" htmlFor="">
          Tu nombre:
        </label>
        <input
          className="mb-5 p-2 rounded-md border w-full md:w-[70%]"
          type="text"
          defaultValue={user?.name}
        />

        <label className="mb-2" htmlFor="">
          Tu email:
        </label>
        <input
          className="p-2 rounded-md border text-black/70 dark:text-white/70 w-full md:w-[70%] bg-black/10 dark:bg-white/10"
          type="email"
          defaultValue={user?.email}
          disabled
        />
        <p className="mt-2 text-sm dark:text-white/70 text-black/70 mb-5">⚠ El correo electrónico no puede ser modificado por seguridad. Contacta soporte si necesitas cambiarlo.</p>

        <button
          className="my-5 border p-2 rounded-md self-end hover:bg-green-900
            bg-green-700 text-white shadow-md transition"
        >
          <span className="inline-flex align-middle mr-1">
            <SaveIcon />
          </span>{" "}
          Guardar
        </button>

        <div className="border-t-2 w-full my-5 flex flex-col justify-center items-center">
          <p className="mt-5 font-semibold">¿Quieres eliminar tu cuenta?</p>
          <button
            className="mt-3 border p-2 rounded-md text-black dark:text-white 
            hover:bg-red-700 hover:text-white shadow-md transition"
          >
            {" "}
            <span className="inline-flex align-middle mr-2">
              <DeleteIcon />
            </span>
            Eliminar cuenta
          </button>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
