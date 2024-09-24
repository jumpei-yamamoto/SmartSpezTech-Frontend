import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobFilter from "../components/JobFilter";
import Pagenation from "../components/Pagenation";
import axios from "axios";

// 新しい型定義を追加
type Job = {
  id: number;
  screen: {
    title: string;
    description: string;
    catchphrase: string;
    preview: string;
  };
  name: string;
  email: string;
};

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  // 新しい状態を追加
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

  // フィルタリングと並べ替えを行う関数
  const getFilteredAndSortedJobs = () => {
    let filteredJobs = [...jobs];

    // ソート順の適用
    switch (sortOrder) {
      case "newest":
        filteredJobs.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        filteredJobs.sort((a, b) => a.id - b.id);
        break;
      // 注: 高単価と低単価のソートは、実際のデータ構造に応じて調整が必要です
      case "highestRate":
      case "lowestRate":
        console.log("Rate sorting not implemented");
        break;
    }

    // ページネーションの適用
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredJobs.slice(startIndex, endIndex);
  };

  const filteredJobs = getFilteredAndSortedJobs();

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
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-lg shadow-lg flex mb-6"
                >
                  <div className="ml-6 flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <Link
                          to={`/jobdetail/${job.id}`}
                          className="font-bold text-xl mb-1"
                        >
                          {job.screen.title}
                        </Link>
                        <p className="text-gray-500">案件番号: {job.id}</p>
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
