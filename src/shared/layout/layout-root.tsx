"use client";
import Header from "@/shared/layout/header";
import Sidebar from "@/shared/layout/sidebar";
import React, { useState } from "react";

export default function LayoutClient({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="wrapper flex h-screen w-full">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} role={role} />
      <div className="flex-1 transition-all duration-300">
        <Header />
        <main
          className={`p-8 mt-20 transition-all duration-300 ${
            collapsed ? "lg:ml-[70px]" : "lg:ml-[300px]"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
