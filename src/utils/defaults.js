const MODALS_LIST = [
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
  // {
  //   title: "Deep Seek",
  //   disabled: true,
  //   model: "deepseek/deepseek-v3-base:free",
  //   onSearch: () =>
  //     handleSubmit("deepseek/deepseek-v3-base:free", "deep-seek"),
  // },
  // {
  //   title: "Allen Molmo",
  //   disabled: true,
  //   model: "allenai/molmo-7b-d:free",
  //   onSearch: () => handleSubmit("allenai/molmo-7b-d:free", "allen-molmo"),
  // },
  {
    title: "Llama 3.1",
    model: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
    onSearch: () =>
      handleSubmit("nvidia/llama-3.1-nemotron-ultra-253b-v1:free", "Llama-3.1"),
  },
  {
    title: "Llama 3.3",
    model: "nvidia/llama-3.3-nemotron-super-49b-v1:free",
    onSearch: () =>
      handleSubmit("nvidia/llama-3.3-nemotron-super-49b-v1:free", "Llama-3.3"),
  },
  {
    title: "Moon Shot",
    model: "moonshotai/moonlight-16b-a3b-instruct:free",
    onSearch: () =>
      handleSubmit("moonshotai/moonlight-16b-a3b-instruct:free", "moonshot"),
  },
];
