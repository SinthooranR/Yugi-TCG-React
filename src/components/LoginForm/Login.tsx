import React, { FC, FormEvent, useState } from "react";
import Input from "./Input";

interface LoginProps {}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={(e) => submitForm(e)}>
      <div className="flex flex-col p-4 items-start">
        <h1 className="text-2xl">Login</h1>
        <p className="text-lg text-slate-500">
          Resume building decks and continue discussions
        </p>
      </div>
      <Input label="Email" type="email" value={email} setValue={setEmail} />
      <Input
        label="Password"
        type="password"
        value={password}
        setValue={setPassword}
      />
      <div className="flex flex-col p-4 items-end">
        <button className="bg-slate-700 p-2 rounded text-white">Submit</button>
      </div>
    </form>
  );
};

export default Login;
