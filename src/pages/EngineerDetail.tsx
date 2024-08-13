import React from "react";
import Header from "../components/Header";
import Pagenation from "../components/Pagenation";
import {
  FaDownload,
  FaMapMarkerAlt,
  FaCheck,
  FaEnvelope,
  FaClock,
  FaBriefcase,
} from "react-icons/fa";
import { IconContext } from "react-icons";

const EngineerDetail: React.FC = () => {
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
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Steven Jobs
              </h2>
              <div className="flex items-center text-gray-600 mb-2">
                <FaMapMarkerAlt />
                <span>New York, US</span>
              </div>
              <h3 className="text-lg text-gray-700 mb-2">
                UI/UX Designer. Front end Developer
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★★★★★</span>
                  <span className="text-gray-700">(66)</span>
                </div>
                <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded-lg">
                  <FaCheck />
                  <span className="ml-2">Verified</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                  Short Bio
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                  Skills
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                  Working Experience
                </button>
              </div>
            </div>
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center">
              <FaDownload />
              Download CV
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content */}
            <section className="md:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">About Me</h3>
                <p className="text-gray-700 mb-4">
                  Hello there! My name is Alan Walker. I am a graphic designer,
                  and I’m very passionate and dedicated to my work. With 20
                  years experience as a professional a graphic designer, I have
                  acquired the skills and knowledge necessary to make your
                  project a success.
                </p>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Debitis illum fuga eveniet. Deleniti asperiores, commodi quae
                  ipsum quas est itaque, ipsa, dolore beatae voluptates nemo
                  blanditiis iste eius officia minus. Id nisi, consequuntur sunt
                  impedit quidem, vitae mollitia!
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Professional Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold mb-2">Programming</h4>
                    <div className="mb-4">
                      <span className="block text-gray-700">HTML & CSS</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">78%</span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-gray-700">Javascript</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "88%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">88%</span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-gray-700">Database</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "62%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">62%</span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-gray-700">React JS</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">92%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Design</h4>
                    <div className="mb-4">
                      <span className="block text-gray-700">Photoshop</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "29%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">29%</span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-gray-700">Figma</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">20%</span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-gray-700">Illustrator</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">65%</span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-gray-700">Sketch</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "82%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">82%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Experience Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Work Experience</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    A portfolio demonstrating well thought through and polished
                    end to end customer journeys
                  </li>
                  <li>
                    5+ years of industry experience in interactive design and /
                    or visual design
                  </li>
                  <li>Excellent interpersonal skills</li>
                  <li>
                    Aware of trends in mobile, communications, and collaboration
                  </li>
                  <li>
                    Ability to create highly polished design prototypes,
                    mockups, and other communication artifacts
                  </li>
                  <li>
                    The ability to scope and estimate efforts accurately and
                    prioritize tasks and goals independently
                  </li>
                  <li>History of impacting shipping products with your work</li>
                  <li>
                    A Bachelor’s Degree in Design (or related field) or
                    equivalent professional experience
                  </li>
                  <li>
                    Proficiency in a variety of design tools such as Figma,
                    Photoshop, Illustrator, and Sketch
                  </li>
                </ul>
              </div>

              {/* Education Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Education</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Necessitatibus quibusdam facilis</li>
                  <li>
                    Velit unde aliquam et voluptas reiciendis non sapiente
                    labore
                  </li>
                  <li>Commodi quae ipsum quas est itaque</li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </li>
                  <li>
                    Deleniti asperiores blanditiis nihil quia officiis dolor
                  </li>
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

export default EngineerDetail;
