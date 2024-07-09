"use client";

import { useAuth } from "@/util/auth-context";
import { getDecksByUserId } from "@/util/getDecks";
import React, { FC, Fragment, useEffect, useState } from "react";
import { getAllCards } from "@/util/getCards";

interface Deck {
  id: number;
  name: string;
  cards: [];
}

const DeckSelector: FC<{ onClick: (id: number) => void }> = ({ onClick }) => {
  const { user } = useAuth();
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getDecksByUserId(user?.userId);
      if (data) {
        setDecks(data);
      }
    };

    user?.userId && getData();
  }, [user]);

  return (
    <div className="h-[50vh] overflow-y-scroll w-full py-16 flex flex-col justify-start items-center border-left md:w-1/2 md:h-screen">
      <h1 className="text-3xl text-center">My Decks</h1>
      <div className="py-8 flex justify-evenly w-full flex-wrap">
        {decks && decks.length > 0 ? (
          decks.map((deck) => (
            <Fragment key={deck.id as number}>
              <h1
                className="bg-slate-300 p-2 rounded cursor-pointer"
                onClick={() => onClick(deck.id)}
              >
                {deck.name}
              </h1>
            </Fragment>
          ))
        ) : (
          <h1 className="flex flex-row justify-center">
            Fetching Decks, or none are found!
          </h1>
        )}
      </div>
    </div>
  );
};

export default DeckSelector;
