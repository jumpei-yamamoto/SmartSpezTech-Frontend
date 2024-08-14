import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* ロゴとソーシャルリンク */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">SmartSpezTech</h2>
            <p className="text-gray-400 mb-4">
              SmartSpezTechはAIを活用した次世代エンジニア案件サイトです。
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook">
                <FaFacebook size={24} />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter size={24} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* リソース */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">リソース</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  会社情報
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  私たちのチーム
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  製品
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>

          {/* コミュニティ */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">コミュニティ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  特徴
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  料金プラン
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  クレジット
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* クイックリンク */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">クイックリンク</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  iOS
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Android
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Microsoft
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  デスクトップ
                </a>
              </li>
            </ul>
          </div>

          {/* その他 */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">その他</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  ヘルプ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  利用規約
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p className="mb-4 md:mb-0">
            Copyright © 2024. Fahren Tech. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              プライバシーポリシー
            </a>
            <a href="#" className="hover:text-white">
              利用規約
            </a>
            <a href="#" className="hover:text-white">
              セキュリティ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
