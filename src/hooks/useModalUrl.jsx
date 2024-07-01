"use client"
import { useState } from "react";

const useModalUrl = () => {
  const [isNormalModalOpen, setIsNormalModalOpen] = useState(false);
  const [isHashModalOpen, setIsHashModalOpen] = useState(false);

  const openNormalModal = () => setIsNormalModalOpen(true);
  const closeNormalModal = () => setIsNormalModalOpen(false);

  const openHashModal = () => setIsHashModalOpen(true);
  const closeHashModal = () => setIsHashModalOpen(false);

  return {
    isNormalModalOpen,
    openNormalModal,
    closeNormalModal,
    isHashModalOpen,
    openHashModal,
    closeHashModal,
  };
};

export default useModalUrl;
