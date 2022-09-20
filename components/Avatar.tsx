import React from "react";
import seedrandom from "seedrandom";

type Props = {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  imageUrl?: string;
  userId?: string;
  text?: string;
  avatarStyleOverride?: string;
  alt: string;
  showNotification?: boolean;
  notificationClassName?: string;
  tooltipText?: string;
  href?: string;
};

export const sizesScale = {
  xs: { avatarStyle: "h-5 w-5", fontSize: "0.5rem" },
  sm: { avatarStyle: "h-6 w-6", fontSize: "0.6rem" },
  md: { avatarStyle: "h-8 w-8", fontSize: "0.8rem" },
  lg: { avatarStyle: "h-12 w-12", fontSize: "1rem" },
  xl: { avatarStyle: "h-16 w-16", fontSize: "1.5rem" },
  "2xl": { avatarStyle: "h-24 w-24", fontSize: "2.1rem" },
  "3xl": { avatarStyle: "h-32 w-32", fontSize: "2.4rem" },
};

const rotationClasses = [
  "rotate-0",
  "rotate-45",
  "rotate-90",
  "rotate-[115deg]",
  "rotate-180",
];
const backgroundStyles = [
  "linear-gradient(130.25deg, rgba(95, 158, 59, 0.5) 6.44%, rgba(95, 158, 59, 0) 93.89%), linear-gradient(0.19deg, #4671F6 -6.11%, rgba(70, 113, 246, 0) 106.12%)",
  "linear-gradient(232.73deg, rgba(234, 51, 111, 0.75) 1.75%, rgba(234, 51, 111, 0) 92.08%), linear-gradient(130.25deg, #4671F6 6.44%, rgba(70, 113, 246, 0) 93.89%)",
  "linear-gradient(0.19deg, #4671F6 -6.11%, rgba(70, 113, 246, 0) 106.12%), linear-gradient(130.25deg, #952727 6.44%, rgba(70, 113, 246, 0) 93.89%)",
  "linear-gradient(0.19deg, rgba(240, 174, 64, 0.5) -6.11%, rgba(240, 174, 64, 0) 106.12%), linear-gradient(232.73deg, rgba(234, 51, 111, 0.75) 1.75%, rgba(234, 51, 111, 0) 92.08%), linear-gradient(130.25deg, #4671F6 6.44%, rgba(70, 113, 246, 0) 93.89%)",
];

type AvatarType = "image" | "text" | "gradient";

const Avatar = ({
  className,
  imageUrl,
  userId,
  text,
  alt,
  size,
  showNotification = false,
  notificationClassName,
  avatarStyleOverride,
  tooltipText,
  href,
}: Props) => {
  const avatarStyle = avatarStyleOverride
    ? avatarStyleOverride
    : sizesScale[size].avatarStyle;
  const type: AvatarType = imageUrl ? "image" : text ? "text" : "gradient";
  let avatar = (
    <div
      className={`relative shrink-0 rounded-full ${avatarStyle} ${
        className || ""
      } ${type === "gradient" && "bg-grey-900"}`}
    >
      {type === "image" && (
        <img
          src={imageUrl}
          className="aspect-square h-full w-full rounded-full object-cover"
          alt={alt}
        />
      )}
      {type === "text" && (
        <div
          className={`flex h-full w-full items-center justify-center rounded-full`}
          style={{ fontSize: `${sizesScale[size].fontSize}` }}
        >
          <p>{text}</p>
        </div>
      )}
      {type === "gradient" && (
        <div
          className={`${className ?? ""} ${avatarStyle} ${
            rotationClasses[
              Math.floor(
                seedrandom(userId || "").quick() * rotationClasses.length
              )
            ]
          } rounded-full`}
          style={{
            background: userId
              ? backgroundStyles[
                  Math.floor(
                    seedrandom(userId.split("").reverse().join("")).quick() *
                      backgroundStyles.length
                  )
                ]
              : undefined,
          }}
        />
      )}
      {showNotification && (
        <div
          className={`z-2 absolute -top-1.5 -right-1 my-1 h-5 w-5 rounded-full bg-warning-500 ${notificationClassName}`}
        ></div>
      )}
    </div>
  );

  if (href) {
    avatar = (
      <a className="cursor-pointer" href={href}>
        {avatar}
      </a>
    );
  }

  return avatar;
};

export { Avatar };
