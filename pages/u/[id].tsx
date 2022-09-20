import prisma from "../../lib/prisma";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Avatar } from "../../components/Avatar";
import { CubeLoader } from "../../components/CubeLoader";
import { BadgeSection } from "../../components/BadgeSection";

const UserPage = ({ user }: UserPageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <CubeLoader />;
  }

  const displayName = user.name ?? user.id;

  return (
    <div className="mt-2 w-full pb-20">
      <div className="max-w-min m-auto mb-4 w-11/12 sm:w-10/12">
        <div className="flex w-full flex-col items-start justify-center gap-10 md:mt-12 md:flex-row lg:justify-around">
          <div>
            <Avatar
              size="3xl"
              userId={user.id.toString()}
              /* text={user.name ?? undefined} */
              alt="broken"
            />
            <Avatar
              size="3xl"
              userId={user.id.toString()}
              text={user.name ?? undefined}
              alt="broken"
              className="text-white"
            />
          </div>
          <BadgeSection {...user} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;

export const getStaticProps: GetStaticProps<UserPageProps> = async ({
  params,
}) => {
  const id = params?.id;
  let user;
  if (id && !Array.isArray(id) && !id.includes(".") && !id.includes("0x"))
    user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        wallet: true,
        badges: {
          select: {
            Badge: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
            id: true,
            dateEarned: true,
            userId: true,
          },
        },
      },
    });

  if (!user && id && !Array.isArray(id)) {
    user = await prisma.user.findUnique({
      where: { wallet: id },
      select: {
        id: true,
        name: true,
        wallet: true,
        badges: {
          select: {
            Badge: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
            id: true,
            dateEarned: true,
            userId: true,
          },
        },
      },
    });
  }

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: {
        ...user,
        badges: user.badges.map((attempt) => ({
          ...attempt,
          dateEarned: attempt.dateEarned
            ? attempt.dateEarned.toDateString()
            : null,
        })),
      },
      notFound: false,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    take: 250,
    orderBy: { badges: { _count: "desc" } },
  });

  const paths = [];
  paths.push(
    ...users.map((user) => ({
      params: { id: user.id.toString() },
    }))
  );

  return { paths: paths, fallback: true };
};

type UserPageProps = {
  user: {
    id: number;
    name: string | undefined | null;
    wallet: string;
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
  };
};
