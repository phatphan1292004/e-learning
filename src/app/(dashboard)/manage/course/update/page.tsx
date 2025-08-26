import Heading from '@/components/common/Heading';
import CourseUpdate from '@/components/course/CourseUpdate';
import React from 'react';

const page = ({searchParams} : {
  searchParams: { slug: string }
}) => {
  console.log(searchParams.slug);
  return (
    <div>
      <Heading className='mb-8'>Cập nhật khóa học</Heading>
      <CourseUpdate/>
    </div>
  );
};

export default page;