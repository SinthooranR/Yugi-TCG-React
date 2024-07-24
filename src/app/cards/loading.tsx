import Image from "next/image";
import React, { FC } from "react";

const LoadingSpinner: FC<{ height?: number; width?: number }> = ({
  height,
  width,
}) => {
  return (
    <div className="pt-16 w-full flex justify-center">
      <Image
        src={"/images/spinners/deckLoader.svg"}
        height={height ?? 60}
        width={width ?? 60}
        alt="Loader"
      />
    </div>
  );
};

export default LoadingSpinner;
