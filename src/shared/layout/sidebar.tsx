"use client";
import { menuItems } from "@/shared/constant";
import { ActiveLink } from "@/shared/common";
import { TMenuItem } from "@/types";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const Sidebar = ({
  collapsed,
  setCollapsed,
  role = "user",
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  role?: string;
}) => {
  return (
    <div
      className={`z-[50] hidden border-r borderDarkMode bgDarkMode lg:flex flex-col h-full fixed top-0 left-0 transition-all duration-300 ${
        collapsed ? "w-[70px] px-2 py-5 items-center" : "w-[300px] p-5"
      }`}
    >
      <div className="flex justify-between items-center">
        <a
          href="/"
          className={`flex items-center font-bold gap-2 mb-5 transition-all duration-300 ${
            collapsed ? "text-xl" : ""
          }`}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={collapsed ? 32 : 48}
            height={collapsed ? 32 : 48}
            className={`inline-block transition-all duration-300`}
          />
          {!collapsed && <span className="text-xl">Procademy</span>}
        </a>
        <button
          className={`absolute right-[-16px] top-[14px] z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary/10 transition border borderDarkMode bgDarkMode shadow`}
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {menuItems
          .filter((item) => (role === "ADMIN" ? true : item.role === "ALL"))
          .map((item, index) => (
            <MenuItem
              key={index}
              url={item.url}
              title={item.title}
              icon={item.icon}
              collapsed={collapsed}
            />
          ))}
      </ul>
    </div>
  );
};

export function MenuItem({
  url = "/",
  title = "",
  icon,
  collapsed,
}: TMenuItem & { collapsed?: boolean }) {
  return (
    <li className="flex items-center w-full h-12 transition-all duration-300">
      <ActiveLink url={url}>
        <span className="inline-block text-lg">{icon}</span>
        {!collapsed && <span className="ml-2">{title}</span>}
      </ActiveLink>
    </li>
  );
}

export default Sidebar;
