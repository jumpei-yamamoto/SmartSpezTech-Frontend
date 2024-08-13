import React from "react";
import Header from "../components/Header";
import RightSidebar from "../components/RightSidebar";
import { FaFacebook, FaTwitter, FaReddit, FaWhatsapp } from "react-icons/fa";
import { IconContext } from "react-icons";

const JobDetail: React.FC = () => {
  return (
    <IconContext.Provider value={{ size: "24", className: "cursor-pointer" }}>
      <div className="min-h-screen bg-gray-100">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <img
              src="https://via.placeholder.com/1200x400"
              alt="Job Detail"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Senior Full Stack Engineer, Creator Success Full Time
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-4">
                      <i className="fas fa-briefcase mr-1"></i>Fulltime
                    </span>
                    <span>
                      <i className="fas fa-clock mr-1"></i>3 mins ago
                    </span>
                  </div>
                </div>
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg">
                  Apply now
                </button>
              </div>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Recusandae architecto eveniet, dolor quo repellendus pariatur.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Recusandae architecto eveniet, dolor quo repellendus pariatur.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content */}
            <section className="md:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">
                  Employment Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Employment Information Details */}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">
                  Essential Knowledge, Skills, and Experience
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {/* Knowledge, Skills, and Experience List */}
                </ul>
              </div>

              {/* Apply and Share Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
                <div className="flex space-x-4">
                  <button className="bg-green-500 text-white px-6 py-2 rounded-lg">
                    Apply now
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg">
                    Save job
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 font-bold">Share this</span>
                  <FaFacebook color="#1877F2" />
                  <FaTwitter color="#1DA1F2" />
                  <FaReddit color="#FF4500" />
                  <FaWhatsapp color="#25D366" />
                </div>
              </div>
            </section>

            {/* Right Sidebar */}
            <aside className="md:col-span-1">
              <RightSidebar />
            </aside>
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
    </IconContext.Provider>
  );
};

export default JobDetail;
