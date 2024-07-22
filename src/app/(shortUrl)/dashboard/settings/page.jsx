"use client";

import ConfirmModal from "@/components/ui/modals/ConfirmModal";
import CustomHr from "@/components/ui/CustomHr";
import useModal from "@/hooks/useModal";
import { useUserStore } from "@/zustand/store";
import { motion } from "framer-motion";
import { Trash2Icon, SaveIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const { user, deleteAccount, updateUser } = useUserStore();
  const { status } = useSession();
  const { isOpen, closeModal, openModal } = useModal();
  const [isChangedPassword, setIsChangedPassword] = useState(false);
  const router = useRouter();

  const handleDeleteUser = async () => {
    try {
      const success = await deleteAccount(user?.id);
      if (success) {
        toast.success("Usuario eliminado con exito!", {
          position: "top-center",
        });
        closeModal();
        router.push("/");
      } else {
        toast.error("Error al eliminar el usuario", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error interno al eliminar usuario:", error.message);
    }
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const password = formData.get("password");
    const confirmedPassword = formData.get("confirmedPassword");

    const originalName = user?.name;
    const isNameChanged = name !== originalName;

    if (password && password !== confirmedPassword) {
      toast.error("Password is not equal to confirmed", {
        position: "top-center",
      });
      return;
    }

    if (!isNameChanged && !password) {
      toast.error("No se han realizado cambios.", {
        position: "top-center",
      });
      return;
    }

    try {
      const success = await updateUser(user?.id, name, password);

      if (success) {
        toast.success("Usuario actualizado con exito!", {
          position: "top-center",
        });
        event.target.reset();
        setIsChangedPassword(false);
      } else {
        toast.error("Error al actualizar el usuario", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error interno al actualizar el usuario:", error.message);
    }
  };

  return (
    <section className="min-h-screen mt-[4rem]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col justify-center items-start p-4 rounded-md bg-white dark:bg-[#131313] dark:border-white/20 border shadow-lg"
      >
        <h3 className="font-bold text-2xl">Configuración de cuenta</h3>
        <p className="mb-5 text-black/70 dark:text-white/70">
          Actualizá tu información personal:
        </p>

        <form
          onSubmit={handleUpdateUser}
          className="flex flex-col justify-center items-start w-full"
        >
          <label className="mb-2" htmlFor="">
            Tu nombre:
          </label>
          <input
            className="mb-5 p-2 rounded-md border w-full md:w-[70%]"
            type="text"
            defaultValue={user?.name}
            name="name"
            required
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
          <p className="mt-2 text-sm dark:text-white/70 text-black/70 mb-5">
            ⚠ El correo electrónico no puede ser modificado por seguridad.
            Contacta soporte si necesitas cambiarlo.
          </p>
          {status === "unauthenticated" && (
            <>
              <CustomHr />
              <label className="mb-5">
                Cambiar contraseña:
                <input
                  className="ml-2 scale-125 rounded-md border"
                  type="checkbox"
                  checked={isChangedPassword}
                  onChange={(e) => setIsChangedPassword(e.target.checked)}
                />
              </label>
            </>
          )}

          {isChangedPassword && (
            <>
              <label className="mb-2" htmlFor="">
                Nueva contraseña:
              </label>
              <input
                className="mb-5 p-2 rounded-md border w-full md:w-[70%]"
                type="password"
                name="password"
                placeholder="*****************"
                required
              />
              <label className="mb-2" htmlFor="">
                Confirma contraseña:
              </label>
              <input
                className="mb-5 p-2 rounded-md border w-full md:w-[70%]"
                type="password"
                name="confirmedPassword"
                placeholder="*****************"
              />
            </>
          )}

          <button
            type="submit"
            className="my-5 border p-2 rounded-md self-end hover:bg-green-900
            bg-green-700 text-white shadow-md transition"
          >
            <span className="inline-flex align-middle mr-1">
              <SaveIcon />
            </span>{" "}
            Guardar
          </button>
        </form>

        <CustomHr />
        <div className="w-full mb-5 flex flex-col justify-center items-center">
          <p className="mt-5">¿Quieres eliminar tu cuenta?</p>
          <button
            type="button"
            onClick={openModal}
            className="mt-3 border p-2 rounded-md text-black dark:text-white 
            hover:bg-red-700 hover:text-white shadow-md transition"
          >
            <span className="inline-flex align-middle mr-2">
              <Trash2Icon />
            </span>
            Eliminar cuenta
          </button>

          {isOpen && (
            <ConfirmModal
              isOpen={isOpen}
              message="⚠ Si eliminas tu cuenta, se borrarán todas tus URLs creadas. ¿Estás seguro de que quieres eliminar tu cuenta?"
              onConfirm={handleDeleteUser}
              onCancel={closeModal}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default SettingsPage;
