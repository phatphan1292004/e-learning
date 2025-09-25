import { commonClassName } from "@/shared/constant";
import { cn } from "@/shared/lib/utils";

const StatusBadge = ({
  item,
  onClick,
}: {
  item?: {
    className?: string;
    title: string;
  };
  onClick?: () => void;
}) => {
  return (
    <span
      className={cn(commonClassName.status, item?.className,)}
      onClick={onClick}
    >
      {item?.title}
    </span>
  );
};

export default StatusBadge;