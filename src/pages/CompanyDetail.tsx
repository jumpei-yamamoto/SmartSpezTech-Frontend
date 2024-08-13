import React from "react";
import Header from "../components/Header";
import Pagenation from "../components/Pagenation";
import {
  FaMapMarkerAlt,
  FaCheck,
  FaEnvelope,
  FaClock,
  FaBriefcase,
  FaPhoneAlt,
} from "react-icons/fa";
import { IconContext } from "react-icons";

const CompanyDetail: React.FC = () => {
  return (
    <IconContext.Provider
      value={{
        size: "20px",
        style: { marginRight: "8px", verticalAlign: "middle" },
      }}
    >
      <div className="min-h-screen bg-gray-100">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <img
              src="https://via.placeholder.com/1200x400"
              alt="Company Image"
              className="w-full h-64 object-cover"
            />
            <div className="p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  AliThemes
                </h2>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaMapMarkerAlt />
                  <span>New York, US</span>
                </div>
                <p className="text-lg text-gray-700 mb-2">
                  Our Mission to make working life simple
                </p>
              </div>
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center">
                <FaPhoneAlt />
                Contact us
              </button>
            </div>
          </div>

          <div className="flex justify-start space-x-4 mb-8">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
              About us
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
              Recruitments
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
              People
            </button>
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
              {/* Work History Section */}
              <h2 className="text-xl font-bold mb-4">Work History</h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Company Logo"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-bold">Quora JSC</h4>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt />
                      <span>New York, US</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Senior System Engineer
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaBriefcase />
                  <span className="ml-2">Part time</span>
                  <FaClock />
                  <span className="ml-2">5 days ago</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Recusandae architecto eveniet, dolor quo repellendus pariatur.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-green-500 font-bold">Status: Done</span>
                  <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                    View Details
                  </button>
                </div>
              </div>

              {/* Additional Work History Entries */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Company Logo"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-bold">Quora JSC</h4>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt />
                      <span>New York, US</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Senior System Engineer
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaBriefcase />
                  <span className="ml-2">Part time</span>
                  <FaClock />
                  <span className="ml-2">5 days ago</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Recusandae architecto eveniet, dolor quo repellendus pariatur.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-green-500 font-bold">Status: Done</span>
                  <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                    View Details
                  </button>
                </div>
              </div>

              <Pagenation />
            </section>

            {/* Right Sidebar */}
            <aside className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Overview</h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <FaCheck />
                    <span>Experience: 12 years</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCheck />
                    <span>Expected Salary: $26k - $30k</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCheck />
                    <span>Language: English, German</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCheck />
                    <span>Education Level: Master Degree</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <p className="text-gray-700">
                    205 North Michigan Avenue, Suite 810 Chicago, 60601, USA
                  </p>
                  <p className="text-gray-700">Phone: (123) 456-7890</p>
                  <p className="text-gray-700">Email: contact@Evara.com</p>
                </div>
                <button className="bg-green-500 text-white w-full px-6 py-3 rounded-lg mt-6 flex items-center justify-center">
                  <FaEnvelope />
                  Send Message
                </button>
              </div>
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

export default CompanyDetail;
