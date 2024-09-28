import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobFilter from "../components/JobFilter";
import Pagenation from "../components/Pagenation";
import axios from "axios";

// 新しい型定義を追加
type Screen = {
  title: string;
  description: string;
  catchphrase: string;
  preview: string;
};

type Job = {
  id: number;
  name: string;
  email: string;
  inquiry: string;
  status: number;
  screens: Screen[];
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
        // レスポンスデータをログに出力
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

  // getAllScreens 関数を修正
  const getAllScreens = () => {
    return jobs.flatMap((job) =>
      job.screens.map((screen) => ({
        ...screen,
        jobId: job.id,
        jobName: job.name,
        jobEmail: job.email,
      }))
    );
  };

  // フィルタリングと並べ替えを行う関数を更新
  const getFilteredAndSortedScreens = () => {
    let allScreens = getAllScreens();

    // ソート順の適用
    switch (sortOrder) {
      case "newest":
        allScreens.sort((a, b) => b.jobId - a.jobId);
        break;
      case "oldest":
        allScreens.sort((a, b) => a.jobId - b.jobId);
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
    return allScreens.slice(startIndex, endIndex);
  };

  const filteredScreens = getFilteredAndSortedScreens();

  // レンダリング前にfilteredScreensをログに出力
  console.log("Filtered Screens:", filteredScreens);

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
              totalJobs={getAllScreens().length}
              currentPage={currentPage}
            />

            {loading ? (
              <p>Loading...</p>
            ) : (
              filteredScreens.map((screen, index) => (
                <div
                  key={`${screen.jobId}-${index}`}
                  className="bg-white p-6 rounded-lg shadow-lg flex flex-col mb-6"
                >
                  <div className="mb-4">
                    <Link
                      to={`/jobdetail/${screen.jobId}`}
                      className="font-bold text-xl mb-1"
                    >
                      案件番号: {screen.jobId}
                    </Link>
                  </div>
                  <div className="mb-4 pb-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {screen.title || "No Title"}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {screen.description || "No Description"}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-300 font-bold">
                        {screen.catchphrase || "No Catchphrase"}
                      </span>
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
                totalPages={Math.ceil(getAllScreens().length / itemsPerPage)}
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
