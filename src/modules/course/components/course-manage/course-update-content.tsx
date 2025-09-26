"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassName } from "@/shared/constant";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { TCourseUpdateParams, TUpdateCourseLecture } from "@/types";
import { HiCheck, HiOutlineX } from "react-icons/hi";
import { cn } from "@/shared/lib/utils";
import { createLesson, updateLesson } from "@/modules/lesson/services/lesson.action";
import slugify from "slugify";
import { LessonItemUpdate } from "@/modules/lesson/components";
import { createLecture, updateLecture } from "@/modules/lecture/services/lecture.action";



const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
  const lectures = course.lectures || [];

  const handleDeleteLecture = async (e: any, lectureId: string) => {
    e.stopPropagation();
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await updateLecture({
            lectureId: lectureId,
            updateData: {
              path: `manage/course/update-content?slug=${course.slug}`,
              _destroy: true,
            },
          });
          if (res?.success) {
            toast.success("Xóa chương thành công");
          }
        }
      });
    } catch (error) {
      toast.error("Xóa chương thất bại");
    }
  };

  const handleUpdateLecture = async (e: any, lectureId: string) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId: lectureId,
        updateData: {
          title: lectureEdit,
          path: `manage/course/update-content?slug=${course.slug}`,
        },
      });
      if (res?.success) {
        toast.success("Cập nhật chương thành công");
        setLectureEdit("");
        setLectureIdEdit("");
      }
    } catch (error) {}
  };
  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        title: "Chương mới",
        course: course._id,
        order: lectures.length + 1,
        path: `manage/course/update-content?slug=${course.slug}`,
      });

      if (res?.success) {
        toast.success("Thêm chương mới thành công");
      }
    } catch (error) {}
  };
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  const [lessonEdit, setLessonEdit] = useState("");
  const [lessonIdEdit, setLessonIdEdit] = useState("");
  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const res = await createLesson({
        path: `manage/course/update-content?slug=${course.slug}`,
        title: "Bài học mới",
        lecture: lectureId,
        course: courseId,
        slug: `tieu-de-bai-hoc-moi-${new Date()
          .getTime()
          .toString()
          .slice(-3)}`,
      });

      if (res?.success) {
        toast.success("Thêm bài học mới thành công");
        return;
      }

      toast.error("Thêm bài học mới thất bại");
    } catch (error) {}
  };

  const handleUpdateLesson = async (e: any, lessonId: string) => {
    e.stopPropagation();
    try {
      const res = await updateLesson({
        lessonId: lessonId,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: "vi",
            remove: /[*+~.()'"!:@]/g,
          }),
        },
        path: `manage/course/update-content?slug=${course.slug}`,
      });
      if (res?.success) {
        toast.success("Cập nhật bài học thành công");
        setLessonEdit("");
        setLessonIdEdit("");
      }
    } catch (error) {}
  };
  return (
    <div>
      {lectures.length > 0 &&
        lectures.map((lecture: TUpdateCourseLecture, idx: number) => (
          <div key={lecture._id}>
            <Accordion type="single" collapsible={!lectureEdit}>
              <AccordionItem value={lecture._id.toString()} className="mt-5">
                <AccordionTrigger>
                  <div className="flex items-center justify-between gap-3 w-full">
                    {lecture._id === lectureIdEdit ? (
                      <>
                        <div className="w-full">
                          <Input
                            placeholder="Tên chương"
                            defaultValue={lecture.title}
                            onChange={(e) => {
                              setLectureEdit(e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex gap-2 pr-5">
                          <span
                            className={cn(
                              commonClassName.acction,
                              "text-green-500"
                            )}
                            onClick={(e) => handleUpdateLecture(e, lecture._id)}
                          >
                            <HiCheck size={18} />
                          </span>
                          <span
                            className={cn(
                              commonClassName.acction,
                              "text-red-500"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLectureIdEdit("");
                            }}
                          >
                            <HiOutlineX size={18} />
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>{`Chương ${idx + 1}: ${lecture.title}`}</div>
                        <div className="flex gap-2 pr-5">
                          <span
                            className={commonClassName.acction}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLectureIdEdit(lecture._id);
                            }}
                          >
                            <FiEdit size={18} />
                          </span>
                          <span
                            className={commonClassName.acction}
                            onClick={(e) => handleDeleteLecture(e, lecture._id)}
                          >
                            <MdDelete size={18} />
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none !bg-transparent">
                  <div className="flex flex-col gap-3">
                    {lecture.lessons.map((lesson) => (
                      <Accordion
                        type="single"
                        collapsible={!lessonEdit}
                        key={lesson._id}
                      >
                        <AccordionItem value={lesson._id.toString()}>
                          <AccordionTrigger>
                            <div className="flex items-center justify-between gap-3 w-full">
                              {lesson._id === lessonIdEdit ? (
                                <>
                                  <div className="w-full">
                                    <Input
                                      placeholder="Tên bài học"
                                      defaultValue={lesson.title}
                                      onChange={(e) => {
                                        setLessonEdit(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="flex gap-2 pr-5">
                                    <span
                                      className={cn(
                                        commonClassName.acction,
                                        "text-green-500"
                                      )}
                                      onClick={(e) =>
                                        handleUpdateLesson(e, lesson._id)
                                      }
                                    >
                                      <HiCheck size={18} />
                                    </span>
                                    <span
                                      className={cn(
                                        commonClassName.acction,
                                        "text-red-500"
                                      )}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLessonIdEdit("");
                                      }}
                                    >
                                      <HiOutlineX size={18} />
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>{lesson.title}</div>
                                  <div className="flex gap-2 pr-5">
                                    <span
                                      className={commonClassName.acction}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLessonIdEdit(lesson._id);
                                      }}
                                    >
                                      <FiEdit size={18} />
                                    </span>
                                    <span
                                      className={commonClassName.acction}
                                      // onClick={(e) =>
                                      //   handleDeleteLesson(e, lesson._id)
                                      // }
                                    >
                                      <MdDelete size={18} />
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <LessonItemUpdate lesson={lesson}/>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button
              type="button"
              onClick={() => handleAddNewLesson(lecture._id, course._id)}
              className="text-white mt-5 w-fit block ml-auto"
            >
              Thêm bài học
            </Button>
          </div>
        ))}
      <Button
        type="button"
        onClick={handleAddNewLecture}
        className="text-white mt-10"
      >
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
