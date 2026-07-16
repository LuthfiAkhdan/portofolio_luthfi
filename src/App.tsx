import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Code,
  Database,
  Smartphone,
  Send,
  Globe,
  FileUp,
  FileCode,
  Server,
  ShieldAlert,
  Copy,
  Check,
  MessageSquare,
  Terminal,
  ArrowUpRight,
  Loader2,
  HelpCircle,
  Clock,
  Sparkles
} from "lucide-react";
import {
  profileData,
  educationData,
  experienceData,
  skillsData,
  additionalSkillsData,
  toolsData,
  projectsData
} from "./data";
import { ChatMessage, ProjectItem } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<"about" | "education" | "experience" | "portofolio" | "contact">("about");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Project category filter
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Halo! Saya Luthfi AI, asisten personal kloningan Muhammad Luthfi Akhdan. Tanyakan apa saja tentang keahlian saya di Laravel, Vue, pengalaman kerja di Clozette, atau proyek yang pernah saya buat. Ada yang bisa saya bantu?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Active experience detail index
  const [activeExpIndex, setActiveExpIndex] = useState(0);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Clock state for Jakarta time
  const [jakartaTime, setJakartaTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const formatter = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      setJakartaTime(formatter.format(new Date()));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll chat window to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatLoading]);

  // Utility to handle copy to clipboard
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Chat message submission
  const handleSendMessage = async (e?: FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || userInput;
    if (!textToSend.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!customText) setUserInput("");
    setIsChatLoading(true);

    try {
      const chatHistoryForAPI = [...chatMessages, userMsg].map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistoryForAPI })
      });

      const data = await res.json();

      if (res.ok && data.message) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error(data.error || "Gagal mendapatkan respon.");
      }
    } catch (err: any) {
      console.error(err);
      // Fallback response if offline or key missing
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Halo! Maaf, sepertinya koneksi backend server sedang tidak tersedia atau API Key Gemini belum diatur. Namun berdasarkan resume saya: Saya lahir di Bogor tahun 2000, lulusan SMK Wikrama Bogor jurusan RPL, dan menguasai framework Laravel serta Vue.js. Saya memiliki total pengalaman kerja sekitar 5 tahun sebagai Web & Backend Developer. Ada yang ingin Anda tanyakan secara spesifik?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 800);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Contact form submit
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setContactForm({ name: "", email: "", message: "" });
      // Add a simulated follow-up message from Luthfi in chat as well for awesome interactivity!
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "user",
          content: `[Kirim Formulir Kontak] Nama: ${contactForm.name}, Email: ${contactForm.email}. Pesan: ${contactForm.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Terima kasih banyak, Kak ${contactForm.name}! Pesan Anda telah saya terima di formulir kontak saya. Saya akan segera membalasnya ke email Anda (${contactForm.email}) secepat mungkin. Senang bisa terhubung!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  // Dynamic Icon mapping for tools section
  const renderToolIcon = (iconName: string) => {
    switch (iconName) {
      case "Code": return <Code className="w-5 h-5 text-emerald-400" />;
      case "FileCode": return <FileCode className="w-5 h-5 text-cyan-400" />;
      case "Server": return <Server className="w-5 h-5 text-indigo-400" />;
      case "Database": return <Database className="w-5 h-5 text-purple-400" />;
      case "Smartphone": return <Smartphone className="w-5 h-5 text-green-400" />;
      case "Send": return <Send className="w-5 h-5 text-orange-400" />;
      case "Globe": return <Globe className="w-5 h-5 text-blue-400" />;
      case "FileUp": return <FileUp className="w-5 h-5 text-amber-400" />;
      default: return <HelpCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  // Filter project categories
  const filteredProjects = selectedCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || p.techStack.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase())));

  const menuItems = [
    { id: "about", label: "About Me", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "portofolio", label: "Portofolio", icon: FolderGit2 },
    { id: "contact", label: "Contact", icon: Mail }
  ] as const;

  const suggestQueries = [
    "Di mana kamu sekolah?",
    "Teknologi apa saja yang kamu kuasai?",
    "Ceritakan pengalaman kerjamu di Clozette!",
    "Berapa nomor telepon dan email Luthfi?"
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-sky-500 selection:text-black relative overflow-hidden">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Floating Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo Name */}
          <div className="flex items-center space-x-3">
            <img src="/assets/3x4.JPG" alt="Luthfi Avatar" className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-black text-sm shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
            <div>
              <h1 className="font-semibold text-sm tracking-wide text-white uppercase">{profileData.name}</h1>
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Indonesia • {jakartaTime} WIB</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-colors duration-200 flex items-center space-x-1.5 ${
                    isActive ? "text-sky-400" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-sky-500/10 border border-sky-500/20 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Hire Me CTA */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab("contact")}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-white text-black hover:bg-sky-400 hover:text-black hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300"
            >
              Hire Me
            </button>
          </div>
        </div>
      </header>

      {/* Main Body Grid Layout */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 relative z-10">
        
        {/* Animated Tab Switcher Container */}
        <AnimatePresence mode="wait">
          
          {/* ABOUT ME TAB */}
          {activeTab === "about" && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Personal Intro Card & Quick Details */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Profile Card */}
                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm relative overflow-hidden shadow-xl">
                  {/* Decorative glowing gradient header */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600" />
                  
                  <div className="flex flex-col items-center text-center mt-4">
                    {/* Simulated elegant avatar */}
                    <div className="relative group">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-400 blur-md opacity-35 group-hover:opacity-70 transition-opacity duration-300" />
                      <div className="w-70 h-70 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-sky-500/60 flex items-center justify-center relative">
                        <img src="/assets/DSC09917.JPG" alt="Luthfi Avatar" className="w-full h-full object-cover rounded-xl" />
                      </div>
                    </div>

                    <h2 className="mt-5 text-xl font-semibold text-white tracking-tight">{profileData.name}</h2>
                    <p className="text-xs text-sky-400 font-mono tracking-wider mt-1 uppercase">{profileData.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{profileData.subTitle}</p>

                    <div className="w-full h-[1px] bg-slate-800/80 my-5" />

                    {/* Detailed info lines */}
                    <div className="w-full space-y-3.5 text-left text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Lahir</span>
                        <span className="font-medium text-right">{profileData.birthInfo}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Lokasi</span>
                        <span className="font-medium text-right text-xs truncate max-w-[200px]">{profileData.address}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</span>
                        <button 
                          onClick={() => handleCopy(profileData.email, "Email")}
                          className="font-mono text-sky-400 hover:underline flex items-center gap-1 cursor-pointer transition-all"
                        >
                          {copiedText === "Email" ? <span className="text-sky-300 text-[10px] font-sans">Copied!</span> : profileData.email}
                          <Copy className="w-3 h-3 text-slate-500" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Telepon</span>
                        <button
                          onClick={() => handleCopy(profileData.phone, "Phone")}
                          className="font-mono hover:underline flex items-center gap-1 cursor-pointer transition-all text-sky-400"
                        >
                          {copiedText === "Phone" ? <span className="text-sky-300 text-[10px] font-sans">Copied!</span> : profileData.phone}
                          <Copy className="w-3 h-3 text-slate-500" />
                        </button>
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-slate-800/80 my-5" />

                    {/* Social links bar */}
                    <div className="flex items-center space-x-3">
                      <a
                        href={profileData.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-500/20 hover:text-sky-400 flex items-center justify-center transition-all duration-300"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={profileData.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-500/20 hover:text-sky-400 flex items-center justify-center transition-all duration-300"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={profileData.socials.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-500/20 hover:text-sky-400 flex items-center justify-center transition-all duration-300"
                        title="Instagram"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Additional Skills Mini Card */}
                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-4 flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> Kreativitas & Bahasa
                  </h3>
                  <div className="space-y-4">
                    {additionalSkillsData.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300 font-medium">{skill.name}</span>
                          <span className="text-slate-500 font-mono text-[10px]">{skill.score}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.score}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Bio, Skills Chart & AI Copilot */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* About Statement */}
                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm space-y-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Ringkasan Profil
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-light">
                    {profileData.bio}
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <div className="text-xl font-bold text-sky-400">5+</div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">Tahun Pengalaman</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <div className="text-xl font-bold text-indigo-400">SMK</div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">Wikrama Bogor</div>
                    </div>
                  </div>
                </div>

                {/* Technical Skills Map */}
                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Peta Keahlian Teknis
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">Core Stacks</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skillsData.map((skill) => (
                      <div 
                        key={skill.name} 
                        className="p-3 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-700 hover:bg-slate-900/50 transition-all duration-200 group"
                      >
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="text-slate-200 font-medium group-hover:text-sky-400 transition-colors">{skill.name}</span>
                          <span className="text-[10px] font-mono text-slate-500">{skill.score}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.score}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive AI Luthfi Copilot */}
                {/* <div className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl flex flex-col h-[400px]">
                  
                  <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                      <div>
                        <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
                          Tanya AI Luthfi <span className="px-1.5 py-0.2 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[8px] font-mono rounded">Gemini Powered</span>
                        </h4>
                        <p className="text-[9px] text-slate-400">Asisten Kloning untuk tanya jawab cepat</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setChatMessages([
                          {
                            id: "welcome",
                            role: "assistant",
                            content: "Halo! Riwayat obrolan telah dibersihkan. Ada informasi CV Luthfi yang ingin Anda tanyakan lagi?",
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          }
                        ]);
                      }}
                      className="text-[9px] font-mono text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs bg-slate-950/80 custom-scrollbar">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 space-y-1 ${
                            msg.role === "user"
                              ? "bg-sky-500 text-black rounded-tr-none font-medium"
                              : "bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none font-light"
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-line">{msg.content}</p>
                          <span className={`block text-[8px] text-right ${msg.role === "user" ? "text-black/60" : "text-slate-500"}`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}

                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-900 border border-slate-800 text-slate-400 rounded-2xl rounded-tl-none px-3.5 py-3 flex items-center space-x-2">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
                          <span className="text-[10px] font-mono">Luthfi sedang merangkai jawaban...</span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="px-4 py-2 border-t border-slate-900 bg-slate-950 flex flex-wrap gap-1.5">
                    {suggestQueries.map((query) => (
                      <button
                        key={query}
                        onClick={() => handleSendMessage(undefined, query)}
                        className="text-[9px] text-slate-400 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700 rounded-md px-2 py-1 cursor-pointer transition-all duration-150"
                      >
                        {query}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-2 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Tanyakan sekolah, skill, kontak Luthfi..."
                      className="flex-1 bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      disabled={isChatLoading || !userInput.trim()}
                      className="w-8 h-8 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-600 text-black flex items-center justify-center cursor-pointer transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>

                </div> */}

              </div>
            </motion.div>
          )}

          {/* EDUCATION TAB */}
          {activeTab === "education" && (
            <motion.div
              key="education-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-white flex items-center justify-center gap-2">
                  <GraduationCap className="text-sky-400 w-6 h-6" /> Riwayat Pendidikan
                </h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Perjalanan akademis saya dari dasar hingga mendalami keahlian rekayasa perangkat lunak.
                </p>
              </div>

              {/* Timeline layout */}
              <div className="relative border-l border-slate-800 ml-4 md:ml-32 py-4 space-y-12">
                {educationData.map((edu, idx) => (
                  <motion.div
                    key={edu.school}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="relative group"
                  >
                    {/* Year tag for large screens */}
                    <span className="hidden md:block absolute right-[100%] mr-10 top-1 text-xs font-mono text-slate-500 font-semibold w-24 text-right">
                      {edu.year}
                    </span>

                    {/* Timeline dot */}
                    <span className="absolute left-[-5.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-sky-500 border border-[#050505] ring-4 ring-sky-500/10 group-hover:ring-sky-500/30 transition-all duration-300" />

                    {/* Content card */}
                    <div className="ml-6 p-5 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm group-hover:border-slate-700 hover:bg-slate-900/75 transition-all duration-200">
                      <span className="inline-block md:hidden text-[10px] font-mono text-sky-400 mb-1 font-semibold">
                        {edu.year}
                      </span>
                      <h3 className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
                        {edu.school}
                      </h3>
                      {edu.major && (
                        <p className="text-xs text-indigo-400 font-mono mt-0.5">{edu.major}</p>
                      )}
                      {edu.details && (
                        <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-light">
                          {edu.details}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Wikrama Special Mention Section */}
              <div className="p-6 rounded-3xl bg-gradient-to-tr from-slate-900/85 to-indigo-950/20 border border-slate-800 relative overflow-hidden mt-8">
                <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-sky-500/5 rounded-full blur-3xl" />
                <h3 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">Wikrama Core values</h3>
                <h4 className="text-sm font-bold text-white mb-1.5">Membentuk Kebiasaan Kerja yang Disiplin</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Lulus dari SMK Wikrama Bogor bukan sekadar perihal materi koding saja, melainkan pembentukan sikap kerja unggul (Attitude), etika profesi yang kuat, kegigihan belajar tiada henti, dan kemampuan kolaborasi tim yang gesit untuk menjawab tuntutan dunia industri IT modern.
                </p>
              </div>
            </motion.div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === "experience" && (
            <motion.div
              key="experience-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              <div className="md:col-span-12 text-center space-y-2 mb-4">
                <h2 className="text-2xl font-semibold text-white flex items-center justify-center gap-2">
                  <Briefcase className="text-sky-400 w-6 h-6" /> Pengalaman Kerja
                </h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Menyajikan karir profesional saya sebagai web developer di berbagai institusi terkemuka.
                </p>
              </div>

              {/* Sidebar Companies Selector */}
              <div className="md:col-span-4 space-y-2">
                {experienceData.map((exp, idx) => (
                  <button
                    key={exp.company}
                    onClick={() => setActiveExpIndex(idx)}
                    className={`w-full p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden ${
                      activeExpIndex === idx
                        ? "bg-slate-900 border-sky-500/40 shadow-lg text-white"
                        : "bg-slate-900/30 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider font-semibold uppercase">{exp.period}</span>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-mono ${
                        exp.type.includes("Outsourcing") ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                        exp.type.includes("Contract") ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                        "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {exp.type.includes("Outsourcing") ? "Outsource" : exp.type.includes("Contract") ? "Contract" : "Intern"}
                      </span>
                    </div>
                    <span className="text-xs font-semibold mt-2 tracking-tight">{exp.company}</span>
                    <span className="text-[11px] text-sky-400 font-mono mt-0.5">{exp.role}</span>
                    
                    {activeExpIndex === idx && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-sky-500" />
                    )}
                  </button>
                ))}
              </div>

              {/* Experience Details Display */}
              <div className="md:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeExpIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm space-y-6"
                  >
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 font-semibold tracking-wider uppercase">Period: {experienceData[activeExpIndex].period}</div>
                      <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
                        {experienceData[activeExpIndex].company} 
                        <span className="text-xs font-normal text-slate-400 font-mono">({experienceData[activeExpIndex].type})</span>
                      </h3>
                      <p className="text-xs text-sky-400 font-mono mt-0.5">{experienceData[activeExpIndex].role}</p>
                    </div>

                    <div className="h-[1px] bg-slate-800" />

                    <div className="space-y-3.5">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">Tanggung Jawab & Kontribusi</h4>
                      <ul className="space-y-2.5">
                        {experienceData[activeExpIndex].details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-xs text-slate-300 leading-relaxed font-light">
                            <span className="text-sky-500 mr-2.5 mt-1 font-bold">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {experienceData[activeExpIndex].techStack && (
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">Tech Stack yang Digunakan</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {experienceData[activeExpIndex].techStack?.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] px-2.5 py-1 rounded-md bg-slate-950 border border-slate-850 text-slate-300 font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tools Section Integrated Into Experience */}
              <div className="md:col-span-12 mt-4">
                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2 justify-center md:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Ekosistem Aplikasi & Perkakas Kerja (Tools)
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">Daftar software dan utilitas andalan untuk menyokong efisiensi kerja developer saya.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Text Editors */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-xs space-y-3">
                      <h4 className="font-semibold text-sky-400 font-mono tracking-wide text-[10px] uppercase">Text Editor</h4>
                      {toolsData.editors.map(tool => (
                        <div key={tool.name} className="flex items-start space-x-2">
                          <div className="mt-0.5">{renderToolIcon(tool.icon)}</div>
                          <div>
                            <div className="text-slate-200 font-medium font-sans text-xs">{tool.name}</div>
                            <div className="text-[10px] text-slate-500 font-light mt-0.5">{tool.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Servers & DB */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-xs space-y-3">
                      <h4 className="font-semibold text-indigo-400 font-mono tracking-wide text-[10px] uppercase">Server & Database</h4>
                      <div className="space-y-3">
                        {toolsData.serversAndDBs.map(tool => (
                          <div key={tool.name} className="flex items-start space-x-2">
                            <div className="mt-0.5">{renderToolIcon(tool.icon)}</div>
                            <div>
                              <div className="text-slate-200 font-medium font-sans text-xs">{tool.name}</div>
                              <div className="text-[10px] text-slate-500 font-light mt-0.5">{tool.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile IDE & API Testing */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-xs space-y-3">
                      <h4 className="font-semibold text-sky-400 font-mono tracking-wide text-[10px] uppercase">Mobile & API Test</h4>
                      <div className="space-y-3">
                        {toolsData.android.map(tool => (
                          <div key={tool.name} className="flex items-start space-x-2">
                            <div className="mt-0.5">{renderToolIcon(tool.icon)}</div>
                            <div>
                              <div className="text-slate-200 font-medium font-sans text-xs">{tool.name}</div>
                              <div className="text-[10px] text-slate-500 font-light mt-0.5">{tool.desc}</div>
                            </div>
                          </div>
                        ))}
                        {toolsData.testing.map(tool => (
                          <div key={tool.name} className="flex items-start space-x-2">
                            <div className="mt-0.5">{renderToolIcon(tool.icon)}</div>
                            <div>
                              <div className="text-slate-200 font-medium font-sans text-xs">{tool.name}</div>
                              <div className="text-[10px] text-slate-500 font-light mt-0.5">{tool.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Servers Deploy */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-xs space-y-3">
                      <h4 className="font-semibold text-purple-400 font-mono tracking-wide text-[10px] uppercase">Hosting Server</h4>
                      {toolsData.hosting.map(tool => (
                        <div key={tool.name} className="flex items-start space-x-2">
                          <div className="mt-0.5">{renderToolIcon(tool.icon)}</div>
                          <div>
                            <div className="text-slate-200 font-medium font-sans text-xs">{tool.name}</div>
                            <div className="text-[10px] text-slate-500 font-light mt-0.5">{tool.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* PORTFOLIO TAB */}
          {activeTab === "portofolio" && (
            <motion.div
              key="portofolio-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-white flex items-center justify-center gap-2">
                  <FolderGit2 className="text-sky-400 w-6 h-6" /> Portofolio Proyek
                </h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Kompilasi proyek internal dan eksternal yang menggambarkan kompetensi penuh saya di ranah full stack & backend developer.
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="flex justify-center flex-wrap gap-2 py-2">
                {["All", "Backend", "Full Stack", "Mobile"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-300 cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-sky-500 text-black font-semibold shadow-md shadow-sky-500/10"
                        : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {filteredProjects.map((proj, idx) => (
                  <motion.div
                    key={proj.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-sky-500/20 hover:bg-slate-900/70 flex flex-col justify-between transition-all duration-300 group shadow-lg relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-850 text-sky-400 uppercase font-semibold">
                          {proj.category}
                        </span>
                        <div className="flex items-center space-x-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          <a href={proj.linked} target="_blank" className="text-gray-400 hover:text-white p-1">
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      <div class="h-70 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-sky-500/60 flex items-center justify-center relative">
                        <img alt="Website Banner" class="w-full h-full object-cover rounded-xl" src={proj.image}/>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors tracking-tight">
                          <a href={proj.linked} target="_blank">
                            {proj.title}
                          </a>
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-light mt-1.5">
                          {proj.description}
                        </p>
                      </div>

                      {/* Bullet features */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block font-semibold">Highlight Fitur</span>
                        {proj.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start text-[11px] text-slate-300 leading-normal font-light">
                            <span className="text-sky-500 mr-2 font-bold">•</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-850 flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-850"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CONTACT TAB */}
          {activeTab === "contact" && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-4xl mx-auto"
            >
              <div className="md:col-span-12 text-center space-y-2 mb-4">
                <h2 className="text-2xl font-semibold text-white flex items-center justify-center gap-2">
                  <Mail className="text-sky-400 w-6 h-6" /> Hubungi Saya
                </h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Ingin berdiskusi proyek, penawaran kerja, atau sekadar menyapa? Kirim pesan langsung lewat formulir ini.
                </p>
              </div>

              {/* Contact Info list */}
              <div className="md:col-span-5 space-y-6">
                
                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm space-y-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">Saluran Langsung</h3>
                  
                  <div className="space-y-5">
                    
                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400 border border-slate-700">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 font-semibold uppercase">Email Utama</div>
                        <a href={`mailto:${profileData.email}`} className="text-xs text-slate-200 hover:text-sky-400 font-mono transition-colors">{profileData.email}</a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-700">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 font-semibold uppercase">Telepon / WhatsApp</div>
                        <a href="tel:+6289638350223" className="text-xs text-slate-200 hover:text-sky-400 font-mono transition-colors">{profileData.phone}</a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-700">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 font-semibold uppercase">Alamat Rumah</div>
                        <div className="text-xs text-slate-200 font-light">{profileData.address}</div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Social media connections card */}
                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">Temukan Saya di Media</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href={profileData.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-950 hover:bg-sky-500/10 border border-slate-850 hover:border-sky-500/20 text-center space-y-1.5 transition-all group cursor-pointer"
                    >
                      <Github className="w-4 h-4 mx-auto text-slate-400 group-hover:text-sky-400" />
                      <div className="text-[9px] font-mono text-slate-500 group-hover:text-slate-300">GitHub</div>
                    </a>
                    <a
                      href={profileData.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-950 hover:bg-sky-500/10 border border-slate-850 hover:border-sky-500/20 text-center space-y-1.5 transition-all group cursor-pointer"
                    >
                      <Linkedin className="w-4 h-4 mx-auto text-slate-400 group-hover:text-sky-400" />
                      <div className="text-[9px] font-mono text-slate-500 group-hover:text-slate-300">LinkedIn</div>
                    </a>
                    <a
                      href={profileData.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-950 hover:bg-sky-500/10 border border-slate-850 hover:border-sky-500/20 text-center space-y-1.5 transition-all group cursor-pointer"
                    >
                      <Instagram className="w-4 h-4 mx-auto text-slate-400 group-hover:text-sky-400" />
                      <div className="text-[9px] font-mono text-slate-500 group-hover:text-slate-300">Instagram</div>
                    </a>
                  </div>
                </div>

              </div>

              {/* Form card */}
              <div className="md:col-span-7">
                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm relative overflow-hidden shadow-xl">
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-6 space-y-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">Fitur Kirim Pesan hanya Dummy!</h4>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                          Fitur ini hanya simulasi dan tidak benar-benar mengirimkan pesan. Namun, Anda tetap dapat menghubungi saya melalui email atau media sosial yang tersedia di sebelah kiri.
                        </p>
                      </div>
                      <button
                        onClick={() => setSubmitStatus("idle")}
                        className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-full border border-slate-750 transition-colors cursor-pointer"
                      >
                        Kirim Pesan Lain
                      </button>
                    </motion.div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold mb-4">Formulir Kontak</h3>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 font-semibold uppercase">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 font-semibold uppercase">Alamat Email</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="Contoh: budi@gmail.com"
                        className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 font-semibold uppercase">Isi Pesan Anda</label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tulis pesan lengkap terkait tawaran proyek atau peluang kerja..."
                        className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 hover:opacity-90 disabled:opacity-50 text-black font-semibold text-xs rounded-xl shadow-lg hover:shadow-sky-500/10 flex items-center justify-center space-x-2 cursor-pointer transition-all mt-6"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sedang Mengirim Pesan...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Kirim Pesan Sekarang</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Aesthetic Mobile Menu Nav Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden bg-slate-950/80 border border-slate-850/80 backdrop-blur-lg px-4 py-2.5 rounded-full flex items-center space-x-4 shadow-2xl">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-2 rounded-full transition-all relative ${
                isActive ? "text-sky-400 bg-sky-500/10" : "text-slate-500 hover:text-slate-300"
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4" />
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sky-400 border-2 border-slate-950" />
              )}
            </button>
          );
        })}
      </div>

      {/* Simple Aesthetic Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/50 py-8 text-center text-xs text-slate-500 mt-12 mb-16 md:mb-0 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-light">
            &copy; 2026 {profileData.name}. Semua hak cipta dilindungi.
          </p>
          <div className="flex items-center space-x-1.5 font-mono text-[10px] text-slate-600">
            <span>Powered by React and Tailwind CSS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
