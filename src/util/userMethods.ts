import apiUrl from "./getApiPath";

interface ILogin {
  email: string;
  password: string;
}

const api = `${apiUrl}/api/User/login`;

export const loginUser = async (user: ILogin) => {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": apiUrl as string,
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.token) {
      throw new Error("Invalid login credentials. Please try again.");
    }

    return data.token;
  } catch (e) {
    console.error("Error logging in:", e);
    throw new Error("An error occurred during login. Please try again.");
  }
};
