"use client";

import { useEffect, useState, useCallback } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [responsesList, setResponsesList] = useState([]);
  const [loadingModel, setLoadingModel] = useState(null); // model name that's currently loading

  const handleSubmitGemini = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setPrompt("");
    const currentModel = "Gemini";
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

  const fetchAiResponse = useCallback(
    async (model, modelName) => {
      if (!prompt.trim()) return;
      setLoading(true);
      setLoadingModel(modelName);
      setPrompt("");

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
      onSearch: () => handleSubmitGemini(),
    },
    {
      title: "Mistral",
      model: "mistralai/mistral-7b-instruct",
      onSearch: () => handleSubmit("mistralai/mistral-7b-instruct", "Mistral"),
    },
    {
      title: "Optimus",
      model: "openrouter/optimus-alpha",
      onSearch: () => handleSubmit("openrouter/optimus-alpha", "Optimus"),
    },
    {
      title: "Llama 3.1",
      model: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
      onSearch: () =>
        handleSubmit(
          "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
          "Llama-3.1"
        ),
    },
    {
      title: "Llama 3.3",
      model: "nvidia/llama-3.3-nemotron-super-49b-v1:free",
      onSearch: () =>
        handleSubmit(
          "nvidia/llama-3.3-nemotron-super-49b-v1:free",
          "Llama-3.3"
        ),
    },
    {
      title: "Moon Shot",
      model: "moonshotai/moonlight-16b-a3b-instruct:free",
      onSearch: () =>
        handleSubmit("moonshotai/moonlight-16b-a3b-instruct:free", "moonshot"),
    },
  ];

  return (
    <div
      className={`min-h-screen px-4 py-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}>
      <div className="max-w-3xl mx-auto flex flex-col gap-6 items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">🔥 AI Playground</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="border px-3 py-1 rounded text-sm hover:bg-opacity-10 transition">
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="relative w-full">
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
              {loading ? "Thinking..." : `Ask From ?`}
            </p>
            {modalsList.map((obj, index) => (
              <button
                key={index}
                className={`px-2 py-1 text-sm rounded-lg text-white border border-solid border-transparent transition-all ease-linear duration-300 font-semibold ${
                  obj.disabled
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer hover:border-white"
                } ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
                onClick={() => {
                  if (!obj.disabled) obj.onSearch();
                }}
                disabled={loading}>
                {obj.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 w-full space-y-6">
          {responsesList.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg shadow-lg transition-all duration-500 ${
                darkMode ? "bg-gray-800" : "bg-white border border-gray-300"
              }`}>
              <div className="mb-2 border-b pb-1 font-semibold text-purple-500">
                — {item.model}
              </div>
              <p className="whitespace-pre-line leading-relaxed">
                {item.response}
              </p>
            </div>
          ))}

          {loadingModel && (
            <div className="flex items-center justify-center mt-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
