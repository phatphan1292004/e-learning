"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import React, { useState } from "react";

import Link from "next/link";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { menuItems } from "@/constants";

import { ModeToggle } from "@/shared/common/mode-toggle";
import { MenuItem } from "./sidebar";


const Header = () => {
  const { userId } = useAuth();
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <div className="z-10 w-full fixed top-0 right-0 dark:bg-grayDarker bg-white px-5 py-3 border-b border-b-gray-200 flex lg:justify-end justify-between items-center dark:border-opacity-10">
        <button className="lg:hidden" onClick={() => setOpenSidebar(true)}>
          <HiOutlineMenuAlt1 size={25} />
        </button>
        <div className="mt-auto flex items-center gap-5">
          <ModeToggle />
          {!userId ? (
            <Link
              href="/sign-in"
              className="py-3 px-6 rounded-lg bg-primary text-white flex items-center justify-center"
            >
              <button>Đăng nhập</button>
            </Link>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-40 transition-opacity duration-300 ${
          openSidebar ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpenSidebar(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-[250px] bg-white dark:bg-grayDarker shadow-lg transition-transform duration-300 ${
            openSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="p-3" onClick={() => setOpenSidebar(false)}>
            Đóng
          </button>
          <ul className="mt-5">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                url={item.url}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
