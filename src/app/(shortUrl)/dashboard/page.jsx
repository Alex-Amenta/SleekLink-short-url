"use client";

import AddCircle from "@/components/ui/icons/AddCircle";
import LinkIcon from "@/components/ui/icons/LinkIcon";
import Loader from "@/components/ui/loader/Loader";
import NormalUrlModal from "@/components/ui/NormalUrlModal";
import UrlManager from "@/components/UrlManager";
import useExpirationWarning from "@/hooks/useExpirationWarning";
import useFetchUrls from "@/hooks/useFetchUrls";
import useModalUrl from "@/hooks/useModalUrl";
import { useUrlStore, useUserStore } from "@/zustand/store";

const DashboardPage = () => {
  const { user } = useUserStore();
  const { createShortUrl, loading } = useUrlStore();
  const { isNormalModalOpen, openNormalModal, closeNormalModal } =
    useModalUrl();

  const urls = useFetchUrls(user?.id);
  useExpirationWarning(urls);

  return (
    <section className="min-h-screen mt-[4rem]">
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
              onClick={openNormalModal}
              className="p-2 border-2 rounded-md bg-white hover:bg-white/70"
            >
              <AddCircle />
            </button>
          </div>
          {urls.length > 0 ? (
            <UrlManager showButtons={false} isAuthenticated={true} />
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
        isOpen={isNormalModalOpen}
        onRequestClose={closeNormalModal}
        createShortUrl={createShortUrl}
      />
    </section>
  );
};

export default DashboardPage;
