'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface HomeCardProps {
  color: string;
  imgUrl: string;
  title: string;
  description: string;
  handleClick: () => void;
}

const HomeCard = ({ color, imgUrl, title, description, handleClick }: HomeCardProps) => {
  return (
    <div
      className={cn(
        'w-full xl:max-w-[270px] cursor-pointer py-6 px-4 flex flex-col justify-between min-h-[260px] rounded-[14px]',
        color
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={imgUrl} width={27} height={27} alt={title} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
