// src/components/EventDetailDialog.tsx

import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Event } from "../interfaces";

interface EventDetailDialogProps {
  selectedEvent: Event | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  eventsList: Event[];
  setEventsList: React.Dispatch<React.SetStateAction<Event[]>>;
}

const EventDetailDialog: React.FC<EventDetailDialogProps> = ({
  selectedEvent,
  setSelectedEvent,
  eventsList,
  setEventsList,
}) => {
  const [editingEventField, setEditingEventField] = useState<string | null>(
    null
  );
  const [editingEventValue, setEditingEventValue] = useState("");

  return (
    <Transition appear show={selectedEvent !== null} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setSelectedEvent(null);
          setEditingEventField(null);
        }}
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
                {/* イベント詳細ダイアログの内容 */}
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  {editingEventField === "name" ? (
                    <input
                      type="text"
                      value={editingEventValue}
                      onChange={(e) => setEditingEventValue(e.target.value)}
                      onBlur={() => {
                        if (selectedEvent) {
                          const updatedEvent = {
                            ...selectedEvent,
                            name: editingEventValue,
                          };
                          setEventsList(
                            eventsList.map((e) =>
                              e.id === updatedEvent.id ? updatedEvent : e
                            )
                          );
                          setSelectedEvent(updatedEvent);
                        }
                        setEditingEventField(null);
                      }}
                      className="w-full p-1 border rounded"
                      autoFocus
                    />
                  ) : (
                    <span
                      onDoubleClick={() => {
                        setEditingEventField("name");
                        setEditingEventValue(selectedEvent?.name || "");
                      }}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
                    >
                      {selectedEvent?.name || "イベント名を入力"}
                    </span>
                  )}
                </Dialog.Title>
                <div className="mt-4">
                  <p>
                    <strong
                      onDoubleClick={() => {
                        setEditingEventField("screen");
                        setEditingEventValue(selectedEvent?.screen || "");
                      }}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
                    >
                      関連画面:
                    </strong>{" "}
                    {editingEventField === "screen" ? (
                      <input
                        type="text"
                        value={editingEventValue}
                        onChange={(e) => setEditingEventValue(e.target.value)}
                        onBlur={() => {
                          if (selectedEvent) {
                            const updatedEvent = {
                              ...selectedEvent,
                              screen: editingEventValue,
                            };
                            setEventsList(
                              eventsList.map((e) =>
                                e.id === updatedEvent.id ? updatedEvent : e
                              )
                            );
                            setSelectedEvent(updatedEvent);
                          }
                          setEditingEventField(null);
                        }}
                        className="w-full p-1 border rounded"
                        autoFocus
                      />
                    ) : (
                      <span
                        onDoubleClick={() => {
                          setEditingEventField("screen");
                          setEditingEventValue(selectedEvent?.screen || "");
                        }}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
                      >
                        {selectedEvent?.screen || "関連画面を入力"}
                      </span>
                    )}
                  </p>
                  <p>
                    <strong
                      onDoubleClick={() => {
                        setEditingEventField("process");
                        setEditingEventValue(selectedEvent?.process || "");
                      }}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
                    >
                      処理内容:
                    </strong>{" "}
                    {editingEventField === "process" ? (
                      <textarea
                        value={editingEventValue}
                        onChange={(e) => setEditingEventValue(e.target.value)}
                        onBlur={() => {
                          if (selectedEvent) {
                            const updatedEvent = {
                              ...selectedEvent,
                              process: editingEventValue,
                            };
                            setEventsList(
                              eventsList.map((e) =>
                                e.id === updatedEvent.id ? updatedEvent : e
                              )
                            );
                            setSelectedEvent(updatedEvent);
                          }
                          setEditingEventField(null);
                        }}
                        className="w-full p-1 border rounded"
                        autoFocus
                      />
                    ) : (
                      <span
                        onDoubleClick={() => {
                          setEditingEventField("process");
                          setEditingEventValue(selectedEvent?.process || "");
                        }}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
                      >
                        {selectedEvent?.process || "処理内容を入力"}
                      </span>
                    )}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      setSelectedEvent(null);
                      setEditingEventField(null);
                    }}
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
  );
};

export default EventDetailDialog;
