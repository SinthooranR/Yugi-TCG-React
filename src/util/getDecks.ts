import { Card } from "../../interfaces";
import delayCall from "./constants";
import apiUrl from "./getApiPath";

export const getDecksByUserId = async (userId?: string) => {
  try {
    delayCall(2000);
    const response = await fetch(`${apiUrl}/api/Deck?userId=${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      throw new Error("Invalid Deck");
    }

    return data;
  } catch (e) {
    console.error("Error Fetching Decks:", e);
    throw new Error("An error occurred while fetching Decks.");
  }
};

export const getDecksById = async (deckId?: number) => {
  try {
    delayCall(2000);
    const response = await fetch(`${apiUrl}/api/Deck/deckId?deckId=${deckId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      throw new Error("Invalid Deck");
    }

    return data;
  } catch (e) {
    console.error("Error Fetching Decks:", e);
    throw new Error("An error occurred while fetching Decks.");
  }
};

export const updateDeck = async (
  deckId: number,
  userId: string,
  cards: Card[]
) => {
  const apiCards = cards.map((card) => ({
    urlId: card.urlId ?? card.id,
    name: card.name,
    level: card.level,
    frameType: card.frameType,
    type: card.type,
    race: card.race,
    attribute: card.attribute ?? "N/A",
    atk: card.atk,
    def: card.def,
    desc: card.desc,
    imageUrl: card.imageUrl ?? card.card_images[0].image_url,
    shopUrl: card.shopUrl ?? card.ygoprodeck_url,
  }));

  try {
    const response = await fetch(
      `${apiUrl}/api/Card?deckId=${deckId}&userdId=${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiCards),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update deck");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating deck:", error);
    throw error;
  }
};
