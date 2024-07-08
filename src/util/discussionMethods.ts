import apiUrl from "./getApiPath";

process.env.NODE_TLS_REJECT_UNAUTHORIZED =
  process.env.NODE_ENV === "development" ? "0" : "1";

export const getAllPosts = async () => {
  try {
    console.log(`${apiUrl}/api/Post`);
    const response = await fetch(`${apiUrl}/api/Post`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error("Error Fetching Posts:", e);
    throw new Error("An error occurred while fetching Posts.");
  }
};
