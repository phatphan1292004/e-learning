"use client";
import { ILesson } from "@/modules/lesson/services/lesson.model";
import React, { use, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { updateLesson } from "@/modules/lesson/services/lesson.action";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { editorOptions } from "@/shared/constant";
import { useTheme } from "next-themes";

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});

const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
  const editorRef = useRef<any>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug ?? "",
      duration: lesson.duration ?? 0,
      video_url: lesson.video_url ?? "",
      content: lesson.content ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updateLesson({
        lessonId: lesson._id,
        updateData: values,
      });

      if (res?.success) {
        toast.success("Cập nhật bài học thành công");
      }
    } catch (error) {}
  }

  const { theme } = useTheme();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-8 p-5"
      >
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Đường dẫn</FormLabel>
              <FormControl>
                <Input placeholder="bai-1-tong-quan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thời lượng</FormLabel>
              <FormControl>
                <Input
                  placeholder="60p"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="video_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/video" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div></div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="col-start-1 col-end-3">
              <FormLabel>Nội dung</FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                  onInit={(_evt:any, editor:any) => {
                    (editorRef.current = editor).setContent(
                      lesson.content || ""
                    );
                  }}
                  value={field.value}
                  {...editorOptions(field, theme)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5 items-center mt-3 ">
          <Button type="submit" className="text-white">
            Cập nhật
          </Button>
          <Link href="/">Xem trước</Link>
        </div>
      </form>
    </Form>
  );
};

export default LessonItemUpdate;
