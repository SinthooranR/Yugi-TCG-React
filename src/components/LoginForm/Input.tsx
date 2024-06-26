import React, { FC } from "react";

interface IFormInputProps {
  label: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
}

const Input: FC<IFormInputProps> = ({ label, type, value, setValue }) => {
  return (
    <div className="flex flex-col p-4 items-start">
      <label className="text-gray-700">{label}</label>
      <input
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
