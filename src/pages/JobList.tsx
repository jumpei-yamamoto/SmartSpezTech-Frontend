import React from "react";
import { Link } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobFilter from "../components/JobFilter";
import Pagenation from "../components/Pagenation";

const JobList: React.FC = () => {
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

            <div className="bg-white p-6 rounded-lg shadow-lg flex mb-6">
              <div className="flex-shrink-0">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Company Logo"
                  className="w-16 h-16"
                />
              </div>
              <div className="ml-6 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <Link to={"/jobdetail"} className="font-bold text-xl mb-1">
                      UI/UXデザイナー フルタイム
                    </Link>
                    <p className="text-gray-500">株式会社テスト, 東京, 日本</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded">
                      Adobe XD
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded">
                      Figma
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  ユーザー視点で直感的なデザインを追求するUI/UXデザイナー募集！新規プロダクトの設計から改善まで、クリエイティブな環境でスキルを発揮してください。
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-green-500 font-bold">¥5000/Hour</span>
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    今すぐ応募
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex mb-6">
              <div className="flex-shrink-0">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Company Logo"
                  className="w-16 h-16"
                />
              </div>
              <div className="ml-6 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-bold text-xl mb-1">
                      Full Stack Engineer
                    </h3>
                    <p className="text-gray-500">xxx Company, New York, US</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded">
                      Python
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded">
                      React
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  We are seeking a talented Full-Stack Engineer to join our
                  dynamic team. You'll work on both the front-end and back-end
                  of our cutting-edge web applications, collaborating closely
                  with designers and product managers to deliver seamless user
                  experiences. Your expertise in modern frameworks like React,
                  Node.js, and cloud technologies will be crucial in building
                  scalable and efficient solutions. If you're passionate about
                  coding, enjoy problem-solving, and thrive in a fast-paced
                  environment, we’d love to hear from you! Join us and help
                  shape the future of our innovative platform.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-green-500 font-bold">$800/Hour</span>
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    今すぐ応募
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex mb-6">
              <div className="flex-shrink-0">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Company Logo"
                  className="w-16 h-16"
                />
              </div>
              <div className="ml-6 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-bold text-xl mb-1">
                      Javaで実装したい方
                    </h3>
                    <p className="text-gray-500">◯◯株式会社, 大阪, 日本</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded">
                      Java
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded">
                      Spring Boot
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  堅牢なシステムを支えるJavaエンジニア募集！大規模なWebアプリケーションの開発・保守を担当し、最新技術を駆使して高品質なコードを提供していただきます。チームでの協力と効率的な開発を重視する方、大歓迎です。あなたのJavaスキルを活かして、共に次世代のサービスを構築しましょう！
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-green-500 font-bold">¥4000/Hour</span>
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    今すぐ応募
                  </button>
                </div>
              </div>
            </div>

            {/* Additional job listings go here */}

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
