"use client";

import HashUrlModal from "./ui/modals/HashUrlModal";
import { useUrlStore, useUserStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Arrow19 from "./ui/icons/navigation/ArrowDraw";
import useModal from "@/hooks/useModal";
import { SparklesIcon } from "lucide-react";
import AnimatedItems from "./ui/animations/AnimatedItems";
import AnimatedContainer from "./ui/animations/AnimatedContainer";

const customTransition = {
  when: "beforeChildren",
  staggerChildren: 0.2,
  duration: 0.3,
  delay: 0.4,
};

const CustomizeUrl = () => {
  const { createShortUrl } = useUrlStore();
  const { user } = useUserStore();
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  const handleCustomUrlClick = () => {
    if (user) {
      openModal();
    } else {
      router.push("/login");
      toast.info("Debes iniciar sesion para usar esta funcionalidad...");
    }
  };

  return (
    <AnimatedContainer transition={customTransition}>
      <div className="my-32">
        <AnimatedItems>
          <h2 className="text-5xl text-start md:text-center text-pretty font-bold my-28 mb-6">
            Personaliza tus Enlaces
          </h2>
        </AnimatedItems>
        <AnimatedItems>
          <p className="hidden sm:block text-center text-black/65 dark:text-white/65 mb-10">
            En nuestra aplicación, tienes la libertad de personalizar tus
            enlaces acortados. ¿Cómo? Es sencillo: simplemente ingresa la URL
            original y elige una palabra clave relevante o un nombre fácil de
            recordar para tu enlace. Así, podrás crear enlaces más
            significativos y adaptados a tus necesidades. ¡Haz que tus enlaces
            sean únicos y memorables! 🚀
          </p>
          <p className="sm:hidden text-start text-black/65 dark:text-white/65 mb-10">
            Personaliza tus enlaces acortados fácilmente: ingresa la URL
            original y elige una palabra clave o nombre sencillo. ¡Haz que tus
            enlaces sean únicos y memorables!
          </p>
        </AnimatedItems>

        <AnimatedItems>
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
                <SparklesIcon />
              </span>
              URL Personalizada
            </button>
          </div>
        </AnimatedItems>
      </div>

      <HashUrlModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        createShortUrl={createShortUrl}
      />
    </AnimatedContainer>
  );
};

export default CustomizeUrl;
