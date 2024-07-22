"use client";

import { useState } from "react";
import Loader from "./loader/Loader";
import { Check, Copy } from "lucide-react";

const CopyText = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const copyToClipboard = () => {
    setIsLoading(true);
    navigator.clipboard.writeText(text).then(() => {
      setTimeout(() => {
        setCopied(true);
        setIsLoading(false);
        setTimeout(() => setCopied(false), 2000);
      }, 1000);
    });
  };
  return (
    <button
      onClick={copyToClipboard}
      className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10"
    >
      {isLoading ? <Loader /> : copied ? <Check /> : <Copy />}
    </button>
  );
};

export default CopyText;
