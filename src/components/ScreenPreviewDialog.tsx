// src/components/ScreenPreviewDialog.tsx

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Screen } from "../interfaces";

interface ScreenPreviewDialogProps {
  selectedScreen: Screen | null;
  setSelectedScreen: React.Dispatch<React.SetStateAction<Screen | null>>;
}

const ScreenPreviewDialog: React.FC<ScreenPreviewDialogProps> = ({
  selectedScreen,
  setSelectedScreen,
}) => {
  return (
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
  );
};

export default ScreenPreviewDialog;
