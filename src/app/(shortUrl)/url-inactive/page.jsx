"use client"

import ArrowLeft from "@/components/ui/icons/ArrowLeft";
import { useRouter } from "next/navigation";

const UrlInactivePage = () => {
  const router = useRouter();

  const handleClickBack = () => {
    return router.push("/");
  };

  return (
    <section className="mt-10 min-h-screen ">
      <div className="space-y-3 bg-white border border-red-500 rounded-md p-6 w-fit mx-auto">
        <h3 className="font-bold text-3xl">Url Inactiva</h3>
        <p>Lo sentimos esta url esta inactiva 😥...</p>
        <p>Podes volver activarla antes de que se elimine en 10 dias!</p>
        <button
          onClick={handleClickBack}
          className="p-1 border bg-red-700 rounded-md text-white"
        >
          <span className="inline-flex align-middle mr-1">
            <ArrowLeft />
          </span>
          Volver
        </button>
      </div>
    </section>
  );
};

export default UrlInactivePage;
