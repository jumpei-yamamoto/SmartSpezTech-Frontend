import React from "react";

const RightSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Company Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/50"
            alt="Company Logo"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-lg font-bold mb-2">株式会社テスト</h3>
          <p className="text-gray-600">東京都, 日本</p>
          <a href="#" className="text-blue-500 hover:underline">
            現在の求人 2 件
          </a>
        </div>
        <div className="mt-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6482.775477488909!2d139.70685369999998!3d35.66745360000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ca3fa6e25a5%3A0x65c0bd2b71eae0f1!2z44CSMTUwLTAwMDEg5p2x5Lqs6YO95riL6LC35Yy656We5a6u5YmN77yV5LiB55uu77yR77yQ4oiS77yR!5e0!3m2!1sja!2sjp!4v1723627770881!5m2!1sja!2sjp"
            width="100%"
            height="200"
            className="rounded-lg"
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
        <div className="mt-4 text-gray-600">
          <p className="mb-2">
            <i className="fas fa-map-marker-alt mr-2"></i>
            東京都渋谷区神宮前5丁目10-1
          </p>
          <p className="mb-2">
            <i className="fas fa-phone-alt mr-2"></i>
            03-1234-5678
          </p>
          <p className="mb-2">
            <i className="fas fa-envelope mr-2"></i>
            Email: contact@example.com
          </p>
        </div>
      </div>

      {/* Similar Jobs */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4">関連する求人</h3>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <div>
              <h4 className="font-bold text-sm">UI/UXデザイナー フルタイム</h4>
              <p className="text-gray-600 text-xs">東京都, 日本</p>
            </div>
            <div className="text-right">
              <p className="text-green-500 font-bold">時給 ¥3,000</p>
              <p className="text-gray-500 text-xs">3分前</p>
            </div>
          </li>
          <li className="flex justify-between">
            <div>
              <h4 className="font-bold text-sm">Javaソフトウェアエンジニア</h4>
              <p className="text-gray-600 text-xs">大阪府, 日本</p>
            </div>
            <div className="text-right">
              <p className="text-green-500 font-bold">時給 ¥4,500</p>
              <p className="text-gray-500 text-xs">5分前</p>
            </div>
          </li>
          <li className="flex justify-between">
            <div>
              <h4 className="font-bold text-sm">フロントエンド開発者</h4>
              <p className="text-gray-600 text-xs">福岡県, 日本</p>
            </div>
            <div className="text-right">
              <p className="text-green-500 font-bold">時給 ¥3,800</p>
              <p className="text-gray-500 text-xs">8分前</p>
            </div>
          </li>
          <li className="flex justify-between">
            <div>
              <h4 className="font-bold text-sm">クラウドエンジニア</h4>
              <p className="text-gray-600 text-xs">北海道, 日本</p>
            </div>
            <div className="text-right">
              <p className="text-green-500 font-bold">時給 ¥4,000</p>
              <p className="text-gray-500 text-xs">12分前</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
