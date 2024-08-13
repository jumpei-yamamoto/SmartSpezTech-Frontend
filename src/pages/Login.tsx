// src/Login.tsx
import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <p className="text-center text-gray-500 mb-6">
          SmartSpezTechのログイン画面です。
        </p>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="username"
            >
              Username *
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
              Password *
            </label>
            <input
              id="password"
              type="password"
              placeholder="************"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Login
          </button> */}
          <Link
            to="/joblist"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Login
          </Link>
          <div className="mt-6 text-center">
            <p>
              アカウントをお持ちでないですか?{" "}
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
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google Logo"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
