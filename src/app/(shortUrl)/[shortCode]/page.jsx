"use client";

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RedirectPage = ({ params }) => {
  const router = useRouter();
  const { shortCode } = params;

  useEffect(() => {
    const fetchRedirectUrl = async () => {
      try {
        const response = await axios.get(`/api/url/redirect/${shortCode}`);

        if (response.data) {
          router.push(response.data.originalUrl);
        } else {
          console.log("url not found");
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching the redirect URL:",
          error.message
        );
      }
    };
    if (shortCode) {
      fetchRedirectUrl();
    }
  }, [shortCode]);

  return (
    <div>
      <p>Redirigiendo...</p>
    </div>
  );
};

export default RedirectPage;
