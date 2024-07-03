import React, { FC } from "react";
import { Card } from "../../../interfaces";
import Image from "next/image";
import Link from "next/link";

const MinimalCard: FC<{ card: Card }> = ({ card }) => {
  return (
    <Link href={`/cards/${card.id}`}>
      <div className="minimalCardContainer">
        <div className="minimalCardImageContainer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.card_images[0].image_url}
            alt={card.name}
            className="minimalCardImage"
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
    </Link>
  );
};

export default MinimalCard;
