import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RightSidebar from "../components/RightSidebar";
import { FaFacebook, FaTwitter, FaReddit, FaWhatsapp } from "react-icons/fa";
import { IconContext } from "react-icons";

const JobDetail: React.FC = () => {
  return (
    <IconContext.Provider value={{ size: "24", className: "cursor-pointer" }}>
      <div className="min-h-screen bg-gray-100">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <img
              src="https://via.placeholder.com/1200x400"
              alt="Job Detail"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    UI/UXデザイナー, フルリモート, フルタイム
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-4">
                      <i className="fas fa-briefcase mr-1"></i>フルタイム
                    </span>
                    <span>
                      <i className="fas fa-clock mr-1"></i>3日前
                    </span>
                  </div>
                </div>
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg">
                  今すぐ応募
                </button>
              </div>
              <p className="text-gray-700">
                ユーザー視点で直感的なデザインを追求するUI/UXデザイナー募集！新規プロダクトの設計から改善まで、クリエイティブな環境でスキルを発揮してください。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content */}
            <section className="md:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">雇用情報</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className="text-gray-700 font-bold w-32">業界:</span>
                    <span>機械/自動車/建設</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 font-bold w-32">
                      雇用形態:
                    </span>
                    <span>正社員</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 font-bold w-32">給与:</span>
                    <span>年収 400万〜600万円</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 font-bold w-32">
                      勤務地:
                    </span>
                    <span>東京都、リモート可</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 font-bold w-32">経験:</span>
                    <span>3年以上</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 font-bold w-32">
                      募集締切:
                    </span>
                    <span>2024/12/31</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">
                  必要な知識、スキル、経験
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>UI/UXデザインに関する実務経験3年以上</li>
                  <li>Adobe XD、Figma、Sketchなどのデザインツールの使用経験</li>
                  <li>
                    ユーザー中心のデザインプロセスに関する深い理解と実践経験
                  </li>
                  <li>チームでのコラボレーションスキル</li>
                  <li>
                    Webアプリケーションやモバイルアプリケーションのデザイン経験
                  </li>
                </ul>
              </div>

              {/* Apply and Share Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
                <div className="flex space-x-4">
                  <button className="bg-green-500 text-white px-6 py-2 rounded-lg">
                    今すぐ応募
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg">
                    保存
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 font-bold">共有</span>
                  <FaFacebook color="#1877F2" />
                  <FaTwitter color="#1DA1F2" />
                  <FaReddit color="#FF4500" />
                  <FaWhatsapp color="#25D366" />
                </div>
              </div>
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

export default JobDetail;
