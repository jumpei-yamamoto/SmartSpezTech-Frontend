// src/components/RelationDetailDialog.tsx

import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Relation } from "../interfaces";

interface RelationDetailDialogProps {
  selectedRelation: Relation | null;
  setSelectedRelation: React.Dispatch<React.SetStateAction<Relation | null>>;
  relations: Relation[];
  setRelations: React.Dispatch<React.SetStateAction<Relation[]>>;
}

const RelationDetailDialog: React.FC<RelationDetailDialogProps> = ({
  selectedRelation,
  setSelectedRelation,
  relations,
  setRelations,
}) => {
  const [editingRelationField, setEditingRelationField] = useState<
    string | null
  >(null);
  const [editingRelationValue, setEditingRelationValue] = useState("");

  return (
    <Transition appear show={selectedRelation !== null} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setSelectedRelation(null);
          setEditingRelationField(null);
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
                {/* リレーション詳細ダイアログの内容 */}
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  リレーション詳細
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    From:{" "}
                    {editingRelationField === "from_" ? (
                      <input
                        type="text"
                        value={editingRelationValue}
                        onChange={(e) =>
                          setEditingRelationValue(e.target.value)
                        }
                        onBlur={() => {
                          if (selectedRelation) {
                            const updatedRelation = {
                              ...selectedRelation,
                              from_: editingRelationValue,
                            };
                            setRelations(
                              relations.map((r) =>
                                r.id === updatedRelation.id
                                  ? updatedRelation
                                  : r
                              )
                            );
                            setSelectedRelation(updatedRelation);
                          }
                          setEditingRelationField(null);
                        }}
                        className="w-full p-1 border rounded"
                        autoFocus
                      />
                    ) : (
                      <span
                        onDoubleClick={() => {
                          setEditingRelationField("from_");
                          setEditingRelationValue(
                            selectedRelation?.from_ || ""
                          );
                        }}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
                      >
                        {selectedRelation?.from_}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    To:{" "}
                    {editingRelationField === "to" ? (
                      <input
                        type="text"
                        value={editingRelationValue}
                        onChange={(e) =>
                          setEditingRelationValue(e.target.value)
                        }
                        onBlur={() => {
                          if (selectedRelation) {
                            const updatedRelation = {
                              ...selectedRelation,
                              to: editingRelationValue,
                            };
                            setRelations(
                              relations.map((r) =>
                                r.id === updatedRelation.id
                                  ? updatedRelation
                                  : r
                              )
                            );
                            setSelectedRelation(updatedRelation);
                          }
                          setEditingRelationField(null);
                        }}
                        className="w-full p-1 border rounded"
                        autoFocus
                      />
                    ) : (
                      <span
                        onDoubleClick={() => {
                          setEditingRelationField("to");
                          setEditingRelationValue(selectedRelation?.to || "");
                        }}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
                      >
                        {selectedRelation?.to}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Type:{" "}
                    {editingRelationField === "type" ? (
                      <input
                        type="text"
                        value={editingRelationValue}
                        onChange={(e) =>
                          setEditingRelationValue(e.target.value)
                        }
                        onBlur={() => {
                          if (selectedRelation) {
                            const updatedRelation = {
                              ...selectedRelation,
                              type: editingRelationValue,
                            };
                            setRelations(
                              relations.map((r) =>
                                r.id === updatedRelation.id
                                  ? updatedRelation
                                  : r
                              )
                            );
                            setSelectedRelation(updatedRelation);
                          }
                          setEditingRelationField(null);
                        }}
                        className="w-full p-1 border rounded"
                        autoFocus
                      />
                    ) : (
                      <span
                        onDoubleClick={() => {
                          setEditingRelationField("type");
                          setEditingRelationValue(selectedRelation?.type || "");
                        }}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
                      >
                        {selectedRelation?.type}
                      </span>
                    )}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      setSelectedRelation(null);
                      setEditingRelationField(null);
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

export default RelationDetailDialog;
