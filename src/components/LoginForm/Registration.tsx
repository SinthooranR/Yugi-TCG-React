import React, { FormEvent, useState } from "react";
import Input from "./Input";

const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      // const response = await loginUser({ email, password });

      // if (response) {
      //   login(response);
      // }
    };
  };

  return (
    <form onSubmit={(e) => submitForm(e)}>
      <div className="flex flex-col p-4 items-start">
        <h1 className="text-2xl">Registration</h1>
        <p className="text-lg text-slate-500">
          Begin building decks and join discussions
        </p>
      </div>
      <Input label="Username" type="text" name="username" />
      <Input label="Email" type="email" name="email" />
      <Input label="Confirm Email" type="email" name="confirmEmail" />
      <Input label="Password" type="password" name="password" />
      <Input label="Confirm Password" type="password" name="confirmPassword" />
      <div className="flex flex-col p-4 items-end">
        <button className="bg-slate-700 p-2 rounded text-white" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Registration;
