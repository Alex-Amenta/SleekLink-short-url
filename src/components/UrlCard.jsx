"use client";

import TrendingIcon from "./ui/icons/TrendingIcon";
import DeleteIcon from "./ui/icons/DeleteIcon";
import CopyButton from "./ui/icons/CopyButton";
import { formatDate } from "@/helpers/formatDate";
import { useState } from "react";
import ConfirmModal from "./ui/ConfirmModal";
import PulseLoader from "./ui/loader/PulseLoader";

const UrlCard = ({ urlData, deleteUrl }) => {
  const [isConfirm, setIsConfirm] = useState(false);

  const handleDeleteUrl = async () => {
    const result = await deleteUrl(urlData.id);

    if (result.success) {
      alert(result.message); // Mostrar mensaje de éxito
    } else {
      alert(result.error); // Mostrar mensaje de error en caso de fallo
    }

    setIsConfirm(false);
  };

  return (
    <div className="mt-10 mx-auto border border-black rounded-md p-3 bg-white shadow-lg w-full lg:w-[80%]">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">
          <PulseLoader isActive={urlData.active} />
          {urlData.title}
        </p>
        <div className="flex justify-center items-center gap-1">
          <p className="flex justify-center items-center gap-2 mr-2 pr-3 border-r-2 border-black/40">
            <TrendingIcon /> {urlData.countClick} clicks
          </p>
          <button className="p-1 rounded-md hover:bg-black/10 group">
            <CopyButton />
          </button>
          <button className="p-1 rounded-md hover:bg-red-100 group" onClick={() => setIsConfirm(true)}>
            <DeleteIcon />
          </button>

          {isConfirm && (
            <ConfirmModal
              isOpen={isConfirm}
              message={`¿Estás seguro de eliminar la URL '${urlData.title}'?`}
              onConfirm={handleDeleteUrl}
              onCancel={() => setIsConfirm(false)}
            />
          )}
        </div>
      </div>
      <p className="my-3 text-wrap max-w-72">
        <span className="mr-2 text-black">ShortUrl:</span>
        <span className="text-green-900 hover:underline">
          {urlData.shortUrl}
        </span>
      </p>
      <p>Original Url:</p>
      <p className="mb-3 text-wrap max-w-full text-black/50">
        {urlData.originalUrl}
      </p>
      <p className="text-sm text-end">{formatDate(urlData.createdAt)}</p>
    </div>
  );
};

export default UrlCard;
