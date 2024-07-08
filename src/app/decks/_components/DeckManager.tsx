import React, { FC, useEffect } from "react";
import useStore from "@/store";
import { getDecksById } from "@/util/getDecks";
import { Card, Deck } from "../../../../interfaces";

const DeckManager: FC<{ id?: number }> = ({ id }) => {
  const { cards, setCards, addCard, removeCard } = useStore((state) => ({
    cards: state.cards,
    setCards: state.setCards,
    addCard: state.addCard,
    removeCard: state.removeCard,
  }));

  console.log(cards);

  useEffect(() => {
    const loadDeck = async () => {
      const initialCards: Deck = await getDecksById(id);
      setCards(initialCards.cards);
    };
    id && loadDeck();
  }, [id, setCards]);
  return (
    <div className="h-screen overflow-y-scroll w-1/2 py-16 flex flex-col justify-start items-center border-left">
      {cards &&
        cards.length > 0 &&
        cards.map((card: Card, index) => <div key={index}>{card.name}</div>)}
    </div>
  );
};

export default DeckManager;
