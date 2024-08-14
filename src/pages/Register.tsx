import React from "react";
import { Link } from "react-router-dom";
import { SiGoogle } from "react-icons/si";

const Register: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">ユーザー登録</h2>
        <p className="text-center text-gray-500 mb-6">
          SmartSpezTechサービス用のアカウントを作成します。
        </p>
        <form>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="fullname"
              >
                氏名 *
              </label>
              <input
                id="fullname"
                type="text"
                placeholder="Steven Job"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                メールアドレス *
              </label>
              <input
                id="email"
                type="email"
                placeholder="stevenjob@gmail.com"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="username"
              >
                ユーザー名 *
              </label>
              <input
                id="username"
                type="text"
                placeholder="stevenjob"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
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
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="repassword"
              >
                パスワード（確認用） *
              </label>
              <input
                id="repassword"
                type="password"
                placeholder="************"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 font-bold mb-2">
              どちらのアカウントを作成しますか? *
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="candidate"
                name="accountType"
                value="candidate"
                className="mr-2"
              />
              <label htmlFor="candidate" className="mr-6">
                エンジニア
              </label>
              <input
                type="radio"
                id="company"
                name="accountType"
                value="company"
                className="mr-2"
              />
              <label htmlFor="company">企業</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-purple-400 text-white py-2 rounded hover:text-purple-300 focus:outline-none focus:text-purple-300"
          >
            送信 & 登録
          </button>

          <div className="mt-6 text-center">
            <p>
              既にアカウントをお持ちですか?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                ログインはこちら
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

export default Register;
