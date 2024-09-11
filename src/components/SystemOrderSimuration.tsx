import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Upload,
  PlusCircle,
  X,
} from "lucide-react";

const SystemOrderSimulation: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    Record<number, string | string[] | File[]>
  >({});
  const [urls, setUrls] = useState<string[]>([""]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const questions = [
    {
      id: 1,
      text: "開発するシステムの主な目的は何ですか？",
      options: [
        "社内業務の効率化",
        "顧客サービスの向上",
        "売上・利益の増加",
        "コスト削減",
        "その他",
      ],
      type: "radio",
    },
    {
      id: 2,
      text: "システムに必要な主な機能は何ですか？（複数選択可）",
      options: [
        "データ入力・管理",
        "レポート作成",
        "スケジュール管理",
        "顧客管理",
        "在庫管理",
        "決済機能",
        "その他",
      ],
      type: "checkbox",
    },
    {
      id: 3,
      text: "システムを利用する主なデバイスは何ですか？（複数選択可）",
      options: [
        "パソコン（デスクトップ/ノート）",
        "スマートフォン",
        "タブレット",
        "専用端末",
        "その他",
      ],
      type: "checkbox",
    },
    {
      id: 4,
      text: "システムで扱う主なデータは何ですか？（複数選択可）",
      options: [
        "顧客情報",
        "売上データ",
        "在庫情報",
        "スケジュール",
        "文書ファイル",
        "その他",
      ],
      type: "checkbox",
    },
    {
      id: 5,
      text: "既存のシステムとの連携は必要ですか？",
      options: [
        "必要ない",
        "一部連携が必要",
        "全面的に連携が必要",
        "わからない",
      ],
      type: "radio",
    },
    {
      id: 6,
      text: "セキュリティ要件はどの程度ですか？",
      options: [
        "一般的なレベルで十分",
        "やや高度なセキュリティが必要",
        "非常に高度なセキュリティが必須",
        "わからない",
      ],
      type: "radio",
    },
    {
      id: 7,
      text: "開発期間はどのくらいを予定していますか？",
      options: [
        "1ヶ月以内",
        "1-3ヶ月",
        "3-6ヶ月",
        "6ヶ月以上",
        "柔軟に対応可能",
      ],
      type: "radio",
    },
    {
      id: 8,
      text: "システム導入後のサポートは必要ですか？",
      options: [
        "必要ない",
        "軽度のサポート（問い合わせ対応程度）",
        "中程度のサポート（定期的なメンテナンス含む）",
        "手厚いサポート（運用代行も含む）",
        "わからない",
      ],
      type: "radio",
    },
    {
      id: 9,
      text: "参考WebサイトのURLを貼り付けてください（任意）",
      type: "url",
    },
    {
      id: 10,
      text: "開発したいシステムを言語化するとどのようなシステムですか？",
      type: "text",
    },
    {
      id: 11,
      text: "補足資料をアップロードしてください（任意）",
      type: "file",
    },
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswer = (questionId: number, answer: string | File[]) => {
    setAnswers((prevAnswers) => {
      const currentQuestion = questions[questionId - 1];
      if (currentQuestion.type === "radio") {
        return { ...prevAnswers, [questionId]: answer as string };
      } else if (currentQuestion.type === "checkbox") {
        const currentAnswers = (prevAnswers[questionId] as string[]) || [];
        return {
          ...prevAnswers,
          [questionId]: currentAnswers.includes(answer as string)
            ? currentAnswers.filter((a) => a !== answer)
            : [...currentAnswers, answer as string],
        };
      } else {
        return { ...prevAnswers, [questionId]: answer };
      }
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(
      (file) => file.type === "text/plain" || file.type === "application/pdf"
    );
    handleAnswer(11, validFiles);
  };

  const handleSubmit = () => {
    console.log("Answers:", answers);
    console.log("URLs:", urls);

    // シミュレーション結果を別タブで表示
    const estimateResult = "見積もり結果: 約500万円〜700万円";
    const requirementsResult =
      "主な要件: ユーザー認証、データ管理、レポート生成";
    const designResult =
      "推奨デザイン: モダンでシンプルなUI、レスポンシブデザイン";

    // 別タブを開いて結果を表示
    const newTab = window.open("/simulation-result", "_blank");

    // 新しいタブにデータを送るために、localStorageを使用
    localStorage.setItem(
      "simulationResults",
      JSON.stringify({ estimateResult, requirementsResult, designResult })
    );
  };

  const addUrlField = () => {
    setUrls([...urls, ""]);
  };

  const removeUrlField = (index: number) => {
    const updatedUrls = urls.filter((_, i) => i !== index);
    setUrls(updatedUrls);
  };

  const handleUrlChange = (index: number, value: string) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = value;
    setUrls(updatedUrls);
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        システム発注シミュレーション
      </h1>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          質問 {currentQuestionData.id} / {questions.length}
        </h2>
        <p className="text-lg mb-4">{currentQuestionData.text}</p>

        {/* テキスト入力タイプの質問 */}
        {currentQuestionData.type === "text" && (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            value={(answers[currentQuestionData.id] as string) || ""}
            onChange={(e) =>
              handleAnswer(currentQuestionData.id, e.target.value)
            }
            placeholder="例：システム開発発注の見積もりをAIにより自動化するシステム"
          />
        )}

        {/* ファイルアップロードタイプの質問 */}
        {currentQuestionData.type === "file" && (
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept=".txt,.pdf"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            >
              <Upload className="mr-2" /> ファイルを選択
            </button>
            <p className="text-sm text-gray-600">
              ※.txtまたは.pdf形式のファイルのみアップロード可能です。複数選択可能です。
            </p>
            {((answers[11] as File[]) || []).length > 0 && (
              <div>
                <p className="font-semibold">選択されたファイル:</p>
                <ul className="list-disc list-inside">
                  {(answers[11] as File[]).map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ラジオボタンやチェックボックスの質問 */}
        {(currentQuestionData.type === "radio" ||
          currentQuestionData.type === "checkbox") &&
          currentQuestionData.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentQuestionData.options.map((option, index) => {
                const isSelected =
                  currentQuestionData.type === "radio"
                    ? answers[currentQuestionData.id] === option
                    : (
                        (answers[currentQuestionData.id] as string[]) || []
                      ).includes(option);

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQuestionData.id, option)}
                    className={`p-4 rounded-lg shadow-md text-left transition-colors duration-200 ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 hover:bg-gray-100"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isSelected && <Check className="h-5 w-5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

        {/* 9番目の質問の時だけ表示されるURL追加フォーム */}
        {currentQuestionData.id === 9 && (
          <div className="mt-8">
            {urls.map((url, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={`URL #${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeUrlField(index)}
                  className="px-2 py-1 text-red-600 hover:text-red-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addUrlField}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
            >
              <PlusCircle className="mr-2" /> URLを追加
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="inline-block mr-2 h-4 w-4" /> 戻る
        </button>
        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            見積もり
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            次へ <ChevronRight className="inline-block ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SystemOrderSimulation;
