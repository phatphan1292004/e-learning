import PageNotFound from "@/app/not-found";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React, { Suspense } from "react";
import LoadingPlayer from "./@player/LoadingPlayer";
import LoadingOutline from "./@outline/LoadingOutline";

const Layout = async ({
  player,
  outline,
}: {
  player: React.ReactNode;
  outline: React.ReactNode;
}) => {
  const { userId } = auth();
  if (!userId) return <PageNotFound />;
  const findUser = await getUserInfo({ userId });
  if (!findUser) return <PageNotFound />;
  return (
    <div className="grid xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 min-h-screen items-start">
      <Suspense fallback={<LoadingPlayer />}>{player}</Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
    </div>
  );
};

export default Layout;
