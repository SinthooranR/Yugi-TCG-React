"use client";

import React, { FC, useState } from "react";
import CardList from "./CardList";
import { Card } from "../../../../interfaces";
import DeckSelector from "./DeckSelector";
import DeckManager from "./DeckManager";

const DeckBuilderPage: FC<{ cards: Card[] }> = ({ cards }) => {
  const [deckId, setDeckId] = useState<number>();

  return (
    <div className="flex justify-start divide-x divide-slate-950">
      <CardList fetchedCards={cards} />
      {deckId ? (
        <DeckManager id={deckId} />
      ) : (
        <DeckSelector onClick={(id) => setDeckId(id)} />
      )}
    </div>
  );
};

export default DeckBuilderPage;
