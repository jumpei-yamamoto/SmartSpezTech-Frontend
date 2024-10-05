// SystemOrderSimulation.tsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // 追加
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Upload,
  PlusCircle,
  X,
} from "lucide-react";
import axios from "axios";

const SystemOrderSimulation: React.FC = () => {
  const navigate = useNavigate(); // 追加
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    Record<number, string | string[] | File[]>
  >({});
  const [urls, setUrls] = useState<string[]>([""]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:80"; // デフォルトポートを変更

  const questions = [
    {
      id: 1,
      text: "開の主な目的は何ですか？発するシステム",
      options: [
        "社内業務の効率化",
        "顧客サービスの向上",
        "売上・利益の増加",
        // "コスト削減",
        // "その他",
      ],
      type: "radio",
    },
    {
      id: 2,
      text: "システムに必要な主な機能は何ですか？",
      options: [
        "データ入力・管理",
        "レポート作成",
        "スケジュール管理",
        // "顧客管理",
        // "在庫管理",
        // "決済機能",
        // "その他",
      ],
      type: "radio",
    },
    {
      id: 3,
      text: "画面操作は必要ですか？",
      options: ["必要", "不要", "分からない"],
      type: "radio",
    },
    {
      id: 4,
      text: "システムで扱う主なデータは何ですか？",
      options: [
        "顧客情報",
        "売上データ",
        "在庫情報",
        "スケジュール",
        "文書ファイル",
        "その他",
      ],
      type: "radio",
    },
    {
      id: 5,
      text: "既存のシステムとの連携は必要ですか？",
      options: ["必要ない", "一部連携が必要", "全的に連携が必要", "わからない"],
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
    // {
    //   id: 8,
    //   text: "開発したいシステムを言語化するとどのようなシステムですか？簡潔に記載してください。（複数ある場合カンマ区切りで記述してください。）",
    //   type: "text",
    // },
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
      const currentQuestion = questions.find((q) => q.id === questionId);
      if (!currentQuestion) return prevAnswers;

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

  // const estimateAnswers = async () => {
  //   setLoading(true);
  //   try {
  //     // 質問9のURLをanswersに統合
  //     const updatedAnswers = {
  //       ...answers,
  //       // 9: urls.filter((url) => url.trim() !== ""),
  //     };
  //     const response = await axios.post(
  //       `${apiBaseUrl}/preview`,
  //       { answers: updatedAnswers },
  //       {
  //         withCredentials: false,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const simulationData = response.data;

  //     console.log("response:", response);
  //     console.log("response.data:", response.data);

  //     // データをlocalStorageに保存
  //     localStorage.setItem("simulationResults", JSON.stringify(simulationData));

  //     console.log("simulationData元ページ:", simulationData);

  //     // 結果画面に遷移
  //     navigate("/system-preview", {
  //       state: { simulationData },
  //     });
  //   } catch (error) {
  //     if (axios.isAxiosError(error) && error.response?.status === 0) {
  //       console.error("CORS エラーが発生しました:", error);
  //       alert("CORS エラーが発生しました。サーバーの設定を確認してください。");
  //     } else {
  //       console.error("分析中にエラーが発生しました:", error);
  //       alert("分析中にエラーが発生しました。");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const simulateAnswers = async () => {
    setLoading(true);
    try {
      // 質問9のURLをanswersに統合
      const updatedAnswers = {
        ...answers,
        // 9: urls.filter((url) => url.trim() !== ""),
      };
      const response = await axios.post(
        `${apiBaseUrl}/simulate`,
        { answers: updatedAnswers },
        {
          withCredentials: false,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const simulationData = response.data;

      console.log("response:", response);
      console.log("response.data:", response.data);

      // データをlocalStorageに保存
      localStorage.setItem("simulationResults", JSON.stringify(simulationData));

      console.log("simulationData元ページ:", simulationData);

      // 結果画面に遷移
      navigate("/system-preview", {
        state: { simulationData },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 0) {
        console.error("CORS エラーが発生しました:", error);
        alert("CORS エラーが発生しました。サーバーの設定を確認してください。");
      } else {
        console.error("分析中にエラーが発生しました:", error);
        alert("分析中にエラーが発生しました。");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const validUrls = urls.filter((url) => url.trim() !== "");
    const updatedAnswers = { ...answers, 9: validUrls };
    setAnswers(updatedAnswers);
    simulateAnswers();
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

  const isCurrentQuestionAnswered = () => {
    if (currentQuestion >= 8) {
      // 最後の質問（質問8）の場合
      return answers[currentQuestionData.id] !== undefined;
    }
    const answer = answers[currentQuestionData.id];
    if (!answer) return false;
    if (Array.isArray(answer)) return answer.length > 0;
    if (typeof answer === "string") return answer.trim() !== "";
    return true;
  };

  const adjustAnalysisAndAddAdvice = (
    originalAnalysis: string,
    answers: Record<number, string | string[] | File[]>
  ): string => {
    let adjustedAnalysis = originalAnalysis;

    const purpose = answers[1] as string;
    const mainFeatures = answers[2] as string[];
    const devices = answers[3] as string[];
    const dataTypes = answers[4] as string[];
    const integration = answers[5] as string;
    const security = answers[6] as string;
    const developmentPeriod = answers[7] as string;
    const support = answers[8] as string;
    const systemDescription = answers[9] as string;

    adjustedAnalysis += `

ご入力いただいた内容に基づき、以下のアドバイスと具体的な提案をさせていただきます：

1. システムの目的：${purpose}
   提案：${
     purpose === "社内業務の効率化"
       ? "業務プロセスの可視化と自動化ツールの導入"
       : purpose === "顧客サービスの向上"
       ? "カスタマーエクスペリエンス（CX）分析ツールの統合"
       : purpose === "売上・利益の増加"
       ? "AIを活用した需要予測と価格最適化機能の実装"
       : purpose === "コスト削減"
       ? "クラウドベースのリソース最適化ソリューションの採用"
       : "目的に特化したカスタムソリューションの設計"
   }はいかがでしょうか。

2. 主要機能：${mainFeatures.join(", ")}
   提案：${
     mainFeatures.includes("データ入力・管理")
       ? "OCRとAI技術を活用した自動データ入力システム"
       : ""
   }
        ${
          mainFeatures.includes("レポート作成")
            ? "ダッシュボード機能付きの動的レポート生成ツール"
            : ""
        }
        ${
          mainFeatures.includes("スケジュール管理")
            ? "AIアシスタント搭載のスマートスケジューリングシステム"
            : ""
        }
        ${
          mainFeatures.includes("顧客管理")
            ? "予測分析機能を備えたCRMシステム"
            : ""
        }
        ${
          mainFeatures.includes("在庫管理")
            ? "IoTセンサーと連携したリアルタイム在庫管理システム"
            : ""
        }
        ${
          mainFeatures.includes("決済機能")
            ? "ブロックチェーン技術を活用した安全な決済システム"
            : ""
        }
   などの導入を検討してみてはいかがでしょうか。

3. 利用デバイス：${devices.join(", ")}
   提案：${
     devices.includes("スマートフォン")
       ? "レスポンシブデザインとPWA（Progressive Web App）技術の採用"
       : devices.includes("タブレット")
       ? "タッチ操作に最適化されたUIデザインの実装"
       : devices.includes("専用端末")
       ? "デバイス固有の機能を最大限に活用したカスタムアプリケーションの開発"
       : "デスクトップ向けの高機能なWebアプリケーションの構築"
   }を検討してみてはいかがでしょうか。

4. データタイプ：${dataTypes.join(", ")}
   提案：${
     dataTypes.includes("顧客情報")
       ? "GDPRに準拠した顧客データ管理システム"
       : ""
   }
        ${
          dataTypes.includes("売上データ")
            ? "リアルタイム売上分析ダッシュボード"
            : ""
        }
        ${
          dataTypes.includes("在庫情報")
            ? "AIを活用した需要予測と自動発注システム"
            : ""
        }
        ${
          dataTypes.includes("スケジュール")
            ? "カレンダーAPIと連携したクロスプラットフォームスケジュール管理"
            : ""
        }
        ${
          dataTypes.includes("文書ファイル")
            ? "全文検索機能付きのクラウドベース文書管理システム"
            : ""
        }
   の導入を検討してみてはいかがでしょうか。

5. 既存システムとの連携：${integration}
   提案：${
     integration === "必要ない"
       ? "スタンドアロンシステムの構築"
       : integration === "一部連携が必要"
       ? "APIを活用したモジュラー設計"
       : integration === "全面的に連携が必要"
       ? "エンタープライズサービスバス（ESB）の導入"
       : "将来の拡張性を考慮したマイクロサービスアーキテクチャの採用"
   }を検討してみてはいかがでしょうか。

6. セキュリティ要件：${security}
   提案：${
     security === "一般的なレベルで十分"
       ? "標準的な暗号化とアクセス制御"
       : security === "やや高度なセキュリティが必要"
       ? "多要素認証と詳細なアクセスログの実装"
       : security === "非常に高度なセキュリティが必須"
       ? "ゼロトラストアーキテクチャの採用"
       : "段階的にセキュリティレベルを向上できる柔軟な設計"
   }を検討してみてはいかがでしょうか。

7. 開発期間：${developmentPeriod}
   提案：${
     developmentPeriod === "1ヶ月以内"
       ? "アジャイル開発手法とローコード/ノーコードプラットフォームの活用"
       : developmentPeriod === "1-3ヶ月"
       ? "スクラム手法を用いた迅速な開発サイクル"
       : developmentPeriod === "3-6ヶ月"
       ? "フェーズ分けされた段階的な開発アプローチ"
       : developmentPeriod === "6ヶ月以上"
       ? "ウォーターフォールとアジャイルのハイブリッドアプローチ"
       : "柔軟なマイルストーン設定と定期的な進捗レビュー"
   }を採用してみてはいかがでしょうか。

8. システム導入後のサポート：${support}
   提案：${
     support === "必要ない"
       ? "詳細なユーザーマニュアルとFAQの作成"
       : support === "軽度のサポート（問い合わせ対応程度）"
       ? "チャットボットを活用したセルフサービスサポート"
       : support === "中程度のサポート（定期的なメンテナンス含む）"
       ? "リモートモニタリングと定期的な保守計画の策定"
       : support === "手厚いサポート（運用代行も含む）"
       ? "24/7対応のデディケーテッドサポートチームの設置"
       : "段階的にサポートレベルを調整できる柔軟なサポート体制"
   }の構築を検討してみてはいかがでしょうか。

システム概要：${systemDescription}
上記の概要を踏まえ、${purpose}を実現するための${
      mainFeatures[0]
    }機能に重点を置いた開発を進めることをお勧めします。${
      devices[0]
    }向けのユーザーインターフェースを優先的に設計し、${
      dataTypes[0]
    }の効率的な管理を可能にするデータモデルを構築することで、システムの基盤を固めることができるでしょう。

これらの提案を参考に、プロジェクトの詳細計画を立てていただければと思います。さらに具体的なアドバイスや質問がございましたら、お気軽にお問い合わせください。`;

    return adjustedAnalysis;
  };

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
          質問 {currentQuestion + 1} / {questions.length}
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
            disabled={loading || !isCurrentQuestionAnswered()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "分析中..." : "シミュレーションを開始"}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次へ <ChevronRight className="inline-block ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SystemOrderSimulation;
