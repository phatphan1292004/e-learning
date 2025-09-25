"use client";
import { menuItems } from "@/constants";
import { ActiveLink } from "@/shared/common";
import { TMenuItem } from "@/types";


const Sidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
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
          className={`font-bold text-3xl inline-block mb-5 transition-all duration-300 ${
            collapsed ? "text-xl" : ""
          }`}
        >
          <span className="text-primary">U</span>
          {!collapsed && "cademy"}
        </a>
        <button
          className={`mb-5 p-2 rounded hover:bg-primary/10 transition self-end ${
            collapsed ? "self-center" : ""
          }`}
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
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
        {!collapsed && <span className="ml-3">{title}</span>}
      </ActiveLink>
    </li>
  );
}

export default Sidebar;
