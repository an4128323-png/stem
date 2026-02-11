
import { GoogleGenAI } from "@google/genai";

export async function getTutorResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  // Lấy API_KEY từ biến môi trường (Config trên server)
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("Hệ thống chưa cấu hình API_KEY.");
    return "Thầy Pi đang đi công tác một chút, con quay lại hỏi thầy sau nhé! ❤️";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    Bạn là 'Thầy Pi' - Gia sư Toán 8 chuyên nghiệp tại Việt Nam. 
    NHIỆM VỤ: Giải thích về 7 hằng đẳng thức đáng nhớ một cách dễ hiểu nhất.
    PHONG CÁCH: 
    - Xưng hô thân thiện: 'thầy' và 'con'.
    - Trả lời NGẮN GỌN, súc tích (khoảng 3-5 câu).
    - CÔNG THỨC: Phải bao bọc trong dấu $, ví dụ: $(a+b)^2$.
    - Luôn kèm theo 1 ví dụ minh họa cực ngắn nếu con hỏi về lý thuyết.
    - Không giải bài tập hộ ngay lập tức, hãy gợi ý từng bước.
    - Luôn động viên: "Cố lên con!", "Con sắp hiểu rồi đó!".
  `;

  try {
    const cleanedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.parts[0].text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...cleanedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Thầy đang suy nghĩ một chút, con hỏi lại nhé!";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Trả về thông báo thân thiện thay vì lỗi kỹ thuật
    return "Thầy đang bận chấm bài một chút, con đợi vài giây rồi hỏi lại thầy nhé! ❤️";
  }
}

export function hasStoredApiKey(): boolean {
  return !!process.env.API_KEY;
}
