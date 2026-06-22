const ALLOWED_ORIGIN = "https://fernandocoan.github.io";
const MODEL = "gemini-2.5-flash";

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return json({ error: "Use POST" }, 405, cors);
    }

    if (!env.GEMINI_API_KEY) {
      return json({ error: "GEMINI_API_KEY não configurada" }, 500, cors);
    }

    try {
      const input = await request.json();
      const messages = Array.isArray(input.messages) ? input.messages : [];
      const system = messages.find(message => message.role === "system")?.content || "";
      const contents = messages
        .filter(message => message.role !== "system")
        .map(toGeminiMessage)
        .filter(message => message.parts.length);

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          systemInstruction: system ? { parts: [{ text: String(system) }] } : undefined,
          contents,
          generationConfig: {
            temperature: Number(input.temperature ?? 0.35),
            maxOutputTokens: Number(input.max_tokens ?? 700),
            thinkingConfig: { thinkingBudget: 0 }
          }
        })
      });

      if (!response.ok) {
        const detail = await response.text();
        return json({ error: "Gemini API", status: response.status, detail }, response.status, cors);
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const text = (candidate?.content?.parts || [])
        .map(part => part.text || "")
        .join("")
        .trim();

      if (input.stream) {
        const payload = JSON.stringify({
          choices: [{ delta: { content: text } }]
        });
        return new Response(`data: ${payload}\n\ndata: [DONE]\n\n`, {
          headers: {
            ...cors,
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache"
          }
        });
      }

      return json({
        choices: [{
          message: { role: "assistant", content: text },
          finish_reason: candidate?.finishReason || "STOP"
        }]
      }, 200, cors);
    } catch (error) {
      return json({ error: error.message || "Erro interno" }, 500, cors);
    }
  }
};

function toGeminiMessage(message) {
  const role = message.role === "assistant" ? "model" : "user";
  if (typeof message.content === "string") {
    return { role, parts: [{ text: message.content }] };
  }

  const parts = [];
  for (const item of message.content || []) {
    if (item.type === "text" && item.text) {
      parts.push({ text: item.text });
    }
    if (item.type === "image_url" && item.image_url?.url) {
      const match = item.image_url.url.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        parts.push({ inlineData: { mimeType: match[1], data: match[2] } });
      }
    }
  }
  return { role, parts };
}

function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json; charset=utf-8" }
  });
}
