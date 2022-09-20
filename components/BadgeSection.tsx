import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { BadgeCard } from "./BadgeCard";

interface BadgeSectionProps {
  badges: {
    Badge: {
      id: number;
      name?: string;
      imageUrl: string;
    };
    id: number;
    dateEarned?: string | null;
    userId: number;
  }[];
}

export const BadgeSection = ({ badges }: BadgeSectionProps) => {
  return (
    <div className={`flex w-full flex-col justify-start space-y-8 xl:w-10/12`}>
      <div className={"w-full"}>
        <h2 className="mb-3 font-bold text-center uppercase font-header text-s text-grey-500 md:text-left md:text-m lg:mb-7">
          Badges Earned
        </h2>
        <div
          className={`grid w-full grid-cols-1 items-center justify-center gap-6 sm:grid-cols-1 sm:px-8 md:grid-cols-1 md:px-0 lg:grid-cols-2`}
        >
          {(badges || []).map((badge) => {
            return <BadgeCard badge={badge.Badge} dateEarned={badge.dateEarned} key={badge.id} />;
          })}
        </div>
      </div>
    </div>
  );
};
