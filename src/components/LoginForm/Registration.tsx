import React, { FC, FormEvent, useState } from "react";
import Input from "./Input";
import { registerUser } from "@/util/userMethods";
import { useRouter } from "next/navigation";

interface RegisterProps {
  hasRegistered: (val: boolean) => void;
}

const Registration: FC<RegisterProps> = ({ hasRegistered }) => {
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const confirmEmail = formData.get("confirmEmail") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const response = await registerUser({
      username,
      email,
      confirmEmail,
      password,
      confirmPassword,
    });

    if (response) {
      hasRegistered(true);
    }
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
