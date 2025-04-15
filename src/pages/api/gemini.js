export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res
        .status(500)
        .json({ error: data.error.message || "Gemini messed up" });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response 🤷‍♂️";
    res.status(200).json({ response: reply });
  } catch (err) {
    console.error("Internal error:", err);
    res.status(500).json({ error: "Something went hella wrong" });
  }
}
