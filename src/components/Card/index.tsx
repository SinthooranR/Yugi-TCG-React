import React, { FC } from "react";
import { Card } from "../../../interfaces";
import Image from "next/image";
import Link from "next/link";

const MinimalCard: FC<{ card: Card }> = ({ card }) => {
  return (
    <Link href={`cards/${card.id}`}>
      <div className="minimalCardContainer">
        <div className="minimalCardImageContainer">
          <Image
            src={card.card_images[0].image_url}
            alt={card.name}
            className="minimalCardImage"
            layout="fill"
            sizes=""
          />
        </div>
      </div>
    </Link>
  );
};

export default MinimalCard;
