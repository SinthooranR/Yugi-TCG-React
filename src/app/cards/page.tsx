import React from "react";
import { getAllCards } from "../../../utility/getCards";

const CardPage = async () => {
  const cards = await getAllCards();

  return <div></div>;
};

export default CardPage;
