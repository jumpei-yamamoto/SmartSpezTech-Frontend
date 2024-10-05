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

import { Screen, Event, Entity, Relation, Inquiry } from "../interfaces";
import ScreenDesignTab from "../components/ScreenDesignTab";
import EventFlowTab from "../components/EventFlowTab";
import DBDesignTab from "../components/DBDesignTab";
import ScreenPreviewDialog from "../components/ScreenPreviewDialog";
import EventDetailDialog from "../components/EventDetailDialog";
import EntityDetailDialog from "../components/EntityDetailDialog";
import RelationDetailDialog from "../components/RelationDetailDialog";
import HtmlEditDialog from "../components/HTMLEditDialog";

type EventData = {
  workload: string;
  hourly_rate: string;
  tests: string[];
  [key: string]: string | string[];
};

type ScreenData = {
  workload: string;
  hourly_rate: string;
  tests: string[];
  [key: string]: string | string[]; // インデックスシグネチャを追加
};

type EstimateResult = {
  screens: {
    [key: string]: ScreenData;
  };
  events?: {
    [key: string]: EventData;
  };
  database?: {
    workload?: string;
    hourly_rate?: string;
    tests: string[];
    [key: string]: string | string[] | undefined;
  };
};

const InquiryDetail: React.FC = () => {
  const [screens, setScreens] = useState<Screen[]>([]);
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [relations, setRelations] = useState<Relation[]>([]);
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [selectedRelation, setSelectedRelation] = useState<Relation | null>(
    null
  );
  const [editingScreenNameId, setEditingScreenNameId] = useState<number | null>(
    null
  );
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);
  const [isEditingHtml, setIsEditingHtml] = useState(false);
  const [editingScreenId, setEditingScreenId] = useState<number | null>(null);
  const [editingHtml, setEditingHtml] = useState("");
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [editingEstimate, setEditingEstimate] = useState<EstimateResult | null>(
    null
  );
  const [editingField, setEditingField] = useState<{
    section: "screens" | "events" | "database";
    name: string;
    field: string;
    index?: number;
  } | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:80";

  // 関数定義

  const handleScreenTitleChange = (id: number, newName: string) => {
    setScreens((prevScreens) =>
      prevScreens.map((screen) =>
        screen.id === id ? { ...screen, name: newName } : screen
      )
    );
  };

  const handleEventTitleChange = (id: number, newName: string) => {
    setEventsList((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, name: newName } : event
      )
    );
  };

  const addScreen = () => {
    const newScreenId = Math.max(...screens.map((screen) => screen.id), 0) + 1;
    const newScreen: Screen = {
      id: newScreenId,
      name: `新規画面${newScreenId}`,
      html: `<div class="min-h-screen bg-gray-100 p-6"><h1 class="text-2xl font-bold text-gray-700 mb-4">新規画面</h1><p>ここに画面の容を追加してください。</p></div>`,
      events: [],
    };

    setScreens((prevScreens) => [...prevScreens, newScreen]);
    startEditingHtml(newScreen); // 新規画面を即座に編集モードにする
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
    if (entities.length < 2) return; // リレーションを追加するには少なくも2つのンティティが必要
    const newRelation: Relation = {
      id: relations.length + 1,
      from_: entities[0].name,
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
            relation.from_ !== entityToRemove.name &&
            relation.to !== entityToRemove.name
        )
      );
    }
  };

  const removeRelation = (id: number) => {
    setRelations(relations.filter((relation) => relation.id !== id));
  };

  const startEditingHtml = (screen: Screen) => {
    setEditingScreenId(screen.id);
    setEditingHtml(screen.html);
    setIsEditingHtml(true);
  };

  const saveHtmlChanges = () => {
    if (editingScreenId !== null) {
      // スクリーンのHTMLを更新
      setScreens((prevScreens) =>
        prevScreens.map((screen) =>
          screen.id === editingScreenId
            ? { ...screen, html: editingHtml }
            : screen
        )
      );

      // 更新したスクリーンが現在選択中のスクリーンであれば、その選択状態も更
      setSelectedScreen((prevScreen) => {
        if (prevScreen && prevScreen.id === editingScreenId) {
          return { ...prevScreen, html: editingHtml };
        }
        return prevScreen;
      });
    } else {
      console.error("editingScreenId is null, no updates performed");
    }

    setIsEditingHtml(false);
    setEditingScreenId(null);
  };

  const handleAiEstimate = async () => {
    const requestData = {
      screens,
      events: eventsList,
      entities,
      relations,
      estimate: editingEstimate,
    };

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/estimate`,
        requestData,
        {
          withCredentials: false,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data) {
        console.log("Estimate data received:", response.data);
        setEstimate(response.data);
        setEditingEstimate(response.data); // Set the editable estimate
      } else {
        console.error("見積もり取得に失敗しました。");
      }
    } catch (error) {
      console.error("Error fetching AI estimate:", error);
    }
  };

  const handleEstimateChange = (
    screenName: string,
    field: "workload" | "hourly_rate",
    value: string
  ) => {
    setEditingEstimate((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        screens: {
          ...prev.screens,
          [screenName]: {
            ...prev.screens[screenName],
            [field]: value,
          },
        },
      };
    });
  };

  const handleTestChange = (
    screenName: string,
    index: number,
    value: string
  ) => {
    setEditingEstimate((prev) => {
      if (!prev) return null;
      const newTests = [...prev.screens[screenName].tests];
      newTests[index] = value;
      return {
        ...prev,
        screens: {
          ...prev.screens,
          [screenName]: {
            ...prev.screens[screenName],
            tests: newTests,
          },
        },
      };
    });
  };

  const handleDoubleClick = (
    section: "screens" | "events" | "database",
    name: string,
    field: string,
    index?: number
  ) => {
    setEditingField({ section, name, field, index });
    if (section === "screens") {
      if (field === "test" && typeof index === "number") {
        setEditingValue(editingEstimate?.screens[name]?.tests[index] || "");
      } else {
        setEditingValue(
          editingEstimate?.screens[name]?.[
            field as keyof ScreenData
          ]?.toString() || ""
        );
      }
    } else if (section === "events") {
      if (field === "test" && typeof index === "number") {
        setEditingValue(editingEstimate?.events?.[name]?.tests[index] || "");
      } else {
        setEditingValue(
          editingEstimate?.events?.[name]?.[
            field as keyof EventData
          ]?.toString() || ""
        );
      }
    } else if (section === "database") {
      if (field === "test" && typeof index === "number") {
        setEditingValue(editingEstimate?.database?.tests?.[index] || "");
      } else {
        const value = editingEstimate?.database?.[field];
        setEditingValue(
          Array.isArray(value) ? value.join(", ") : value?.toString() || ""
        );
      }
    }
  };

  const handleBlur = () => {
    if (editingField && editingEstimate) {
      const { section, name, field, index } = editingField;
      const updatedEstimate = { ...editingEstimate };

      if (section === "screens") {
        if (field === "test" && typeof index === "number") {
          updatedEstimate.screens[name].tests[index] = editingValue;
        } else {
          (updatedEstimate.screens[name] as ScreenData)[
            field as keyof ScreenData
          ] = editingValue;
        }
      } else if (section === "events") {
        if (!updatedEstimate.events) updatedEstimate.events = {};
        if (!updatedEstimate.events[name]) {
          updatedEstimate.events[name] = {
            workload: "",
            hourly_rate: "",
            tests: [],
          };
        }
        if (field === "test" && typeof index === "number") {
          updatedEstimate.events[name].tests[index] = editingValue;
        } else {
          (updatedEstimate.events[name] as any)[field] = editingValue;
        }
      } else if (section === "database") {
        if (!updatedEstimate.database) {
          updatedEstimate.database = { tests: [] };
        }
        if (!updatedEstimate.database.tests) {
          updatedEstimate.database.tests = [];
        }
        if (field === "test" && typeof index === "number") {
          updatedEstimate.database.tests[index] = editingValue;
        } else {
          (updatedEstimate.database as any)[field] = editingValue;
        }
      }

      setEditingEstimate(updatedEstimate);
      setEstimate(updatedEstimate);
    }
    setEditingField(null);
  };

  const handleAcceptOrder = async () => {
    setIsAccepting(true);
    setAcceptError(null);
    const inquiryId = window.location.pathname.split("/").pop();

    const orderData = {
      inquiryId: inquiryId,
      screens: screens,
      events: eventsList,
      entities: entities,
      relations: relations,
      aiEstimate: editingEstimate, // AI見積もり結果を追加
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

        // 取得したデータを使用して他の状態を更新
        if (response.data.screens) {
          const formattedScreens = response.data.screens.map((screen: any) => ({
            id: screen.id,
            name: screen.title || `画面${screen.id}`,
            html: screen.preview || "",
            events: screen.events || [],
          }));
          setScreens(formattedScreens);
        }
        if (response.data.events) setEventsList(response.data.events);
        if (response.data.entities) setEntities(response.data.entities);
        if (response.data.relations) setRelations(response.data.relations);
        if (response.data.estimate) {
          setEstimate(response.data.estimate);
          setEditingEstimate(response.data.estimate);
        }
      } catch (error) {
        console.error("Error fetching inquiry:", error);
        // エラー時は各状態を空の配列または null に設定
        setScreens([]);
        setEventsList([]);
        setEntities([]);
        setRelations([]);
        setEstimate(null);
        setEditingEstimate(null);
      }
    };

    fetchInquiry();
  }, [apiBaseUrl]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* 問い合わせ情報を表示 */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">問い合わせ情報</h2>
            {inquiry ? (
              <>
                <p>
                  <strong>問い合わせ番:</strong> {inquiry.id}
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
              </>
            ) : (
              <p>データを読み込んでいます...</p>
            )}
          </div>

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
                    <ScreenDesignTab
                      screens={screens}
                      setScreens={setScreens}
                      selectedScreen={selectedScreen}
                      setSelectedScreen={setSelectedScreen}
                      editingScreenNameId={editingScreenNameId}
                      setEditingScreenNameId={setEditingScreenNameId}
                      removeScreen={removeScreen}
                      addScreen={addScreen}
                      startEditingHtml={startEditingHtml}
                    />
                  </Tab.Panel>

                  {/* イベントフロータブ */}
                  <Tab.Panel
                    className={classNames(
                      "bg-white dark:bg-gray-800 rounded-xl p-3",
                      "focus:outline-none"
                    )}
                  >
                    <EventFlowTab
                      eventsList={eventsList}
                      setEventsList={setEventsList}
                      selectedEvent={selectedEvent}
                      setSelectedEvent={setSelectedEvent}
                      editingEventId={editingEventId}
                      setEditingEventId={setEditingEventId}
                      removeEvent={removeEvent}
                      addEvent={addEvent}
                      handleEventTitleChange={handleEventTitleChange}
                    />
                  </Tab.Panel>

                  {/* DB設計タブ */}
                  <Tab.Panel
                    className={classNames(
                      "bg-white dark:bg-gray-800 rounded-xl p-3",
                      "focus:outline-none"
                    )}
                  >
                    <DBDesignTab
                      entities={entities}
                      setEntities={setEntities}
                      relations={relations}
                      setRelations={setRelations}
                      selectedEntity={selectedEntity}
                      setSelectedEntity={setSelectedEntity}
                      selectedRelation={selectedRelation}
                      setSelectedRelation={setSelectedRelation}
                      removeEntity={removeEntity}
                      removeRelation={removeRelation}
                      addEntity={addEntity}
                      addRelation={addRelation}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>

            {/* 見積もり結果 */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">見積もり結果</h2>
              <button
                onClick={handleAiEstimate}
                className="w-full flex items-center justify-center mt-4 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Package className="mr-2 h-4 w-4" />
                AIで見積もる
              </button>
              {editingEstimate && (
                <div className="mt-4">
                  <h3 className="font-semibold mt-4 mb-2">画面</h3>
                  {Object.entries(editingEstimate.screens).map(
                    ([screenName, screenData]) => (
                      <div key={screenName} className="mb-4">
                        <h4 className="font-semibold mt-2 mb-1">
                          {screenName}
                        </h4>
                        {editingField?.section === "screens" &&
                        editingField?.name === screenName &&
                        editingField?.field === "workload" ? (
                          <input
                            type="text"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onBlur={handleBlur}
                            autoFocus
                            className="border rounded px-2 py-1 mb-1 w-full"
                          />
                        ) : (
                          <span
                            onDoubleClick={() =>
                              handleDoubleClick(
                                "screens",
                                screenName,
                                "workload"
                              )
                            }
                            className="border rounded px-2 py-1 mb-1 w-full cursor-pointer inline-block"
                          >
                            {screenData.workload}
                          </span>
                        )}
                        {editingField?.section === "screens" &&
                        editingField?.name === screenName &&
                        editingField?.field === "hourly_rate" ? (
                          <input
                            type="text"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onBlur={handleBlur}
                            autoFocus
                            className="border rounded px-2 py-1 mb-1 w-full"
                          />
                        ) : (
                          <span
                            onDoubleClick={() =>
                              handleDoubleClick(
                                "screens",
                                screenName,
                                "hourly_rate"
                              )
                            }
                            className="border rounded px-2 py-1 mb-1 w-full cursor-pointer inline-block"
                          >
                            {screenData.hourly_rate}
                          </span>
                        )}
                        <h5 className="font-semibold mt-2 mb-1">テスト内容:</h5>
                        <ul>
                          {screenData.tests.map((test, index) => (
                            <li key={index}>
                              {editingField?.section === "screens" &&
                              editingField?.name === screenName &&
                              editingField?.field === "test" &&
                              editingField?.index === index ? (
                                <input
                                  type="text"
                                  value={editingValue}
                                  onChange={(e) =>
                                    setEditingValue(e.target.value)
                                  }
                                  onBlur={handleBlur}
                                  autoFocus
                                  className="border rounded px-2 py-1 mb-1 w-full"
                                />
                              ) : (
                                <span
                                  onDoubleClick={() =>
                                    handleDoubleClick(
                                      "screens",
                                      screenName,
                                      "test",
                                      index
                                    )
                                  }
                                  className="border rounded px-2 py-1 mb-1 w-full cursor-pointer inline-block"
                                >
                                  {test}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}

                  <h3 className="font-semibold mt-4 mb-2">イベント</h3>
                  {Object.entries(editingEstimate.events || {}).map(
                    ([eventName, eventData]) => (
                      <div key={eventName} className="mb-4">
                        <h4 className="font-semibold mt-2 mb-1">{eventName}</h4>
                        {["workload", "hourly_rate"].map((field) => (
                          <div key={field}>
                            {editingField?.section === "events" &&
                            editingField?.name === eventName &&
                            editingField?.field === field ? (
                              <input
                                type="text"
                                value={editingValue}
                                onChange={(e) =>
                                  setEditingValue(e.target.value)
                                }
                                onBlur={handleBlur}
                                autoFocus
                                className="border rounded px-2 py-1 mb-1 w-full"
                              />
                            ) : (
                              <span
                                onDoubleClick={() =>
                                  handleDoubleClick("events", eventName, field)
                                }
                                className="border rounded px-2 py-1 mb-1 w-full cursor-pointer inline-block"
                              >
                                {field === "workload" ? "工数: " : "難易度: "}
                                {eventData[field as keyof EventData]}
                              </span>
                            )}
                          </div>
                        ))}
                        <h5 className="font-semibold mt-2 mb-1">テスト内容:</h5>
                        <ul>
                          {eventData.tests.map(
                            (test: string, index: number) => (
                              <li key={index}>
                                {editingField?.section === "events" &&
                                editingField?.name === eventName &&
                                editingField?.field === "test" &&
                                editingField?.index === index ? (
                                  <input
                                    type="text"
                                    value={editingValue}
                                    onChange={(e) =>
                                      setEditingValue(e.target.value)
                                    }
                                    onBlur={handleBlur}
                                    autoFocus
                                    className="border rounded px-2 py-1 mb-1 w-full"
                                  />
                                ) : (
                                  <span
                                    onDoubleClick={() =>
                                      handleDoubleClick(
                                        "events",
                                        eventName,
                                        "test",
                                        index
                                      )
                                    }
                                    className="border rounded px-2 py-1 mb-1 w-full cursor-pointer inline-block"
                                  >
                                    {test}
                                  </span>
                                )}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )
                  )}

                  <h3 className="font-semibold mt-4 mb-2">データベース</h3>
                  {editingEstimate.database && (
                    <div className="mb-4">
                      {["workload", "hourly_rate"].map((field) => (
                        <div key={field}>
                          {editingField?.section === "database" &&
                          editingField?.field === field ? (
                            <input
                              type="text"
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              onBlur={handleBlur}
                              autoFocus
                              className="border rounded px-2 py-1 mb-1 w-full"
                            />
                          ) : (
                            <span
                              onDoubleClick={() =>
                                handleDoubleClick("database", "database", field)
                              }
                              className="border rounded px-2 py-1 mb-1 w-full cursor-pointer inline-block"
                            >
                              {field === "workload" ? "工数: " : "難易度: "}
                              {editingEstimate.database &&
                                editingEstimate.database[
                                  field as keyof typeof editingEstimate.database
                                ]}
                            </span>
                          )}
                        </div>
                      ))}
                      <h5 className="font-semibold mt-2 mb-1">テスト内容:</h5>
                      <ul>
                        {editingEstimate.database.tests?.map(
                          (test: string, index: number) => (
                            <li key={index}>
                              {editingField?.section === "database" &&
                              editingField?.field === "test" &&
                              editingField?.index === index ? (
                                <input
                                  type="text"
                                  value={editingValue}
                                  onChange={(e) =>
                                    setEditingValue(e.target.value)
                                  }
                                  onBlur={handleBlur}
                                  autoFocus
                                  className="border rounded px-2 py-1 mb-1 w-full"
                                />
                              ) : (
                                <span
                                  onDoubleClick={() =>
                                    handleDoubleClick(
                                      "database",
                                      "database",
                                      "test",
                                      index
                                    )
                                  }
                                  className="border rounded px-2 py-1 mb-1 w-full cursor-pointer inline-block"
                                >
                                  {test}
                                </span>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 設計をエクスポート、受注、発注ボタン */}
          <div className="mt-8 flex space-x-4">
            {/* <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              <ArrowRight className="mr-2 h-4 w-4" />
              設計をエクスポート
            </button> */}
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
      <ScreenPreviewDialog
        selectedScreen={selectedScreen}
        setSelectedScreen={setSelectedScreen}
      />

      {/* イベント詳細ダイアログ */}
      <EventDetailDialog
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        eventsList={eventsList}
        setEventsList={setEventsList}
      />

      {/* エンティティ詳細ダイアログ */}
      <EntityDetailDialog
        selectedEntity={selectedEntity}
        setSelectedEntity={setSelectedEntity}
        entities={entities}
        setEntities={setEntities}
      />

      {/* リレーション詳細ダイアログ */}
      <RelationDetailDialog
        selectedRelation={selectedRelation}
        setSelectedRelation={setSelectedRelation}
        relations={relations}
        setRelations={setRelations}
      />

      {/* HTML編集ダイアログ */}
      <HtmlEditDialog
        isEditingHtml={isEditingHtml}
        setIsEditingHtml={setIsEditingHtml}
        editingHtml={editingHtml}
        setEditingHtml={setEditingHtml}
        saveHtmlChanges={saveHtmlChanges}
        editTextareaRef={editTextareaRef}
      />
    </div>
  );
};

export default InquiryDetail;
