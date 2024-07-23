export interface CardList {
  data: Card[];
}

export interface Card {
  id: number;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  atk: number;
  def: number;
  level: number;
  race: string;
  attribute: string;
  archetype: string;
  ygoprodeck_url: string;
  card_images: [
    {
      id: number;
      image_url: string;
      image_url_small: string;
      image_url_cropped: string;
    }
  ];
  card_prices: [
    {
      ebay_price: number;
      amazon_price: number;
    }
  ];

  //Additional modified properties with .NET API
  urlId?: number;
  imageUrl?: string;
  shopUrl?: string;
}

export interface Deck {
  id: number;
  name: string;
  cards: Card[];
}

export interface Post {
  id: number;
  userId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
  postRatings: PostRating[];
}

export interface PostRating {
  id: number;
  postId: number;
  userId: string;
  isThumbsUp?: boolean;
}

export interface Reply {
  createdAt: string;
  updatedAt: string;
  id: number;
  text: string;
  postId: number;
  userId: number;
}

export interface FilterEventData {
  selected: string;
  filterType: string;
}

export interface FilterOption {
  label: string;
  options: any[]; // Array of filter options
  selected: string; // Variable to store the selected value
  filterType: string; // Type of filter
}
