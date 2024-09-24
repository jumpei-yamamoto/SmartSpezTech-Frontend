import React from "react";

interface JobFilterProps {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  sortOrder: "newest" | "oldest" | "highestRate" | "lowestRate";
  setSortOrder: (
    value: "newest" | "oldest" | "highestRate" | "lowestRate"
  ) => void;
  totalJobs: number;
  currentPage: number;
}

const JobFilter: React.FC<JobFilterProps> = ({
  itemsPerPage,
  setItemsPerPage,
  sortOrder,
  setSortOrder,
  totalJobs,
  currentPage,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalJobs);

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4">
      <div className="text-gray-700">
        表示中{" "}
        <span className="font-bold">
          {startIndex}-{endIndex}
        </span>{" "}
        / <span className="font-bold">{totalJobs}</span> 案件
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <label htmlFor="show" className="text-gray-700 mr-2">
            表示:
          </label>
          <select
            id="show"
            className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="sort" className="text-gray-700 mr-2">
            ソート順:
          </label>
          <select
            id="sort"
            className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value as
                  | "newest"
                  | "oldest"
                  | "highestRate"
                  | "lowestRate"
              )
            }
          >
            <option value="newest">掲載日が新しい</option>
            <option value="oldest">掲載日が古い</option>
            <option value="highestRate">高単価</option>
            <option value="lowestRate">低単価</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
