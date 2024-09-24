import React from "react";

interface PagenationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const Pagenation: React.FC<PagenationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`px-4 py-2 rounded mx-1 ${
            number === currentPage
              ? "bg-purple-400 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagenation;
