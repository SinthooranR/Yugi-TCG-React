"use client";

import React, { FC, Fragment, useState } from "react";
import { Card } from "../../../../interfaces";
import MinimalCard from "../../../components/Card";
import Pagination from "@/app/cards/_components/paginator";
import AddIcon from "@/components/Icons/AddIcon";
import CloseIcon from "@/components/Icons/CloseIcon";
import useStore from "@/store";

const CardList: FC<{ fetchedCards: Card[] }> = ({ fetchedCards }) => {
  const { deckView, splitDeckView } = useStore((state) => ({
    deckView: state.deckView,
    splitDeckView: state.splitDeckView,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(36);
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const filteredCards = fetchedCards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalFilteredCards = filteredCards.length;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const [showList, setShowList] = useState<boolean>(false);

  //overflow-y-scroll w-full py-12 flex flex-col justify-start items-center border-left md:w-1/2 h-[50vh] absolute bg-red-200 right-4 bottom-2 rounded

  //py-12 w-full h-[50vh] overflow-y-scroll md:h-screen"
  return (
    <>
      {deckView ? (
        <>
          <div
            className={`py-12 w-full h-[50vh] overflow-y-scroll  md:h-screen flex flex-col justify-center"`}
          >
            <h1 className="text-center pt-6 text-2xl">Card Directory</h1>
            <Pagination
              itemsPerPage={cardsPerPage}
              totalItems={totalFilteredCards}
              currentPage={currentPage}
              paginate={paginate}
              onSearch={handleSearch}
            />

            <div className="flex flex-wrap gap-4 justify-center">
              {filteredCards
                .slice(indexOfFirstCard, indexOfLastCard)
                .map((card) => (
                  <Fragment key={card.id}>
                    <MinimalCard card={card} className="" forDeck />
                  </Fragment>
                ))}
            </div>
            <button
              className="fixed right-8 top-16 rounded-full cursor-pointer p-4 bg-yellow-500 hover:bg-yellow-600 z-50"
              onClick={() => splitDeckView(false)}
            >
              <CloseIcon />
            </button>
          </div>
        </>
      ) : (
        <button
          className="fixed right-8 top-16 rounded-full cursor-pointer p-4 bg-yellow-500 hover:bg-yellow-600 z-50"
          onClick={() => splitDeckView(true)}
        >
          <AddIcon />
        </button>
      )}
    </>
  );
};

export default CardList;
