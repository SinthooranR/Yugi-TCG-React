import React, { Suspense } from "react";
import LoadingSpinner from "../cards/loading";
import DeckList from "./_components/DeckList";

const DecksPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DeckList />
    </Suspense>
  );
};

export default DecksPage;
