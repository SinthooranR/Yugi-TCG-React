"use client";

import React, { FC, useState } from "react";
import CardList from "./CardList";
import { Card } from "../../../../interfaces";
import DeckSelector from "./DeckSelector";
import DeckManager from "./DeckManager";

const DeckBuilderPage: FC<{ cards: Card[] }> = ({ cards }) => {
  const [deckId, setDeckId] = useState<number | null>();

  return (
    <>
      {deckId ? (
        <>
          <div className="flex flex-col md:flex-row">
            <DeckManager id={deckId} goBack={() => setDeckId(null)} />

            <CardList fetchedCards={cards} />
          </div>
        </>
      ) : (
        <DeckSelector onClick={(id) => setDeckId(id)} />
      )}
    </>
  );
};

export default DeckBuilderPage;
