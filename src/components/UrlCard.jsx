"use client";

import TrendingIcon from "./ui/icons/others/TrendingIcon";
import DeleteIcon from "./ui/icons/interface/DeleteIcon";
import CopyButton from "./ui/icons/interface/CopyButton";
import { calculateDaysReamiming, formatDate } from "@/helpers/formatDate";
import { useState } from "react";
import ConfirmModal from "./ui/ConfirmModal";
import PulseLoader from "./ui/loader/PulseLoader";
import Link from "next/link";
import TimeIcon from "./ui/icons/others/TimeIcon";
import CardPulseBorder from "./ui/CardPulseBorder";

const UrlCard = ({
  id,
  title,
  originalUrl,
  shortUrl,
  countClick,
  createdAt,
  active,
  expirationDate,
  deleteUrl,
}) => {
  const [isConfirm, setIsConfirm] = useState(false);

  const handleDeleteUrl = async () => {
    const result = await deleteUrl(id);

    if (result.success) {
      alert(result.message); // Mostrar mensaje de éxito
    } else {
      alert(result.error); // Mostrar mensaje de error en caso de fallo
    }

    setIsConfirm(false);
  };

  return (
    <CardPulseBorder>
      <div className="flex justify-between items-center">
        <Link href={`/dashboard/${id}`}>
          <p className="font-bold text-lg hover:underline underline-offset-2">
            <PulseLoader isActive={active} />
            {title}
          </p>
        </Link>
        <div className="flex justify-center items-center gap-1">
          <p className="flex justify-center items-center gap-2 mr-2 pr-3 border-r-2 border-black/40 dark:border-white/40">
            <TrendingIcon /> {countClick} clicks
          </p>
          <button className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10">
            <CopyButton />
          </button>
          <button
            className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-950  group"
            onClick={() => setIsConfirm(true)}
          >
            <DeleteIcon />
          </button>

          {isConfirm && (
            <ConfirmModal
              isOpen={isConfirm}
              message={`¿Estás seguro de eliminar la URL '${title}'?`}
              onConfirm={handleDeleteUrl}
              onCancel={() => setIsConfirm(false)}
            />
          )}
        </div>
      </div>
      <p className="my-3 text-wrap max-w-72">
        <span className="mr-2 text-black dark:text-white">ShortUrl:</span>
        <a
          href={originalUrl}
          rel="noopener noreferrer"
          target="_blank"
          className="text-green-900 dark:text-green-500 hover:underline"
        >
          {shortUrl}
        </a>
      </p>
      <p>Original Url:</p>
      <p className="mb-3 text-wrap max-w-full text-black/50 dark:text-white/50">
        {originalUrl}
      </p>
      <p className="mb-3 p-1 w-fit bg-red-200 dark:bg-red-950 text-red-500 text-sm rounded-full">
        <span className="inline-flex align-middle mr-1">
          <TimeIcon />
        </span>
        {calculateDaysReamiming(expirationDate)} days
      </p>
      <p className="text-sm text-end text-black/70 dark:text-white/70">{formatDate(createdAt)}</p>
    </CardPulseBorder>
  );
};

export default UrlCard;
