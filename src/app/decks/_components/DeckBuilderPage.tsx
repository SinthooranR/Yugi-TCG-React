"use client";

import React, { FC, useState } from "react";
import CardList from "./CardList";
import { Card } from "../../../../interfaces";
import DeckSelector from "./DeckSelector";
import DeckManager from "./DeckManager";

const DeckBuilderPage: FC<{ cards: Card[] }> = ({ cards }) => {
  const [deckId, setDeckId] = useState<number | null>();

  return (
    <div className="relative">
      {deckId ? (
        <>
          <CardList fetchedCards={cards} />
          <DeckManager id={deckId} goBack={() => setDeckId(null)} />
        </>
      ) : (
        <DeckSelector onClick={(id) => setDeckId(id)} />
      )}
    </div>
  );
};

export default DeckBuilderPage;
