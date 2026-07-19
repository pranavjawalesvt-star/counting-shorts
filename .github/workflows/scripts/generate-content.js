const fs = require("fs");
const path = require("path");
const https = require("https");

const themes = [
  "amazing ocean animals",
  "fascinating space facts",
  "world's tallest mountains",
  "cool facts about dinosaurs",
  "amazing facts about the human body",
  "incredible facts about ancient Egypt",
];

const theme = themes[Math.floor(Math.random() * themes.length)];
console.log(`Selected theme: ${theme}`);

const prompt = `Give me exactly 10 short, exciting facts about "${theme}" for a counting-style short video. Each fact must be under 8 words. Respond ONLY with a JSON array like this, no other text: [{"value":1,"label":"short fact text"},{"value":2,"label":"short fact text"}, ...]. Use "value" from 1 to 10.`;

const data = JSON.stringify({
  model: "llama-3.3-70b-versatile",
  messages: [{ role: "user", content: prompt }],
});

const options = {
  hostname: "api.groq.com",
  path: "/openai/v1/chat/completions",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    "Content-Length": Buffer.byteLength(data),
  },
};

const req = https.request(options, (res) => {
  let body = "";
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => {
    const parsed = JSON.parse(body);
    const raw = parsed.choices[0].message.content.trim();
    const jsonStart = raw.indexOf("[");
    const jsonEnd = raw.lastIndexOf("]") + 1;
    const items = JSON.parse(raw.slice(jsonStart, jsonEnd));

    const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#B983FF", "#FF922B", "#20C997", "#F06595", "#845EF7", "#15AABF"];

    const fileContent = `// Auto-generated before each render. Theme: ${theme}
export type NumberItem = {
  value: number;
  label: string;
  color: string;
};

export const numbersData: NumberItem[] = ${JSON.stringify(
      items.map((item, i) => ({ ...item, color: colors[i % colors.length] })),
      null,
      2
    )};
`;

    fs.writeFileSync(path.join(__dirname, "..", "..", "..", "src", "data.ts"), fileContent);
    console.log("data.ts generated successfully.");
  });
});

req.on("error", (e) => console.error(e));
req.write(data);
req.end();
