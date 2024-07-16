"use client";

import React, { FC, Fragment, useState } from "react";
import { Card } from "../../../../interfaces";
import MinimalCard from "../../../components/Card";
import Pagination from "./paginator";
import DetailsModal from "@/components/Card/DetailsModal";
import useStore from "@/store";

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

  const { infoCard } = useStore((state) => ({
    infoCard: state.infoCard,
  }));

  return (
    <div className="py-12">
      <Pagination
        itemsPerPage={cardsPerPage}
        totalItems={totalFilteredCards}
        currentPage={currentPage}
        paginate={paginate}
        onSearch={handleSearch}
      />

      <div className="flex flex-wrap gap-4 justify-center">
        {filteredCards.slice(indexOfFirstCard, indexOfLastCard).map((card) => (
          <Fragment key={card.id}>
            <MinimalCard card={card} className="animate-fadeIn" />
          </Fragment>
        ))}
      </div>
      {infoCard?.name && <DetailsModal card={infoCard} />}
    </div>
  );
};

export default CardList;
