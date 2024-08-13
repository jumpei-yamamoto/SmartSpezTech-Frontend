import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">Job LIST</div>
        <nav className="flex space-x-4">
          <Link to={"/"} className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link to={"/joblist"} className="text-gray-700 hover:text-gray-900">
            Find a Job
          </Link>
          <Link
            to={"/companylist"}
            className="text-gray-700 hover:text-gray-900"
          >
            Companies
          </Link>
          <Link
            to={"/engineerlist"}
            className="text-gray-700 hover:text-gray-900"
          >
            Engineers
          </Link>
          <Link to={"/jobdetail"} className="text-gray-700 hover:text-gray-900">
            Pages
          </Link>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Blog
          </a>
        </nav>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Sign in
        </button>
      </div>
    </header>
  );
};

export default Header;
