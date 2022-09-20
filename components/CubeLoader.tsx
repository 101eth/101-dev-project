import Image from "next/image";

type Props = {
  size?: number;
};

export const CubeLoader = ({ size = 280 }: Props) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-none p-8">
      <div>
        <Image src={"/images/cubev1.webp"} width={size} height={size} alt="Loading animation" />
      </div>
    </div>
  );
};
