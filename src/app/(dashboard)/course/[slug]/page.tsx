import { getCourseBySlug, getCourseLessonsInfo, updateCourseView } from "@/lib/actions/course.action";
import { FaCheck } from "react-icons/fa6";
import Image from "next/image";
import { courseLevelTitle } from "@/constants";
import PageNotFound from "@/app/not-found";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonContent from "@/components/lesson/LessonContent";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import CourseWidget from "./CourseWidget";
import AlreadyBuy from "./AlreadyBuy";
import { formatMinutesToHours } from "@/utils";

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  await updateCourseView({ slug: params.slug });
  const { userId } = auth();
  const user = await getUserInfo({ userId: userId || "" });
  const userCourses = user?.courses.map((c) => c.toString());
  console.log("userCourses", userCourses);
  const data = await getCourseBySlug({
    slug: params.slug,
  });
  if (!data) return null;
  if (data.status !== "APPROVED") return <PageNotFound></PageNotFound>;
  const lectures = data.lectures || [];
  const videoId = data.intro_url?.split("v=")[1] || "";
  const { duration, lessons }: any =
    (await getCourseLessonsInfo({ slug: data.slug })) || 0;
  const ratings =
  Array.isArray(data.rating) && typeof data.rating[0] === "object" && "content" in data.rating[0]
    ? data.rating.map((r: any) => r.content)
    : [];
  
  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5">
          {data.intro_url ? (
            <>
              <iframe
                width="1412"
                height="794"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Team Intro Refund Gaming | PUBG Vietnam Series"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-full h-full object-fill"
              ></iframe>
            </>
          ) : (
            <Image
              src={data.image}
              alt=""
              fill
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {ratings.map((rating, index) => (
            <div
              key={index}
              className="p-2 text-sm font-medium rounded-md border borderDarkMode bgDarkMode"
            >
              {rating}
            </div>
          ))}
        </div>
        <h1 className="font-bold text-3xl mb-5">{data?.title}</h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal">{data.desc}</div>
        </BoxSection>
        <BoxSection title="Thông tin">
          <div className="grid grid-cols-4 gap-5 mb-10">
            <BoxInfo title="Bài học">{lessons}</BoxInfo>
            <BoxInfo title="Lượt xem">{data.views}</BoxInfo>
            <BoxInfo title="Trình độ">{courseLevelTitle[data.level]}</BoxInfo>
            <BoxInfo title="Thời lượng">{formatMinutesToHours(duration)}</BoxInfo>
          </div>
        </BoxSection>
        <BoxSection title="Nội dung khóa học">
          <LessonContent lectures={lectures} course="" slug="" />
        </BoxSection>
        <BoxSection title="Yêu cầu">
          {data.info.requirements.map((r, index) => (
            <div
              className="mb-3 flex items-center gap-2 text-sm font-semibold"
              key={index}
            >
              <div className="size-5 flex items-center justify-center rounded-md bg-primary bg-opacity-10">
                <FaCheck className="text-primary" />
              </div>
              <span>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title="Lợi ích">
          {data.info.benefits.map((r, index) => (
            <div
              className="mb-3 flex items-center gap-2 text-sm font-semibold"
              key={index}
            >
              <div className="size-5 flex items-center justify-center rounded-md bg-primary bg-opacity-10">
                <FaCheck className="text-primary" />
              </div>
              <span>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title="Q.A">
          {data.info.qa.map((qa, index) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value={qa.question}>
                <AccordionTrigger>{qa.question}</AccordionTrigger>
                <AccordionContent>{qa.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </BoxSection>
      </div>
      <div>
        {userCourses?.includes(data._id.toString()) ? (
          <AlreadyBuy />
        ) : (
          <CourseWidget
            data={data ? JSON.parse(JSON.stringify(data)) : null}
            user={user ? JSON.parse(JSON.stringify(user)) : null}
            duration={formatMinutesToHours(duration)}
          />
        )}
      </div>
    </div>
  );
};

function BoxInfo({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg p-5">
      <h4 className="text-sm text-slate-400 font-normal">{title}</h4>
      <h3 className="font-bold">{children}</h3>
    </div>
  );
}

function BoxSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="font-bold text-xl mb-5">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}

export default page;
