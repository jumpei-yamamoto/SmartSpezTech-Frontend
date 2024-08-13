import React from "react";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import Pagenation from "../components/Pagenation";
import { Link } from "react-router-dom";

const companies = [
  {
    name: "Car Toys",
    rating: 66,
    location: "New York, US",
    jobsOpen: 12,
  },
  {
    name: "Carols Daughter",
    rating: 18,
    location: "London, UK",
    jobsOpen: 25,
  },
  {
    name: "Amazon",
    rating: 52,
    location: "Tokyo, Japan",
    jobsOpen: 54,
  },
  {
    name: "Baseball Savings",
    rating: 85,
    location: "Chicago, US",
    jobsOpen: 6,
  },
  {
    name: "Ashford",
    rating: 25,
    location: "Toronto, Italia",
    jobsOpen: 67,
  },
  {
    name: "Callaway Golf",
    rating: 34,
    location: "San Francisco, US",
    jobsOpen: 45,
  },
  {
    name: "Car Toys",
    rating: 66,
    location: "New York, US",
    jobsOpen: 12,
  },
  {
    name: "Carols Daughter",
    rating: 18,
    location: "London, UK",
    jobsOpen: 25,
  },
  {
    name: "Amazon",
    rating: 52,
    location: "Tokyo, Japan",
    jobsOpen: 54,
  },
  {
    name: "Baseball Savings",
    rating: 85,
    location: "Chicago, US",
    jobsOpen: 6,
  },
  {
    name: "Ashford",
    rating: 25,
    location: "Toronto, Italia",
    jobsOpen: 67,
  },
  {
    name: "Callaway Golf",
    rating: 34,
    location: "San Francisco, US",
    jobsOpen: 45,
  },
  {
    name: "Callaway Golf",
    rating: 34,
    location: "San Francisco, US",
    jobsOpen: 45,
  },
  {
    name: "Car Toys",
    rating: 66,
    location: "New York, US",
    jobsOpen: 12,
  },
  {
    name: "Carols Daughter",
    rating: 18,
    location: "London, UK",
    jobsOpen: 25,
  },
  {
    name: "Amazon",
    rating: 52,
    location: "Tokyo, Japan",
    jobsOpen: 54,
  },
];

const CompanyList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <FilterSidebar />
          </aside>

          {/* Company Listings */}
          <section className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 15 }).map((_, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 h-64 flex flex-col justify-between ${
                    companies[index] ? "" : "opacity-0"
                  }`}
                >
                  {companies[index] && (
                    <>
                      <div className="flex justify-center mb-4">
                        <img
                          src={`https://via.placeholder.com/50?text=${companies[
                            index
                          ].name.charAt(0)}`}
                          alt={`${companies[index].name} logo`}
                          className="w-12 h-12"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">
                        <Link to={`/companydetail`}>
                          {companies[index].name}
                        </Link>
                      </h3>
                      <div className="text-center text-yellow-500 mb-2">
                        {"★".repeat(5)}{" "}
                        <span className="text-gray-600">
                          ({companies[index].rating})
                        </span>
                      </div>
                      <p className="text-center text-gray-500 mb-4">
                        {companies[index].location}
                      </p>
                      <a
                        href="#"
                        className="block text-center text-blue-500 hover:underline"
                      >
                        {companies[index].jobsOpen} Jobs Open
                      </a>
                    </>
                  )}
                </div>
              ))}
            </div>
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

export default CompanyList;
