import React from "react";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import Pagenation from "../components/Pagenation";
import JobFilter from "../components/JobFilter";
import { Link } from "react-router-dom";

const engineers = [
  {
    name: "Robert Fox",
    position: "UI/UX Designer",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Cody Fisher",
    position: "Python Developer",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Jerome Bell",
    position: "Content Manager",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Robert Fox",
    position: "UI/UX Designer",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Cody Fisher",
    position: "Python Developer",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Jerome Bell",
    position: "Content Manager",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Robert Fox",
    position: "UI/UX Designer",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Cody Fisher",
    position: "Python Developer",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Jerome Bell",
    position: "Content Manager",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Robert Fox",
    position: "UI/UX Designer",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Cody Fisher",
    position: "Python Developer",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Jerome Bell",
    position: "Content Manager",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Robert Fox",
    position: "UI/UX Designer",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Cody Fisher",
    position: "Python Developer",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "Jerome Bell",
    position: "Content Manager",
    rating: 65,
    location: "Chicago, US",
    rate: "$45/hour",
    skills: ["Figma", "Adobe XD", "PSD", "App", "Digital"],
    imgSrc: "https://via.placeholder.com/150",
  },
];

const EngineerList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <JobFilter /> {/* JobFilterを読み込む */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <FilterSidebar />
          </aside>

          {/* Engineer Listings */}
          <section className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 15 }).map((_, index) => (
                <div
                  key={index}
                  className={`bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 h-80 flex flex-col justify-between ${
                    engineers[index] ? "" : "opacity-0"
                  }`}
                >
                  {engineers[index] && (
                    <>
                      <div className="flex justify-center mb-2">
                        <img
                          src={engineers[index].imgSrc}
                          alt={`${engineers[index].name}`}
                          className="w-16 h-16 rounded-full"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-center mb-1">
                        <Link to="/engineerdetail">
                          {engineers[index].name}
                        </Link>
                      </h3>
                      <p className="text-center text-gray-600 mb-1">
                        {engineers[index].position}
                      </p>
                      <div className="text-center text-yellow-500 mb-2">
                        {"★".repeat(5)}{" "}
                        <span className="text-gray-600">
                          ({engineers[index].rating})
                        </span>
                      </div>
                      <p className="text-gray-600 text-center text-sm mb-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vero repellendus magni, atq...
                      </p>
                      <div className="flex flex-wrap justify-center gap-1 mb-2">
                        {engineers[index].skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <div>
                          <i className="fas fa-map-marker-alt mr-1"></i>
                          {engineers[index].location}
                        </div>
                        <div>
                          <i className="fas fa-dollar-sign mr-1"></i>
                          {engineers[index].rate}
                        </div>
                      </div>
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

export default EngineerList;
