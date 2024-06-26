"use client";

import Login from "@/components/LoginForm/Login";
import Registration from "@/components/LoginForm/Registration";
import React, { FormEvent, useState } from "react";

const LoginPage = () => {
  const [authType, setAuthType] = useState(false);
  return (
    <main className="flex flex-col items-center justify-evenly p-2 bg-[url('/images/heroImage.webp')] min-h-screen w-full bg-cover bg-fill bg-center bg-no-repeat md:p-24">
      <div className="bg-white px-24 py-8 rounded-lg">
        {authType ? <Registration /> : <Login />}
        <div className="flex flex-row items-center gap-2 justify-center">
          <p className="text-gray-400">
            {authType ? "Already have an account?" : "Dont have an account?"}
          </p>
          <p className="cursor-pointer" onClick={() => setAuthType(!authType)}>
            {authType ? "Login here." : "Register here."}
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
