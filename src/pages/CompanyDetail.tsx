import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RightSidebar from "../components/RightSidebar";
import Pagenation from "../components/Pagenation";
import {
  FaMapMarkerAlt,
  FaCheck,
  FaEnvelope,
  FaClock,
  FaBriefcase,
  FaPhoneAlt,
} from "react-icons/fa";
import { IconContext } from "react-icons";

const CompanyDetail: React.FC = () => {
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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <img
              src="https://via.placeholder.com/1200x400"
              alt="Company Image"
              className="w-full h-64 object-cover"
            />
            <div className="p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  株式会社テクノロジーズ
                </h2>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaMapMarkerAlt />
                  <span>東京都, 日本</span>
                </div>
                <p className="text-lg text-gray-700 mb-2">
                  「働くをシンプルにする」ことを目指します
                </p>
              </div>
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center">
                <FaPhoneAlt />
                お問い合わせ
              </button>
            </div>
          </div>

          <div className="flex justify-start space-x-4 mb-8">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
              会社概要
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
              募集職種
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
              社員紹介
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content */}
            <section className="md:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">雇用情報</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-gray-700">業界</h4>
                    <p>IT / ソフトウェア開発</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700">雇用形態</h4>
                    <p>正社員</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700">給与</h4>
                    <p>年収 500万円 〜 700万円</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700">経験年数</h4>
                    <p>3年以上</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700">勤務地</h4>
                    <p>東京都港区（リモート可）</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700">最終更新日</h4>
                    <p>2024年8月10日</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700">応募締切</h4>
                    <p>2024年9月1日</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700">募集人数</h4>
                    <p>2名</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">
                  必須知識、スキル、経験
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>React、TypeScriptを用いたフロントエンド開発の実務経験</li>
                  <li>PythonおよびDjangoを用いたバックエンド開発の知識</li>
                  <li>REST APIの設計・開発経験</li>
                  <li>Gitを使用したバージョン管理の実務経験</li>
                  <li>アジャイル開発におけるチームでの協働経験</li>
                  <li>新しい技術の習得に対する高い意欲と柔軟性</li>
                  <li>ビジネスレベルの日本語力と基本的な英語力</li>
                  <li>プロジェクト管理ツール（Jira、Trelloなど）の使用経験</li>
                  <li>セキュリティベストプラクティスに関する知識</li>
                  <li>UI/UXデザインに関する基本的な理解と実務経験</li>
                </ul>
              </div>
              {/* Work History Section */}
              <h2 className="text-xl font-bold mb-4">実績紹介</h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Company Logo"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-bold">クオラ株式会社</h4>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt />
                      <span>東京都, 日本</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  シニアシステムエンジニア
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaBriefcase />
                  <span className="ml-2">パートタイム</span>
                  <FaClock />
                  <span className="ml-2">5日前</span>
                </div>
                <p className="text-gray-700 mb-4">
                  私たちのプロジェクトはクライアントの期待を超えるものでした。革新的なソリューションを提供し、チーム全体が成長しました。
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-green-500 font-bold">
                    ステータス: 完了
                  </span>
                  <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                    詳細を見る
                  </button>
                </div>
              </div>

              {/* Additional Work History Entries */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Company Logo"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-bold">株式会社◯◯</h4>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt />
                      <span>東京都, 日本</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  シニアシステムエンジニア
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaBriefcase />
                  <span className="ml-2">フルタイム</span>
                  <FaClock />
                  <span className="ml-2">1年前</span>
                </div>
                <p className="text-gray-700 mb-4">
                  予定通りプロジェクトを完了させることができ、クライアントから高い評価をいただきました。
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-green-500 font-bold">
                    ステータス: 完了
                  </span>
                  <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                    詳細を見る
                  </button>
                </div>
              </div>

              <Pagenation />
            </section>

            {/* Right Sidebar */}
            <aside className="md:col-span-1">
              <RightSidebar />
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </IconContext.Provider>
  );
};

export default CompanyDetail;
