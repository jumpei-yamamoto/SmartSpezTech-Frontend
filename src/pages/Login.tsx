// src/Login.tsx
import React from "react";
import { Link } from "react-router-dom";
import { SiGoogle } from "react-icons/si";

const Login: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">ログイン</h2>
        <p className="text-center text-gray-500 mb-6">
          SmartSpezTechのログイン画面です。
        </p>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="username"
            >
              氏名 *
            </label>
            <input
              id="username"
              type="text"
              placeholder="山田 太郎"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              パスワード *
            </label>
            <input
              id="password"
              type="password"
              placeholder="************"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* Login button with full width */}
          <Link
            to="/joblist"
            className="w-full block bg-green-500 text-white py-2 rounded text-center hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            ログイン
          </Link>
          <div className="mt-6 text-center">
            <p>
              アカウントをお持ちでないですか? <br />
              <Link to="/register" className="text-blue-500 hover:underline">
                登録はこちら
              </Link>
            </p>
          </div>
          <div className="mt-6 flex items-center">
            <div className="border-t flex-grow mr-3"></div>
            <span className="text-gray-500">
              下記サービス経由でログインする
            </span>
            <div className="border-t flex-grow ml-3"></div>
          </div>
          <button
            type="button"
            className="w-full mt-6 border rounded flex items-center justify-center py-2 bg-white hover:bg-gray-50"
          >
            <SiGoogle className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
