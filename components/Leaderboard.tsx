import { UserCard } from "./UserCard";

interface LeaderboardProps {
  users: {
    id: string;
    username: string;
    name: string;
    image: string;
    numBadges: number;
  }[];
}

export const Leaderboard = ({ users }: LeaderboardProps) => {
  return (
    <div className={"mb-8 flex min-h-[300px] w-full flex-col items-center justify-center lg:mb-24"}>
      <h2 className={"mb-6 text-center font-header text-m font-bold text-white lg:text-xl"}>LEADERBOARD</h2>
      <p className={"m-2 mb-4 text-center font-body text-xs text-grey-100 lg:text-s"}>
        Students with the most completions are ranked below. Updated daily.
      </p>
      <div
        className={
          "grid w-11/12 max-w-[26rem]  grid-cols-1 items-center justify-center gap-6 pt-8 md:max-w-[48rem] md:grid-flow-col md:grid-cols-2 md:grid-rows-5"
        }>
        {users.map((user, idx) => (
          <UserCard {...user} rank={idx + 1} key={user.id} />
        ))}
      </div>
    </div>
  );
};
