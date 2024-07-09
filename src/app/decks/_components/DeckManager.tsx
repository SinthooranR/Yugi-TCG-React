import React, { FC, Fragment, useEffect, useState } from "react";
import useStore from "@/store";
import { getDecksById, updateDeck } from "@/util/getDecks";
import { Card, Deck } from "../../../../interfaces";
import DeckViewCard from "@/components/Card/DeckViewCard";
import { useAuth } from "@/util/auth-context";

const DeckManager: FC<{ id?: number; goBack: () => void }> = ({
  id,
  goBack,
}) => {
  const { user } = useAuth();

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

  const updateCards = async () => {
    console.log(cards);
    const response = await updateDeck(
      id as number,
      user?.userId as string,
      cards
    );
  };

  return (
    <div className="h-[50vh] overflow-y-scroll w-full py-16 flex flex-col justify-start items-center border-left md:w-1/2 md:h-screen">
      <div className="flex justify-evenly gap-16">
        <h1 className="text-2xl">{deckName || "Deck"}</h1>
        <div className="flex gap-2">
          <button
            className="bg-red-200 text-white p-2 rounded"
            onClick={() => goBack()}
          >
            CANCEL
          </button>
          <button
            className="bg-blue-400 text-white p-2 rounded"
            onClick={() => updateCards()}
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
      <h2 className="pt-8">Card Count: {cards.length}/60</h2>
      <div className="w-2/3 flex flex-row justify-evenly gap-4 items-start gap-4">
        <div className="w-1/3">
          <h1>Attribute</h1>
        </div>
        <div className="w-1/3">
          <h1>Name</h1>
        </div>
        <div className="w-1/3">
          <h1>Type</h1>
        </div>
        <div>
          <h1></h1>
        </div>
      </div>
      <div className="py-8 w-2/3">
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
