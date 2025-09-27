import React from "react";

interface CourseGridProps {
  children: React.ReactNode;
}

const CourseGrid = ({ children }: CourseGridProps) => {
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:gap-6 mt-6 course-slider">
      {children}
    </div>
  );
};

export default CourseGrid;
