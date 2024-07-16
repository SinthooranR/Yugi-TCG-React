import { create } from "zustand";
import { Card } from "../interfaces";

interface StoreState {
  cards: Card[];
  infoCard: Card | null;
  deckView: boolean; //true means its split false means not split
  setCards: (cards: Card[]) => void;
  setInfoCard: (card: Card | null) => void;
  addCard: (card: Card) => void;
  removeCard: (index: number) => void;
  splitDeckView: (val: boolean) => void;
}

const useStore = create<StoreState>()((set) => ({
  cards: [],
  infoCard: null,
  deckView: false,
  setCards: (cards) => set({ cards }),
  setInfoCard: (infoCard) => set({ infoCard }),
  splitDeckView: (deckView) => set({ deckView }),
  addCard: (card) =>
    set((state) => {
      const sameIdCards = state.cards.filter((c) => c.id === card.id).length;

      if (state.cards.length < 60 && sameIdCards < 3) {
        return { cards: [card, ...state.cards] };
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
