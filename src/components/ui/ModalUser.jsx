"use client";

import { useUserStore } from "@/zustand/store";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DashboardIcon from "./icons/DashboardIcon";
import SettingsIcon from "./icons/SettingsIcon";

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
          <p className="font-bold">{userData.name}</p>
        </button>
      )}

      {openModal && userData && (
        <div
          className="px-10 lg:px-48 fixed right-0 top-10 flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md py-4 px-10">
            <div className="flex items-center justify-end py-1 border-b">
              <button
                onClick={handleCloseModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center mb-2"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <h3 className="mt-3 text-xl text-center font-semibold text-gray-900">
              {userData.name} 🖐
            </h3>
            <p className="text-sm text-gray-500 text-center">
              {userData.email}
            </p>
            <div className="my-4 space-y-2">
              <Link
                href="/dashboard"
                className="flex justify-start items-center gap-1 hover:bg-gray-100 transition p-1 rounded"
              >
                <DashboardIcon/>
                Panel de control
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex justify-start items-center gap-1 hover:bg-gray-100 transition p-1 rounded"
              >
                <SettingsIcon />
                Configuración
              </Link>
              <a className="flex justify-start items-center gap-1 hover:bg-gray-100 transition p-1 rounded" href="https://www.linkedin.com/in/alexander-amenta/" target="_blank" rel="noopener noreferrer">
              <img  src="/linkedin.svg" alt="Icono de LinkedIn" />
                Contacto
              </a>
              <button
                onClick={handleSignOut}
                className="w-full flex justify-start items-center gap-1 hover:bg-red-100 transition p-1 rounded"
              >
                <img
                  src="/arrow-rigth.svg"
                  alt="Arrow rigth svg"
                  width={20}
                  height={20}
                />
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalUser;
