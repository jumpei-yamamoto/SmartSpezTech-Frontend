import React, { useState } from "react";

const SimulationResult: React.FC = () => {
  const [activeTab, setActiveTab] = useState("estimate");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  const [popupTab, setPopupTab] = useState("popup-estimate"); // 初期表示を見積もりに設定

  const simulationData = localStorage.getItem("simulationResults");
  const result = simulationData ? JSON.parse(simulationData) : null;

  const screens = ["ホーム画面", "ログイン画面", "ダッシュボード"];

  const handleScreenClick = (screen: string) => {
    setSelectedScreen(screen);
    setShowPopup(true);
    setPopupTab("popup-estimate"); // ポップアップを開くときに「見積もり」を初期表示
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedScreen(null);
  };

  if (!result) {
    return <div>結果がありません。</div>;
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
              <h2 className="text-xl font-semibold mb-4">見積もり</h2>
              <p>{result.estimateResult}</p>
            </div>
          )}

          {activeTab === "requirements" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">要件定義</h2>
              <p>{result.requirementsResult}</p>
            </div>
          )}

          {activeTab === "screens" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">想定画面一覧</h2>
              <ul className="list-disc list-inside">
                {screens.map((screen) => (
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
                見積もり
              </button>
              <button
                className={`px-4 py-2 ${
                  popupTab === "popup-requirements"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setPopupTab("popup-requirements")}
              >
                要件定義
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
                  <h4 className="text-lg font-semibold">見積もり</h4>
                  <p>{result.estimateResult}</p>
                </div>
              )}

              {popupTab === "popup-requirements" && (
                <div>
                  <h4 className="text-lg font-semibold">要件定義</h4>
                  <p>{result.requirementsResult}</p>
                </div>
              )}

              {popupTab === "popup-sample" && (
                <div>
                  <h4 className="text-lg font-semibold">画面サンプル</h4>
                  <p>ここに{selectedScreen}の画面サンプルを表示します。</p>
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
