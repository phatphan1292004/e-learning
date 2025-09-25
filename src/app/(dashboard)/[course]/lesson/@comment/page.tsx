import { getCourseBySlug } from "@/shared/lib/actions/course.action";
import { getLessonBySlug } from "@/shared/lib/actions/lesson.action";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/shared/lib/actions/user.actions";
import { getCommentsByLesson } from "@/modules/comment/services/comment.action";
import { CommentForm, CommentItem, CommentSorting } from "@/modules/comment/components";

const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
    sort: "recent" | "oldest";
  };
}) => {
  const { userId } = auth();

  const findUser = await getUserInfo({ userId: userId! });

  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const lesson = await getLessonBySlug({
    slug: slug,
    course: findCourse?._id.toString(),
  });
  const comments = await getCommentsByLesson(
    lesson?._id.toString() || "",
    searchParams.sort
  );
  const commentLessonId = lesson?._id.toString() || "";
  const commentUserId = findUser?._id.toString() || "";
  const rootComments = comments?.filter((item) => !item.parentId);
  return (
    <div>
      <div className="flex flex-col gap-5 mt-10">
        <CommentForm
          lessonId={lesson?._id.toString() || ""}
          userId={findUser?._id.toString() || ""}
        ></CommentForm>
      </div>
      {rootComments && rootComments?.length > 0 && (
        <div className="flex flex-col gap-10 mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>Comments</span>
              <span className="flex items-center justify-center bg-primary text-white text-sm font-semibold rounded-full py-0.5 px-4">
                {comments?.length}
              </span>
            </h2>
            <CommentSorting></CommentSorting>
          </div>
          <div className="flex flex-col gap-5">
            {rootComments?.map((item) => (
              <CommentItem
                key={item._id}
                comment={item}
                lessonId={commentLessonId}
                userId={commentUserId}
                comments={comments || []}
              ></CommentItem>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
