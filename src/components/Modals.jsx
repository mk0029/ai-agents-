"use client";
import { useCallback, useState } from "react";
import Response from "./Responce";
import { DynamicAccordion } from "./common/DynamicAccordion";
export default function Modals() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [responsesList, setResponsesList] = useState([]);
  const [loadingModel, setLoadingModel] = useState(null); // Current loading model
  const [currentModal, setCurrentModal] = useState("coding"); // Current loading model
  const [isModalDrop, setIsModalDrop] = useState(false); // Current loading model
  const handleSubmitGemini = async () => {
    if (!prompt.trim()) return;
    const currentModel = "Gemini";
    setLoading(true);
    setPrompt("");
    setLoadingModel(currentModel);
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponsesList((prev) => [
      ...prev,
      { model: currentModel, response: data.response },
    ]);
    setLoadingModel(null);
    setLoading(false);
  };
  // Submit using OpenRouter models
  const fetchAiResponse = useCallback(
    async (model, modelName) => {
      if (!prompt.trim()) return;
      setLoading(true);
      setPrompt("");
      setLoadingModel(modelName);
      try {
        const res = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_ROUTER}`,
            },
            body: JSON.stringify({
              model,
              messages: [{ role: "user", content: prompt }],
            }),
          }
        );
        const data = await res.json();
        const output =
          data?.choices?.[0]?.message?.content ||
          `🤖 No usable reply from ${modelName}.`;

        setResponsesList((prev) => [
          ...prev,
          { model: modelName, response: output },
        ]);
      } catch (error) {
        setResponsesList((prev) => [
          ...prev,
          { model: modelName, response: "❌ Network or parsing error." },
        ]);
      } finally {
        setLoadingModel(null);
        setLoading(false);
      }
    },
    [prompt]
  );
  const handleSubmit = (model, modelName) => {
    fetchAiResponse(model, modelName);
  };
  const modalsList = [
    {
      title: "Gemini",
      model: "gemini",
      type: "content",
      onSearch: () => handleSubmitGemini(),
    },
    {
      title: "Gemini 2.0",
      model: "google/gemini-2.0-flash-thinking-exp:free",
      type: "thinking",
      onSearch: () =>
        handleSubmit(
          "google/gemini-2.0-flash-thinking-exp:free",
          "gemini-2.0",
          "thinking"
        ),
    },
    {
      title: "Gemini 2.5pro",
      model: "google/gemini-2.5-pro-exp-03-25:free",
      type: "coding",
      onSearch: () =>
        handleSubmit(
          "google/gemini-2.5-pro-exp-03-25:free",
          "gemini-2.5pro",
          "coding"
        ),
    },
    {
      title: "Mistral",
      model: "mistralai/mistral-7b-instruct",
      type: "coding",
      onSearch: () =>
        handleSubmit("mistralai/mistral-7b-instruct", "Mistral", "coding"),
    },
    {
      title: "Agentica",
      model: "agentica-org/deepcoder-14b-preview:free",
      type: "coding",
      onSearch: () =>
        handleSubmit(
          "agentica-org/deepcoder-14b-preview:free",
          "Agentica",
          "thinking"
        ),
    },
    {
      title: "Llama 3.1",
      model: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
      type: "content",
      onSearch: () =>
        handleSubmit(
          "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
          "Llama-3.1",
          "thinking"
        ),
    },
    {
      title: "Llama 3.3",
      model: "nvidia/llama-3.3-nemotron-super-49b-v1:free",
      type: "thinking",
      onSearch: () =>
        handleSubmit(
          "nvidia/llama-3.3-nemotron-super-49b-v1:free",
          "Llama-3.3",
          "thinking"
        ),
    },
    {
      title: "DeepSeek",
      model: "deepseek/deepseek-r1-distill-llama-70b:free",
      type: "content",
      onSearch: () =>
        handleSubmit(
          "deepseek/deepseek-r1-distill-llama-70b:free",
          "DeepSeek",
          "thinking"
        ),
    },
    {
      title: "Moon Shot",
      model: "moonshotai/moonlight-16b-a3b-instruct:free",
      type: "content",
      onSearch: () =>
        handleSubmit(
          "moonshotai/moonlight-16b-a3b-instruct:free",
          "moonshot",
          "content"
        ),
    },
    {
      title: "Qwen 2.5",
      model: "qwen/qwen-2.5-coder-32b-instruct:free",
      type: "coding",
      onSearch: () =>
        handleSubmit(
          "qwen/qwen-2.5-coder-32b-instruct:free",
          "qwen-2.5",
          "code"
        ),
    },
    {
      title: "Deep Seek",
      model: "deepseek/deepseek-r1-distill-llama-70b:free",
      type: "coding",
      onSearch: () =>
        handleSubmit(
          "deepseek/deepseek-r1-distill-llama-70b:free",
          "deep-seek-2.5",
          "coding"
        ),
    },
    {
      title: "Olympic Coder",
      model: "open-r1/olympiccoder-32b:free",
      type: "coding",
      onSearch: () =>
        handleSubmit("open-r1/olympiccoder-32b:free", "olympiccoder", "code"),
    },
    {
      title: "Arli Ai",
      model: "arliai/qwq-32b-arliai-rpr-v1:free",
      type: "content",
      onSearch: () =>
        handleSubmit("arliai/qwq-32b-arliai-rpr-v1:free", "arliai", "content"),
    },
  ];
  const modalsTypes = ["content", "coding", "thinking"];
  return (
    <div
      className={`min-h-screen px-4 py-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}>
      <div className="max-w-4xl mx-auto flex flex-col gap-6 items-center">
        <div className="w-full flex justify-between items-center mb-4 relative z-10">
          <h1 className="text-4xl font-bold">🔥 AI Playground</h1>
          <div className="flex gap-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="border px-3 py-1 rounded text-sm hover:bg-opacity-10 transition">
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>{" "}
            <div
              onClick={() => setIsModalDrop(!isModalDrop)}
              className=" relative">
              <button
                className={`border px-3 py-1 rounded-sm ${
                  currentModal === "all"
                    ? " border-white"
                    : currentModal === "coding"
                    ? " border-blue-600 "
                    : currentModal === "thinking"
                    ? " border-cyan-600 "
                    : " border-purple-600 "
                }`}>
                Modal Type{" "}
                <span
                  className={`capitalize ${
                    currentModal === "all"
                      ? " text-white"
                      : currentModal === "coding"
                      ? " text-blue-600 "
                      : currentModal === "thinking"
                      ? " text-cyan-600 "
                      : " text-purple-600 "
                  }`}>
                  {currentModal}
                </span>
              </button>
              <div className=" absolute top-full left-0 translate-y-2 w-full">
                <DynamicAccordion open={isModalDrop} speed={200}>
                  <div className="p-2 border border-solid border-white rounded-sm space-y-1 ">
                    {modalsTypes.map((type, key) => (
                      <p
                        key={key}
                        onClick={() => setCurrentModal(type)}
                        className={`p-1 border border-solid border-white rounded-sm cursor-pointer hover:bg-opacity-10 transition text-center ${
                          type === "all"
                            ? ""
                            : type === "coding"
                            ? "bg-blue-600 border-blue-600 hover:bg-blue-700"
                            : type === "thinking"
                            ? "bg-cyan-600 border-cyan-600 hover:bg-cyan-700"
                            : "bg-purple-600 border-purple-600 hover:bg-purple-700"
                        }`}>
                        {type}
                      </p>
                    ))}
                  </div>
                </DynamicAccordion>
              </div>
            </div>
          </div>
        </div>
        {/* Prompt Input */}
        <div className="relative w-full z-0">
          <textarea
            className={`w-full p-4 rounded-lg border shadow focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-800 border-gray-700 focus:ring-purple-500"
                : "bg-white border-gray-300 focus:ring-purple-600"
            }`}
            rows={6}
            placeholder="Type your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex gap-x-2 items-center absolute bottom-4 right-4">
            <p className="text-base tracking-wide">
              {loading ? "Thinking..." : "Ask From ?"}
            </p>
            {modalsList
              .filter((model) =>
                currentModal === "all" ? model : model.type === currentModal
              )
              .map((obj, index) => (
                <button
                  key={`${obj.type}-${obj.model}`}
                  className={`px-2 py-1 text-sm rounded-lg text-white border-solid transition-all ease-linear duration-300 font-semibold ${
                    obj.disabled || loading
                      ? "cursor-not-allowed opacity-80 hover:border-transparent"
                      : "cursor-pointer hover:border-white"
                  } ${
                    loading
                      ? "bg-gray-500 border-gray-500"
                      : `${
                          obj.type === "coding"
                            ? "bg-blue-600 border-blue-600 hover:bg-blue-700"
                            : obj.type === "thinking"
                            ? "bg-cyan-600 border-cyan-600 hover:bg-cyan-700"
                            : "bg-purple-600 border-purple-600 hover:bg-purple-700"
                        }`
                  } ${obj.type === "coding" ? "border-2" : "border"}`}
                  onClick={() => {
                    if (!obj.disabled) obj.onSearch();
                  }}
                  disabled={loading}>
                  {obj.title}
                </button>
              ))}
          </div>
        </div>
        {/* Responses */}
        <div className="mt-6 w-full space-y-6">
          <Response
            darkMode={darkMode ? true : false}
            responsesList={responsesList}
          />
          {loadingModel && (
            <div className="flex items-center justify-center mt-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
              <span className="ml-2">Loading {loadingModel}...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
