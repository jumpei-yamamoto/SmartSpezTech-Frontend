// src/components/EventFlowTab.tsx

import React from "react";
import { Event } from "../interfaces";
import { Plus, Play, Trash2 } from "lucide-react";

interface EventFlowTabProps {
  eventsList: Event[];
  setEventsList: React.Dispatch<React.SetStateAction<Event[]>>;
  selectedEvent: Event | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  editingEventId: number | null;
  setEditingEventId: React.Dispatch<React.SetStateAction<number | null>>;
  removeEvent: (id: number) => void;
  addEvent: () => void;
  handleEventTitleChange: (id: number, newName: string) => void;
}

const EventFlowTab: React.FC<EventFlowTabProps> = ({
  eventsList,
  setEventsList,
  selectedEvent,
  setSelectedEvent,
  editingEventId,
  setEditingEventId,
  removeEvent,
  addEvent,
  handleEventTitleChange,
}) => {
  return (
    <div className="space-y-4">
      {eventsList.map((event) => (
        <div
          key={event.id}
          className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow"
        >
          {editingEventId === event.id ? (
            <input
              type="text"
              value={event.name}
              onChange={(e) => handleEventTitleChange(event.id, e.target.value)}
              onBlur={() => setEditingEventId(null)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 rounded p-2 focus:outline-none"
              autoFocus
            />
          ) : (
            <span
              onDoubleClick={() => setEditingEventId(event.id)}
              className="text-gray-700 dark:text-gray-200 cursor-pointer"
            >
              {event.name}
            </span>
          )}
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
      {/* イベント追加ボタン */}
      <button
        onClick={addEvent}
        className="mt-4 flex items-center px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Plus className="mr-2 h-4 w-4" />
        イベント追加
      </button>
    </div>
  );
};

export default EventFlowTab;
