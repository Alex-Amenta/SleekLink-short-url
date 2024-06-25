"use client";

import AddCircle from "@/components/ui/icons/AddCircle";
import LinkIcon from "@/components/ui/icons/LinkIcon";
import Loader from "@/components/ui/loader/Loader";
import NormalUrlModal from "@/components/ui/NormalUrlModal";
import UrlManager from "@/components/UrlManager";
import { useUrlStore, useUserStore } from "@/zustand/store";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { fetchUrlsByUserId, urls, createShortUrl, loading } = useUrlStore();
  const { user } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUrlsByUserId(user?.id);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [fetchUrlsByUserId, user?.id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="min-h-screen px-10 lg:px-48 mt-[4rem]">
      {loading && <Loader />}
      {!loading && (
        <div>
          <div className="flex justify-center items-center gap-4">
            <input
              className="flex-1 p-2 border-2 rounded-md"
              type="search"
              name=""
              id=""
              placeholder="Search Url"
            />
            <p className="p-2 border-2 rounded-md bg-white">
              <span className="inline-flex align-middle mr-1">
                <LinkIcon className={"rotate-[-50deg] text-black/70"} />
              </span>
              {`${urls.length}/15`}
            </p>
            <button
              onClick={openModal}
              className="p-2 border-2 rounded-md bg-white hover:bg-white/70"
            >
              <AddCircle />
            </button>
          </div>
          {urls.length > 0 ? (
            <UrlManager showButtons={false} />
          ) : (
            <div className="my-5 flex flex-col justify-center items-center py-20 px-4 rounded-md bg-white border border-black/50 shadow-lg">
              <p className="text-center text-xl font-bold">
                Todavía no tienes Urls...
              </p>
            </div>
          )}
        </div>
      )}

      <NormalUrlModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        createShortUrl={createShortUrl} // Pasa la función para crear URL
      />
    </section>
  );
};

export default DashboardPage;
