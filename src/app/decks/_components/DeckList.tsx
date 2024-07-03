"use client";

import { useAuth } from "@/util/auth-context";
import { getDecksByUserId } from "@/util/getDecks";
import React, { Fragment, useEffect, useState } from "react";

interface Deck {
  id: number;
  name: string;
  cards: [];
}

const DeckList = () => {
  const { user } = useAuth();
  const [decks, setDecks] = useState<Deck[]>([]);

  console.log(user?.userId);

  useEffect(() => {
    const getData = async () => {
      const data = await getDecksByUserId(user?.userId);
      if (data) {
        setDecks(data);
      }
    };

    user?.userId && getData();
  }, [user]);

  console.log("Decks", decks);

  return (
    <div className="py-16 flex flex-row justify-evenly items-center">
      {decks && decks.length > 0 ? (
        decks.map((deck) => (
          <Fragment key={deck.id as number}>
            <h1>{deck.name}</h1>
          </Fragment>
        ))
      ) : (
        <h1 className="flex flex-row justify-center">
          Fetching Decks, or none are found!
        </h1>
      )}
    </div>
  );
};

export default DeckList;
