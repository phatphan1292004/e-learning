import Link from "next/link";
import React from "react";

const AlreadyBuy = () => {
  return (
    <div className="bgDarkMode border borderDarkMode rounded-lg p-5">
      Bạn đã mua khóa học này. Vui lòng nhấn vào <Link href="/study" className="text-primary font-bold">đây</Link> để vào khu vực học tập.
    </div>
  );
};

export default AlreadyBuy;
