import { createServerFn } from "@tanstack/react-start";

interface AnalyzeInput {
  imageBase64: string; // data URL e.g. "data:image/png;base64,...."
  mode: "describe" | "ocr" | "objects" | "all";
}

const PROMPTS: Record<AnalyzeInput["mode"], string> = {
  describe: "請用繁體中文詳細描述這張圖片的場景、氛圍、構圖和重點內容。回覆要結構清晰，分段說明。",
  ocr: "請辨識並完整輸出這張圖片中所有的文字內容（OCR）。保留原始排版與換行，不要加上額外解釋，直接列出文字。",
  objects: "請用繁體中文列出這張圖片中可辨識的所有物件、人物、動物或元素，以條列方式呈現，每項加上簡短描述（顏色、位置、特徵）。",
  all: "請用繁體中文完整分析這張圖片，包含以下四個區塊（使用 Markdown 標題）：\n## 📝 場景描述\n## 🔍 物件辨識\n## 📃 文字內容（OCR）\n## 💡 額外洞察\n若某項無資料請註明「無」。",
};

export const analyzeImage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const i = input as AnalyzeInput;
    if (!i?.imageBase64 || typeof i.imageBase64 !== "string") {
      throw new Error("缺少圖片資料");
    }
    if (!["describe", "ocr", "objects", "all"].includes(i.mode)) {
      throw new Error("無效的分析模式");
    }
    return i;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI 服務未設定，請聯絡管理員");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: PROMPTS[data.mode] },
              { type: "image_url", image_url: { url: data.imageBase64 } },
            ],
          },
        ],
      }),
    });

    if (response.status === 429) {
      throw new Error("使用次數已達上限，請稍後再試");
    }
    if (response.status === 402) {
      throw new Error("AI 額度不足，請至工作區設定加值");
    }
    if (!response.ok) {
      const text = await response.text();
      console.error("AI Gateway error:", response.status, text);
      throw new Error(`AI 分析失敗 (${response.status})`);
    }

    const json = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    if (!content) throw new Error("AI 沒有回傳內容");
    return { result: content };
  });
