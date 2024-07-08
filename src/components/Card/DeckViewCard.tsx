import React, { FC } from "react";
import { Card } from "../../../interfaces";
import useStore from "@/store";

const DeckViewCard: FC<{ card: Card; index: number }> = ({ card, index }) => {
  const { cards, removeCard } = useStore((state) => ({
    cards: state.cards,
    removeCard: state.removeCard,
  }));
  return (
    <div className="flex flex-row justify-evenly gap-4 items-start py-4">
      <h1 className="w-1/3">{card.attribute || "N/A"}</h1>
      <h1 className="w-1/3">{card.name}</h1>
      <h1 className="w-1/3">{card.type}</h1>
      <button className="cursor-pointer" onClick={() => removeCard(index)}>
        X
      </button>
    </div>
  );
};

export default DeckViewCard;
