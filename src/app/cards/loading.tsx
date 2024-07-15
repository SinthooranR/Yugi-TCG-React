import Image from "next/image";
import React from "react";

const LoadingSpinner = () => {
  return (
    <Image
      src={"/images/spinners/deckLoader.svg"}
      height={60}
      width={60}
      alt="Loader"
    />
  );
};

export default LoadingSpinner;
