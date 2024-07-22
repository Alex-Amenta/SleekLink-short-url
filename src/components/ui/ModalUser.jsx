"use client";

import { useUserStore } from "@/zustand/store";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LinkedinIcon from "./icons/social/LinkedinIcon";
import { LayoutDashboard, SettingsIcon, LogOutIcon, XIcon } from "lucide-react";
import CustomHr from "./CustomHr";
import AnimatedContainer from "./animations/AnimatedContainer";
import AnimatedItems from "./animations/AnimatedItems";

const ModalUser = ({ userData }) => {
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const { logout } = useUserStore();
  const router = useRouter();

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSignOut = async () => {
    if (session) {
      await signOut();
      logout();
    }

    logout();
    router.push("/");
  };

  return (
    <>
      {userData && (
        <button
          onClick={handleToggleModal}
          className="flex justify-center items-center gap-2 hover:scale-105 transition"
          type="button"
        >
          <img
            className="rounded-full w-12 border-2 border-green-600"
            src={userData.image}
            alt={`Imagen de ${userData.name}`}
          />
          <p className="hidden sm:flex font-bold">{userData.name}</p>
        </button>
      )}

      {openModal && userData && (
        <AnimatedContainer
          className="px-10 lg:px-48 fixed top-10 flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <div className="relative bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md py-4 px-10">
            <div className="flex items-center justify-end py-1">
              <button
                onClick={handleCloseModal}
                className="text-gray-400 bg-transparent hover:bg-black/10 dark:hover:bg-white/10 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center mb-2"
              >
                <XIcon size={15} />
              </button>
            </div>
            <CustomHr spacing="mb-3" />
            <h3 className="mt-3 text-xl text-center font-semibold text-gray-900 dark:text-white">
              {userData.name} 🖐
            </h3>
            <p className="text-sm text-gray-500 text-center">
              {userData.email}
            </p>
            <div className="my-4 space-y-2">
              <AnimatedItems>
                <Link
                  href="/dashboard"
                  className="flex justify-start items-center gap-1 hover:bg-gray-100 dark:hover:bg-white/10 transition p-1 rounded-md"
                >
                  <LayoutDashboard size={20} />
                  Panel de control
                </Link>
              </AnimatedItems>
              <AnimatedItems>
                <Link
                  href="/dashboard/settings"
                  className="flex justify-start items-center gap-1 hover:bg-gray-100 dark:hover:bg-white/10 transition p-1 rounded-md"
                >
                  <SettingsIcon size={20} />
                  Configuración
                </Link>
              </AnimatedItems>
              <AnimatedItems>
                <a
                  className="flex justify-start items-center gap-1 hover:bg-gray-100 dark:hover:bg-white/10 transition p-1 rounded-md"
                  href="https://www.linkedin.com/in/alexander-amenta/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinIcon />
                  Contacto
                </a>
              </AnimatedItems>
              <AnimatedItems>
                <button
                  onClick={handleSignOut}
                  className="w-full flex justify-start items-center gap-1 hover:bg-red-100 dark:hover:bg-red-950 transition p-1 rounded-md"
                >
                  <LogOutIcon size={20} />
                  Salir
                </button>
              </AnimatedItems>
            </div>
          </div>
        </AnimatedContainer>
      )}
    </>
  );
};

export default ModalUser;
