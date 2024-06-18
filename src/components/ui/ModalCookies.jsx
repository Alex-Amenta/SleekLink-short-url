"use client";

import { useState, useEffect } from "react";
import CookieIcon from "./icons/CookieIcon";

const ModalCookies = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      if (isOpen) {
        mainContent.classList.add("blur-content");
      } else {
        mainContent.classList.remove("blur-content");
      }
    }
  }, [isOpen]);

  const handleAccept = () => {
    setIsOpen(false);
    // Lógica adicional para aceptar cookies
  };

  const handleCancel = () => {
    setIsOpen(false);
    // Lógica adicional para cancelar
  };

  if (!isOpen) return null;

  return (
    <article className="fixed inset-0 mb-10 flex items-end justify-center z-50">
      <div className="bg-white rounded p-4  max-w-[50%] shadow-md">
        <h3 className="text-xl font-bold mb-2">
          <span className="inline-flex align-middle rounded p-1 bg-amber-600">
            <CookieIcon />
          </span>{" "}
          Cookies
        </h3>
        <p className="text-black/80">
          Usamos cookies para mejorar tu experiencia en nuestro sitio. Estas
          cookies nos permiten personalizar el contenido que ves, ofrecer
          funcionalidades de redes sociales y analizar nuestro tráfico. Al
          aceptar, consientes el uso de cookies de acuerdo con nuestra política
          de privacidad. Puedes cambiar tus preferencias de cookies en cualquier
          momento.
        </p>
        <div className="flex justify-end items-center gap-4 mt-4">
          <button
            onClick={handleAccept}
            className="p-2 bg-green-600 hover:bg-green-800 rounded text-white"
          >
            Aceptar
          </button>
          <button
            onClick={handleCancel}
            className="p-2 rounded border hover:border-black"
          >
            Cancelar
          </button>
        </div>
      </div>
    </article>
  );
};

export default ModalCookies;
