"use client";

import { useUrlStore } from "@/zustand/store";
import { useState } from "react";
import NormalUrlModal from "./ui/NormalUrlModal";
import HashUrlModal from "./ui/HashUrlModal";
import LinkIcon from "./ui/icons/interface/LinkIcon";
import StarIcon from "./ui/icons/others/StarIcon";
import UrlCard from "./UrlCard";
import useModalUrl from "@/hooks/useModalUrl";

const UrlManager = ({ isAuthenticated }) => {
  const { createShortUrl, urls, deleteUrl, nonAuthUrls } = useUrlStore();

  const {
    isNormalModalOpen,
    openNormalModal,
    closeNormalModal,
    isHashModalOpen,
    openHashModal,
    closeHashModal,
  } = useModalUrl();

  const displayedUrls = isAuthenticated ? urls.flat() : nonAuthUrls.flat();

  return (
    <>
      <div className="my-10 flex justify-center items-center gap-7">
        <button
          onClick={openNormalModal}
          className="bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg"
        >
          <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          <span className="inline-flex align-middle mr-2">
            <LinkIcon />
          </span>
          Acortar URL
        </button>

        <button
          onClick={openHashModal}
          className="bg-violet-950 text-violet-400 border border-violet-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg"
        >
          <span className="bg-violet-500 shadow-violet-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          <span className="inline-flex align-middle mr-2">
            <StarIcon />
          </span>
          URL Personalizada
        </button>
      </div>

      <NormalUrlModal
        isOpen={isNormalModalOpen}
        onRequestClose={closeNormalModal}
        createShortUrl={createShortUrl}
      />

      <HashUrlModal
        isOpen={isHashModalOpen}
        onRequestClose={closeHashModal}
        createShortUrl={createShortUrl}
      />

      {displayedUrls.length > 0 &&
        displayedUrls.map((url) => (
          <UrlCard
            key={url.id}
            id={url.id}
            title={url.title}
            originalUrl={url.originalUrl}
            shortUrl={url.shortUrl}
            countClick={url.countClick}
            createdAt={url.createdAt}
            active={url.active}
            expirationDate={url.expirationDate}
            deleteUrl={deleteUrl}
          />
        ))}
    </>
  );
};

export default UrlManager;
