"use client"
import { useAuth, UserButton } from '@clerk/nextjs';
import React from 'react';
import { ModeToggle } from '../common/ModeToggle';
import { FaUserAlt } from 'react-icons/fa';
import Link from 'next/link';
const Header = () => {
  const { userId } = useAuth();
  return (
    <div className='w-full dark:bg-grayDarker bg-white px-5 py-3 border-b border-b-gray-200 flex justify-end items-center dark:border-opacity-10'>
      <div className="mt-auto flex items-center gap-5">
        
        <ModeToggle />
        {!userId ? (
          <Link
            href="/sign-in"
            className="py-3 px-6 rounded-lg bg-primary text-white flex items-center justify-center"
          >
            <button>Đăng nhập</button>
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};

export default Header;