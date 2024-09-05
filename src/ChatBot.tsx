import React, { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  text: string;
  author: string;
}

const Chatbot: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // チャットウィンドウを開く/閉じる関数
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen && messages.length === 0) {
      // チャットが開かれ、メッセージがまだない場合に初回メッセージを送信
      sendInitialMessage();
      setTimeout(scrollToBottom, 100); // 少し遅延を入れてDOMの更新を待つ
    }
  };

  // 初回メッセージの送信
  const sendInitialMessage = () => {
    const messageText = "こんにちは！相談内容を選択してください。";
    sendMessage(messageText, "bot");
  };

  // 新しいメッセージが追加されたときに自動スクロールする関数
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatOpen]);

  // ユーザーの入力を処理する
  const handleUserInput = (input: string) => {
    sendMessage(input, "user");

    // サンプルのボットの応答
    if (input.trim() === "1") {
      sendMessage("会社についての情報です。", "bot");
    } else if (input.trim() === "2") {
      sendMessage("どんなサービスを作成予定ですか？", "bot");
    } else {
      sendMessage("選択肢を選んでください。", "bot");
    }
  };

  const sendMessage = (text: string, author: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text: text,
      author: author,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText(""); // メッセージ送信後、入力欄をクリア
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleUserInput(inputText);
    }
  };

  return (
    <div className="chatbot">
      {isChatOpen && (
        <div className="chat-window fixed bottom-0 right-0 w-full max-w-sm h-1/2 bg-white shadow-lg flex flex-col">
          <button
            onClick={toggleChat}
            className="absolute top-[-30px] left-[-20px] m-2 bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-200 z-50"
          >
            ☓
          </button>
          <div className="flex flex-col overflow-y-auto h-full w-full pt-4 pb-4 px-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-white mt-2 mb-2 break-words ${
                  message.author === "user"
                    ? "ml-auto bg-blue-500"
                    : "mr-auto bg-gray-300 text-black"
                } max-w-3/4`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2 border-t border-gray-200">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-2 border border-gray-400"
              placeholder="メッセージを入力..."
            />
            <button
              onClick={() => handleUserInput(inputText)}
              className="bg-blue-500 text-white p-2 mt-2 rounded hover:bg-blue-700 transition duration-200 w-full"
            >
              Send
            </button>
          </div>
        </div>
      )}
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-0 right-0 mb-4 mr-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          チャットでお問い合わせ
        </button>
      )}
    </div>
  );
};

export default Chatbot;
