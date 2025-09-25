import { commonClassName } from "@/shared/constant";
import Link from "next/link";
import { MdModeEditOutline, MdDelete  } from "react-icons/md";
import { HiOutlineClipboard } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
type TableActionIcon = "edit" | "delete" | "view" | "study" | "approve";
const TableActionItem = ({
  onClick,
  type,
  url,
}: {
  onClick?: () => void;
  type: TableActionIcon;
  url?: string;
}) => {
  const icon: Record<TableActionIcon, any> = {
    edit: <MdModeEditOutline />,
    delete: <MdDelete />,
    view: <FaEye />,
    study: <HiOutlineClipboard />,
    approve: <MdModeEditOutline />,
  };
  if (url)
    return (
      <Link href={url} className={commonClassName.acction}>
        {icon[type]}
      </Link>
    );
  return (
    <button className={commonClassName.acction} onClick={onClick}>
      {icon[type]}
    </button>
  );
};

export default TableActionItem;