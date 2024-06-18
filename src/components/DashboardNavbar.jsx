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
    <nav className="px-10 lg:px-48 flex justify-start items-center gap-8 ">
      {DashboardLinks.map((link, index) => (
        <Link
          key={index}
          className={`flex justify-center items-center gap-2 border-b-4 pb-2 ${
            pathname === link.href
              ? "border-green-600 text-black"
              : "border-transparent text-black/60"
          } hover:text-black`}
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
