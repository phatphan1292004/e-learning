import { RatingStatus } from "@/types/enums";
import RatingManage from "@/modules/rating/components/rating-manage";
import { getRatings } from "@/modules/rating/services/rating.action";

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
    <>
      <RatingManage ratings={ratings} />
    </>
  );
};

export default page;