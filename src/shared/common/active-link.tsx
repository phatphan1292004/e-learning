"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { TActiveLinkProps } from "@/types";

const ActiveLink = ({ url, children }: TActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = url === pathname; 
  return (
    <Link
      href={url}
      className={`w-full p-3 h-12 flex items-center font-semibold rounded-md dark:text-grayDark gap-2 transition-all ${isActive ? "!text-primary bg-primary bg-opacity-10 svg-animate" : "hover:text-primary hover:bg-primary hover:bg-opacity-10"}`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
