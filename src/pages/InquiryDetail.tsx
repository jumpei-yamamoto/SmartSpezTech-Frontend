// src/InquiryDetail.tsx
import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  Send,
  ArrowRight,
  Plus,
  Trash2,
  Eye,
  Code,
  Play,
  Link,
  ShoppingCart,
  Package,
} from "lucide-react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import classNames from "classnames";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

interface Screen {
  id: number;
  name: string;
  html: string;
  events: string[];
}

interface Event {
  id: number;
  name: string;
  screen: string;
  process: string;
}

interface Entity {
  id: number;
  name: string;
  attributes: string[];
}

interface Relation {
  id: number;
  from: string;
  to: string;
  type: string;
}

// Inquiry インターフェースを追加
interface Inquiry {
  id: number;
  name: string;
  email: string;
  inquiry: string;
  status: number;
}

const InquiryDetail: React.FC = () => {
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<{
    features: string[];
    requirements: string[];
  }>({ features: [], requirements: [] });

  const [screens, setScreens] = useState<Screen[]>([
    {
      id: 1,
      name: "ログイン画面",
      html: `<div class="flex items-center justify-center min-h-screen bg-gray-100">
              <div class="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
                <h1 class="text-2xl font-bold text-center text-gray-700 mb-4">ログイン</h1>
                <form>
                  <div class="mb-4">
                    <label htmlFor="email" class="block text-sm font-medium text-gray-700">メールアドレス</label>
                    <input type="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                  </div>
                  <div class="mb-4">
                    <label htmlFor="password" class="block text-sm font-medium text-gray-700">パスワード</label>
                    <input type="password" id="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                  </div>
                  <button type="submit" class="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">ログイン</button>
                </form>
              </div>
            </div>`,
      events: ["ログインボタンクリック"],
    },
    {
      id: 2,
      name: "ダッシュボード",
      html: `<div class="min-h-screen bg-gray-100">
              <div class="p-6">
                <h1 class="text-2xl font-bold text-gray-700 mb-4">ダッシュボード</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div class="bg-white p-4 rounded-md shadow">
                    <h2 class="text-lg font-semibold mb-2">最近の注文</h2>
                    <ul class="space-y-2">
                      <li class="flex justify-between"><span>注文 #1234</span><span>¥10,000</span></li>
                      <li class="flex justify-between"><span>注文 #1235</span><span>¥15,000</span></li>
                    </ul>
                  </div>
                  <div class="bg-white p-4 rounded-md shadow">
                    <h2 class="text-lg font-semibold mb-2">売上統計</h2>
                    <div class="h-40 bg-gray-200 flex items-center justify-center">グラフ表示エリア</div>
                  </div>
                  <div class="bg-white p-4 rounded-md shadow">
                    <h2 class="text-lg font-semibold mb-2">タスク</h2>
                    <ul class="space-y-2">
                      <li class="flex items-center"><input type="checkbox" class="mr-2" /><span>在庫確認</span></li>
                      <li class="flex items-center"><input type="checkbox" class="mr-2" /><span>発注処理</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>`,
      events: ["注文詳細表示", "売上レポート生成", "タスク完了"],
    },
  ]);

  const [eventsList, setEventsList] = useState<Event[]>([
    {
      id: 1,
      name: "ログインボタンクリック",
      screen: "ログイン画面",
      process: "ユーザー認証を行い、成功したらダッシュボードに遷移",
    },
    {
      id: 2,
      name: "注文詳細表示",
      screen: "ダッシュボード",
      process: "選択された注文の詳細情報を表示",
    },
    {
      id: 3,
      name: "売上レポート生成",
      screen: "ダッシュボード",
      process: "指定期間の売上レポートをPDF形式で生成",
    },
    {
      id: 4,
      name: "タスク完了",
      screen: "ダッシュボード",
      process: "タスクを完了としてマークし、完了リストに移動",
    },
  ]);

  const [entities, setEntities] = useState<Entity[]>([
    {
      id: 1,
      name: "ユーザー",
      attributes: [
        "id: int",
        "username: varchar(50)",
        "email: varchar(100)",
        "password: varchar(255)",
        "created_at: timestamp",
      ],
    },
    {
      id: 2,
      name: "注文",
      attributes: [
        "id: int",
        "user_id: int",
        "total_amount: decimal(10,2)",
        "status: varchar(20)",
        "created_at: timestamp",
      ],
    },
    {
      id: 3,
      name: "商品",
      attributes: [
        "id: int",
        "name: varchar(100)",
        "description: text",
        "price: decimal(10,2)",
        "stock: int",
      ],
    },
  ]);

  const [relations, setRelations] = useState<Relation[]>([
    { id: 1, from: "ユーザー", to: "注文", type: "1:N" },
    { id: 2, from: "注文", to: "商品", type: "N:M" },
  ]);

  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);
  const [isEditingHtml, setIsEditingHtml] = useState(false);
  const [editingScreenId, setEditingScreenId] = useState<number | null>(null);
  const [editingHtml, setEditingHtml] = useState("");
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:80";

  // 問い合わせ情報の state を追加
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);

  const handleAiQuery = () => {
    // 実際のAI統合ロジックに置き換えてください
    setAiResponse({
      features: [
        "ユーザー認証機能",
        "ダッシュボード表示",
        "注文管理システム",
        "売上レポート生成",
        "タスク管理機能",
        "商品在庫管理",
      ],
      requirements: [
        "ユーザーログインが正常に機能すること",
        "ダッシュボードが最新のデータを表示すること",
        "注文詳細が正確に表示されること",
        "売上レポートがPDF形式で出力できること",
        "タスクの追加、編集、完了が正しく機能すること",
        "商品在庫が注文処理時に適切に更新されること",
      ],
    });
  };

  const addScreen = () => {
    const newScreen: Screen = {
      id: screens.length + 1,
      name: `新規画面${screens.length + 1}`,
      html: `<div class="min-h-screen bg-gray-100 p-6"><h1 class="text-2xl font-bold text-gray-700 mb-4">新規画面</h1><p>ここに画面の内容を追加してください。</p></div>`,
      events: [],
    };
    setScreens([...screens, newScreen]);
  };

  const addEvent = () => {
    const newEvent: Event = {
      id: eventsList.length + 1,
      name: `新規イベント${eventsList.length + 1}`,
      screen: selectedScreen ? selectedScreen.name : "",
      process: "新規イベントの処理を記述してください。",
    };
    setEventsList([...eventsList, newEvent]);
  };

  const addEntity = () => {
    const newEntity: Entity = {
      id: entities.length + 1,
      name: `新規エンティティ${entities.length + 1}`,
      attributes: ["id: int", "name: varchar(100)", "created_at: timestamp"],
    };
    setEntities([...entities, newEntity]);
  };

  const addRelation = () => {
    if (entities.length < 2) return; // リレーションを追加するには少なくとも2つのエンティティが必要
    const newRelation: Relation = {
      id: relations.length + 1,
      from: entities[0].name,
      to: entities[1].name,
      type: "1:N",
    };
    setRelations([...relations, newRelation]);
  };

  const removeScreen = (id: number) => {
    const screenToRemove = screens.find((screen) => screen.id === id);
    if (screenToRemove) {
      setScreens(screens.filter((screen) => screen.id !== id));
      setEventsList(
        eventsList.filter((event) => event.screen !== screenToRemove.name)
      );
    }
  };

  const removeEvent = (id: number) => {
    setEventsList(eventsList.filter((event) => event.id !== id));
  };

  const removeEntity = (id: number) => {
    const entityToRemove = entities.find((entity) => entity.id === id);
    if (entityToRemove) {
      setEntities(entities.filter((entity) => entity.id !== id));
      setRelations(
        relations.filter(
          (relation) =>
            relation.from !== entityToRemove.name &&
            relation.to !== entityToRemove.name
        )
      );
    }
  };

  const removeRelation = (id: number) => {
    setRelations(relations.filter((relation) => relation.id !== id));
  };

  const handleAcceptOrder = async () => {
    setIsAccepting(true);
    setAcceptError(null);
    const inquiryId = window.location.pathname.split("/").pop();

    // すべてのデータを含むオブジェクトを作成
    const orderData = {
      inquiryId: inquiryId,
      screens: screens,
      events: eventsList,
      entities: entities,
      relations: relations,
      aiResponse: aiResponse,
    };

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/accept-order`,
        orderData,
        {
          withCredentials: false,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("受注が完了しました。");
        // 問い合わせ管理ページに遷移
        window.location.href = "/inquirylist";
      } else {
        throw new Error("受注に失敗しました。");
      }
    } catch (error) {
      console.error("Error accepting order:", error);
      setAcceptError("受注処理中にエラーが発生しました。");
    } finally {
      setIsAccepting(false);
    }
  };

  const startEditingHtml = (screen: Screen) => {
    setEditingScreenId(screen.id);
    setEditingHtml(screen.html);
    setIsEditingHtml(true);
  };

  const saveHtmlChanges = () => {
    if (editingScreenId !== null) {
      // screensを更新
      const updatedScreens = screens.map((screen) =>
        screen.id === editingScreenId
          ? { ...screen, html: editingHtml }
          : screen
      );
      setScreens(updatedScreens);

      // selectedScreenを更新（selectedScreenが存在していて、編集中の画面であれば更新）
      const screenToUpdate = updatedScreens.find(
        (screen) => screen.id === editingScreenId
      );
      if (screenToUpdate && selectedScreen?.id === editingScreenId) {
        setSelectedScreen(screenToUpdate);
      }

      setIsEditingHtml(false);
      setEditingScreenId(null);
    }
  };

  // 問い合わせ情報を取得する useEffect を追加
  useEffect(() => {
    const fetchInquiry = async () => {
      const inquiryId = window.location.pathname.split("/").pop();
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/inquirydetail/${inquiryId}`,
          {
            withCredentials: false,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setInquiry(response.data);
      } catch (error) {
        console.error("Error fetching inquiry:", error);
      }
    };

    fetchInquiry();
  }, [apiBaseUrl]);

  // 状態に応じたテキストを返す関数
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "進行中";
      case 1:
        return "受注済み";
      case 2:
        return "キャンセル済み";
      default:
        return "不明";
    }
  };

  // 状態に応じた色のクラスを返す関数
  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-blue-100 text-blue-800";
      case 1:
        return "bg-green-100 text-green-800";
      case 2:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    if (selectedScreen && selectedScreen.id === editingScreenId) {
      setSelectedScreen({ ...selectedScreen, html: editingHtml });
    }
  }, [editingHtml, selectedScreen, editingScreenId]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* 問い合わせ情報を表示 */}
          {inquiry && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">問い合わせ情報</h2>
              <p>
                <strong>問い合わせ番号:</strong> {inquiry.id}
              </p>
              <p>
                <strong>名前:</strong> {inquiry.name}
              </p>
              <p>
                <strong>メール:</strong> {inquiry.email}
              </p>
              <p>
                <strong>内容:</strong> {inquiry.inquiry}
              </p>
              <p>
                <strong>状態:</strong>
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    inquiry.status
                  )}`}
                >
                  {getStatusText(inquiry.status)}
                </span>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-8">
            {/* システム設計キャンバス */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                システム設計キャンバス
              </h2>
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                        "focus:outline-none",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    画面デザイン
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                        "focus:outline-none",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    イベントフロー
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                        "focus:outline-none",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    DB設計
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                  {/* 画面デザインタブ */}
                  <Tab.Panel
                    className={classNames(
                      "bg-white dark:bg-gray-800 rounded-xl p-3",
                      "focus:outline-none"
                    )}
                  >
                    <div className="space-y-4">
                      {screens.map((screen) => (
                        <div
                          key={screen.id}
                          className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow"
                        >
                          <span className="text-gray-800 dark:text-gray-200">
                            {screen.name}
                          </span>
                          <div className="flex space-x-2">
                            {/* プレビューボタン */}
                            <button
                              onClick={() => setSelectedScreen(screen)}
                              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                              title="画面をプレビュー"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {/* HTML編集ボタン */}
                            <button
                              onClick={() => startEditingHtml(screen)}
                              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                              title="HTMLを編集"
                            >
                              <Code className="h-4 w-4" />
                            </button>
                            {/* 削除ボタン */}
                            <button
                              onClick={() => removeScreen(screen.id)}
                              className="text-red-500 hover:text-red-700"
                              title="画面を削除"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* 画面追加ボタン */}
                    <button
                      onClick={addScreen}
                      className="mt-4 flex items-center px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      画面追加
                    </button>
                  </Tab.Panel>

                  {/* イベントフロータブ */}
                  <Tab.Panel
                    className={classNames(
                      "bg-white dark:bg-gray-800 rounded-xl p-3",
                      "focus:outline-none"
                    )}
                  >
                    <div className="space-y-4">
                      {eventsList.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow"
                        >
                          <span className="text-gray-800 dark:text-gray-200">
                            {event.name}
                          </span>
                          <div className="flex space-x-2">
                            {/* 詳細表示ボタン */}
                            <button
                              onClick={() => setSelectedEvent(event)}
                              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                              title="イベントの詳細を表示"
                            >
                              <Play className="h-4 w-4" />
                            </button>
                            {/* 削除ボタン */}
                            <button
                              onClick={() => removeEvent(event.id)}
                              className="text-red-500 hover:text-red-700"
                              title="イベントを削除"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* イベント追加ボタン */}
                    <button
                      onClick={addEvent}
                      className="mt-4 flex items-center px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      イベント追加
                    </button>
                  </Tab.Panel>

                  {/* DB設計タブ */}
                  <Tab.Panel
                    className={classNames(
                      "bg-white dark:bg-gray-800 rounded-xl p-3",
                      "focus:outline-none"
                    )}
                  >
                    <div className="space-y-4">
                      {entities.map((entity) => (
                        <div
                          key={entity.id}
                          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                              {entity.name}
                            </span>
                            <div className="flex space-x-2">
                              {/* 詳細表示ボタン */}
                              <button
                                onClick={() => setSelectedEntity(entity)}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                title="エンティティの詳細を表示"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              {/* 削除ボタン */}
                              <button
                                onClick={() => removeEntity(entity.id)}
                                className="text-red-500 hover:text-red-700"
                                title="エンティティを削除"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <ul className="text-sm text-gray-600 dark:text-gray-300">
                            {entity.attributes
                              .slice(0, 3)
                              .map((attr, index) => (
                                <li key={index}>{attr}</li>
                              ))}
                            {entity.attributes.length > 3 && <li>...</li>}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {/* リレーションセクション */}
                    <div className="space-y-4 mt-4">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        リレーション
                      </h3>
                      {relations.map((relation) => (
                        <div
                          key={relation.id}
                          className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow"
                        >
                          <span className="text-gray-800 dark:text-gray-200">
                            {relation.from} - {relation.type} - {relation.to}
                          </span>
                          <button
                            onClick={() => removeRelation(relation.id)}
                            className="text-red-500 hover:text-red-700"
                            title="リレーションを削除"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* エンティティ追加およびリレーション追加ボタン */}
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={addEntity}
                        className="flex items-center px-4 py-2 bg-green-400 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        エンティティ追加
                      </button>
                      <button
                        onClick={addRelation}
                        className="flex items-center px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <Link className="mr-2 h-4 w-4" />
                        リレーション追加
                      </button>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>

            {/* AIアシスタント */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">AIアシスタント</h2>
              <textarea
                placeholder="システム設計に関する質問を入力してください"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                rows={5}
              />
              <button
                onClick={handleAiQuery}
                className="w-full flex items-center justify-center mt-4 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Send className="mr-2 h-4 w-4" />
                AIに問い合わせ
              </button>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">必要な機能：</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    {aiResponse.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">
                    成果物の要件（テスト項目）：
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    {aiResponse.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 設計をエクスポート、受注、発注ボタン */}
          <div className="mt-8 flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              <ArrowRight className="mr-2 h-4 w-4" />
              設計をエクスポート
            </button>
            {inquiry && inquiry.status === 0 && (
              <button
                className={`flex items-center px-4 py-2 bg-green-400 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  isAccepting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleAcceptOrder}
                disabled={isAccepting}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isAccepting ? "処理中..." : "受注"}
              </button>
            )}
            {inquiry && inquiry.status === 1 && (
              <span className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded">
                <ShoppingCart className="mr-2 h-4 w-4" />
                受注済み
              </span>
            )}
            {inquiry && inquiry.status === 2 && (
              <span className="flex items-center px-4 py-2 bg-red-100 text-red-800 rounded">
                キャンセル済み
              </span>
            )}
          </div>
          {acceptError && <p className="mt-2 text-red-500">{acceptError}</p>}
        </div>
      </main>

      <Footer />

      {/* 画面プレビューダイアログ */}
      <Transition appear show={selectedScreen !== null} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setSelectedScreen(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    {selectedScreen?.name} プレビュー
                  </Dialog.Title>
                  <div
                    className="mt-4 border rounded-lg p-4 overflow-auto"
                    style={{ maxHeight: "60vh" }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedScreen?.html || "",
                      }}
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => setSelectedScreen(null)}
                    >
                      閉じる
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* イベント詳細ダイアログ */}
      <Transition appear show={selectedEvent !== null} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setSelectedEvent(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    {selectedEvent?.name}
                  </Dialog.Title>
                  <div className="mt-4">
                    <p>
                      <strong>関連画面:</strong> {selectedEvent?.screen}
                    </p>
                    <p>
                      <strong>処理内容:</strong> {selectedEvent?.process}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => setSelectedEvent(null)}
                    >
                      閉じる
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* エンティティ詳細ダイアログ */}
      <Transition appear show={selectedEntity !== null} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setSelectedEntity(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    {selectedEntity?.name}
                  </Dialog.Title>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">属性:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                      {selectedEntity?.attributes.map((attr, index) => (
                        <li key={index}>{attr}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => setSelectedEntity(null)}
                    >
                      閉じる
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* HTML編集ダイアログ */}
      <Transition appear show={isEditingHtml} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsEditingHtml(false)}
          initialFocus={editTextareaRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    HTML編集
                  </Dialog.Title>
                  <div className="mt-4">
                    <textarea
                      ref={editTextareaRef}
                      value={editingHtml}
                      onChange={(e) => setEditingHtml(e.target.value)}
                      className="w-full h-96 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={saveHtmlChanges}
                    >
                      保存
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => setIsEditingHtml(false)}
                    >
                      キャンセル
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default InquiryDetail;
