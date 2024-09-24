import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobFilter from "../components/JobFilter";
import Pagenation from "../components/Pagenation";
import axios from "axios";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:80";

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/ordered_estimates`,
          {
            withCredentials: false,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setJobs(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 0) {
          console.error("CORS エラーが発生しました:", error);
          alert(
            "CORS エラーが発生しました。サーバーの設定を確認してください。"
          );
        } else {
          console.error("Error fetching jobs:", error);
          alert("ジョブの取得中にエラーが発生しました。");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [apiBaseUrl]);

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

            {loading ? (
              <p>Loading...</p>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-lg shadow-lg flex mb-6"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={
                        job.screen.preview || "https://via.placeholder.com/50"
                      }
                      alt="Company Logo"
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="ml-6 flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <Link
                          to={`/jobdetail/${job.id}`}
                          className="font-bold text-xl mb-1"
                        >
                          {job.screen.title}
                        </Link>
                        <p className="text-gray-500">
                          {job.name}, {job.email}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {job.screen.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-purple-300 font-bold">
                          {job.screen.catchphrase}
                        </span>
                      </div>
                      <button className="bg-purple-400 text-white px-4 py-2 rounded">
                        今すぐ応募
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className="flex justify-center mt-8">
              <Pagenation />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobList;
