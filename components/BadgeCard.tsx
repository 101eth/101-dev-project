//import { parseURI } from "@101xyz/core-lib/helpers";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { Avatar } from "./Avatar";

interface BadgeCardProps {
  badge: {
    id: number;
    name?: string | undefined;
    imageUrl: string;
  };
  dateEarned: string | null | undefined;
}

export const BadgeCard = ({ badge, dateEarned }: BadgeCardProps) => {
  return (
    <div
      className={`border-gradient-radius m-auto flex h-[156px] w-full cursor-pointer flex-row content-center items-start justify-around rounded-xl border border-grey-800 bg-primary-blue-400 p-4 md:px-4 md:py-4`}
    >
      <div
        className={
          "relative mr-4 flex aspect-square h-full w-auto items-center justify-center"
        }
      >
        <Image
          layout="fill"
          className={"aspect-square"}
          src={badge.imageUrl}
          alt="Badge"
        />
      </div>
      <div
        className={
          "flex h-full w-full flex-shrink flex-col items-start justify-between overflow-hidden py-2 lg:py-4"
        }
      >
        <h1
          className={
            "font-header text-2xs font-bold leading-normal text-white line-clamp-2 md:text-s"
          }
        >
          {(badge.name || "").toUpperCase()}
        </h1>
        <div
          className={
            "flex w-full flex-col md:flex-row lg:items-center lg:justify-around"
          }
        >
          <div className={"flex min-w-0 flex-shrink flex-row items-center"}>
            <Avatar
              alt={`creator image`}
              size="sm"
              avatarStyleOverride="h-4 w-4 ml-0 md:h-6 md:w-6"
              className=""
              userId={badge.id.toString()}
            />
            <p className={"font-landingbody ml-2 flex-shrink truncate text-3xs text-primary-blue-300"}>
             From 101...
            </p>
          </div>
          <div
            className={
              "mt-2 flex flex-grow flex-row justify-start rounded-full text-3xs md:justify-end lg:ml-4 lg:items-center"
            }
          >
            <span className="h-full min-w-[1em]">
              <Image
                height="16"
                width="16"
                src={"/images/Checkmark.svg"}
                alt="Checkmark of Completion"
              />
            </span>
            <p className={"font-landingbody ml-2  text-grey-100"}>
              {dateEarned
                ? dayjs(dateEarned).format("MMMM D, YYYY")
                : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
