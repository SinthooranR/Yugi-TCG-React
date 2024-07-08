import React, { FC } from "react";
import { Card } from "../../../interfaces";
import Image from "next/image";
import Link from "next/link";

const MinimalCard: FC<{
  card: Card;
  className?: string;
  forDeck?: boolean;
}> = ({ card, className, forDeck }) => {
  const child = (
    <div className={`minimalCardContainer ${className}`}>
      <div
        className={
          forDeck
            ? "minimalCardImageDeckContainer"
            : "minimalCardImageContainer"
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.card_images[0].image_url}
          alt={card.name}
          className={"minimalCardImage"}
        />
        {/* <Image
        src={card.card_images[0].image_url}
        alt={card.name}
        className="minimalCardImage"
        fill
        priority
        sizes=""
      /> */}
      </div>
    </div>
  );

  return (
    <>
      {forDeck ? (
        <div>{child}</div>
      ) : (
        <Link href={`/cards/${card.id}`}>{child}</Link>
      )}
    </>
  );
};

export default MinimalCard;
