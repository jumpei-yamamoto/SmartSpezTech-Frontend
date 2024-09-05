import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IconContext } from "react-icons";

const ClientTool: React.FC = () => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (files.length > 5) {
        alert("最大5つのファイルまでアップロードできます。");
        return;
      }

      for (let i = 0; i < files.length; i++) {
        console.log("File selected:", files[i].name);
        // 各ファイルのアップロード処理をここに追加
      }
    }
  };

  return (
    <IconContext.Provider
      value={{
        size: "20px",
        style: { marginRight: "8px", verticalAlign: "middle" },
      }}
    >
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />

        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md text-center">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              システム開発の仕様書をアップロードする
            </label>
            <p className="text-red-500 text-sm mb-4">
              最大5ファイルを選択してください
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
        </div>

        <Footer />
      </div>
    </IconContext.Provider>
  );
};

export default ClientTool;
