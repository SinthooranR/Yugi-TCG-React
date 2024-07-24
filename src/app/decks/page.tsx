import React, { Suspense } from "react";
import LoadingSpinner from "../cards/loading";
import { Card } from "../../../interfaces";
import { getAllCards } from "@/util/getCards";
import DeckBuilderPage from "./_components/DeckBuilderPage";

const DecksPage = async () => {
  const cards: Card[] = await getAllCards();
  return <DeckBuilderPage cards={cards} />;
};

export default DecksPage;
