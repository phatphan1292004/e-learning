import UserManage from "@/modules/user/components/user-manage";
import { getUsers } from "@/modules/user/services/user.actions";
import { UserRole } from "@/types/enums";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    role: UserRole;
  };
}) => {
  const users = await getUsers({
    page: searchParams.page,
    limit: 10,
    search: searchParams.search,
    role: searchParams.role,
  });
  return (
    <>
      <UserManage users={users} />
    </>
  );
};

export default page;
