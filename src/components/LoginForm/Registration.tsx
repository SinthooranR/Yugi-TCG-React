import React, { FormEvent, useState } from "react";
import Input from "./Input";

const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form
      className="bg-white px-24 py-12 rounded-lg"
      onSubmit={(e) => submitForm(e)}
    >
      <div className="flex flex-col p-4 items-start">
        <h1 className="text-2xl">Register</h1>
        <p className="text-lg text-slate-500">
          Begin building decks and joining discussions
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

      <p>Already have an account? Login here.</p>
    </form>
  );
};

export default Registration;
