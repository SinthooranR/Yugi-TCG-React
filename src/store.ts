import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Card } from "../interfaces";

interface StoreState {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  removeCard: (index: number) => void;
}

const useStore = create<StoreState>()((set) => ({
  cards: [],
  setCards: (cards) => set({ cards }),
  addCard: (card) =>
    set((state) => {
      const sameIdCards = state.cards.filter((c) => c.id === card.id).length;

      if (state.cards.length < 60 && sameIdCards < 3) {
        return { cards: [...state.cards, card] };
      } else {
        state.cards.length >= 60
          ? "Maximum card limit reached (60)."
          : "Cannot add more than 3 of the same cards.";
        return state;
      }
    }),
  removeCard: (index) =>
    set((state) => ({
      cards: state.cards.filter((_, i) => i !== index),
    })),
}));

export default useStore;
