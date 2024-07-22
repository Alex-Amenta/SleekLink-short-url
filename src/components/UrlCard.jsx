"use client";

import { calculateDaysReamiming, formatDate } from "@/helpers/formatDate";
import ConfirmModal from "./ui/modals/ConfirmModal";
import PulseLoader from "./ui/loader/PulseLoader";
import Link from "next/link";
import CardPulseBorder from "./ui/CardPulseBorder";
import CopyText from "./ui/CopyText";
import useModal from "@/hooks/useModal";
import { AlarmClockIcon, Trash2Icon, TrendingUpIcon } from "lucide-react";

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
  const { isOpen, closeModal, openModal } = useModal();

  const handleDeleteUrl = async () => {
    const result = await deleteUrl(id);

    if (result.success) {
      alert(result.message); // Mostrar mensaje de éxito
    } else {
      alert(result.error); // Mostrar mensaje de error en caso de fallo
    }

    closeModal();
  };

  return (
    <CardPulseBorder>
      <div className="flex justify-between items-center">
        <Link href={`/dashboard/${id}`}>
          <div className="flex items-center gap-1">
            <PulseLoader isActive={active} />
            <p className="font-bold text-lg hover:underline underline-offset-2">
              {title}
            </p>
          </div>
        </Link>
        <div className="flex justify-center items-center gap-1">
          <p className="max-sm:hidden flex justify-center items-center gap-2 mr-2 pr-3 border-r-2 border-black/40 dark:border-white/40">
            <TrendingUpIcon /> {countClick} clicks
          </p>
          <CopyText text={shortUrl} />
          <button
            className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-950  group"
            onClick={openModal}
          >
            <Trash2Icon />
          </button>

          {isOpen && (
            <ConfirmModal
              isOpen={isOpen}
              message={`¿Estás seguro de eliminar la URL '${title}'?`}
              onConfirm={handleDeleteUrl}
              onCancel={closeModal}
            />
          )}
        </div>
      </div>
      <p className="my-3 text-wrap md:max-w-72">
        <span className="mr-2 text-black dark:text-white">ShortUrl:</span>
        <a
          href={originalUrl}
          rel="noopener noreferrer"
          target="_blank"
          className="text-green-900 dark:text-green-500 hover:underline max-sm:break-words"
        >
          {shortUrl}
        </a>
      </p>
      <p>Original Url:</p>
      <p className="mb-3 max-w-full text-black/50 dark:text-white/50 break-words">
        {originalUrl.slice(0, 60)}...
      </p>
      <p className="mb-3 p-1 w-fit bg-red-200 dark:bg-red-950 text-red-500 text-sm rounded-full">
        <span className="inline-flex align-middle mr-1">
          <AlarmClockIcon size={20} />
        </span>
        {calculateDaysReamiming(expirationDate)} days
      </p>
      <p className="text-sm text-end text-black/70 dark:text-white/70">
        {formatDate(createdAt)}
      </p>
    </CardPulseBorder>
  );
};

export default UrlCard;
