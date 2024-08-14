import React from "react";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagenation from "../components/Pagenation";
import JobFilter from "../components/JobFilter";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCheck } from "react-icons/fa";

const engineers = [
  {
    name: "佐藤 太郎",
    position: "フロントエンドエンジニア",
    rating: 90,
    location: "東京都, 日本",
    rate: "¥4,500/時間",
    skills: ["React", "JavaScript", "HTML", "CSS", "TypeScript"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "鈴木 花子",
    position: "バックエンドエンジニア",
    rating: 85,
    location: "大阪府, 日本",
    rate: "¥5,000/時間",
    skills: ["Python", "Django", "REST API", "PostgreSQL", "Docker"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "山田 太一",
    position: "モバイルアプリ開発者",
    rating: 88,
    location: "福岡県, 日本",
    rate: "¥4,800/時間",
    skills: ["Flutter", "React Native", "Firebase", "UX/UIデザイン"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "高橋 美穂",
    position: "データサイエンティスト",
    rating: 92,
    location: "北海道, 日本",
    rate: "¥6,500/時間",
    skills: ["Python", "TensorFlow", "機械学習", "統計学", "データ分析"],
    imgSrc: "https://via.placeholder.com/150",
  },
  {
    name: "伊藤 次郎",
    position: "クラウドエンジニア",
    rating: 87,
    location: "東京都, 日本",
    rate: "¥5,200/時間",
    skills: ["AWS", "Azure", "GCP", "DevOps", "CI/CD"],
    imgSrc: "https://via.placeholder.com/150",
  },
  // ...その他のエンジニアデータ
];

const EngineerList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <JobFilter /> {/* JobFilterを読み込む */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <FilterSidebar />
          </aside>

          {/* Engineer Listings */}
          <section className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {engineers.map((engineer, index) => (
                <div
                  key={index}
                  className={`bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 h-80 flex flex-col justify-between`}
                >
                  <div className="flex justify-center mb-2">
                    <img
                      src={engineer.imgSrc}
                      alt={`${engineer.name}`}
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-center mb-1">
                    <Link to="/engineerdetail">{engineer.name}</Link>
                  </h3>
                  <p className="text-center text-gray-600 mb-1">
                    {engineer.position}
                  </p>
                  <div className="text-center text-yellow-500 mb-2">
                    {"★".repeat(5)}{" "}
                    <span className="text-gray-600">({engineer.rating})</span>
                  </div>
                  <p className="text-gray-600 text-center text-sm mb-2">
                    専門知識を駆使し、革新的なソリューションを提供します。
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 mb-2">
                    {engineer.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div>
                      <FaMapMarkerAlt className="inline mr-1" />
                      {engineer.location}
                    </div>
                    <div>
                      <FaCheck className="inline mr-1" />
                      {engineer.rate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

export default EngineerList;
