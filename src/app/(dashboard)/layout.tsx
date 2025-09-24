"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="wrapper flex h-screen w-full">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 transition-all duration-300">
        <Header />
        <main
          className={`p-5 mt-20 transition-all duration-300 ${
            collapsed ? "lg:ml-[70px]" : "lg:ml-[300px]"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
