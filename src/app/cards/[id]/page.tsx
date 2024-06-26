import { getAllCards, getCardById } from "@/utility/getCards";
import React, { FC } from "react";
import { Card } from "../../../../interfaces";
import Image from "next/image";
import { propertiesToShow } from "@/utility/constants";
import MinimalCard from "@/components/Card";

interface PageProps {
  params: {
    id: number;
  };
}

const CardInfo: FC<PageProps> = async ({ params }) => {
  const card: Card = await getCardById(params.id);
  const allCards: Card[] = await getAllCards();

  const similarCards = allCards
    .filter(
      (c: Card) =>
        (c.archetype === card.archetype || c.name.includes(card.archetype)) &&
        c.race === card.race &&
        c.name !== card.name
    )
    .slice(0, 15);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center gap-5 py-10 flex-wrap items-start">
        <div className="cardPageCardContainer">
          <Image
            src={card.card_images[0].image_url}
            alt={card.name}
            fill
            objectFit="contain"
            priority
          />
        </div>
        <div className="max-w-sm flex flex-col gap-5 items-start py-5">
          {propertiesToShow.map((property) => (
            <>
              {(card as any)[property.key] && (
                <p key={property.key} className="text-transform: capitalize">
                  <strong>{property.label}:</strong>{" "}
                  {(card as any)[property.key]}
                </p>
              )}
            </>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <h2 className="text-xl font-bold mb-4">Similar Cards</h2>
        <div className="flex flex-wrap justify-center gap-5">
          {similarCards.map((card: Card) => (
            <div
              key={card.id}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-md"
            >
              <MinimalCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
