import React, { FC } from "react";
import { Card } from "../../../interfaces";
import CloseIcon from "../Icons/CloseIcon";
import Image from "next/image";
import Link from "next/link";
import useStore from "@/store";

const CardItem: FC<{ name?: string; value?: string | number }> = ({
  name,
  value,
}) => {
  return (
    <span className="flex gap-1 font-bold">
      <h2 className="font-medium capitalize">{name}:</h2>
      <p className="font-medium capitalize">{value}</p>
    </span>
  );
};

const DetailsModal: FC<{ card: Card }> = ({ card }) => {
  const { setInfoCard } = useStore((state) => ({
    removeCard: state.removeCard,
    setInfoCard: state.setInfoCard,
  }));
  const filterCardTypes = ["spell", "trap"];
  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40 "
        onClick={() => setInfoCard(null)}
      ></div>
      <div
        className="fixed z-50 bg-white py-8 px-10 w-3/4 md:w-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-start items-center gap-4 h-[90vh] overflow-y-auto scrollbar animate-fadeIn rounded-2xl"
        style={{ top: "52%", left: "50%" }}
      >
        <h1 className="capitialize">{card.name}</h1>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.imageUrl ?? card.card_images[0].image_url_small}
          alt={card.name}
          className="minimalCardImageDeckContainer"
        />
        <h2>{card.desc}</h2>
        {!filterCardTypes.includes(card.frameType) && (
          <CardItem name="Attack" value={card.atk} />
        )}
        {!filterCardTypes.includes(card.frameType) && (
          <CardItem name="Defense" value={card.def} />
        )}

        <CardItem name="Type" value={card.type} />

        <CardItem
          name="Attribute"
          value={
            filterCardTypes.includes(card.frameType)
              ? card.frameType
              : card.attribute
          }
        />

        {card.race && <CardItem name="Race" value={card.race} />}

        <Link
          href={card.shopUrl ?? card.ygoprodeck_url}
          className="capitialize"
        >
          TO SHOP
        </Link>

        <button
          className="p-2 fixed top-3 right-6"
          onClick={() => setInfoCard(null)}
        >
          <CloseIcon />
        </button>
      </div>
    </>
  );
};

export default DetailsModal;
