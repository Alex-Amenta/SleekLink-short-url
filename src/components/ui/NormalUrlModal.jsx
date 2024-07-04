"use client";
import Modal from "react-modal";
import { toast } from "react-toastify";

const NormalUrlModal = ({ isOpen, onRequestClose, createShortUrl }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const title = formData.get("title");
      const originalUrl = formData.get("originalUrl");

      const success = await createShortUrl(title, originalUrl);

      if (success) {
        toast.success("URL creada con éxito!", {
          position: "top-center",
        });
        onRequestClose();
      } else {
        toast.error("Error al acortar la URL", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error interno al acortar la URL:", error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="bg-white dark:bg-black p-6 rounded-lg max-w-lg w-full mx-auto my-52 shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
    >
      <h2 className="text-center font-bold text-2xl mb-4 pb-3 border-b-2">
        Acortar URL
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="mt-4 font-semibold" htmlFor="">
          Titulo de la URL:
        </label>
        <input
          className="mb-4 p-2 border border-l-8 border-white/10 rounded-md max-w-[600px] w-full focus-visible:border-green-400 shadow-lg"
          type="text"
          placeholder="LinkShopify"
          name="title"
          required
        />

        <label className="mt-4 font-semibold" htmlFor="">
          Tu URL:
        </label>
        <input
          className="p-2 border border-l-8 border-white/10 rounded-md max-w-[600px] w-full focus-visible:border-green-400 shadow-lg"
          type="text"
          placeholder="Ejemplo: https://tu-url.com/"
          name="originalUrl"
          required
        />

        <div className="mt-6 flex justify-end items-center gap-4">
          <button
            type="submit"
            className=" shadow-lg p-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition"
          >
            Acortar URL
          </button>

          <button
            type="button"
            onClick={onRequestClose}
            className="shadow-lg p-2 border rounded-md text-black bg-white hover:bg-white/80 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NormalUrlModal;
