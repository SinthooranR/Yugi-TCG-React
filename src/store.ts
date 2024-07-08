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
      if (state.cards.length < 40) {
        return { cards: [...state.cards, card] };
      } else {
        console.log("Maximum card limit reached (40).");
        return state;
      }
    }),
  removeCard: (index) =>
    set((state) => ({
      cards: state.cards.filter((_, i) => i !== index),
    })),
}));

export default useStore;
