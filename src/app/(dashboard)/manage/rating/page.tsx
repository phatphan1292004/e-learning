import RatingManage from "./RatingManage";
import { getRatings } from "@/lib/actions/rating.action";

const page = async () => {
  const ratings = await getRatings();
  return (
    <div>
      <RatingManage ratings={ratings} />
    </div>
  );
};

export default page;