import React from "react";

const LoadingSpinner = () => {
  return (
    <svg
      className="animate-spin h-5 w-5 text-gray-500 mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="#000"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="#000"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm14-1.454A7.962 7.962 0 0120 12h4c0 4.418-3.582 8-8 8v-4zm-14-1.454v-4H0c0 4.418 3.582 8 8 8v-4a3.993 3.993 0 01-2-2.907zM14 4.709V8h3.291A7.946 7.946 0 0114 4.709z"
      ></path>
    </svg>
  );
};

export default LoadingSpinner;
