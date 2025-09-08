import Link from "next/link";
import {
  HiOutlinePlusSm,
} from "react-icons/hi";

const BouncedLink = ({ url }: { url: string }) => {
  return (
    <Link
      href={url}
      className="size-10 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-5 animate-bounce"
    >
      <HiOutlinePlusSm />
    </Link>
  );
};

export default BouncedLink;