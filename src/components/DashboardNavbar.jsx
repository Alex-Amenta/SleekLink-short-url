"use client";

import Link from "next/link";
import HomeIcon from "./ui/icons/HomeIcon";
import LinkIcon from "./ui/icons/LinkIcon";
import SettingsIcon from "./ui/icons/SettingsIcon";
import { usePathname } from "next/navigation";

const DashboardLinks = [
  { name: "Inicio", href: "/", icon: HomeIcon },
  { name: "Enlaces", href: "/dashboard", icon: LinkIcon },
  { name: "Configuración", href: "/dashboard/settings", icon: SettingsIcon },
];

const DashboardNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-start items-center gap-8 bg-black/80 w-min p-2 rounded-xl">
      {DashboardLinks.map((link, index) => (
        <Link
          key={index}
          className={`flex justify-center items-center gap-2 p-1 rounded-xl ${
            pathname === link.href
              ? "bg-green-600 text-white"
              : "border-transparent text-white/60"
          } hover:text-white`}
          href={link.href}
        >
          <link.icon />
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default DashboardNavbar;
