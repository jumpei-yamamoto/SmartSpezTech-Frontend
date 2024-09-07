"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowUpIcon,
  XMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";

// ProjectAssessmentForm コンポーネントをインポート
import ProjectAssessmentForm from "../components/ProjectAssessmentForm";

type Comment = {
  id: number;
  x: number;
  y: number;
  text: string;
  zIndex: number;
};

export default function AIAssistedDevelopment() {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [code, setCode] = useState(`
    export default function SampleForm() {
      return (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">名前</label>
            <input id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="名前を入力" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
            <input id="email" type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="メールアドレスを入力" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">メッセージ</label>
            <textarea id="message" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="メッセージを入力" />
          </div>
          <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">送信</button>
        </div>
      )
    }
  `);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeComment, setActiveComment] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [draggedCommentZIndex, setDraggedCommentZIndex] = useState<
    number | null
  >(null);
  const [scrollOffset, setScrollOffset] = useState({ x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [scale, setScale] = useState(0.7);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const SCROLL_TIMEOUT = 300; // ミリ秒
  const [mouseDownPosition, setMouseDownPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const CLICK_THRESHOLD = 5; // ピクセル

  // ProjectAssessmentForm の表示状態を管理するstate
  const [showAssessmentForm, setShowAssessmentForm] = useState(true);

  const handleUserInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    // AI APIの呼び出し（実際の実装が必要）
    setAiResponse("AIからの応答をここに表示します。");
  };

  const handleImplement = () => {
    // 実際の実装では、ここでコードをサーバーに送信して実行し、結果を受け取ります
    console.log("コードを実行します:", code);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setScrollOffset({ x: target.scrollLeft, y: target.scrollTop });
    setLastScrollTime(Date.now());
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();
      setMouseDownPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      // ドラッグ終了の処理
      if (activeComment !== null && draggedCommentZIndex !== null) {
        setComments(
          comments.map((c) =>
            c.id === activeComment ? { ...c, zIndex: draggedCommentZIndex } : c
          )
        );
      }
      setIsDragging(false);
      setActiveComment(null);
      setDraggedCommentZIndex(null);
    } else if (mouseDownPosition && previewRef.current) {
      // クリック判定
      const rect = previewRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      const distance = Math.sqrt(
        Math.pow(currentX - mouseDownPosition.x, 2) +
          Math.pow(currentY - mouseDownPosition.y, 2)
      );

      if (distance < CLICK_THRESHOLD) {
        handlePreviewClick(e);
      }
    }
    setMouseDownPosition(null);
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    const currentTime = Date.now();
    if (currentTime - lastScrollTime < SCROLL_TIMEOUT) {
      // スクロール後のタイムアウト期間内の場合、クリックを無視
      return;
    }

    if (previewRef.current && !isDragging) {
      const isFormElement = ["INPUT", "TEXTAREA", "BUTTON"].includes(
        (e.target as HTMLElement).tagName
      );

      if (!isFormElement) {
        const rect = previewRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / scale;
        const y = (e.clientY - rect.top) / scale;
        const newComment = {
          id: Date.now(),
          x,
          y,
          text: "新しいコメント",
          zIndex: comments.length,
        };
        setComments([...comments, newComment]);
      }
    }
  };

  const handleCommentMouseDown = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setActiveComment(id);
    setIsDragging(true);
    const comment = comments.find((c) => c.id === id);
    if (comment && previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();
      setDragOffset({
        x: (e.clientX - rect.left) / scale - comment.x,
        y: (e.clientY - rect.top) / scale - comment.y,
      });
      setDraggedCommentZIndex(comment.zIndex);
      setComments(
        comments.map((c) => (c.id === id ? { ...c, zIndex: 1000000 } : c))
      );
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && activeComment !== null && previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale - dragOffset.x;
      const y = (e.clientY - rect.top) / scale - dragOffset.y;
      setComments(
        comments.map((comment) =>
          comment.id === activeComment ? { ...comment, x, y } : comment
        )
      );
    }
  };

  const updateCommentText = (id: number, text: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, text } : comment
      )
    );
  };

  const deleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const bringToFront = (id: number) => {
    const maxZIndex = Math.max(...comments.map((c) => c.zIndex));
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, zIndex: maxZIndex + 1 } : comment
      )
    );
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setScale(isFullScreen ? 0.7 : 1);
  };

  // ProjectAssessmentForm の表示/非表示を切り替える関数
  const toggleAssessmentForm = () => {
    setShowAssessmentForm(!showAssessmentForm);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* ProjectAssessmentForm を条件付きでレンダリング */}
      {showAssessmentForm && (
        <div className="mb-4">
          <ProjectAssessmentForm />
        </div>
      )}

      {/* ProjectAssessmentForm の表示/非表示を切り替えるボタン */}
      <button
        onClick={toggleAssessmentForm}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showAssessmentForm ? "評価フォームを閉じる" : "評価フォームを開く"}
      </button>

      <div className={`${isFullScreen ? "flex flex-col h-screen" : "flex"}`}>
        {!isFullScreen && (
          <div className="w-1/2 pr-2">
            <div className="bg-white shadow rounded-lg mb-4">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  システム要望入力
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <textarea
                  placeholder="システムの要望を入力してください"
                  value={userInput}
                  onChange={handleUserInputChange}
                  className="w-full min-h-[100px] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="px-4 py-4 sm:px-6">
                <button
                  onClick={handleSubmit}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  AI に送信
                </button>
              </div>
            </div>

            {aiResponse && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    AI レスポンス
                  </h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <textarea
                    value={aiResponse}
                    readOnly
                    className="w-full min-h-[200px] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className={isFullScreen ? "flex-grow" : "w-1/2 pl-2"}>
          <div className="bg-white shadow rounded-lg h-full">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                コードとプレビュー
              </h3>
              {activeTab === "preview" && (
                <button
                  onClick={toggleFullScreen}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isFullScreen ? (
                    <ArrowsPointingInIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowsPointingOutIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </button>
              )}
            </div>
            <div
              className={`px-4 py-5 sm:p-6 ${
                isFullScreen ? "h-[calc(100vh-180px)]" : "h-[calc(100%-120px)]"
              }`}
            >
              <div className="h-full">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex" aria-label="Tabs">
                    <button
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "code"
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("code")}
                    >
                      コード
                    </button>
                    <button
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "preview"
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("preview")}
                    >
                      プレビュー
                    </button>
                  </nav>
                </div>
                <div
                  className={`${
                    isFullScreen
                      ? "h-[calc(100vh-220px)]"
                      : "h-[calc(100%-40px)]"
                  }`}
                >
                  {activeTab === "code" ? (
                    <div id="code-tab" className="h-full">
                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full font-mono rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                  ) : (
                    <div
                      id="preview-tab"
                      className="h-full overflow-auto"
                      onScroll={handleScroll}
                    >
                      <div
                        ref={previewRef}
                        className="w-full h-full border-2 border-dashed border-gray-300 p-4 relative"
                        style={{
                          transform: `scale(${scale})`,
                          transformOrigin: "top left",
                          width: `${100 / scale}%`,
                          height: `${100 / scale}%`,
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseUp}
                      >
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              名前
                            </label>
                            <input
                              id="name"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="名前を入力"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              メールアドレス
                            </label>
                            <input
                              id="email"
                              type="email"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="メールアドレスを入力"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="message"
                              className="block text-sm font-medium text-gray-700"
                            >
                              メッセージ
                            </label>
                            <textarea
                              id="message"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder="メッセージを入力"
                            />
                          </div>
                          <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            送信
                          </button>
                        </div>
                        {comments.map((comment) => (
                          <div
                            key={comment.id}
                            style={{
                              position: "absolute",
                              left: `${comment.x}px`,
                              top: `${comment.y}px`,
                              zIndex: comment.zIndex,
                            }}
                            onMouseDown={(e) =>
                              handleCommentMouseDown(e, comment.id)
                            }
                          >
                            <div
                              className="bg-yellow-200 p-2 rounded shadow-md"
                              style={{ maxWidth: "200px", minWidth: "100px" }}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    bringToFront(comment.id);
                                  }}
                                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  <ArrowUpIcon
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteComment(comment.id);
                                  }}
                                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  <XMarkIcon
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                              <textarea
                                value={comment.text}
                                onChange={(e) =>
                                  updateCommentText(comment.id, e.target.value)
                                }
                                className="w-full text-sm resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                rows={2}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
