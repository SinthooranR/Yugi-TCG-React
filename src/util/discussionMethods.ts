import apiUrl from "./getApiPath";

process.env.NODE_TLS_REJECT_UNAUTHORIZED =
  process.env.NODE_ENV === "development" ? "0" : "1";

export const getAllPosts = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch(`${apiUrl}/api/Post`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (e) {
    console.error("Error Fetching Posts:", e);
    throw new Error("An error occurred while fetching Posts.");
  }
};

export const updatePostRating = async (
  postId: number,
  postValue: boolean | null,
  userId?: string
) => {
  try {
    const response = await fetch(`${apiUrl}/api/Post/${postId}`, {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId, isThumbsUp: postValue }),
    });

    if (!response.ok) {
      throw new Error("Failed to update rating");
    }

    const text = await response.text();

    return text;
  } catch (error) {
    console.error("Error updating rating:", error);
    throw error;
  }
};
