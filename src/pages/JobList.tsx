import React, { useEffect, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobFilter from "../components/JobFilter";
import Pagenation from "../components/Pagenation";
import axios from "axios";

// 型定義
type AIEstimate = {
  screens: {
    [key: string]: {
      workload: string;
      hourly_rate: string;
      tests: string[];
    };
  };
  events: {
    [key: string]: {
      workload: string;
      hourly_rate: string;
      tests: string[];
    };
  };
  database: {
    workload: string;
    hourly_rate: string;
    tests: string[];
  };
};

type Job = {
  id: number;
  name: string;
  email: string;
  inquiry: string;
  status: number;
  ai_response?: AIEstimate; // aiEstimate から ai_response に変更
};

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "highestRate" | "lowestRate"
  >("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:80";

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Job[]>(
          `${apiBaseUrl}/api/ordered_estimates`,
          {
            withCredentials: false,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("API Response:", response.data);
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

  const getFilteredAndSortedJobs = () => {
    let filteredJobs = [...jobs];

    switch (sortOrder) {
      case "newest":
        filteredJobs.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        filteredJobs.sort((a, b) => a.id - b.id);
        break;
      case "highestRate":
      case "lowestRate":
        console.log("Rate sorting not implemented");
        break;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredJobs.slice(startIndex, endIndex);
  };

  const filteredJobs = getFilteredAndSortedJobs();
  console.log("Filtered Jobs:", filteredJobs);

  const renderAIEstimate = (job: Job) => {
    if (!job.ai_response) return null;

    const aiEstimate = job.ai_response;

    // カテゴリー毎の件数を計算
    const screenCount = Object.keys(aiEstimate.screens).length;
    const eventCount = Object.keys(aiEstimate.events).length;
    const databaseCount = aiEstimate.database ? 1 : 0;

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">案件番号: {job.id}</h2>

        <div className="space-y-4">
          <h4 className="font-medium text-md">画面 ({screenCount}件)</h4>
          {Object.entries(aiEstimate.screens).map(([screenName, estimate]) => (
            <div
              key={screenName}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-400"
            >
              <p className="font-semibold">{screenName}</p>
              <p>作業量: {estimate.workload}</p>
              <p>{estimate.hourly_rate}</p>
              <p>テスト: {estimate.tests.join(", ")}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-md">イベント ({eventCount}件)</h4>
          {Object.entries(aiEstimate.events).map(([eventName, estimate]) => (
            <div
              key={eventName}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-400"
            >
              <p className="font-semibold">{eventName}</p>
              <p>作業量: {estimate.workload}</p>
              <p>{estimate.hourly_rate}</p>
              <p>テスト: {estimate.tests.join(", ")}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-md">
            データベース ({databaseCount}件)
          </h4>
          {aiEstimate.database && (
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-400">
              <p>作業量: {aiEstimate.database.workload}</p>
              <p>{aiEstimate.database.hourly_rate}</p>
              <p>テスト: {aiEstimate.database.tests.join(", ")}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <FilterSidebar />
          </aside>

          <section className="md:col-span-3">
            <JobFilter
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              totalJobs={jobs.length}
              currentPage={currentPage}
            />

            {loading ? (
              <p>Loading...</p>
            ) : (
              filteredJobs.map((job) => (
                <div key={job.id} className="mb-8">
                  {renderAIEstimate(job)}
                </div>
              ))
            )}

            <div className="flex justify-center mt-8">
              <Pagenation
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={Math.ceil(jobs.length / itemsPerPage)}
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobList;
