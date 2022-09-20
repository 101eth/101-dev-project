import { Avatar } from "./Avatar";
import Image from "next/image";
import { useRouter } from "next/router";
import { CSSProperties } from "react";

interface UserCardType {
  id: string;
  username: string;
  name: string;
  image: string;
  numBadges: number;
  rank: number;
  showTooltip?: boolean;
  className?: string;
}

const rankClasses: Record<number, CSSProperties> = {
  1: {
    backgroundColor: "#F0AE40",
    color: "black",
    border: "2px solid #F3D38B",
  },
  2: {
    backgroundColor: "#8C8E96",
    color: "black",
    border: "2px solid #8C8E96",
  },
  3: {
    backgroundColor: "#483410",
    border: "2px solid #74540C",
  },
};

export const UserCard = ({
  id,
  username,
  name,
  image,
  numBadges,
  rank,
  showTooltip,
  className,
}: UserCardType) => {
  const router = useRouter();
  const card = (
    <div
      onClick={() => router.push(`/u/${username}`)}
      className={`border-gradient-radius flex h-[72px] w-full cursor-pointer flex-row content-center items-center justify-center gap-6 rounded-xl border border-grey-800 bg-primary-blue-400 px-4 py-4 ${className}`}
    >
      <div
        className={
          "flex h-[34px] w-[34px] flex-shrink-0 flex-col items-center justify-center rounded-full text-center text-s text-white"
        }
        style={{ ...rankClasses[rank] }}
      >
        {rank}
      </div>
      <div
        className={
          "flex min-w-[0px] grow flex-row items-center justify-between gap-3"
        }
      >
        <Avatar
          imageUrl={image}
          userId={id}
          size={"lg"}
          alt="Student Profile Picture"
          className={"cursor-pointer"}
        />
        <div
          className={"flex min-w-[0px] grow flex-col items-start justify-start"}
        >
          <h1
            className={
              "font-landingbody w-full truncate text-s leading-normal text-white"
            }
          >
            {name ? name : username}
          </h1>
          <div className={"flex w-full flex-row items-center justify-start"}>
            <Image
              height="16"
              width="16"
              src={"/images/Badge.svg"}
              alt="Badge Illustration"
            />
            <p className={"m-0 ml-1 font-body text-3xs text-white"}>
              {numBadges}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return card;
};
