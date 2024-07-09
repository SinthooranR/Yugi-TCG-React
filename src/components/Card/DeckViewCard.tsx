import React, { FC } from "react";
import { Card } from "../../../interfaces";
import useStore from "@/store";
import { getAttributeImage } from "@/util/constants";
import Image from "next/image";

const DeckViewCard: FC<{ card: Card; index: number }> = ({ card, index }) => {
  const { cards, removeCard } = useStore((state) => ({
    cards: state.cards,
    removeCard: state.removeCard,
  }));

  return (
    <div className="flex flex-row justify-evenly gap-4 items-center py-4">
      <div className="w-1/3">
        <Image
          src={getAttributeImage(card.attribute, card.frameType)}
          height={40}
          width={40}
          alt={card.attribute ?? "attribute"}
          quality={100}
        />
      </div>
      <h1 className="w-1/3">{card.name}</h1>
      <h1 className="w-1/3">{card.type}</h1>
      <button className="cursor-pointer" onClick={() => removeCard(index)}>
        X
      </button>
    </div>
  );
};

export default DeckViewCard;
