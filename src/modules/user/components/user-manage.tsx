"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allValue, userRoles } from "@/shared/constant";
import useQueryString from "@/shared/hooks/useQueryString";
import { StatusBadge, TableAction, TableActionItem } from "@/shared/common";
import { Heading } from "@/shared/components";
import { UserRole } from "@/types/enums";
import Image from "next/image";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteUser, updateUserRole } from "../services/user.actions";

const UserManage = ({ users }: { users: any }) => {
  const { handleSearchData, handleSelectRole } = useQueryString();

  const handleUpdateUserRole = async (id: string, role: UserRole) => {
    try {
      await updateUserRole(id, role);
      toast.success("Cập nhật vai trò thành viên thành công");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật vai trò thất bại");
    }
  };

  const handleToggleRole = async (id: string, currentRole: UserRole) => {
    try {
      const newRole =
        currentRole === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN;

      Swal.fire({
        title: `Bạn có chắc muốn đổi vai trò thành ${newRole === UserRole.ADMIN ? "Admin" : "User"} không?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateUserRole(id, newRole);
          toast.success(
            `Đã đổi vai trò thành ${newRole === UserRole.ADMIN ? "Admin" : "User"}`
          );
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật vai trò thất bại");
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      Swal.fire({
        title: "Bạn có chắc muốn xóa thành viên này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa luôn",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteUser(id);
          toast.success("Xóa thành viên thành công");
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Xóa thành viên thất bại");
    }
  };
  if (!users || !users.users) {
    return (
      <div>
        <Heading>Quản lý thành viên</Heading>
        <p>Không có dữ liệu người dùng</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading className="">Quản lý thành viên</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm thành viên..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            onValueChange={(value) => handleSelectRole(value as UserRole)}
            defaultValue={allValue}
          >
            <SelectTrigger className="w-[180px] h-12">
              <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue} key={allValue}>
                  Tất cả
                </SelectItem>
                {userRoles.map((role) => (
                  <SelectItem value={role.value} key={role.value}>
                    {role.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Thông tin</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Ngày tham gia</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.users.length > 0 ? (
              users.users.map((user: any) => {
                const userRoleStatus = userRoles.find(
                  (item) => item.value === user.role
                );
                return (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          width={40}
                          height={40}
                          alt={user.name || "User"}
                          src={user.avatar || "/avatar-default.png"}
                          className="rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <strong>{user.name}</strong>
                          <span className="text-sm text-gray-500">
                            ID: {user._id}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <strong>{user.email}</strong>
                    </TableCell>
                    <TableCell>
                      <StatusBadge onClick={() => handleToggleRole(user._id, user.role)} item={userRoleStatus}></StatusBadge>
                    </TableCell>
                    <TableCell>
                      <time>
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString(
                              "vi-VN"
                            )
                          : "N/A"}
                      </time>
                    </TableCell>
                    <TableCell>
                      <TableAction>
                        {user.role !== UserRole.ADMIN && (
                          <TableActionItem
                            type="edit"
                          ></TableActionItem>
                        )}
                        <TableActionItem
                          type="delete"
                          onClick={() => handleDeleteUser(user._id)}
                        ></TableActionItem>
                      </TableAction>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Không có người dùng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManage;
