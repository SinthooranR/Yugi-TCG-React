"use client";

import React, { FC, Fragment, useState } from "react";
import { Card } from "../../../../interfaces";
import MinimalCard from "../../../components/Card";
import Pagination from "@/app/cards/_components/paginator";
import AddIcon from "@/components/Icons/AddIcon";
import CloseIcon from "@/components/Icons/CloseIcon";

const CardList: FC<{ fetchedCards: Card[] }> = ({ fetchedCards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(100);
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
      {showList ? (
        <div className="overflow-y-scroll scrollbar w-full py-4 flex flex-col justify-start items-center border-left md:w-1/2 h-[50vh] fixed bg-red-200 left-4 bottom-2 rounded z-50">
          <button
            className="absolute right-2 top-6 rounded-full cursor-pointer p-4"
            onClick={() => setShowList(false)}
          >
            <CloseIcon />
          </button>

          <h1>Card Directory</h1>
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
                  <MinimalCard card={card} className="animate-fadeIn" forDeck />
                </Fragment>
              ))}
          </div>
        </div>
      ) : (
        <button
          className="fixed left-3 bottom-6 rounded-full cursor-pointer p-4 bg-yellow-500"
          onClick={() => setShowList(true)}
        >
          <AddIcon />
        </button>
      )}
    </>
  );
};

export default CardList;
