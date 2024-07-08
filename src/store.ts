import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Card } from "../interfaces";

interface StoreState {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  removeCard: (index: number) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cards: [],
      setCards: (cards) => set({ cards }),
      addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
      removeCard: (index) =>
        set((state) => ({
          cards: state.cards.filter((_, i) => i !== index),
        })),
    }),
    {
      name: "cards-store",
    }
  )
);

export default useStore;
