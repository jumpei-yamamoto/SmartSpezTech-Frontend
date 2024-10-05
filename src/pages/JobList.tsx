import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobFilter from "../components/JobFilter";
import Pagenation from "../components/Pagenation";
import axios from "axios";

// 型定義を更新
type Screen = {
  title: string;
  description: string;
  text: string;
  preview: string;
};

type Event = {
  name: string;
  screen: string;
  process: string;
};

type Job = {
  id: number;
  name: string;
  email: string;
  inquiry: string;
  status: number;
  screens: Screen[]; // 複数の画面を配列で保持
  events?: Event[]; // 複数のイベントを配列で保持（オプショナル）
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

  // getFilteredAndSortedJobs 関数を追加
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

  // 画面の重複を除去する関数（最後のデータを使用）
  const getUniqueScreens = (job: Job) => {
    const uniqueScreens = Array.from(new Set(job.screens.map(screen => `${job.id}-${screen.title}`)))
      .map(id => {
        const [jobId, title] = id.split('-');
        return job.screens.filter(screen => screen.title === title).pop();
      });
    return uniqueScreens.filter((screen): screen is Screen => screen !== undefined);
  };

  // レンダリング前にfilteredJobsをログに出力
  console.log("Filtered Jobs:", filteredJobs);

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
              filteredJobs.flatMap((job) => [
                // 重複を除去した画面を表示
                ...getUniqueScreens(job).map((screen, index) => (
                  <div
                    key={`job-${job.id}-screen-${index}`}
                    className="bg-white p-6 rounded-lg shadow-lg flex flex-col mb-6 border-l-4 border-blue-400"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-lg">
                        画面 {index + 1}: {screen.title || "No Title"}
                      </h4>
                      <span className="text-gray-600">案件番号: {job.id}</span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      {screen.description || "No Description"}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-300 font-bold">
                        {screen.text || "No text"}
                      </span>
                      <button className="bg-purple-400 text-white px-4 py-2 rounded">
                        詳細を見る
                      </button>
                    </div>
                  </div>
                )),
                // 各イベントを個別のカードとして表示
                ...(job.events || []).map((event, index) => (
                  <div
                    key={`job-${job.id}-event-${index}`}
                    className="bg-white p-6 rounded-lg shadow-lg flex flex-col mb-6 border-l-4 border-purple-400"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-lg">
                        イベント: {event.name}
                      </h4>
                      <span className="text-gray-600">案件番号: {job.id}</span>
                    </div>
                    <p className="mb-1">関連画面: {event.screen}</p>
                    <p className="mb-1">処理内容: {event.process}</p>
                  </div>
                )),
              ])
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
