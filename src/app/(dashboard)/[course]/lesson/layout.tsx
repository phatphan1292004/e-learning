import PageNotFound from "@/app/not-found";
import { auth } from "@clerk/nextjs/server";
import React, { Suspense } from "react";
import LoadingPlayer from "./@player/loading-player";
import LoadingOutline from "./@outline/loading-outline";
import { LessonWrapper } from "@/modules/lesson/components";
import { getUserInfo } from "@/modules/user/services/user.actions";

const Layout = async ({
  player,
  outline,
  comment,
}: {
  player: React.ReactNode;
  outline: React.ReactNode;
  comment: React.ReactNode;
}) => {
  const { userId } = auth();
  if (!userId) return <PageNotFound />;
  const findUser = await getUserInfo({ userId });
  if (!findUser) return <PageNotFound />;
  return (
    <LessonWrapper>
      <Suspense fallback={<LoadingPlayer />}>
        <div>
          {player}
          {comment}
        </div>
      </Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
    </LessonWrapper>
  );
};

export default Layout;
