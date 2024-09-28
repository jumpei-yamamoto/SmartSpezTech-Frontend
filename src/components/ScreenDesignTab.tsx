// src/components/ScreenDesignTab.tsx

import React from "react";
import { Screen } from "../interfaces";
import { Plus, Eye, Code, Trash2 } from "lucide-react";

interface ScreenDesignTabProps {
  screens: Screen[];
  setScreens: React.Dispatch<React.SetStateAction<Screen[]>>;
  selectedScreen: Screen | null;
  setSelectedScreen: React.Dispatch<React.SetStateAction<Screen | null>>;
  editingScreenNameId: number | null;
  setEditingScreenNameId: React.Dispatch<React.SetStateAction<number | null>>;
  removeScreen: (id: number) => void;
  addScreen: () => void;
  startEditingHtml: (screen: Screen) => void;
}

const ScreenDesignTab: React.FC<ScreenDesignTabProps> = ({
  screens,
  setScreens,
  selectedScreen,
  setSelectedScreen,
  editingScreenNameId,
  setEditingScreenNameId,
  removeScreen,
  addScreen,
  startEditingHtml,
}) => {
  const handleScreenTitleChange = (id: number, newName: string) => {
    setScreens((prevScreens) =>
      prevScreens.map((screen) =>
        screen.id === id ? { ...screen, name: newName } : screen
      )
    );
  };

  return (
    <div className="space-y-4">
      {screens.map((screen) => (
        <div
          key={screen.id}
          className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow"
        >
          {editingScreenNameId === screen.id ? (
            <input
              type="text"
              value={screen.name}
              onChange={(e) =>
                handleScreenTitleChange(screen.id, e.target.value)
              }
              onBlur={() => setEditingScreenNameId(null)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 rounded p-2 focus:outline-none"
              autoFocus
            />
          ) : (
            <span
              onDoubleClick={() => setEditingScreenNameId(screen.id)}
              className="text-gray-700 dark:text-gray-200 cursor-pointer"
            >
              {screen.name}
            </span>
          )}
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
              onClick={() => {
                startEditingHtml(screen);
              }}
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
      {/* 画面追加ボタン */}
      <button
        onClick={addScreen}
        className="mt-4 flex items-center px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Plus className="mr-2 h-4 w-4" />
        画面追加
      </button>
    </div>
  );
};

export default ScreenDesignTab;
