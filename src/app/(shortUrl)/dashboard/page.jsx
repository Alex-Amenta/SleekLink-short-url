"use client";

import HashUrlModal from "@/components/ui/modals/HashUrlModal";
import Loader from "@/components/ui/loader/Loader";
import NormalUrlModal from "@/components/ui/modals/NormalUrlModal";
import UrlCard from "@/components/UrlCard";
import useExpirationWarning from "@/hooks/useExpirationWarning";
import useFetchUrls from "@/hooks/useFetchUrls";
import useModal from "@/hooks/useModal";
import { useUrlStore, useUserStore } from "@/zustand/store";
import { LinkIcon, PlusCircle } from "lucide-react";
import { useState } from "react";

const DashboardPage = () => {
  const { user } = useUserStore();
  const {
    createShortUrl,
    loading,
    searchTerm,
    setSearchTerm,
    filteredUrls,
    deleteUrl,
  } = useUrlStore();
  const [modalType, setModalType] = useState(null);

  const { isOpen, openModal, closeModal } = useModal();

  const urls = useFetchUrls(user?.id);
  useExpirationWarning(urls);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    openModal();
  };

  const filtered = filteredUrls();

  return (
    <section className="min-h-screen my-16">
      {loading ? (
        <div className="mt-40 flex justify-center items-center">
          <Loader className="text-4xl" />
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap justify-start md:justify-center items-center gap-4">
            <input
              className="flex-1 p-2 border-2 dark:border-white/20 rounded-md"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Url"
            />
            <p className="p-2 border-2 dark:border-white/20 rounded-md bg-white dark:bg-[#131313]">
              <span className="inline-flex align-middle mr-1">
                <LinkIcon size={20} />
              </span>
              {`${urls.length}/15`}
            </p>
            <button
              onClick={() => handleOpenModal("normal")}
              className="p-2 border-2 dark:border-white/20 rounded-md text-white bg-green-500 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900"
            >
              <PlusCircle />
            </button>
            <button
              onClick={() => handleOpenModal("hash")}
              className="p-2 border-2 dark:border-white/20 rounded-md text-white bg-violet-500 hover:bg-violet-700 dark:bg-violet-800 dark:hover:bg-violet-900"
            >
              <PlusCircle />
            </button>
          </div>
          {filtered.length > 0 ? (
            filtered.map((url) => (
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
            ))
          ) : (
            <div className="my-5 flex flex-col justify-center items-center py-20 px-4 rounded-md bg-white dark:bg-[#131313] dark:border-white/20 border  shadow-lg">
              <p className="text-center text-xl font-bold">
                Todavía no tienes URLs...
              </p>
            </div>
          )}
        </div>
      )}

      <NormalUrlModal
        isOpen={isOpen && modalType === "normal"}
        onRequestClose={closeModal}
        createShortUrl={createShortUrl}
      />
      <HashUrlModal
        isOpen={isOpen && modalType === "hash"}
        onRequestClose={closeModal}
        createShortUrl={createShortUrl}
      />
    </section>
  );
};

export default DashboardPage;
