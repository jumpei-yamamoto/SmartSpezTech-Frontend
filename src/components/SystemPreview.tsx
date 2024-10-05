import { useState } from "react";
import { useLocation } from "react-router-dom";
import ContactModal from "./ContactModal";

// PageData インターフェースをここで定義
export interface PageData {
  text: string;
  html: string;
  screen_description: string;
  answer: string;
}

export default function SystemPreview() {
  const location = useLocation();
  const simulationData: PageData = location.state?.simulationData;

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const tailwindConfig = `
    <script>
      tailwind.config = {
        theme: {
          extend: {},
        },
      }
    </script>
  `;

  const modifiedHtml = `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        ${tailwindConfig}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.10.3/cdn.min.js" defer></script>
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            width: 100%; 
            height: 100%; 
            overflow: auto;
          }
        </style>
      </head>
      <body class="bg-gray-100 text-gray-900 antialiased">
        ${simulationData?.html || ""}
      </body>
    </html>
  `;

  // formatDescription 関数を修正します
  const formatDescription = (text: string) => {
    if (!text) return "";

    // 各項目を分割します
    const sections = text.split(/\d+\.\s/).filter(Boolean);

    return sections
      .map((section, index) => {
        const [title, ...details] = section.split("\n");
        return `${index + 1}. ${title.trim()}\n${details
          .map((detail) => `   ${detail.trim()}`)
          .join("\n")}`;
      })
      .join("\n\n");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      <header className="bg-white border-b p-4 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Webシステムプレビュー</h1>
      </header>

      <h2 className="text-center text-lg font-semibold text-gray-700 mt-4 px-4">
        AIによるシステムプレビューを表示しています。具体的な機能や詳細なお見積りをご希望の方は、ぜひお問い合わせボタンからご相談ください。
      </h2>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border p-6 mb-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              システム概要
            </h3>
            <p className="text-base font-medium mb-4 text-gray-600 whitespace-pre-line">
              {formatDescription(simulationData?.text) || "No Text"}
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border rounded-lg overflow-hidden mb-6">
            <h3 className="text-lg font-semibold p-4 bg-gray-50 border-b">
              画面プレビュー
            </h3>
            <div style={{ height: "800px" }}>
              <iframe
                srcDoc={modifiedHtml}
                className="w-full h-full border-none"
                title="Preview"
              />
            </div>
          </div>

          {simulationData?.screen_description && (
            <div className="bg-white border p-4 rounded-lg mt-4">
              <h3 className="text-lg font-semibold mb-2">画面の説明</h3>
              <p className="text-base text-gray-600 whitespace-pre-line">
                {formatDescription(simulationData.screen_description)}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* 固定位置のお問い合わせボタン */}
      <button
        className="fixed bottom-8 right-8 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-colors shadow-lg flex items-center space-x-2"
        onClick={() => setIsContactModalOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <span>お問い合わせ</span>
      </button>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        simulationData={simulationData}
      />
    </div>
  );
}
