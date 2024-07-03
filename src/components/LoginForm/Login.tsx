import React, { FormEvent } from "react";
import Input from "./Input";
import { loginUser } from "@/util/userMethods";
import { useAuth } from "@/util/auth-context";

const Login = () => {
  const { login } = useAuth();

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await loginUser({ email, password });

    if (response) {
      login(response);
    }
  };

  return (
    <form onSubmit={(e) => submitForm(e)}>
      <div className="flex flex-col p-4 items-start">
        <h1 className="text-2xl">Login</h1>
        <p className="text-lg text-slate-500">
          Resume building decks and continue discussions
        </p>
      </div>
      <Input label="Email" type="email" name="email" />
      <Input label="Password" type="password" name="password" />
      <div className="flex flex-col p-4 items-end">
        <button className="bg-slate-700 p-2 rounded text-white" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
