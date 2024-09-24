import React from "react";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagenation from "../components/Pagenation";
import { Link } from "react-router-dom";

const companies = [
  {
    name: "ソフトバンク",
    rating: 82,
    location: "東京都, 日本",
    jobsOpen: 10,
  },
  {
    name: "楽天",
    rating: 75,
    location: "大阪府, 日本",
    jobsOpen: 22,
  },
  {
    name: "トヨタ",
    rating: 90,
    location: "名古屋市, 日本",
    jobsOpen: 18,
  },
  {
    name: "ニコン",
    rating: 60,
    location: "東京都, 日本",
    jobsOpen: 5,
  },
  {
    name: "パナソニック",
    rating: 78,
    location: "大阪府, 日本",
    jobsOpen: 30,
  },
  {
    name: "日産",
    rating: 85,
    location: "横浜市, 日本",
    jobsOpen: 20,
  },
  {
    name: "ファーストリテイリング",
    rating: 88,
    location: "東京都, 日本",
    jobsOpen: 12,
  },
  {
    name: "サントリー",
    rating: 70,
    location: "京都府, 日本",
    jobsOpen: 15,
  },
  {
    name: "日立製作所",
    rating: 80,
    location: "東京都, 日本",
    jobsOpen: 45,
  },
  {
    name: "キヤノン",
    rating: 65,
    location: "東京都, 日本",
    jobsOpen: 25,
  },
  {
    name: "三菱電機",
    rating: 82,
    location: "名古屋市, 日本",
    jobsOpen: 35,
  },
  {
    name: "セコム",
    rating: 60,
    location: "東京都, 日本",
    jobsOpen: 18,
  },
  {
    name: "デンソー",
    rating: 85,
    location: "愛知県, 日本",
    jobsOpen: 28,
  },
  {
    name: "オリックス",
    rating: 78,
    location: "大阪府, 日本",
    jobsOpen: 22,
  },
  {
    name: "アステラス製薬",
    rating: 92,
    location: "東京都, 日本",
    jobsOpen: 50,
  },
];

const CompanyList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <FilterSidebar />
          </aside>

          {/* Company Listings */}
          <section className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 15 }).map((_, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 h-64 flex flex-col justify-between ${
                    companies[index] ? "" : "opacity-0"
                  }`}
                >
                  {companies[index] && (
                    <>
                      <div className="flex justify-center mb-4">
                        <img
                          src={`https://via.placeholder.com/50?text=${companies[
                            index
                          ].name.charAt(0)}`}
                          alt={`${companies[index].name} logo`}
                          className="w-12 h-12"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">
                        <Link to={`/companydetail`}>
                          {companies[index].name}
                        </Link>
                      </h3>
                      <div className="text-center text-yellow-500 mb-2">
                        {"★".repeat(5)}{" "}
                        <span className="text-gray-600">
                          ({companies[index].rating})
                        </span>
                      </div>
                      <p className="text-center text-gray-500 mb-4">
                        {companies[index].location}
                      </p>
                      <a
                        href="#"
                        className="block text-center text-blue-500 hover:underline"
                      >
                        {companies[index].jobsOpen} 件の求人
                      </a>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              {/* <Pagenation /> */}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyList;
