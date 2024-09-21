import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowUpIcon,
  XMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import ContactModal from "../components/ContactModal";

interface Comment {
  id: number;
  x: number;
  y: number;
  text: string;
  zIndex: number;
}

const SimulationResult: React.FC = () => {
  const [activeTab, setActiveTab] = useState("estimate");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  const [popupTab, setPopupTab] = useState("popup-estimate");
  const [result, setResult] = useState<any>(null);
  const [screenDetails, setScreenDetails] = useState<Record<string, any>>({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [scale, setScale] = useState(0.7);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeComment, setActiveComment] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  const [editableContents, setEditableContents] = useState<
    Record<string, string>
  >({});
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
  const [editableScreenDetails, setEditableScreenDetails] = useState<
    Record<string, any>
  >({});
  const [mouseDownPosition, setMouseDownPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const CLICK_THRESHOLD = 5; // ピクセル
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:80";

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
          answers: parsedData.answers,
        });
        setEditableContents({
          requirements_specification: parsedData.requirements_specification,
          requirements_definition: parsedData.requirements_definition,
        });
        setEditableScreenDetails(
          parsedData.screens.reduce(
            (acc: Record<string, any>, screen: string) => {
              acc[screen] = {};
              return acc;
            },
            {}
          )
        );
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
          answers: result?.answers,
        });
        setScreenDetails((prevDetails) => ({
          ...prevDetails,
          [screen]: response.data,
        }));
        setEditableScreenDetails((prevDetails) => ({
          ...prevDetails,
          [screen]: response.data,
        }));
      } catch (error) {
        console.error("画面詳細の取得に失敗しました:", error);
        alert("画面詳細の取得に失敗しました。");
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedScreen(null);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setScale(isFullScreen ? 0.7 : 1);
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    if (previewRef.current && !isDragging) {
      const rect = previewRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;
      const newComment: Comment = {
        id: Date.now(),
        x,
        y,
        text: "新しいコメント",
        zIndex: comments.length,
      };
      setComments([...comments, newComment]);
    }
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
      setIsDragging(false);
      setActiveComment(null);
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

  const handleContentChange = (
    key: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditableContents((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
    adjustTextareaHeight(event.target);
  };

  const toggleEditMode = (key: string, screen?: string) => {
    if (screen) {
      setEditableScreenDetails((prev) => ({
        ...prev,
        [screen]: {
          ...prev[screen],
          [key]: {
            ...prev[screen][key],
            isEditing: !prev[screen][key]?.isEditing,
          },
        },
      }));
    } else {
      setIsEditing((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const handleScreenDetailChange = (
    screen: string,
    key: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditableScreenDetails((prev) => ({
      ...prev,
      [screen]: {
        ...prev[screen],
        [key]: {
          ...prev[screen][key],
          content: event.target.value,
        },
      },
    }));
    adjustTextareaHeight(event.target);
  };

  const adjustTextareaHeight = useCallback((textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  const renderEditableMarkdown = (
    content: string,
    isEditable: boolean,
    key?: string,
    screen?: string
  ) => {
    const editableContent = screen
      ? editableScreenDetails[screen]?.[key!]?.content || content
      : editableContents[key!] || content;
    const isEditingCurrent = screen
      ? editableScreenDetails[screen]?.[key!]?.isEditing
      : isEditing[key!];

    return (
      <div className="relative">
        {isEditable && isEditingCurrent ? (
          <div>
            <textarea
              value={editableContent}
              onChange={(e) =>
                screen
                  ? handleScreenDetailChange(screen, key!, e)
                  : handleContentChange(key!, e)
              }
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              ref={(textarea) => {
                if (textarea) {
                  adjustTextareaHeight(textarea);
                }
              }}
            />
            <button
              onClick={() => toggleEditMode(key!, screen)}
              className="mt-2 p-2 bg-gradient-to-r from-blue-400 to-cyan-300 text-white rounded-md hover:from-blue-500 hover:to-cyan-400 transition-all duration-300"
            >
              保存
            </button>
          </div>
        ) : (
          <div onDoubleClick={() => isEditable && toggleEditMode(key!, screen)}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="prose max-w-none"
            >
              {editableContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    );
  };

  const renderScreenSample = (sampleHtml: string) => {
    return (
      <div
        className="border border-gray-300 rounded-md p-4"
        dangerouslySetInnerHTML={{ __html: sampleHtml }}
      />
    );
  };

  if (!result) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 text-center">
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
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl relative">
        {/* 問い合わせボタン */}
        <button
          onClick={() => setShowInquiryModal(true)}
          className="absolute top-4 right-4 bg-gradient-to-r from-blue-400 to-cyan-300 text-white px-4 py-2 rounded-md flex items-center hover:from-blue-500 hover:to-cyan-400 transition-all duration-300"
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
          問い合わせ
        </button>

        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          シミュレーション結果
        </h1>

        {/* タブ切り替え */}
        <div className="flex border-b justify-center">
          <button
            className={`px-4 py-2 ${
              activeTab === "estimate"
                ? "border-b-2 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("estimate")}
          >
            見積もり
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "requirements"
                ? "border-b-2 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("requirements")}
          >
            要件定義
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "specification"
                ? "border-b-2 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("specification")}
          >
            要求仕様
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "screens"
                ? "border-b-2 text-blue-600"
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
              {renderEditableMarkdown(result.estimate_develop, false)}
            </div>
          )}

          {activeTab === "requirements" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">要件定義</h2>
              {renderEditableMarkdown(
                result.requirements_definition,
                true,
                "requirements_definition"
              )}
            </div>
          )}

          {activeTab === "specification" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">要求仕様</h2>
              {renderEditableMarkdown(
                result.requirements_specification,
                true,
                "requirements_specification"
              )}
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
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="border-b mb-4"></div>

              {/* ポップアップ内のタブ切り替え */}
              <div className="p-4">
                <button
                  className={`px-4 py-2 ${
                    popupTab === "popup-estimate"
                      ? "border-b-2 border-blue-400 text-blue-400"
                      : "text-gray-600"
                  }`}
                  onClick={() => setPopupTab("popup-estimate")}
                >
                  工数見積もり
                </button>
                <button
                  className={`px-4 py-2 ${
                    popupTab === "popup-design"
                      ? "border-b-2 border-blue-400 text-blue-400"
                      : "text-gray-600"
                  }`}
                  onClick={() => setPopupTab("popup-design")}
                >
                  基本設計
                </button>
                <button
                  className={`px-4 py-2 ${
                    popupTab === "popup-sample"
                      ? "border-b-2 border-blue-400 text-blue-400"
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
                    {renderEditableMarkdown(
                      screenDetails[selectedScreen]?.workload ||
                        "読み込み中...",
                      false
                    )}
                  </div>
                )}

                {popupTab === "popup-design" && (
                  <div>
                    <h4 className="text-lg font-semibold">基本設計</h4>
                    {renderEditableMarkdown(
                      screenDetails[selectedScreen]?.basic_design ||
                        "読み込み中...",
                      true,
                      "basic_design",
                      selectedScreen
                    )}
                  </div>
                )}

                {popupTab === "popup-sample" && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold">画面サンプル</h4>
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
                    </div>
                    <div
                      ref={previewRef}
                      className="relative border border-gray-300 rounded-md p-4"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      style={{
                        transform: `scale(${scale})`,
                        transformOrigin: "top left",
                        width: `${100 / scale}%`,
                        height: `${100 / scale}%`,
                      }}
                    >
                      {screenDetails[selectedScreen]?.screen_sample ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: screenDetails[selectedScreen].screen_sample,
                          }}
                        />
                      ) : (
                        <p>読み込み中...</p>
                      )}
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
        )}

        {/* 問い合わせモーダル */}
        {/* <ContactModal
          isOpen={showInquiryModal}
          onClose={() => setShowInquiryModal(false)}
        /> */}
      </div>
    </div>
  );
};

export default SimulationResult;
