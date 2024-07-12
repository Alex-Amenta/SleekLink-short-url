"use client";

import { useTheme } from "next-themes";
import StarIcon from "./ui/icons/others/StarIcon";
import useModalUrl from "@/hooks/useModalUrl";
import HashUrlModal from "./ui/HashUrlModal";
import { useUrlStore } from "@/zustand/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Arrow19 from "./ui/icons/navigation/ArrowDraw";

const CustomizeUrl = () => {
  const { createShortUrl } = useUrlStore();
  const { isHashModalOpen, openHashModal, closeHashModal } = useModalUrl();
  const { data: session } = useSession();
  const { theme } = useTheme();
  const router = useRouter();

  const fromColor = theme === "ligth" ? "from-black/90" : "from-white/70";

  const handleCustomUrlClick = () => {
    if (session) {
      openHashModal();
    } else {
      router.push("/login");
      toast.info("Debes iniciar sesion para usar esta funcionalidad...");
    }
  };

  return (
    <>
      <div className="text-center">
        <h2
          className={`text-5xl text-center text-pretty font-bold my-28 mb-6 bg-gradient-to-r ${fromColor} to-green-600 inline-block text-transparent bg-clip-text`}
        >
          Personaliza tus Enlaces
        </h2>
        <p className="text-center text-black/65 dark:text-white/65 mb-10">
          En nuestra aplicación, tienes la libertad de personalizar tus enlaces
          acortados. ¿Cómo? Es sencillo: simplemente ingresa la URL original y
          elige una palabra clave relevante o un nombre fácil de recordar para
          tu enlace. Así, podrás crear enlaces más significativos y adaptados a
          tus necesidades. ¡Haz que tus enlaces sean únicos y memorables! 🚀
        </p>

        <div className="flex justify-center items-center gap-5">
          <div>
          <Arrow19 />
          </div>
          <button
            onClick={handleCustomUrlClick}
            className="bg-violet-950 text-violet-400 border border-violet-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg"
          >
            <span className="bg-violet-500 shadow-violet-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            <span className="inline-flex align-middle mr-1">
              <StarIcon />
            </span>
            URL Personalizada
          </button>
        </div>
      </div>

      <HashUrlModal
        isOpen={isHashModalOpen}
        onRequestClose={closeHashModal}
        createShortUrl={createShortUrl}
      />
    </>
  );
};

export default CustomizeUrl;
