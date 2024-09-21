import React, { useState } from "react";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PageData } from "./SystemPreview";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulationData: PageData[];
}

export default function ContactModal({
  isOpen,
  onClose,
  simulationData,
}: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:80";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = {
      name,
      email,
      message,
      simulationData,
    };

    try {
      const response = await axios.post(
        `${apiBaseUrl}/submit_inquiry`,
        formData,
        {
          withCredentials: false,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("お問い合わせが正常に送信されました");
        onClose();
        navigate('/thanks'); // ThanksPageへリダイレクト
      } else {
        console.error("お問い合わせの送信中にエラーが発生しました");
        alert("お問い合わせの送信中にエラーが発生しました。");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 0) {
        console.error("CORS エラーが発生しました:", error);
        alert("CORS エラーが発生しました。サーバーの設定を確認してください。");
      } else {
        console.error("お問い合わせの送信中にエラーが発生しました", error);
        alert("お問い合わせの送信中にエラーが発生しました。");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        {/* 閉じるボタンを追加 */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 mb-2">
            お問い合わせ
          </h2>
          <p className="text-gray-600 mb-6">
            以下のフォームに必要事項を入力してください。
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="name" className="text-gray-700 block mb-1">
                  お名前
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                    size={18}
                  />
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-md focus:ring-blue-400 focus:border-blue-400 p-2"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="email" className="text-gray-700 block mb-1">
                  メールアドレス
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                    size={18}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-md focus:ring-blue-400 focus:border-blue-400 p-2"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="message" className="text-gray-700 block mb-1">
                  お問い合わせ内容
                </label>
                <div className="relative">
                  <MessageSquare
                    className="absolute left-3 top-3 text-blue-400"
                    size={18}
                  />
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-md focus:ring-blue-400 focus:border-blue-400 p-2"
                    rows={4}
                    required
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-400 to-cyan-300 text-white py-2 px-4 rounded-md hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "送信中..."
              ) : (
                <>
                  <Send className="mr-2" size={18} />
                  送信
                </>
              )}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4 italic">
            注意：お問い合わせ内容にシミュレーション結果が含まれる場合、その情報は保存されます。
          </p>
        </div>
      </div>
    </div>
  );
}
