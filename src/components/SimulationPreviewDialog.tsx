import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface SimulationPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  html: string;
}

export default function SimulationPreviewDialog({
  isOpen,
  onClose,
  html,
}: SimulationPreviewDialogProps) {
  if (!isOpen) return null;

  const containerClass = "w-[98vw] h-[96vh]";

  const tailwindConfig = `
    <script>
      tailwind.config = {
        theme: {
          extend: {},
        },
      }
    </script>
  `;

  const modifiedHtml = `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        ${tailwindConfig}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.10.3/cdn.min.js" defer></script>
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            width: 100%; 
            height: 100%; 
            overflow: auto;
          }
        </style>
      </head>
      <body class="bg-gray-100 text-gray-900 antialiased">
        ${html}
      </body>
    </html>
  `;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
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
              <Dialog.Panel
                className={`${containerClass} transform transition-all bg-white rounded-lg shadow-xl overflow-hidden`}
              >
                <div className="absolute top-2 right-2 z-20">
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-100 rounded-full p-2 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <iframe
                  srcDoc={modifiedHtml}
                  className="w-full h-full border-none"
                  title="Preview"
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
