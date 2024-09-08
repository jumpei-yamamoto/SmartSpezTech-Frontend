import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectAssessmentForm = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [formId, setFormId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    "誰にどんな課題があるか説明してください。",
    "その課題をどのように解決しますか？",
    "この課題の解決にはどのような価値がありますか？",
    "その価値を具現化するプロダクトについて説明してください。",
    "このプロダクトがどのように実際のマーケットで事業として成立すると考えていますか？",
  ];

  const apiBaseUrl =
    process.env.NODE_ENV === "production"
      ? "https://smartspeztech.eba-kam3e43r.ap-northeast-3.elasticbeanstalk.com"
      : "http://localhost:8000";

  useEffect(() => {
    // コンポーネントマウント時に既存のフォームIDを確認
    const existingFormId = localStorage.getItem("formId");
    if (existingFormId) {
      setFormId(existingFormId);
      loadAnswers(existingFormId);
    }
  }, []);

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[step] = e.target.value;
    setAnswers(newAnswers);
  };

  const saveAnswers = async () => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/save`,
        {
          id: formId,
          answers: answers,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFormId(response.data.id);
      localStorage.setItem("formId", response.data.id);
      alert("回答が保存されました。");
    } catch (error) {
      console.error("保存中にエラーが発生しました:", error);
      alert("保存中にエラーが発生しました。");
    }
  };

  const loadAnswers = async (id: string) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/load/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAnswers(response.data.answers);
      alert("回答が読み込まれました。");
    } catch (error) {
      console.error("読み込み中にエラーが発生しました:", error);
      alert("読み込み中にエラーが発生しました。");
    }
  };

  const startAnalysis = async (answers: string[]): Promise<string> => {
    const response = await axios.post(
      `${apiBaseUrl}/analyze`,
      { answers },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.task_id;
  };

  const checkAnalysisResult = async (
    taskId: string
  ): Promise<{ status: string; result?: string }> => {
    const response = await axios.get(
      `${apiBaseUrl}/analysis_result/${taskId}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };

  const analyzeAnswers = async () => {
    setLoading(true);
    try {
      const taskId = await startAnalysis(answers);
      console.log("分析開始:", taskId);

      while (true) {
        const result = await checkAnalysisResult(taskId);
        if (result.status === "complete") {
          console.log("分析完了:", result.result);
          setAnalysis(result.result || null);
          break;
        } else {
          console.log("処理中...");
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    } catch (error) {
      console.error("分析中にエラーが発生しました:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-100">
        <h1 className="text-xl font-bold text-gray-800">
          プロジェクト評価フォーム
        </h1>
      </div>
      <div className="p-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <h2 className="text-lg font-semibold mb-2">{questions[step]}</h2>
        <textarea
          value={answers[step]}
          onChange={handleAnswerChange}
          placeholder="ここに回答を入力してください..."
          className="w-full p-2 border border-gray-300 rounded mb-4 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevious}
            disabled={step === 0}
            className={`px-4 py-2 rounded ${
              step === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            前へ
          </button>
          <button
            onClick={saveAnswers}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            保存
          </button>
          <button
            onClick={handleNext}
            disabled={step === questions.length - 1}
            className={`px-4 py-2 rounded ${
              step === questions.length - 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            次へ
          </button>
        </div>
        <button
          onClick={analyzeAnswers}
          disabled={loading}
          className="w-full px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 disabled:bg-gray-300 disabled:text-gray-500"
        >
          {loading ? "分析中..." : "回答を分析する"}
        </button>
        {analysis && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">分析結果:</h3>
            <p>{analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectAssessmentForm;
