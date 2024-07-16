import React, { FC, useState } from "react";
import { Card } from "../../../interfaces";
import useStore from "@/store";
import { getAttributeImage } from "@/util/constants";
import Image from "next/image";
import CloseIcon from "../Icons/CloseIcon";
import InfoIcon from "../Icons/InfoIcon";

const DeckViewCard: FC<{
  card: Card;
  index: number;
  isListView: boolean;
}> = ({ card, index, isListView }) => {
  const { removeCard, setInfoCard } = useStore((state) => ({
    removeCard: state.removeCard,
    setInfoCard: state.setInfoCard,
  }));

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      {isListView ? (
        <div className="flex flex-row justify-evenly gap-4 items-center py-4 animate-fadeIn">
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

          <div className="flex gap-2 ">
            <button
              className="border-2 p-1 border-slate-950 rounded-full bg-blue-500 hover:bg-blue-600 "
              onClick={() => setInfoCard(card)}
            >
              <InfoIcon />
            </button>
            <button
              className="border-2 p-1 border-slate-950 rounded-full bg-red-500 hover:bg-red-600 "
              onClick={() => removeCard(index)}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="minimalCardContainer animate-fadeIn">
            <div
              className="minimalCardImageDeckContainer relative flex"
              onMouseOver={() => setIsHovered(true)}
              onMouseOut={() => setIsHovered(false)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.imageUrl ?? card?.card_images[0]?.image_url}
                alt={card.name}
                className="cursor-pointer"
              />
              {isHovered && (
                <div className="absolute -right-4 -top-2 flex flex-col animate-fadeIn">
                  <button
                    className="border-2 p-1 border-slate-950 rounded-full bg-red-500 hover:bg-red-600 "
                    onClick={() => removeCard(index)}
                  >
                    <CloseIcon />
                  </button>

                  <button
                    className="border-2 p-1 border-slate-950 rounded-full bg-yellow-500 hover:bg-yellow-600 "
                    onClick={() => setInfoCard(card)}
                  >
                    <InfoIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeckViewCard;
