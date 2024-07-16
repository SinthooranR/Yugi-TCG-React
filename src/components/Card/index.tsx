"use client";

import React, { FC, useState } from "react";
import { Card } from "../../../interfaces";
import Link from "next/link";
import useStore from "@/store";
import InfoIcon from "../Icons/InfoIcon";
import AddIcon from "../Icons/AddIcon";

const MinimalCard: FC<{
  card: Card;
  className?: string;
  forDeck?: boolean;
}> = ({ card, className, forDeck }) => {
  const { cards, addCard, setInfoCard } = useStore((state) => ({
    setInfoCard: state.setInfoCard,
    cards: state.cards,
    addCard: state.addCard,
  }));

  const [showIcon, setShowIcon] = useState(false);

  const addCardToDeck = () => {
    addCard(card);
  };

  return (
    <div
      className={`minimalCardContainer ${className}`}
      onMouseOver={() => setShowIcon(true)}
      onMouseOut={() => setShowIcon(false)}
    >
      <div
        className={
          forDeck
            ? "minimalCardImageDeckContainer"
            : "minimalCardImageContainer"
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.card_images[0].image_url} alt={card.name} />
        {showIcon && (
          <div className="absolute -right-4 -top-2 flex flex-col animate-fadeIn z-50">
            {forDeck && (
              <button
                className="border-2 p-1 border-slate-950 rounded-full bg-blue-500 hover:bg-blue-600 "
                onClick={() => addCardToDeck()}
              >
                <AddIcon />
              </button>
            )}
            <button
              className="border-2 p-1 border-slate-950 rounded-full bg-yellow-500 hover:bg-yellow-600 "
              onClick={() => {
                setInfoCard(card);
                setShowIcon(false);
              }}
            >
              <InfoIcon />
            </button>
          </div>
        )}
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
};

export default MinimalCard;
