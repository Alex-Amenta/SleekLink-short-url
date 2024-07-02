"use client";
import { usePathname } from "next/navigation";

const BackgroundPage = () => {
  const pathname = usePathname();
  const bgColorRgba =
    pathname === "/url-inactive" ? "rgba(255,0,0,38%)" : "rgba(0,255,10,38%)";

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#ededed] bg-[linear-gradient(to_right,#d9d9d9_1px,transparent_1px),linear-gradient(to_bottom,#d9d9d9_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

      <div
        className={`absolute top-0 left-0 -z-10 h-screen w-screen`}
        style={{
          background: `radial-gradient(100% 50% at 50% 0%, ${bgColorRgba} 0%, rgba(0,163,255,0) 70%, rgba(0,163,255,0) 100%)`,
        }}
      ></div>
    </>
  );
};

export default BackgroundPage;
