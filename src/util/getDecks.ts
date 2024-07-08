import apiUrl from "./getApiPath";

export const getDecksByUserId = async (userId?: string) => {
  try {
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
    const response = await fetch(`${apiUrl}/api/Deck?deckId=${deckId}`);

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
