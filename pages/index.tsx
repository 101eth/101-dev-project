import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { CubeLoader } from "../components/CubeLoader";
import { Leaderboard } from "../components/Leaderboard";
import { SearchBar } from "../components/SearchBar";
import styles from "../styles/Home.module.css";

const UsersQuery = gql`
  query UsersQuery {
    users {
      id
      name
      wallet
      badges {
        badge {
          id
          name
          imageUrl
        }
        dateEarned
      }
    }
  }
`;

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(UsersQuery, {
    fetchPolicy: "cache-and-network",
  });

  const [searchVal, setSearchVal] = useState("");
  const router = useRouter();

  if (loading) {
    return <CubeLoader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const topUsers = (
    data.users as { id: number; name: string; badges: any[]; wallet: string }[]
  )
    .map((user) => ({
      id: user.id.toString(),
      username: user.wallet,
      name: user.name,
      image: "",
      numBadges: user.badges.length,
    }))
    .sort((usera, userb) => usera.numBadges - userb.numBadges)
    .slice(0, 10);

  return (
    <main className="w-full flex flex-col justify-center align-center">
      <div className="text-center text-white text-3xl font-header flex flex-row m-auto w-full justify-center mt-10">
        <div className="w-max-content">Who&apos;s # </div>
        <svg
          className={`fill-white h-auto w-max-content max-h-[1.5em]`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 141.94 148.58"
        >
          <g>
            <polygon
              fillRule="evenodd"
              points="141.94 148.58 141.94 120.56 92.4 120.61 92.4 148.58 141.94 148.58 141.94 148.58"
            />
            <polygon
              fillRule="evenodd"
              points="60.22 0 0 60.22 19.81 80.02 60.2 39.63 60.2 120.56 10.5 120.56 10.5 148.58 64.28 148.58 92.21 120.65 92.23 120.64 92.23 120.63 92.24 120.61 92.24 120.56 92.23 120.56 92.23 32.05 60.22 0"
            />
          </g>
        </svg>
        <div className="w-max-content"> [</div>
        <svg
          className={`fill-white h-auto w-max-content max-h-[1.5em]`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 285.97 148.58"
        >
          <g>
            <polygon
              fillRule="evenodd"
              points="285.97 148.58 285.97 120.56 236.44 120.61 236.44 148.58 285.97 148.58 285.97 148.58"
            />
            <polygon
              fillRule="evenodd"
              points="204.25 0 144.03 60.22 163.84 80.02 204.23 39.63 204.23 120.56 154.54 120.56 154.54 148.58 208.31 148.58 236.24 120.65 236.26 120.64 236.26 120.63 236.27 120.61 236.27 120.56 236.26 120.56 236.26 32.05 204.25 0"
            />
          </g>
          <g>
            <polygon
              fillRule="evenodd"
              points="62.4 148.58 62.4 120.56 92.78 120.56 92.78 .27 124.8 32.24 124.8 120.63 96.85 148.58 62.4 148.58 62.4 148.58"
            />
            <polygon
              fillRule="evenodd"
              points="62.4 28.09 64.21 28.09 92.19 .08 62.4 .08 62.4 28.09 62.4 28.09"
            />
            <polygon
              fillRule="evenodd"
              points="62.4 .08 62.4 28.09 32.03 28.09 32.03 148.39 0 116.42 0 28.03 27.95 .08 62.4 .08 62.4 .08"
            />
            <polygon
              fillRule="evenodd"
              points="62.4 120.56 60.59 120.56 32.62 148.58 62.4 148.58 62.4 120.56 62.4 120.56"
            />
          </g>
        </svg>

        <div className="w-max-content">]?</div>
      </div>
      <div className="w-8/12 m-auto pt-16">
        <SearchBar
          value={searchVal}
          onChange={setSearchVal}
          onSubmit={(e) => router.push(`/u/${e}`)}
        />
      </div>
      <div className="pt-16">
        <Leaderboard users={topUsers} />
      </div>
    </main>
  );
};

export default Home;
