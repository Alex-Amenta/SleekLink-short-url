"use client";

import { useUrlStore } from "@/zustand/store";
import UrlCard from "./UrlCard";

const UrlManager = () => {
  const { updateStatusUrl, nonAuthUrls } = useUrlStore();

  return (
    <>
      {nonAuthUrls.length > 0 &&
        nonAuthUrls
          .flat()
          .map((url) => (
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
              updateStatusUrl={updateStatusUrl}
            />
          ))}
    </>
  );
};

export default UrlManager;
