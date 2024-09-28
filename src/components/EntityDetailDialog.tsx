// src/components/EntityDetailDialog.tsx

import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Entity } from "../interfaces";

interface EntityDetailDialogProps {
  selectedEntity: Entity | null;
  setSelectedEntity: React.Dispatch<React.SetStateAction<Entity | null>>;
  entities: Entity[];
  setEntities: React.Dispatch<React.SetStateAction<Entity[]>>;
}

const EntityDetailDialog: React.FC<EntityDetailDialogProps> = ({
  selectedEntity,
  setSelectedEntity,
  entities,
  setEntities,
}) => {
  const [editingEntityField, setEditingEntityField] = useState<string | null>(
    null
  );
  const [editingEntityValue, setEditingEntityValue] = useState("");

  return (
    <Transition appear show={selectedEntity !== null} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setSelectedEntity(null);
          setEditingEntityField(null);
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
                {/* エンティティ詳細ダイアログの内容 */}
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  {editingEntityField === "name" ? (
                    <input
                      type="text"
                      value={editingEntityValue}
                      onChange={(e) => setEditingEntityValue(e.target.value)}
                      onBlur={() => {
                        if (selectedEntity) {
                          const updatedEntity = {
                            ...selectedEntity,
                            name: editingEntityValue,
                          };
                          setEntities(
                            entities.map((e) =>
                              e.id === updatedEntity.id ? updatedEntity : e
                            )
                          );
                          setSelectedEntity(updatedEntity);
                        }
                        setEditingEntityField(null);
                      }}
                      className="w-full p-1 border rounded"
                      autoFocus
                    />
                  ) : (
                    <span
                      onDoubleClick={() => {
                        setEditingEntityField("name");
                        setEditingEntityValue(selectedEntity?.name || "");
                      }}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
                    >
                      {selectedEntity?.name || "エンティティ名を入力"}
                    </span>
                  )}
                </Dialog.Title>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">属性:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    {selectedEntity?.attributes.map((attr, index) => (
                      <li key={index}>
                        {editingEntityField === `attribute-${index}` ? (
                          <input
                            type="text"
                            value={editingEntityValue}
                            onChange={(e) =>
                              setEditingEntityValue(e.target.value)
                            }
                            onBlur={() => {
                              if (selectedEntity) {
                                const updatedAttributes = [
                                  ...selectedEntity.attributes,
                                ];
                                updatedAttributes[index] = editingEntityValue;
                                const updatedEntity = {
                                  ...selectedEntity,
                                  attributes: updatedAttributes,
                                };
                                setEntities(
                                  entities.map((e) =>
                                    e.id === updatedEntity.id
                                      ? updatedEntity
                                      : e
                                  )
                                );
                                setSelectedEntity(updatedEntity);
                              }
                              setEditingEntityField(null);
                            }}
                            className="w-full p-1 border rounded"
                            autoFocus
                          />
                        ) : (
                          <span
                            onDoubleClick={() => {
                              setEditingEntityField(`attribute-${index}`);
                              setEditingEntityValue(attr);
                            }}
                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
                          >
                            {attr}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      setSelectedEntity(null);
                      setEditingEntityField(null);
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

export default EntityDetailDialog;
