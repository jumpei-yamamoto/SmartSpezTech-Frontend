import React, { useState } from "react";

const FilterSidebar: React.FC = () => {
  const [salary, setSalary] = useState(280);

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(Number(event.target.value));
  };

  return (
    <aside className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">詳細フィルター</h2>
        <button className="text-purple-300 hover:underline">リセット</button>
      </div>
      <div className="space-y-4">
        <div>
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="location"
          >
            場所
          </label>
          <select
            id="location"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option></option>
            <option>東京</option>
            <option>大阪</option>
            <option>名古屋</option>
            <option>福岡</option>
            <option>海外</option>
            <option>リモート</option>
          </select>
        </div>
        <div>
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="industry"
          >
            業種
          </label>
          <select
            id="industry"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option></option>
            <option>IT・ソフトウェア</option>
            <option>金融</option>
            <option>人材採用</option>
            <option>経営</option>
            <option>広告</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-300 focus:outline-none focus:bg-purple-300"
        >
          検索
        </button>
        {/* Industry Filter */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">職種/ポジション</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700">全て</span>
              </label>
              <span className="text-purple-300 font-bold">180</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">コンサル</span>
              </label>
              <span className="text-purple-300 font-bold">12</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">エンジニア</span>
              </label>
              <span className="text-purple-300 font-bold">23</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">設計</span>
              </label>
              <span className="text-purple-300 font-bold">43</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">開発</span>
              </label>
              <span className="text-purple-300 font-bold">65</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">テスト</span>
              </label>
              <span className="text-purple-300 font-bold">76</span>
            </li>
          </ul>
        </div>
        {/* Salary Range Filter */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">給与範囲(時給)</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">¥0</span>
            <input
              type="range"
              min="0"
              max="50000"
              value={salary}
              onChange={handleSalaryChange}
              className="w-full mx-4"
            />
            <span className="text-gray-700">¥50000</span>
          </div>
          <div className="text-center mb-4">
            <span className="text-purple-300 font-bold text-lg">¥{salary}</span>
          </div>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700">全て</span>
              </label>
              <span className="text-purple-300 font-bold">145</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">¥0 - ¥2000</span>
              </label>
              <span className="text-purple-300 font-bold">56</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">¥2000 - ¥4000</span>
              </label>
              <span className="text-purple-300 font-bold">37</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">¥4000 - ¥6000</span>
              </label>
              <span className="text-purple-300 font-bold">75</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">¥6000 - ¥8000</span>
              </label>
              <span className="text-purple-300 font-bold">98</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">¥8000 - ¥10000</span>
              </label>
              <span className="text-purple-300 font-bold">14</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">¥10000 - ¥50000</span>
              </label>
              <span className="text-purple-300 font-bold">25</span>
            </li>
          </ul>
        </div>
        {/* Popular Keyword Filter */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">人気のキーワード</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700">AI</span>
              </label>
              <span className="text-purple-300 font-bold">24</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">SIer</span>
              </label>
              <span className="text-purple-300 font-bold">45</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">Web</span>
              </label>
              <span className="text-purple-300 font-bold">57</span>
            </li>
          </ul>
        </div>
        {/* Position Filter */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">役職</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">シニア</span>
              </label>
              <span className="text-purple-300 font-bold">12</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700">ジュニア</span>
              </label>
              <span className="text-purple-300 font-bold">35</span>
            </li>
            <li className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-300"
                />
                <span className="ml-2 text-gray-700">新人</span>
              </label>
              <span className="text-purple-300 font-bold">56</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Experience Level Filter */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">経験レベル</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">インターンシップ</span>
            </label>
            <span className="text-purple-300 font-bold">56</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">エントリー</span>
            </label>
            <span className="text-purple-300 font-bold">87</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
                defaultChecked
              />
              <span className="ml-2 text-gray-700">アソシエイト</span>
            </label>
            <span className="text-purple-300 font-bold">24</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">ミドル</span>
            </label>
            <span className="text-purple-300 font-bold">45</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">ディレクター</span>
            </label>
            <span className="text-purple-300 font-bold">76</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">エグゼクティブ</span>
            </label>
            <span className="text-purple-300 font-bold">89</span>
          </li>
        </ul>
      </div>

      {/* Onsite/Remote Filter */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">出社/リモート</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">出社</span>
            </label>
            <span className="text-purple-300 font-bold">12</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
                defaultChecked
              />
              <span className="ml-2 text-gray-700">リモート</span>
            </label>
            <span className="text-purple-300 font-bold">65</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">ハイブリッド</span>
            </label>
            <span className="text-purple-300 font-bold">58</span>
          </li>
        </ul>
      </div>
      {/* Job Posted Filter */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">求人掲載日</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
                defaultChecked
              />
              <span className="ml-2 text-gray-700">全て</span>
            </label>
            <span className="text-purple-300 font-bold">78</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">1日以内</span>
            </label>
            <span className="text-purple-300 font-bold">65</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">7日以内</span>
            </label>
            <span className="text-purple-300 font-bold">24</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">30日以内</span>
            </label>
            <span className="text-purple-300 font-bold">56</span>
          </li>
        </ul>
      </div>

      {/* Job Type Filter */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">稼働</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">フルタイム</span>
            </label>
            <span className="text-purple-300 font-bold">25</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
                defaultChecked
              />
              <span className="ml-2 text-gray-700">週2以下</span>
            </label>
            <span className="text-purple-300 font-bold">64</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">週3-4</span>
            </label>
            <span className="text-purple-300 font-bold">78</span>
          </li>
          <li className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-purple-300"
              />
              <span className="ml-2 text-gray-700">フレックス</span>
            </label>
            <span className="text-purple-300 font-bold">97</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default FilterSidebar;
