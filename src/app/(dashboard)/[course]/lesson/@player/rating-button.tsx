import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaStar } from "react-icons/fa";
import { ratingList } from "@/shared/constant";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { createRating, getRatingByUserId } from "@/modules/rating/services/rating.action";
const RatingButton = ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const [ratingValue, setRatingValue] = useState(-1);
  const [ratingContent, setRatingContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRatingCourse = async () => {
    setIsLoading(true);
    try {
      const isAlreadyCreated = await getRatingByUserId(userId);
      if (isAlreadyCreated) {
        toast.warning("Bạn đã đánh giá khóa học này rôi.");
        setIsLoading(false);
        return;
      }
      if(ratingValue === -1 || ratingContent.trim() === "") return;
      const res = await createRating({
        rate: ratingValue,
        content: ratingContent,
        user: userId,
        course: courseId,
      });
      if (res) {
        toast.success("Cảm ơn bạn đã đánh giá khóa học!");
        setRatingContent("");
        setRatingValue(-1);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="disabled:cursor-not-allowed flex items-center gap-3 rounded-lg h-12 text-sm font-semibold px-5 bg-primary">
        <FaStar className="text-yellow-400" />
        <span>Đánh giá khóa học</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <div className="flex justify-between gap-5">
              {ratingList.map((rating) => (
                <button
                  key={rating.title}
                  className="flex flex-col gap-3 text-center text-xs items-center"
                  type="button"
                  onClick={() => setRatingValue(rating.value)}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center size-10 rounded-full bg-gray-200",
                      ratingValue === rating.value && "bg-[#ffb86c]"
                    )}
                  >
                    <Image
                      width={20}
                      height={20}
                      alt={rating.title}
                      src={`/rating/${rating.title}.png`}
                    />
                  </span>
                  <strong className="capitalize">{rating.title}</strong>
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Đánh giá của bạn"
              className="h-[200px] resize-none mt-10"
              onChange={(e) => setRatingContent(e.target.value)}
              value={ratingContent}
            />
            <Button
              variant="primary"
              className="w-full mt-5"
              onClick={handleRatingCourse}
              disabled={ratingValue === -1 || isLoading}
              isLoading={isLoading}
            >
              Gửi đánh giá
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RatingButton;
