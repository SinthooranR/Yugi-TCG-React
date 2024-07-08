import React, { FC, Fragment, useEffect, useState } from "react";
import useStore from "@/store";
import { getDecksById } from "@/util/getDecks";
import { Card, Deck } from "../../../../interfaces";
import DeckViewCard from "@/components/Card/DeckViewCard";

const DeckManager: FC<{ id?: number }> = ({ id }) => {
  const { cards, setCards, addCard, removeCard } = useStore((state) => ({
    cards: state.cards,
    setCards: state.setCards,
    addCard: state.addCard,
    removeCard: state.removeCard,
  }));

  const [deckName, setDeckName] = useState<string>("");

  useEffect(() => {
    const loadDeck = async () => {
      const fetchedDeck: Deck = await getDecksById(id);
      setCards(fetchedDeck.cards);
      setDeckName(fetchedDeck.name);
    };

    id && loadDeck();
  }, [id, setCards]);

  return (
    <div className="h-screen overflow-y-scroll w-1/2 py-16 flex flex-col justify-start items-center border-left">
      <h1>{deckName || "Deck"}</h1>
      <h2>cardCount {cards.length}/40</h2>
      <div className="py-8">
        {cards &&
          cards.length > 0 &&
          cards.map((card: Card, index) => (
            <Fragment key={index}>
              <DeckViewCard card={card} index={index} />
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default DeckManager;
