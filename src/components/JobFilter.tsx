import React from "react";

const JobFilter: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4">
      <div className="text-gray-700">
        Showing <span className="font-bold">41-60</span> of{" "}
        <span className="font-bold">944</span> jobs
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <label htmlFor="show" className="text-gray-700 mr-2">
            Show:
          </label>
          <select
            id="show"
            className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>50</option>
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="sort" className="text-gray-700 mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>Newest Post</option>
            <option>Oldest Post</option>
            <option>Highest Salary</option>
            <option>Lowest Salary</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
