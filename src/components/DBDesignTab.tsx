// src/components/DBDesignTab.tsx

import React from "react";
import { Entity, Relation } from "../interfaces";
import { Plus, Eye, Link, Trash2 } from "lucide-react";

interface DBDesignTabProps {
  entities: Entity[];
  setEntities: React.Dispatch<React.SetStateAction<Entity[]>>;
  relations: Relation[];
  setRelations: React.Dispatch<React.SetStateAction<Relation[]>>;
  selectedEntity: Entity | null;
  setSelectedEntity: React.Dispatch<React.SetStateAction<Entity | null>>;
  selectedRelation: Relation | null;
  setSelectedRelation: React.Dispatch<React.SetStateAction<Relation | null>>;
  removeEntity: (id: number) => void;
  removeRelation: (id: number) => void;
  addEntity: () => void;
  addRelation: () => void;
}

const DBDesignTab: React.FC<DBDesignTabProps> = ({
  entities,
  setEntities,
  relations,
  setRelations,
  selectedEntity,
  setSelectedEntity,
  selectedRelation,
  setSelectedRelation,
  removeEntity,
  removeRelation,
  addEntity,
  addRelation,
}) => {
  return (
    <div>
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
              {entity.attributes.slice(0, 3).map((attr, index) => (
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
              {relation.from_} - {relation.type} - {relation.to}
            </span>
            <div className="flex space-x-2">
              {/* 詳細表示ボタン */}
              <button
                onClick={() => setSelectedRelation(relation)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                title="リレーションの詳細を表示"
              >
                <Eye className="h-4 w-4" />
              </button>
              {/* 削除ボタン */}
              <button
                onClick={() => removeRelation(relation.id)}
                className="text-red-500 hover:text-red-700"
                title="リレーションを削除"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
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
    </div>
  );
};

export default DBDesignTab;
