import React from "react";
import { Link } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import JobFilter from "../components/JobFilter";
import Pagenation from "../components/Pagenation";

const JobList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <FilterSidebar />
          </aside>

          {/* Job Listings */}
          <section className="md:col-span-3">
            <JobFilter />

            <div className="bg-white p-6 rounded-lg shadow-lg flex mb-6">
              <div className="flex-shrink-0">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Company Logo"
                  className="w-16 h-16"
                />
              </div>
              <div className="ml-6 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <Link to={"/jobdetail"} className="font-bold text-xl mb-1">
                      UI/UX Designer Fulltime
                    </Link>
                    <p className="text-gray-500">LinkedIn, New York, US</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded">
                      Adobe XD
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded">
                      Figma
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Recusandae architecto eveniet, dolor quo repellendus pariatur.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-green-500 font-bold">$500/Hour</span>
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex mb-6">
              <div className="flex-shrink-0">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Company Logo"
                  className="w-16 h-16"
                />
              </div>
              <div className="ml-6 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-bold text-xl mb-1">
                      Full Stack Engineer
                    </h3>
                    <p className="text-gray-500">
                      Adobe Illustrator, New York, US
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded">
                      Adobe XD
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded">
                      Figma
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Recusandae architecto eveniet, dolor quo repellendus pariatur.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-green-500 font-bold">$800/Hour</span>
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex mb-6">
              <div className="flex-shrink-0">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Company Logo"
                  className="w-16 h-16"
                />
              </div>
              <div className="ml-6 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-bold text-xl mb-1">
                      Java Software Engineer
                    </h3>
                    <p className="text-gray-500">Blog Search, New York, US</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded">
                      Adobe XD
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded">
                      Figma
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Recusandae architecto eveniet, dolor quo repellendus pariatur.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-green-500 font-bold">$250/Hour</span>
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            {/* Additional job listings go here */}

            <div className="flex justify-center mt-8">
              <Pagenation />
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">Subscribe to our newsletter</p>
          <input
            type="email"
            placeholder="Enter your email here"
            className="w-full max-w-xs px-4 py-2 border rounded mb-4"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Subscribe
          </button>
        </div>
      </footer>
    </div>
  );
};

export default JobList;
