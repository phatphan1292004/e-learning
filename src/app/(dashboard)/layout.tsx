import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen w-full">
      <Sidebar />
      <div></div>
      <div>
        <Header />
        <main className="p-5 mt-20">{children}</main>
      </div>
    </div>
  );
};

export default layout;
