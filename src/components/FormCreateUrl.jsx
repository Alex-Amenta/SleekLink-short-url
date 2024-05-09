"use client";

import { createShortUrl } from "@/helpers/actions";
import { toast } from "react-toastify";

const FormCreateUrl = () => {
  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("jwt");
      console.log(token);
      await createShortUrl(formData, token);
      toast.success("Url invalida!, ingresa otra porfavor", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error al acortar la URL:", error.message);
      toast.error("Error al acortar la URL", {
        position: "top-center",
      });
    }
  };

  return (
    <form
      action={handleSubmit}
      className="mt-10 flex justify-start items-center gap-4 flex-wrap"
    >
      <input
        className="p-2 border border-l-8 bg-white border-black rounded max-w-[600px] w-full focus-visible:border-green-400 shadow-lg"
        type="text"
        placeholder="Ejemplo: https://tu-url.com/"
        name="originalUrl"
        required
      />

      <button
        type="submit"
        className="bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg"
      >
        <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
        Acortar URL
      </button>
    </form>
  );
};

export default FormCreateUrl;
