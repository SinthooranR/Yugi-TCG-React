import apiUrl from "./getApiPath";

process.env.NODE_TLS_REJECT_UNAUTHORIZED =
  process.env.NODE_ENV === "development" ? "0" : "1";

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/Post`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.error("Error Fetching Posts:", e);
    throw new Error("An error occurred while fetching Posts.");
  }
};
