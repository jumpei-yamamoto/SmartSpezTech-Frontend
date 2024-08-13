import React from "react";

const JobFilter: React.FC = () => {
  return (
    <div className="flex justify-center mt-8">
      <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mx-1">
        1
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded mx-1">
        2
      </button>
      <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mx-1">
        3
      </button>
      <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mx-1">
        4
      </button>
    </div>
  );
};

export default JobFilter;
