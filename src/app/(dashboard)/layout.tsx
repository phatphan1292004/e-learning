import { getUserInfo } from "@/modules/user/services/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import LayoutClient from "@/shared/layout/layout-root";
import { ProgressBar } from "@/shared/components";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  let role = "user";
  if (userId) {
    const user = await getUserInfo({ userId });
    role = user?.role || "user";
  }
  return (
    <LayoutClient role={role}>
      <ProgressBar />
      {children}
    </LayoutClient>
  );
}
