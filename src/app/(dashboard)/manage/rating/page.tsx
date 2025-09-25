import { RatingStatus } from "@/types/enums";
import RatingManage from "./RatingManage";
import { getRatings } from "@/lib/actions/rating.action";

const page = async (
  {
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: RatingStatus;
  };
}
) => {
  const ratings = await getRatings({
    page: searchParams.page,
    limit: 10,
    search: searchParams.search,
    status: searchParams.status,
  });
  return (
    <div>
      <RatingManage ratings={ratings} />
    </div>
  );
};

export default page;