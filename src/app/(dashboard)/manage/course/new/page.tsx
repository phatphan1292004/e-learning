import Heading from '@/components/common/Heading';
import CourseAddNew from '@/components/course/CourseAddNew';
import React from 'react';

const page = () => {
  return (
    <div>
      <Heading>Create New Course</Heading>
      <CourseAddNew />
    </div>
  );
};

export default page;