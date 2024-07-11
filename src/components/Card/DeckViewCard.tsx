import React, { FC } from "react";
import { Card } from "../../../interfaces";
import useStore from "@/store";
import { getAttributeImage } from "@/util/constants";
import Image from "next/image";

const DeckViewCard: FC<{ card: Card; index: number; isListView: boolean }> = ({
  card,
  index,
  isListView,
}) => {
  const { removeCard } = useStore((state) => ({
    removeCard: state.removeCard,
  }));

  return (
    <>
      {isListView ? (
        <div className="flex flex-row justify-evenly gap-4 items-center py-4">
          <div className="w-1/4">
            <Image
              src={getAttributeImage(card.attribute, card.frameType)}
              height={40}
              width={40}
              alt={card.attribute ?? "attribute"}
              quality={100}
            />
          </div>
          <h1 className="w-1/4">{card.name}</h1>
          <h1 className="w-1/4">{card.type}</h1>

          <button
            className="cursor-pointer w-1/4"
            onClick={() => removeCard(index)}
          >
            X
          </button>
        </div>
      ) : (
        <div className="minimalCardImageDeckContainer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.imageUrl ?? card?.card_images[0]?.image_url}
            alt={card.name}
            className={"minimalCardImage"}
          />
        </div>
      )}
    </>
  );
};

export default DeckViewCard;
