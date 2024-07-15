import React, { useState } from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  onSearch: (query: string) => void; // Updated prop name
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
  onSearch, // Updated prop name
}) => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length === 0) {
      onSearch("");
    }
  };

  const filterSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav className="flex md:flex-row flex-col justify-center items-center py-5 md:w-full wrap gap-4">
      <form onSubmit={(e) => filterSearch(e)} className="mr-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="px-4 py-2 rounded-md border border-gray-300 mr-2"
        />
      </form>
      <div className="flex items-center gap-10">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-violet-500 hover:bg-violet-600 text-white"
          }`}
        >
          Previous
        </button>

        <div className="flex items-center">
          <span className="mr-2 font-medium">{currentPage}</span>
          <span className="text-gray-500">of</span>
          <span className="ml-2">{pageNumbers.length}</span>
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === pageNumbers.length}
          className={`px-4 py-2 rounded-md ${
            currentPage === pageNumbers.length
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-violet-500 bg-violet-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
