"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { success, z } from "zod";
import slugify from "slugify";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createCourse } from "@/lib/actions/course.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CourseUpdate = () => {
  return (
    <div>
      
    </div>
  );
};

export default CourseUpdate;