import { commonClassName } from "@/constants";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

const PaginationBtn = () => {
  return (
    <div className="flex justify-end gap-3 mt-5">
      <button className={commonClassName.paginationButton}>
        <HiArrowLongLeft />
      </button>
      <button className={commonClassName.paginationButton}>
        <HiArrowLongRight />
      </button>
    </div>
  );
};

export default PaginationBtn;
