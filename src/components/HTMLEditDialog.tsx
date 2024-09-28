// src/components/HtmlEditDialog.tsx

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface HtmlEditDialogProps {
  isEditingHtml: boolean;
  setIsEditingHtml: React.Dispatch<React.SetStateAction<boolean>>;
  editingHtml: string;
  setEditingHtml: React.Dispatch<React.SetStateAction<string>>;
  saveHtmlChanges: () => void;
  editTextareaRef: React.RefObject<HTMLTextAreaElement>;
}

const HtmlEditDialog: React.FC<HtmlEditDialogProps> = ({
  isEditingHtml,
  setIsEditingHtml,
  editingHtml,
  setEditingHtml,
  saveHtmlChanges,
  editTextareaRef,
}) => {
  return (
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
                {/* HTML編集ダイアログの内容 */}
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
  );
};

export default HtmlEditDialog;
