import React, { useState } from "react";

const FilterSidebar: React.FC = () => {
  const [salary, setSalary] = useState(280);

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(Number(event.target.value));
  };

  return (
    <aside className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Advance Filter</h2>
        <button className="text-blue-500 hover:underline">Reset</button>
      </div>
      <div className="space-y-4">
        <div>
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <select
            id="location"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>New York, US</option>
            <option>San Francisco, US</option>
            <option>Los Angeles, US</option>
            <option>Chicago, US</option>
          </select>
        </div>
        <div>
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="industry"
          >
            Industry
          </label>
          <select
            id="industry"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>Software</option>
            <option>Finance</option>
            <option>Recruiting</option>
            <option>Management</option>
            <option>Advertising</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Search
        </button>
        {/* Industry Filter */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Industry</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700">All</span>
              </label>
              <span className="text-green-500 font-bold">180</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">Software</span>
              </label>
              <span className="text-green-500 font-bold">12</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">Finance</span>
              </label>
              <span className="text-green-500 font-bold">23</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">Recruiting</span>
              </label>
              <span className="text-green-500 font-bold">43</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">Management</span>
              </label>
              <span className="text-green-500 font-bold">65</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">Advertising</span>
              </label>
              <span className="text-green-500 font-bold">76</span>
            </li>
          </ul>
        </div>
        {/* Salary Range Filter */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Salary Range</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">$0</span>
            <input
              type="range"
              min="0"
              max="500"
              value={salary}
              onChange={handleSalaryChange}
              className="w-full mx-4"
            />
            <span className="text-gray-700">$500</span>
          </div>
          <div className="text-center mb-4">
            <span className="text-green-500 font-bold text-lg">{salary}</span>
          </div>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700">All</span>
              </label>
              <span className="text-green-500 font-bold">145</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">$0k - $20k</span>
              </label>
              <span className="text-green-500 font-bold">56</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">$20k - $40k</span>
              </label>
              <span className="text-green-500 font-bold">37</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">$40k - $60k</span>
              </label>
              <span className="text-green-500 font-bold">75</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">$60k - $80k</span>
              </label>
              <span className="text-green-500 font-bold">98</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">$80k - $100k</span>
              </label>
              <span className="text-green-500 font-bold">14</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">$100k - $200k</span>
              </label>
              <span className="text-green-500 font-bold">25</span>
            </li>
          </ul>
        </div>
        {/* Popular Keyword Filter */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Popular Keyword</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700">Software</span>
              </label>
              <span className="text-green-500 font-bold">24</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">Developer</span>
              </label>
              <span className="text-green-500 font-bold">45</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">Web</span>
              </label>
              <span className="text-green-500 font-bold">57</span>
            </li>
          </ul>
        </div>
        {/* Position Filter */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Position</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">Senior</span>
              </label>
              <span className="text-green-500 font-bold">12</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700">Junior</span>
              </label>
              <span className="text-green-500 font-bold">35</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">Fresher</span>
              </label>
              <span className="text-green-500 font-bold">56</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Experience Level Filter */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Experience Level</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">Internship</span>
            </label>
            <span className="text-green-500 font-bold">56</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">Entry Level</span>
            </label>
            <span className="text-green-500 font-bold">87</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-green-500"
                defaultChecked
              />
              <span className="ml-2 text-gray-700">Associate</span>
            </label>
            <span className="text-green-500 font-bold">24</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">Mid Level</span>
            </label>
            <span className="text-green-500 font-bold">45</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">Director</span>
            </label>
            <span className="text-green-500 font-bold">76</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">Executive</span>
            </label>
            <span className="text-green-500 font-bold">89</span>
          </li>
        </ul>
      </div>

      {/* Onsite/Remote Filter */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Onsite/Remote</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">On-site</span>
            </label>
            <span className="text-green-500 font-bold">12</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-green-500"
                defaultChecked
              />
              <span className="ml-2 text-gray-700">Remote</span>
            </label>
            <span className="text-green-500 font-bold">65</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">Hybrid</span>
            </label>
            <span className="text-green-500 font-bold">58</span>
          </li>
        </ul>
      </div>
      {/* Job Posted Filter */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Job Posted</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-green-500"
                defaultChecked
              />
              <span className="ml-2 text-gray-700">All</span>
            </label>
            <span className="text-green-500 font-bold">78</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">1 day</span>
            </label>
            <span className="text-green-500 font-bold">65</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">7 days</span>
            </label>
            <span className="text-green-500 font-bold">24</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">30 days</span>
            </label>
            <span className="text-green-500 font-bold">56</span>
          </li>
        </ul>
      </div>

      {/* Job Type Filter */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Job type</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">Full Time</span>
            </label>
            <span className="text-green-500 font-bold">25</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-green-500"
                defaultChecked
              />
              <span className="ml-2 text-gray-700">Part Time</span>
            </label>
            <span className="text-green-500 font-bold">64</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">Remote Jobs</span>
            </label>
            <span className="text-green-500 font-bold">78</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-gray-700">Freelancer</span>
            </label>
            <span className="text-green-500 font-bold">97</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default FilterSidebar;
