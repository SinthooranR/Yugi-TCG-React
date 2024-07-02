import apiUrl from "./getApiPath";

interface ILogin {
  email: string;
  password: string;
}

interface IRegister {
  username: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

export const loginUser = async (user: ILogin) => {
  try {
    const response = await fetch(`${apiUrl}/api/User/login`, {
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

export const registerUser = async (user: IRegister) => {
  try {
    if (user.email !== user.confirmEmail) {
      throw new Error(`Emails are not matching`);
    }

    if (user.password !== user.confirmPassword) {
      throw new Error(`Passwords are not matching`);
    }

    const response = await fetch(`${apiUrl}/api/User`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": apiUrl as string,
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return "Registered Successfully";
  } catch (e) {
    console.error("Error registering user:", e);
    throw new Error("An error occurred during registration. Please try again.");
  }
};
