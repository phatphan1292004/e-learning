import Heading from '@/components/common/Heading';
import CourseUpdateContent from '@/components/course/CourseUpdateContent';
import { getCourseBySlug } from '@/lib/actions/course.action';
import React from 'react';

const page = async ({searchParams} : {
  searchParams: { slug: string }
}) => {
  const course = await getCourseBySlug({slug: searchParams.slug});
  if(!course) return <div>Khóa học không tồn tại</div>
  return (
    <>
      <Heading className='mb-10'>Nội dung: <strong className='text-primary'>{course.title}</strong></Heading>
      <CourseUpdateContent course={JSON.parse(JSON.stringify(course))} />
    </>
  );
};

export default page;