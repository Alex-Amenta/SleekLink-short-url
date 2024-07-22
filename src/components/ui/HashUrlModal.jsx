"use client";

import { toast } from "react-toastify";
import CustomHr from "./CustomHr";
import AnimationModal from "./animations/AnimationModal";

const HashUrlModal = ({ isOpen, onRequestClose, createShortUrl }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const title = formData.get("title");
      const originalUrl = formData.get("originalUrl");
      const customDomain = formData.get("customDomain");

      const success = await createShortUrl(title, originalUrl, customDomain);

      if (success) {
        toast.success("URL creada con exito!", {
          position: "top-center",
        });
        onRequestClose();
      }
    } catch (error) {
      console.error("Error al acortar la URL:", error.message);
      toast.error("Error al acortar la URL", {
        position: "top-center",
      });
    }
  };

  return (
    <AnimationModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2 className="text-center font-bold text-2xl">Acortar URL con hash</h2>
      <CustomHr spacing="mb-7 mt-2" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Titulo de la URL:</label>
        <input
          className="mb-5 p-2 border border-l-8 border-black/20 dark:border-white/10 rounded-md max-w-[600px] w-full focus-visible:border-green-400 shadow-lg"
          type="text"
          placeholder="LinkShopify"
          name="title"
          required
        />

        <label htmlFor="">Tu URL:</label>
        <input
          className="mb-5 p-2 border border-l-8 border-black/20 dark:border-white/10 rounded-md max-w-[500px] w-full focus-visible:border-green-400 shadow-lg"
          type="text"
          placeholder="Ejemplo: https://tu-url.com/"
          name="originalUrl"
          required
        />

        <label htmlFor="">Tu alias:</label>
        <input
          className="p-2 border border-l-8  border-black/20 dark:border-white/10 rounded-md max-w-[600px] w-full focus-visible:border-green-400 shadow-lg"
          type="text"
          placeholder="Ingresa tu marca: mi-marca"
          name="customDomain"
          required
        />
        <p className="mt-3 bg-yellow-100 dark:bg-yellow-700/30 text-yellow-500 border border-yellow-600 text-xs rounded-md p-2">
          ⚠ Puedes usar guión ( - ó _ ), letras de a-z sin tilde ni ñ y números.
        </p>

        <div className="mt-10 flex justify-end items-center gap-4">
          <button
            type="submit"
            className=" shadow-lg p-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition"
          >
            Acortar URL
          </button>

          <button
            type="button"
            onClick={onRequestClose}
            className=" shadow-lg p-2 border rounded-md text-black bg-white hover:bg-white/80 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </AnimationModal>
  );
};

export default HashUrlModal;
