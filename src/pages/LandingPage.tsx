import React, { useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Zap,
  Brain,
  Rocket,
  Code,
  Users,
} from "lucide-react";
import Modal from "../components/Modal";
import SystemOrderSimulation from "../components/SystemOrderSimulation";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordionItem, setOpenAccordionItem] = useState<string | null>(
    null
  );
  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState(false);

  const toggleAccordionItem = (itemId: string) => {
    setOpenAccordionItem((prevItem) => (prevItem === itemId ? null : itemId));
  };

  const openSimulationModal = () => {
    setIsSimulationModalOpen(true);
  };

  const closeSimulationModal = () => {
    setIsSimulationModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-blue-600">
            SmartSpezTech
          </a>
          <nav className="hidden md:flex space-x-4">
            <a
              href="#ai-features"
              className="text-gray-600 hover:text-blue-600"
            >
              AI特徴
            </a>
            <a href="#strengths" className="text-gray-600 hover:text-blue-600">
              強み
            </a>
            <a href="#portfolio" className="text-gray-600 hover:text-blue-600">
              実績
            </a>
            <a href="#process" className="text-gray-600 hover:text-blue-600">
              開発プロセス
            </a>
            <a href="#faq" className="text-gray-600 hover:text-blue-600">
              よくある質問
            </a>
          </nav>
          <button className="hidden md:inline-flex px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors">
            お問い合わせ
          </button>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white p-4">
            <a
              href="#ai-features"
              className="block py-2 text-gray-600 hover:text-blue-600"
            >
              AI特徴
            </a>
            <a
              href="#strengths"
              className="block py-2 text-gray-600 hover:text-blue-600"
            >
              強み
            </a>
            <a
              href="#portfolio"
              className="block py-2 text-gray-600 hover:text-blue-600"
            >
              実績
            </a>
            <a
              href="#process"
              className="block py-2 text-gray-600 hover:text-blue-600"
            >
              開発プロセス
            </a>
            <a
              href="#faq"
              className="block py-2 text-gray-600 hover:text-blue-600"
            >
              よくある質問
            </a>
            <button className="mt-4 w-full px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors">
              お問い合わせ
            </button>
          </nav>
        )}
      </header>

      {/* Main Visual */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AIが導く、
            <br className="md:hidden" />
            次世代のシステム開発
          </h1>
          <p className="text-xl mb-8">
            最先端AI技術と豊富な経験で、ビジネスの成功をサポートします
          </p>
          <button
            className="bg-blue-600 text-white text-lg px-8 py-4 rounded-full hover:bg-blue-700 transition-colors"
            onClick={openSimulationModal}
          >
            今すぐAIシミュレーション
          </button>
        </div>
      </section>

      {/* AI Features */}
      <section id="ai-features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            AIが実現する革新的な開発
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI駆動の要件分析",
                description:
                  "自然言語処理AIがクライアントの要望を深く理解し、最適な要件定義を支援します。",
              },
              {
                icon: Rocket,
                title: "自動コード生成",
                description:
                  "AIが基本的なコードを自動生成し、開発速度を大幅に向上。人間の開発者はより創造的な作業に集中できます。",
              },
              {
                icon: Zap,
                title: "AI assisted QA",
                description:
                  "AIがテストケースを自動生成し、バグの早期発見と品質向上を実現します。",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <feature.icon className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section id="strengths" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            SmartSpezTechの強み
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "AI×人間の協調開発",
                description:
                  "AIの効率と人間の創造性を組み合わせ、最高品質のソリューションを提供します。",
              },
              {
                icon: Users,
                title: "経験豊富な開発チーム",
                description:
                  "AI技術に精通した平均経験10年以上のエキスパートが、プロジェクトを成功に導きます。",
              },
              {
                icon: Rocket,
                title: "迅速な開発と展開",
                description:
                  "AIによる自動化で開発期間を大幅に短縮。市場投入までの時間を最小限に抑えます。",
              },
            ].map((strength, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <strength.icon className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{strength.title}</h3>
                <p>{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            AI活用の開発実績
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI搭載CRMシステム",
                client: "大手小売企業",
                description:
                  "顧客行動を予測し、最適なマーケティング戦略を提案するAI搭載CRMを開発。売上が前年比30%増加。",
              },
              {
                title: "自動発注システム",
                client: "食品メーカー",
                description:
                  "AIが需要予測を行い、最適な発注量を自動算出。在庫コストを50%削減しながら、欠品率を大幅に改善。",
              },
              {
                title: "AI chatbot",
                client: "金融機関",
                description:
                  "自然言語処理AIを活用した高度な対話型chatbotを開発。顧客満足度が20%向上し、問い合わせ対応時間を60%短縮。",
              },
              {
                title: "画像認識システム",
                client: "製造業",
                description:
                  "AIによる不良品検出システムを開発。検出精度99.9%を実現し、人的ミスを大幅に削減。",
              },
              {
                title: "予測保全システム",
                client: "重工業メーカー",
                description:
                  "機械学習を用いた予測保全システムにより、計画外のダウンタイムを80%削減。年間数億円のコスト削減を実現。",
              },
              {
                title: "リコメンドエンジン",
                client: "ECサイト運営企業",
                description:
                  "AIによる高度なリコメンドエンジンを開発。クロスセル率が50%向上し、顧客単価が大幅に増加。",
              },
            ].map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  クライアント: {project.client}
                </p>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section id="process" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            AI活用の開発プロセス
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI要件分析",
                description:
                  "AIが要件をディープに分析し、最適なソリューションを提案します。",
              },
              {
                title: "AI支援設計",
                description:
                  "AIが最適なアーキテクチャと技術スタックを提案。人間が最終決定を行います。",
              },
              {
                title: "AI×人間協調開発",
                description:
                  "AIが基本コードを生成し、人間が高度な機能を実装。効率と品質を両立します。",
              },
              {
                title: "AI駆動テスト",
                description:
                  "AIが網羅的なテストケースを生成・実行し、高品質を保証します。",
              },
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">よくある質問</h2>
          <div className="max-w-2xl mx-auto">
            {[
              {
                question: "AIを活用した開発は信頼できますか？",
                answer:
                  "はい、AIは開発プロセスを効率化し、品質を向上させるツールとして使用しています。ただし、最終的な判断と重要な意思決定は常に経験豊富な人間の開発者が行います。AIと人間のベストミックスで、高品質なソリューションを提供しています。",
              },
              {
                question: "AI開発のコストは従来の開発と比べてどうですか？",
                answer:
                  "初期投資は従来の開発より高くなる可能性がありますが、長期的には開発速度の向上、バグの削減、保守性の向上などにより、総合的なコストが低減されます。具体的なコストは、プロジェクトの規模と要件により異なりますので、お問い合わせください。",
              },
              {
                question: "AIを使用しても、セキュリティは大丈夫ですか？",
                answer:
                  "セキュリティは最重要事項の一つです。AIを使用する際も、厳格なセキュリティプロトコルを適用し、データの暗号化、アクセス制御、定期的なセキュリティ監査を実施しています。さらに、AI自体もセキュリティ強化のツールとして活用し、潜在的な脆弱性の早期発見に役立てています。",
              },
            ].map((item, index) => (
              <div key={index} className="mb-4 border-b border-gray-200 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold"
                  onClick={() => toggleAccordionItem(`item-${index}`)}
                >
                  {item.question}
                  <ChevronDown
                    className={`transform transition-transform ${
                      openAccordionItem === `item-${index}` ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordionItem === `item-${index}` && (
                  <p className="mt-2">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            AIがあなたのプロジェクトを成功に導きます
          </h2>
          <p className="text-xl mb-8">
            まずは無料でAI支援のシステム開発シミュレーションを体験してください
          </p>
          <button className="bg-white text-blue-600 text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-colors">
            今すぐAIシミュレーション
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">SmartSpezTech</h3>
              <p>AI技術で、次世代のシステム開発を実現します。</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">リンク</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    ホーム
                  </a>
                </li>
                <li>
                  <a href="#ai-features" className="hover:text-blue-400">
                    AI特徴
                  </a>
                </li>
                <li>
                  <a href="#strengths" className="hover:text-blue-400">
                    強み
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-blue-400">
                    実績
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-blue-400">
                    開発プロセス
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-blue-400">
                    よくある質問
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
              <p>AI開発についてのご質問は、お気軽にご連絡ください。</p>
              <button className="mt-4 px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-gray-800 transition-colors">
                お問い合わせ
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 SmartSpezTech AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Simulation Modal */}
      <Modal isOpen={isSimulationModalOpen} onClose={closeSimulationModal}>
        <SystemOrderSimulation />
      </Modal>
    </div>
  );
}
