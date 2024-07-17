"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectPage = ({ params }) => {
  const { shortCode } = params;

  return (
    <div>
      <p>Redirigiendo...</p>
    </div>
  );
};

export default RedirectPage;
