import { useEffect, useState } from "react";
import {
  Zap,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ContactModal from "./ContactModal"; // ContactModalをインポート

// propsとしてpageDataの配列を受け取る
interface PageData {
  title: string;
  catchphrase: string;
  description: string;
  preview: string;
}

interface ComponentProps {
  pageData: PageData[]; // 既存
}

export default function SystemPreview() {
  // Renamed from Component to SystemPreview
  // 編集: propsから削除
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const simulationData: PageData[] = location.state?.simulationData || [];
  const totalPages = simulationData.length;

  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    console.log("simulationData:", simulationData);
    console.log("currentPage:", currentPage);
  }, [simulationData, currentPage]);

  const currentPageData = simulationData[currentPage];

  const renderPreview = (preview: string) => {
    const containerClass =
      device === "desktop" ? "w-full max-w-4xl" : "w-full max-w-sm";

    const previewClass = device === "desktop" ? "text-sm" : "text-xs";

    return (
      <div
        className={`bg-white p-4 rounded-lg shadow-sm overflow-auto max-h-[600px] mx-auto ${containerClass}`}
      >
        <pre
          className={`whitespace-pre-wrap ${previewClass}`}
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b p-4 flex items-center justify-center">
        <h1 className="text-2xl font-bold mr-4">Webシステムプレビュー</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => setIsContactModalOpen(true)}
        >
          お問い合わせ
        </button>
      </header>

      <h2 className="text-center text-lg font-semibold text-gray-700 mt-4 px-4">
        AIによるシステムプレビューを表示しています。具体的な機能や詳細なお見積りをご希望の方は、ぜひお問い合わせボタンからご相談ください。
      </h2>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border p-6 mb-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-2 text-blue-600">
              {currentPageData?.title || "No Title"}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {currentPageData?.catchphrase || "No Catchphrase"}
            </p>
            <div className="flex items-start space-x-2 text-sm text-gray-500">
              <Zap className="w-5 h-5 mt-0.5 text-yellow-500" />
              <p>{currentPageData?.description || "No Description"}</p>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  device === "desktop"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => setDevice("desktop")}
              >
                <Monitor className="w-4 h-4 mr-2 inline-block" />
                デスクトップ
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  device === "mobile" ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => setDevice("mobile")}
              >
                <Smartphone className="w-4 h-4 mr-2 inline-block" />
                モバイル
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>
                {currentPage + 1} / {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
                }
                disabled={currentPage === totalPages - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative border rounded-lg bg-white flex items-center justify-center overflow-hidden p-4">
            {renderPreview(currentPageData?.preview || "No preview available")}
          </div>

          {selectedElement && (
            <div className="bg-white border p-4 rounded-lg mt-4">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-500" />
                <h3 className="text-lg font-semibold">
                  {selectedElement}の説明
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                ここに選択された要素の詳細な説明が表示れます。機能、デザインの意図、主要な特徴などを記述します。
              </p>
            </div>
          )}
        </div>
      </main>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
