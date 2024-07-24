import delayCall, { apiUrlYtcg } from "./constants";

export const getAllCards = async (variant?: boolean) => {
  try {
    delayCall(2000);

    const response = await fetch(apiUrlYtcg, { cache: "no-store" });

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

export const getCardById = async (id: number) => {
  try {
    delayCall(2000);
    const response = await fetch(`${apiUrlYtcg}?id=${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cards");
    }

    const data = await response.json();
    return data.data[0];
  } catch (error) {
    console.error("Error fetching cards");
    throw error;
  }
};
