import React, { Suspense } from "react";
import { getAllCards } from "@/util/getCards";
import { Card } from "../../../interfaces";
import LoadingSpinner from "./loading";
import CardList from "./_components/CardList";

// this is a Server Component based Page
const CardPage = async () => {
  const cards: Card[] = await getAllCards();
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CardList fetchedCards={cards} />
    </Suspense>
  );
};

export default CardPage;
