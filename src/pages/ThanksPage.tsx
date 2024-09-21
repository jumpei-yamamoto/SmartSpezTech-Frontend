import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";

export default function UpdatedThanksPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 inline-block p-3 bg-green-100 rounded-full"
          >
            <Check className="h-12 w-12 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ありがとうございます
          </h1>
          <p className="text-lg text-gray-600">
            お問い合わせを受け付けました。
            <br />
            内容を確認次第、ご連絡いたします。
          </p>
        </div>

        <a href="/landingpage" className="w-full">
          <button className="w-full flex items-center justify-center border border-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-50 transition">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ホームページへ戻る
          </button>
        </a>
      </motion.div>
    </div>
  );
}
