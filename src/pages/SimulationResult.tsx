// SimulationResult.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const SimulationResult: React.FC = () => {
  const [activeTab, setActiveTab] = useState("estimate");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  const [popupTab, setPopupTab] = useState("popup-estimate");
  const [result, setResult] = useState<any>(null);
  const [screenDetails, setScreenDetails] = useState<Record<string, any>>({});

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:80"; // デフォルトポートを変更

  useEffect(() => {
    const loadResults = () => {
      const simulationData = localStorage.getItem("simulationResults");
      if (simulationData) {
        const parsedData = JSON.parse(simulationData);
        setResult({
          requirements_specification: parsedData.requirements_specification,
          requirements_definition: parsedData.requirements_definition,
          screens: parsedData.screens,
          estimate_develop: parsedData.estimate_develop,
          answers: parsedData.answers, // Add this line to include answers
        });
      } else {
        console.warn("simulationResultsがlocalStorageに見つかりません。");
      }
    };

    loadResults();
  }, []);

  const handleScreenClick = async (screen: string) => {
    setSelectedScreen(screen);
    setShowPopup(true);
    setPopupTab("popup-estimate");

    if (!screenDetails[screen]) {
      try {
        const response = await axios.post(`${apiBaseUrl}/screen_details`, {
          screen: screen,
          answers: result?.answers, // Use optional chaining here
        });
        setScreenDetails((prevDetails) => ({
          ...prevDetails,
          [screen]: response.data,
        }));
      } catch (error) {
        console.error("画面詳細の取得に失敗しました:", error);
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedScreen(null);
  };

  if (!result) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
            シミュレーション結果
          </h1>
          <p>
            シミュレーション結果が見つかりません。もう一度シミュレーションを実行してください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          シミュレーション結果
        </h1>

        {/* タブ切り替え */}
        <div className="flex border-b justify-center">
          <button
            className={`px-4 py-2 ${
              activeTab === "estimate"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("estimate")}
          >
            見積もり
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "requirements"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("requirements")}
          >
            要件定義
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "specification"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("specification")}
          >
            要求仕様
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "screens"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("screens")}
          >
            想定画面一覧
          </button>
        </div>

        {/* タブコンテンツ */}
        <div className="p-4">
          {activeTab === "estimate" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">全体の工数見積もり</h2>
              <pre className="whitespace-pre-wrap">
                {result.estimate_develop}
              </pre>
            </div>
          )}

          {activeTab === "requirements" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">要件定義</h2>
              <pre className="whitespace-pre-wrap">
                {result.requirements_definition}
              </pre>
            </div>
          )}

          {activeTab === "specification" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">要求仕様</h2>
              <pre className="whitespace-pre-wrap">
                {result.requirements_specification}
              </pre>
            </div>
          )}

          {activeTab === "screens" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">想定画面一覧</h2>
              <ul className="list-disc list-inside">
                {result.screens &&
                  result.screens.map((screen: string) => (
                    <li key={screen}>
                      <button
                        onClick={() => handleScreenClick(screen)}
                        className="text-blue-600 underline"
                      >
                        {screen}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ポップアップ */}
      {showPopup && selectedScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div className="p-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">{selectedScreen}</h3>
              <button
                onClick={closePopup}
                className="text-gray-600 hover:text-gray-800"
              >
                ✖
              </button>
            </div>
            <div className="border-b mb-4"></div>

            {/* ポップアップ内のタブ切り替え */}
            <div className="p-4">
              <button
                className={`px-4 py-2 ${
                  popupTab === "popup-estimate"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setPopupTab("popup-estimate")}
              >
                工数見積もり
              </button>
              <button
                className={`px-4 py-2 ${
                  popupTab === "popup-design"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setPopupTab("popup-design")}
              >
                基本設計
              </button>
              <button
                className={`px-4 py-2 ${
                  popupTab === "popup-sample"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setPopupTab("popup-sample")}
              >
                画面サンプル
              </button>
            </div>

            <div className="p-4">
              {popupTab === "popup-estimate" && (
                <div>
                  <h4 className="text-lg font-semibold">工数見積もり</h4>
                  <pre className="whitespace-pre-wrap">
                    {screenDetails[selectedScreen]?.workload || "読み込み中..."}
                  </pre>
                </div>
              )}

              {popupTab === "popup-design" && (
                <div>
                  <h4 className="text-lg font-semibold">基本設計</h4>
                  <pre className="whitespace-pre-wrap">
                    {screenDetails[selectedScreen]?.basic_design ||
                      "読み込み中..."}
                  </pre>
                </div>
              )}

              {popupTab === "popup-sample" && (
                <div>
                  <h4 className="text-lg font-semibold">画面サンプル</h4>
                  <pre className="whitespace-pre-wrap">
                    {screenDetails[selectedScreen]?.screen_sample ||
                      "読み込み中..."}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationResult;
