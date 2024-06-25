"use client";

import Modal from "react-modal";
import { toast } from "react-toastify";

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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="bg-white p-6 rounded-lg max-w-lg w-full mx-auto my-52 shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
    >
      <h2 className="text-center font-bold text-2xl mb-4 pb-3 border-b-2">
        Acortar URL con hash
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="font-semibold" htmlFor="">
          Titulo de la URL:
        </label>
        <input
          className="mb-5 p-2 border border-l-8 bg-white border-black rounded-md max-w-[600px] w-full focus-visible:border-green-400 shadow-lg"
          type="text"
          placeholder="LinkShopify"
          name="title"
          required
        />

        <label className="font-semibold" htmlFor="">
          Tu URL:
        </label>
        <input
          className="mb-5 p-2 border border-l-8 bg-white border-black rounded-md max-w-[500px] w-full focus-visible:border-green-400 shadow-lg"
          type="text"
          placeholder="Ejemplo: https://tu-url.com/"
          name="originalUrl"
          required
        />

        <label className="font-semibold" htmlFor="">
          Tu alias:
        </label>
        <input
          className="p-2 border border-l-8 bg-white border-black rounded-md max-w-[600px] w-full focus-visible:border-green-400 shadow-lg"
          type="text"
          placeholder="Ingresa tu marca: mi-marca"
          name="customDomain"
          required
        />
        <p className="mt-3 bg-yellow-50 text-yellow-600 border border-yellow-600 text-xs rounded-md p-2">
          ⚠ Puedes usar guión ( - ó _ ), letras de a-z sin tilde ni ñ y números.
        </p>

        <div className="mt-6 flex justify-end items-center gap-4">
          <button
            type="submit"
            className=" shadow-lg p-2 border rounded-md bg-green-500 text-white hover:bg-green-700 transition"
          >
            Acortar URL
          </button>

          <button
            onClick={onRequestClose}
            className=" shadow-lg p-2 border rounded-md bg-white hover:border-black transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default HashUrlModal;
