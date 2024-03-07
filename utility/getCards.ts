import { apiUrl } from "./constants";

export const getAllCards = async () => {
  try {
    const response = await fetch(apiUrl, { next: { revalidate: 30 } });

    if (!response.ok) {
      throw new Error("Failed to fetch cards");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching cards");
    throw error;
  }
};
