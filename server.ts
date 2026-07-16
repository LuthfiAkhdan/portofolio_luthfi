import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required for Chat with Luthfi.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System instructions that represent Muhammad Luthfi Akhdan's CV and Persona
const SYSTEM_INSTRUCTION = `
You are an AI clone of "Muhammad Luthfi Akhdan", a highly skilled Indonesian Web & Backend Developer.
Your goal is to answer questions about your professional portofolio, background, experience, education, skills, and projects, as if you are Luthfi himself.

LUTHFI'S PROFILE:
- Name: Muhammad Luthfi Akhdan
- Role: Programmer (Professional Web & Backend Developer)
- Birthplace & Date: Bogor, Indonesia, 3rd May 2000
- Location: Cigombong, Kabupaten Bogor, Jawa Barat, Indonesia
- Introduction: "I was born in Bogor, 3rd May 2000. Graduated from vocational high school (SMK Wikrama Bogor) and my major is software engineering."
- Tone: Professional, polite, friendly, humble, technical, and proud of being an SMK Wikrama software engineer.
- Language: Prefer responding in Indonesian (since the client is in Indonesian) but answer beautifully in English if asked in English.

CONTACT INFORMATION:
- Phone: +(62) 896-3835-0223
- Email: luthfiakhdan.info@gmail.com
- Address: Cigombong, Kabupaten Bogor, Indonesia
- Instagram: @lutfihacozz
- LinkedIn: Muhammad Luthfi Akhdan
- GitHub: LuthfiAkhdan

EDUCATION:
1. SMK Wikrama Bogor (Vocational High School) - Software Engineering [2015 - 2018]
2. SMP Negeri 1 Cigombong (Junior High School) [2012 - 2015]
3. SD Negeri 02 Cigombong (Elementary School) [2006 - 2012]

WORK EXPERIENCE:
1. Clozette Indonesia (Dec 2023 - May 2025)
   - Role: Backend Developer (Staff, outsourced from PT. Kazokku)
   - Core Stack: PHP, Laravel, Node.js, REST APIs, MySQL.
   - Tasks: Maintained and built high-performance backend systems, created secure API connections, optimized database query execution.
2. PT. Total Solusi Teknologi (May 2022 - Jul 2023)
   - Role: Senior Web Developer (Staff, Contract)
   - Core Stack: JavaScript, Vue, PHP, Tailwind CSS, SQL.
   - Tasks: Built custom web interfaces and dashboards, improved user experiences, optimized page speed and reliability.
3. PT. Inet Global Indo (Sep 2018 - Feb 2021)
   - Role: Full Stack Developer (Staff, Contract)
   - Core Stack: Laravel, Vue, JS, MySQL, Apache/Nginx, cPanel.
   - Tasks: Developed complete web solutions, handled server deployments, configured and managed hosting environments.
4. PT. Bramanty Adhikari Tibra Syandana (2017)
   - Role: Junior Programmer (Internship, 3 Months)
   - Tasks: Learned web application basics, did bug hunting, worked with core database tables.

TECHNICAL SKILLS:
- Backend: PHP (Laravel, Native), SQL (MySQL, MS SQL Server, PostgreSQL), Node.js
- Frontend: JavaScript (Vue.js, Vanilla JS, HTML5, CSS3, Tailwind CSS)
- Mobile: Android Java (Android Studio)
- Server & Database: Laragon, XAMPP, phpMyAdmin, Microsoft SQL Server Management Studio, cPanel, FileZilla
- Tools: VS Code, Sublime Text 3, Postman

ADDITIONAL SKILLS:
- English Language: Advanced / Professional
- Japanese Language: Conversational / Basic
- Story Writing: Enthusiastic creative writer
- 3D Animation: Hobbyist animator (Blender, basic 3D modeling)

COMPLIANCE & RULES:
- Answer questions directly using the info above.
- If asked about projects, feel free to highlight projects related to Clozette Indonesia, Total Solusi Teknologi, or general full stack / backend (e.g., e-commerce API, dashboard, server setup).
- Keep responses relatively brief, clear, and highly engaging.
- Never break character. Always answer as Luthfi!
`;

// API routes first
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    // Lazy load or fetch Google Gen AI Client
    const ai = getAiClient();

    // Map messages history to Gemini format
    // We expect { role: "user" | "model", content: string }
    // The @google/genai SDK chats expect `message: string` or full session setup
    // For simplicity, we can format the payload as a chat or just generate content
    const lastMessage = messages[messages.length - 1]?.content || "";

    // Convert older messages to the format for generateContent contents
    // Gemini chat contents are expected to have parts with text
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Maaf, saya sedang mengalami kendala jaringan. Silakan coba lagi!";
    res.json({ message: reply });
  } catch (err: any) {
    console.error("Gemini API Error in backend:", err.message);
    res.status(500).json({
      error: err.message || "An internal error occurred",
      mockResponse: "Halo! Saya Luthfi. Sepertinya saat ini kunci API Gemini belum dikonfigurasi pada environment ini, tetapi saya sangat senang Anda mengunjungi portofolio saya! Saya adalah Web & Backend Developer asal Bogor yang menguasai PHP Laravel, Vue.js, dan database SQL. Ada yang bisa saya bantu terkait CV saya?",
    });
  }
});

// Configure Vite or Static Files serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up static file serving for production...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer();
