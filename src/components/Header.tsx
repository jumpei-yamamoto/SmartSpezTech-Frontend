import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">SmartSpezTech</div>
        <nav className="flex space-x-4">
          <Link to="/landingpage" className="text-gray-700 hover:text-gray-900">
            ランディングページ
          </Link>
          <Link to="/joblist" className="text-gray-700 hover:text-gray-900">
            案件を探す
          </Link>
          <Link to="/companylist" className="text-gray-700 hover:text-gray-900">
            会社一覧
          </Link>
          <Link
            to="/engineerlist"
            className="text-gray-700 hover:text-gray-900"
          >
            エンジニア一覧
          </Link>
          <Link
            to="/system-preview"
            className="text-gray-700 hover:text-gray-900"
          >
            発注者利用ツール
          </Link>
          <Link
            to="/aiassistancespecification"
            className="text-gray-700 hover:text-gray-900"
          >
            発注者利用ツール2
          </Link>
          <a
            href="https://fullstack-app-huzb.onrender.com/"
            className="text-gray-700 hover:text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI補助ツール（サンプル:1分程起動に掛かります）
          </a>
        </nav>
        <Link to="/" className="bg-purple-400 text-white px-4 py-2 rounded">
          ログイン
        </Link>
      </div>
    </header>
  );
};

export default Header;
