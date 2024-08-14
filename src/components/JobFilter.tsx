import React from "react";

const JobFilter: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4">
      <div className="text-gray-700">
        表示中 <span className="font-bold">41-60</span> /{" "}
        <span className="font-bold">944</span> 案件
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <label htmlFor="show" className="text-gray-700 mr-2">
            表示:
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
            ソート順:
          </label>
          <select
            id="sort"
            className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>掲載日が新しい</option>
            <option>掲載日が古い</option>
            <option>高単価</option>
            <option>低単価</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
