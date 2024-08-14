import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagenation from "../components/Pagenation";
import {
  FaDownload,
  FaMapMarkerAlt,
  FaCheck,
  FaEnvelope,
  FaClock,
  FaBriefcase,
} from "react-icons/fa";
import { IconContext } from "react-icons";

const EngineerDetail: React.FC = () => {
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
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                佐藤 太郎
              </h2>
              <div className="flex items-center text-gray-600 mb-2">
                <FaMapMarkerAlt />
                <span>東京都, 日本</span>
              </div>
              <h3 className="text-lg text-gray-700 mb-2">
                UI/UX デザイナー・フロントエンド開発者
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★★★★★</span>
                  <span className="text-gray-700">(66)</span>
                </div>
                <div className="flex items-center bg-purple-400 text-white px-3 py-1 rounded-lg">
                  <FaCheck />
                  <span className="ml-2">認証済み</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                  短いプロフィール
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                  スキル
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                  実務経験
                </button>
              </div>
            </div>
            <button className="bg-purple-400 text-white px-6 py-3 rounded-lg flex items-center">
              <FaDownload />
              履歴書をダウンロード
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* メインコンテンツ */}
            <section className="md:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">自己紹介</h3>
                <p className="text-gray-700 mb-4">
                  こんにちは！私の名前は佐藤太郎です。私はグラフィックデザイナーで、仕事に非常に情熱を持っています。20年以上のプロのグラフィックデザインの経験を持ち、あなたのプロジェクトを成功させるために必要なスキルと知識を習得しています。
                </p>
                <p className="text-gray-700">
                  私の経験により、クライアントのニーズに応じたクリエイティブなデザインソリューションを提供できます。
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">
                  プロフェッショナルスキル
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold mb-2">プログラミング</h4>
                    <div className="mb-4">
                      <span className="block text-gray-700">HTML & CSS</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-purple-400 h-2.5 rounded-full"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">78%</span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-gray-700">JavaScript</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-purple-400 h-2.5 rounded-full"
                          style={{ width: "88%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">88%</span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-gray-700">データベース</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-purple-400 h-2.5 rounded-full"
                          style={{ width: "62%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">62%</span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-gray-700">React JS</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-purple-400 h-2.5 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">92%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">デザイン</h4>
                    <div className="mb-4">
                      <span className="block text-gray-700">Photoshop</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-purple-400 h-2.5 rounded-full"
                          style={{ width: "29%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">29%</span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-gray-700">Figma</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-purple-400 h-2.5 rounded-full"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">20%</span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-gray-700">Illustrator</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-purple-400 h-2.5 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">65%</span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-gray-700">Sketch</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-purple-400 h-2.5 rounded-full"
                          style={{ width: "82%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">82%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 実務経験 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">実務経験</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    エンドツーエンドのカスタマージャーニーを慎重に考慮し、洗練されたポートフォリオ
                  </li>
                  <li>
                    インタラクティブデザインおよび/またはビジュアルデザインで5年以上の業界経験
                  </li>
                  <li>優れた対人スキル</li>
                  <li>
                    モバイル、コミュニケーション、およびコラボレーションのトレンドを理解
                  </li>
                  <li>
                    高度に洗練されたデザインプロトタイプ、モックアップ、その他のコミュニケーションアーティファクトを作成する能力
                  </li>
                  <li>
                    努力を正確にスコープし、見積もり、タスクや目標を独立して優先順位付けする能力
                  </li>
                  <li>あなたの仕事で製品の出荷に影響を与えた履歴</li>
                  <li>
                    デザイン（または関連分野）の学士号または同等の専門経験
                  </li>
                  <li>
                    Figma、Photoshop、Illustrator、Sketchなどの多様なデザインツールに熟練
                  </li>
                </ul>
              </div>

              {/* 教育 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">教育</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>必須の知識とスキルを提供する教育プログラム</li>
                  <li>現代のデザインとテクノロジーに関連する深い理解を提供</li>
                  <li>業界に関連する認定を取得</li>
                  <li>クリエイティブな問題解決能力を発展させるカリキュラム</li>
                  <li>デザインの歴史と現代のデザイン原則に関する深い洞察</li>
                </ul>
              </div>

              {/* Work History Section */}
              <h2 className="text-xl font-bold mb-4">職務経歴</h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Company Logo"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-bold">Quora JSC</h4>
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
                  シニアシステムエンジニアとして、期待以上の活躍をして頂きました。
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300 font-bold">
                    ステータス: 完了
                  </span>
                  <button className="text-purple-300 text-green-700 px-4 py-2 rounded-lg">
                    詳細を見る
                  </button>
                </div>
              </div>

              <Pagenation />
            </section>

            {/* 右サイドバー */}
            <aside className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">概要</h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <FaCheck />
                    <span>経験: 12年</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCheck />
                    <span>希望年収: ¥3,000,000 - ¥3,500,000</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCheck />
                    <span>言語: 日本語, 英語</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCheck />
                    <span>学歴: 修士号</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <p className="text-gray-700">
                    〒100-0001 東京都千代田区千代田1-1
                  </p>
                  <p className="text-gray-700">電話: (123) 456-7890</p>
                  <p className="text-gray-700">メール: contact@Evara.com</p>
                </div>
                <button className="bg-purple-400 text-white w-full px-6 py-3 rounded-lg mt-6 flex items-center justify-center">
                  <FaEnvelope />
                  メッセージを送る
                </button>
              </div>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </IconContext.Provider>
  );
};

export default EngineerDetail;
