import React, { FC, Fragment, useEffect, useState } from "react";
import useStore from "@/store";
import { getDecksById, updateDeck } from "@/util/getDecks";
import { Card, Deck } from "../../../../interfaces";
import DeckViewCard from "@/components/Card/DeckViewCard";
import { useAuth } from "@/util/auth-context";
import ListIcon from "@/components/Icons/ListIcon";
import GridIcon from "@/components/Icons/GridIcon";
import LoadingSpinner from "@/app/cards/loading";
import CloseIcon from "@/components/Icons/CloseIcon";
import DetailsModal from "@/components/Card/DetailsModal";

const DeckManager: FC<{ id?: number; goBack: () => void }> = ({
  id,
  goBack,
}) => {
  const { user } = useAuth();

  const { cards, setCards, infoCard, deckView } = useStore((state) => ({
    cards: state.cards,
    setCards: state.setCards,
    infoCard: state.infoCard,
    deckView: state.deckView,
  }));

  const [deckName, setDeckName] = useState<string>("");
  const [isListView, setIsListView] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadDeck = async () => {
      try {
        setLoading(true);
        const fetchedDeck: Deck = await getDecksById(id);
        setCards(fetchedDeck.cards);
        setDeckName(fetchedDeck.name);
      } catch (e) {
        console.log("Unknown Error", e);
      } finally {
        setLoading(false);
      }
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

  //overflow-y-scroll w-full py-12 flex flex-col justify-start items-center border-left md:w-1/2 h-[50vh] absolute bg-red-200 right-4 bottom-2 rounded

  return (
    <div
      className={`overflow-y-scroll w-full py-12 flex flex-col justify-start items-center border-left md:h-screen ${
        deckView && "h-[50vh]"
      }`}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex w-full py-5 justify-between items-center gap-8 px-24">
            <div className="flex gap-4">
              <button
                onClick={() => setIsListView(true)}
                className={`${isListView && `bg-violet-600 px-2 rounded`}`}
              >
                <ListIcon />
              </button>
              <button
                onClick={() => setIsListView(false)}
                className={`${!isListView && `bg-violet-600 px-2 rounded`}`}
              >
                <GridIcon />
              </button>
            </div>
            <h1 className="text-2xl">{deckName || "Deck"}</h1>
            <div className="flex flex-row gap-2 items-center">
              <button
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                onClick={() => goBack()}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-md bg-violet-500 hover:bg-violet-600 text-white"
                onClick={() => updateCards()}
              >
                Save
              </button>
            </div>
          </div>

          {isListView && (
            <div className="w-2/3 flex flex-row justify-evenly gap-4 items-center gap-4 pt-2">
              <div className="w-1/4">
                <h1>Attribute</h1>
              </div>
              <div className="w-1/4">
                <h1>Name</h1>
              </div>
              <div className="w-1/4">
                <h1>Type</h1>
              </div>
              <div className="">
                <h2>Cards: {cards.length}/60</h2>
              </div>
            </div>
          )}

          <div
            className={`${
              isListView ? `w-2/3` : `flex flex-wrap gap-4 justify-center`
            }`}
          >
            {cards &&
              cards.length > 0 &&
              cards.map((card: Card, index) => (
                <Fragment key={index}>
                  <DeckViewCard
                    card={card}
                    index={index}
                    isListView={isListView}
                  />
                </Fragment>
              ))}
          </div>
          {infoCard?.name && <DetailsModal card={infoCard} />}
        </>
      )}
    </div>
  );
};

export default DeckManager;
