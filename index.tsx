// index.tsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { GoogleGenAI } from "@google/genai";

/* -----------------------------
   Types
------------------------------ */

type Link = { label: string; href: string; external?: boolean };
type ProjectKind = "Featured" | "Experience" | "Project";

type Project = {
  title: string;
  subtitle: string;
  timeframe: string;
  kind: ProjectKind;
  status?: "In Progress" | "Shipped";
  description: string;
  impact: string[];
  tech: string[];
  links?: Link[];
};

type SkillGroup = { title: string; items: string[] };

type Leadership = {
  org: string;
  role: string;
  period: string;
  description: string;
};

/* -----------------------------
   Profile + Content
------------------------------ */

const PROFILE = {
  name: "Sami Miri",
  location: "Austin, TX",
  email: "samimiri159@gmail.com",
  phone: "(737) 414-9735",
  // Referencing the local file you attached in the project root.
  // Ensure the filename matches (e.g., profile.webp, profile.jpg, etc.)
  image: "profile.webp", 
  links: {
    linkedin: "https://www.linkedin.com/in/sami-miri-64a017267/",
    resume:
      "https://docs.google.com/document/d/1SwEa9ZsodYsCX2z76kvHG0zp2ONLZCQ9/edit?usp=sharing&ouid=110823803306812222170&rtpof=true&sd=true",
    github: "https://github.com/SamiMiri", 
  },
};

const HERO = {
  headline: "Automation + Web Experiences built with engineering discipline.",
  subhead:
    "I build tools that make work smoother for teams and day-to-day life easier for real people. My focus spans workflow automation, modern front-end development, and clear interfaces people can trust.",
};

const ABOUT =
  "I am currently pursuing an Associate of Engineering at Austin Community College after completing my Associate of Science and Early College High School diploma. I build human-centered software that helps both organizations and everyday users. From creating OptiLife to reduce financial stress through clear, personalized guidance, to designing accessibility-focused tools like Xander AI for hands-free computing, and building automations that save non-technical teammates hours of manual work, I care about outcomes that feel practical, calm, and genuinely useful.";

const SKILLS: SkillGroup[] = [
  { title: "Languages", items: ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "VBA"] },
  { title: "Frameworks", items: ["React", "React Native", "Flask"] },
  { title: "Automation & Data", items: ["Excel Automation", "Data Cleaning", "APIs", "SQL", "JSON", "Webhooks"] },
  { title: "Tools", items: ["Git", "Microsoft Excel (Advanced)", "Google Workspace", "Figma", "Zapier"] },
];

const PROJECTS: Project[] = [
  {
    title: "OptiLife",
    subtitle: "Spend Light, Sleep Tight",
    timeframe: "HackTX 2025 • 36-hour build",
    kind: "Featured",
    status: "Shipped",
    description:
      "AI-driven financial wellness web app that turns spending habits into clear, personalized saving guidance.",
    impact: [
      "Led frontend architecture with routing and form validation.",
      "Integrated Gemini-powered recommendations for actionable savings advice.",
      "Built a responsive UI focused on clarity, trust, and accessibility.",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Gemini API", "Markdown Rendering", "Local Storage"],
    links: [{ label: "GitHub Repo", href: "https://github.com/PheanoukHun/HackTX25", external: true }],
  },
  {
    title: "Xander AI",
    subtitle: "Intelligent Voice Assistant",
    timeframe: "Project",
    kind: "Featured",
    status: "Shipped",
    description:
      "Python-based voice assistant designed to streamline everyday workflows with natural-language voice commands and accessibility-first intent.",
    impact: [
      "Implemented wake-word voice flow using speech recognition.",
      "Added GPT-powered conversational Q&A and task support.",
      "Designed with inclusive, hands-free usage in mind.",
    ],
    tech: ["Python", "SpeechRecognition", "pyAudio", "OpenAI GPT"],
    links: [{ label: "Live Demo", href: "https://xanderai.pythonanywhere.com", external: true }],
  },
  {
    title: "Electric Pearl Productions",
    subtitle: "Custom Web Development (Project Lead)",
    timeframe: "2025 • In progress",
    kind: "Featured",
    status: "In Progress",
    description:
      "Leading development of a multi-page site translating Figma designs into a responsive, animation-rich experience with clear documentation for handoff.",
    impact: [
      "Translating designed pages into a structured React build with milestone planning.",
      "Building polished interactions and responsive layout fidelity to design.",
      "Maintaining documentation and progress tracking for clarity and smooth handoff.",
    ],
    tech: ["React", "Tailwind CSS", "GSAP", "ScrollTrigger", "Netlify", "Figma"],
  },
  {
    title: "Fintech Data Automation Pipelines",
    subtitle: "ZSuite Tech (Software Engineering Intern)",
    timeframe: "2025",
    kind: "Experience",
    status: "Shipped",
    description:
      "Automated financial data reconciliation workflows using Excel/VBA and integrated imports to improve speed and accuracy.",
    impact: [
      "Reduced monthly manual processing time by ~70% through VBA automation.",
      "Cut reconciliation errors by ~90% using automated lookups and validation.",
      "Created reusable templates and lightweight documentation for team adoption.",
    ],
    tech: ["Excel", "VBA", "SQL", "CSV Imports", "Automation"],
  },
  {
    title: "Franchise Workflow Automation",
    subtitle: "ResiBrands (Technical Assistant Intern)",
    timeframe: "2024 – 2025",
    kind: "Experience",
    status: "Shipped",
    description:
      "Modernized internal operations through automation pipelines and web tooling supporting franchise development and events.",
    impact: [
      "Connected form input to contract generation and e-signature workflows via automation.",
      "Improved onboarding speed by reducing manual document creation and tracking.",
      "Built lightweight interactive web elements for internal visualization and resources.",
    ],
    tech: ["Zapier", "Juro", "Cognito Forms", "Webhooks", "JSON", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Ope Ope No Mi",
    subtitle: "Discord Bot",
    timeframe: "Project",
    kind: "Project",
    status: "Shipped",
    description:
      "Discord bot featuring moderation, utilities, customization, and API integrations to improve server engagement.",
    impact: ["Implemented moderation and utility commands.", "Designed configurable permissions and onboarding messaging."],
    tech: ["Python", "Discord.py", "APIs"],
  },
  {
    title: "Gaming E-commerce Front End",
    subtitle: "HTML/CSS/JS Website",
    timeframe: "Project",
    kind: "Project",
    status: "Shipped",
    description:
      "Front-end e-commerce concept for gamers focused on responsive layout, navigation, and interactive browsing.",
    impact: ["Built responsive layouts and interactive UI flows.", "Focused on smooth browsing and discoverability."],
    tech: ["HTML", "CSS", "JavaScript"],
  },
];

const LEADERSHIP: Leadership[] = [
  {
    org: "Code2College",
    role: "Volunteer",
    period: "2021 – Present",
    description:
      "Hosted office hours for technical support and led technical + behavioral interview prep workshops, including mock interviews and professional readiness coaching.",
  },
  {
    org: "MedXplore",
    role: "Volunteer",
    period: "2026 – Present",
    description:
      "Supported event operations and assisted multidisciplinary teams during a biomedical design competition, coordinating with organizers and mentors to keep sessions running smoothly.",
  },
];

/* -----------------------------
   Q&A Context (grounding)
------------------------------ */

const QA_CONTEXT = `
SYSTEM ROLE:
You are an AI assistant answering questions about Sami Miri’s personal portfolio website.

IMPORTANT RULES:
- Only answer using the information provided in this context.
- If the information is not included here, say: "I don't have that information in the portfolio."
- Do not invent details.
- Keep answers concise and professional.
- When possible, highlight impact, technologies used, and purpose of projects.

-------------------------------------
PROFILE
-------------------------------------
Name: Sami Miri
Location: Austin, Texas
Email: samimiri159@gmail.com

Focus Areas:
- Automation
- Web development
- Human-centered tools
- Building software that simplifies workflows and improves productivity.

-------------------------------------
EDUCATION
-------------------------------------
Austin Community College
Associate of Engineering (In Progress)

Previously completed:
- Associate of Science
- Early College High School diploma

-------------------------------------
PROJECTS
-------------------------------------

OptiLife (HackTX 2025)
- AI financial wellness web application
- Built in 36 hours during HackTX
- Helps users manage savings and financial goals
- Tech: React, TypeScript, Tailwind CSS, Gemini API
- Designed to be responsive and easy to understand

Xander AI
- Python voice assistant for hands-free computing
- Uses speech recognition and AI responses
- Focus on accessibility and productivity
- Tech: Python, SpeechRecognition, PyAudio, GPT APIs
- Live demo: https://xanderai.pythonanywhere.com

Electric Pearl Productions Website
- Role: Project Lead
- Translated Figma designs into a responsive React website
- Focus on animation fidelity and accurate UI implementation
- Managed documentation and development progress

ZSuite Tech Internship (2025)
- Built Excel/VBA automation tools for fintech data reconciliation
- Reduced manual processing time by ~70%
- Reduced errors by ~90%
- Integrated SQL queries and CSV imports with validation workflows

ResiBrands Internship (2024–2025)
- Developed automation pipelines for franchise contract generation
- Integrated forms, webhooks, and e-signature workflows
- Tools: Zapier, Juro, Cognito Forms, JSON APIs

Ope Ope No Mi
- Discord bot built with Python and discord.py
- Includes moderation tools and API integrations

Gaming E-Commerce Frontend
- Responsive online storefront UI
- Built with HTML, CSS, and JavaScript

-------------------------------------
TECHNICAL SKILLS
-------------------------------------

Languages
- Python
- JavaScript / TypeScript
- HTML / CSS
- VBA

Frameworks & Tools
- React
- React Native
- Flask

Technologies
- SQL
- APIs
- JSON
- Webhooks

Other Tools
- Git
- Excel (advanced)
- Google Workspace
- Figma
- Zapier

-------------------------------------
END OF CONTEXT
-------------------------------------
`.trim();

/* -----------------------------
   Small UI helpers
------------------------------ */

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ExternalIcon: React.FC = () => {
  return (
    <svg aria-hidden="true" className="ml-1 inline-block h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  variant = "primary",
  external,
}) => {
  const base =
    "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-extrabold transition-colors duration-200";
  const primary = "bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200";
  const secondary = "bg-white text-slate-900 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 dark:bg-slate-900/40 dark:text-white dark:border-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-800/60";
  
  const styles = variant === "primary" ? primary : secondary;
  return (
    <a
      href={href}
      className={cx(base, styles)}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
    >
      {children}
      {external ? <ExternalIcon /> : null}
    </a>
  );
};

interface PillProps {
  children: React.ReactNode;
}

const Pill: React.FC<PillProps> = ({ children }) => {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border transition-colors border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-200">
      {children}
    </span>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  id?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, id }) => {
  return (
    <div id={id} className="mb-10 text-center scroll-mt-28">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400 transition-colors">{subtitle}</p> : null}
      <div className="mt-6 h-px w-24 mx-auto bg-slate-200 dark:bg-slate-800 transition-colors" />
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="lift rounded-2xl border p-6 transition-all duration-300 bg-white border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 hover:border-sky-400/60 dark:hover:border-sky-400/60 shadow-sm dark:shadow-none">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white transition-colors">{project.title}</h3>
          <p className="font-semibold text-cyan-600 dark:text-cyan-200 transition-colors">{project.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 md:justify-end">
          {project.status ? <Pill>{project.status}</Pill> : null}
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors">{project.timeframe}</span>
        </div>
      </div>

      <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-200/90 transition-colors">{project.description}</p>

      <ul className="mt-4 space-y-2">
        {project.impact.map((item, idx) => (
          <li key={idx} className="flex gap-2 text-sm text-slate-600 dark:text-slate-200/90 transition-colors">
            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-500 dark:bg-cyan-300" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full px-3 py-1 text-xs font-semibold border transition-colors bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-950/40 dark:text-slate-200 dark:border-slate-800"
          >
            {t}
          </span>
        ))}
      </div>

      {project.links?.length ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <ButtonLink key={l.label} href={l.href} variant="secondary" external={l.external}>
              {l.label}
            </ButtonLink>
          ))}
        </div>
      ) : null}
    </article>
  );
};

interface SkillGridProps {
  groups: SkillGroup[];
}

const SkillGrid: React.FC<SkillGridProps> = ({ groups }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {groups.map((g) => (
        <div key={g.title} className="lift rounded-2xl border p-6 transition-colors bg-white border-slate-200 dark:bg-slate-900/30 dark:border-slate-800 shadow-sm dark:shadow-none">
          <h3 className="font-extrabold text-slate-900 dark:text-white transition-colors">{g.title}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {g.items.map((s) => (
              <span
                key={s}
                className="rounded-full border px-3 py-1 text-xs font-semibold transition-colors bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-950/40 dark:border-slate-800 dark:text-slate-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme || 'light');
  }, [theme]);

  const toggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 bg-white/90 border-slate-200 text-slate-600 hover:bg-white dark:bg-slate-900/90 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900 backdrop-blur-sm"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </button>
  );
};

/* -----------------------------
   Cute Floating Chat Widget (Q&A)
------------------------------ */

type ChatMsg = { role: "user" | "assistant"; text: string };

const PortfolioQAWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      text:
        "Hey! Ask me about my projects, skills, or experience. I’ll answer using only what’s on this portfolio.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, messages.length]);

  async function ask() {
    const q = input.trim();
    if (!q || loading) return;

    setLoading(true);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: q }]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = "gemini-1.5-flash";

      const prompt = `
SYSTEM:
You are a portfolio assistant. Use ONLY the provided CONTEXT. Do not invent facts.
If the question is not answered by the context, say: "I don't have that information in the portfolio content."
Be concise, friendly, and practical.

CONTEXT:
${QA_CONTEXT}

USER QUESTION:
${q}
`.trim();

      const resp = await ai.models.generateContent({
        model,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const text =
        (resp as any)?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).join("") ||
        (resp as any)?.text ||
        "I don't have that information in the portfolio content.";

      setMessages((prev) => [...prev, { role: "assistant", text }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "I can’t reach the AI model right now. If you want, ask anyway and I’ll answer based on what’s visible in the portfolio content.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-launcher" aria-live="polite">
      <div className={`chat-panel ${open ? "open" : ""}`} role="dialog" aria-label="Portfolio Q&A">
        <div className="chat-header">
          <div className="chat-title">
            <div className="chat-avatar">S</div>
            <div style={{ minWidth: 0 }}>
              <h4>Portfolio Q&A</h4>
              <p>Ask about projects, skills, impact</p>
            </div>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)} type="button" aria-label="Close chat">
            ✕
          </button>
        </div>

        <div className="chat-body" ref={bodyRef}>
          <div className="chat-hint">
            Try: “Which project shows automation?” or “What did I do at ZSuite?” or “What’s the accessibility work?”
          </div>

          {messages.map((m, idx) => (
            <div key={idx} className={`chat-row ${m.role}`}>
              <div className={`bubble ${m.role}`}>
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>
            </div>
          ))}

          {loading ? (
            <div className="chat-row assistant">
              <div className="bubble assistant">Thinking…</div>
            </div>
          ) : null}
        </div>

        <div className="chat-input">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me a question…"
              className="flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-colors border-slate-300/40 bg-[var(--chat-input-bg)] text-[var(--chat-text)] placeholder:text-[var(--chat-muted)]"
              onKeyDown={(e) => {
                if (e.key === "Enter") ask();
              }}
            />
            <button
              onClick={ask}
              disabled={loading}
              className="rounded-xl px-4 py-2 text-sm font-extrabold text-white disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, var(--chat-accent-1), var(--chat-accent-2))" }}
              type="button"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <button
        className="chat-fab"
        onClick={() => setOpen((v) => !v)}
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        title={open ? "Close chat" : "Ask me anything"}
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
};

/* -----------------------------
   Main App
------------------------------ */

const App: React.FC = () => {
  const [filter, setFilter] = useState<ProjectKind | "All">("All");

  const filteredProjects = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.kind === filter);
  }, [filter]);

  const navLinks = useMemo(
    () => [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Leadership", href: "#leadership" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  return (
    <div className="min-h-screen transition-colors text-slate-900 dark:text-slate-200">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur transition-colors border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-extrabold tracking-tight text-lg transition-colors text-slate-900 dark:text-white">
            {PROFILE.name}
            <span className="text-cyan-500 dark:text-cyan-300">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-cyan-600 dark:hover:text-cyan-200 transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden sm:flex gap-2">
                <ButtonLink href={PROFILE.links.resume} variant="secondary" external>
                  Resume
                </ButtonLink>
                <ButtonLink href={PROFILE.links.linkedin} variant="primary" external>
                  LinkedIn
                </ButtonLink>
             </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="top" className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <div className="rounded-3xl border p-8 md:p-12 transition-colors bg-white/60 border-slate-200 dark:bg-slate-900/30 dark:border-slate-800 shadow-sm dark:shadow-none">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image Column */}
            <div className="flex-shrink-0 w-64 h-80 md:w-72 md:h-96 relative group mx-auto lg:mx-0">
               {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              {/* Actual Image */}
              <div className="relative z-10 w-full h-full rounded-3xl border-2 border-white/50 dark:border-slate-700/50 shadow-2xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img 
                  src={PROFILE.image} 
                  alt={PROFILE.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="flex flex-col gap-6 flex-1 text-center lg:text-left">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <Pill>{PROFILE.location}</Pill>
                <Pill>Automation</Pill>
                <Pill>Web Development</Pill>
                <Pill>AI + Accessibility</Pill>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors">
                <span className="gradient-text">Automation</span> + Web Experiences built with empathy.
              </h1>

              <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-slate-600 dark:text-slate-200/90 transition-colors">
                {HERO.subhead}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <ButtonLink href="#projects" variant="primary">
                  View Projects
                </ButtonLink>
                <ButtonLink href="#contact" variant="secondary">
                  Get in Touch
                </ButtonLink>
              </div>
            </div>
          </div>
          
          {/* Hero Footer Info */}
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm transition-colors border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-phone text-cyan-500/50"></i> {PROFILE.phone}
              </span>
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-envelope text-cyan-500/50"></i> {PROFILE.email}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end font-semibold">
              <a
                href={PROFILE.links.linkedin}
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn
              </a>
              <a
                href={PROFILE.links.resume}
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
                target="_blank"
                rel="noreferrer noopener"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <SectionHeader id="about" title="About" subtitle="What I care about and how I build." />
        <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0 w-48 h-48 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden bg-slate-200 dark:bg-slate-800 ring-8 ring-slate-100 dark:ring-slate-900/50">
             <img 
               src={PROFILE.image} 
               alt={PROFILE.name} 
               className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
             />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="leading-relaxed text-lg text-slate-700 dark:text-slate-200/90 transition-colors">{ABOUT}</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <SectionHeader id="skills" title="Skills" subtitle="Tools I use to ship reliable, readable work." />
        <SkillGrid groups={SKILLS} />
      </section>

      {/* Projects + Filter */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <SectionHeader id="projects" title="Projects" subtitle="Featured work, professional experience, and builds." />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(["All", "Featured", "Experience", "Project"] as const).map((k) => {
            const active = filter === k;
            return (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={cx(
                  "rounded-full px-5 py-2.5 text-sm font-extrabold border transition-all duration-200",
                  active
                    ? "bg-cyan-500 text-white border-cyan-600 shadow-lg shadow-cyan-500/20 dark:bg-cyan-300 dark:text-slate-950 dark:border-cyan-200"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-900/30 dark:text-slate-200 dark:border-slate-800 dark:hover:border-slate-600"
                )}
                type="button"
              >
                {k}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6">
          {filteredProjects.map((p) => (
            <ProjectCard key={`${p.kind}-${p.title}`} project={p} />
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <SectionHeader id="leadership" title="Leadership & Community" />
        <div className="grid gap-6 md:grid-cols-2">
          {LEADERSHIP.map((l) => (
            <div key={l.org} className="lift rounded-2xl border p-6 transition-colors bg-white border-slate-200 dark:bg-slate-900/30 dark:border-slate-800 shadow-sm dark:shadow-none">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white transition-colors">{l.org}</h3>
                  <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-200 transition-colors">{l.role}</p>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors">{l.period}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-200/90 transition-colors">{l.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-14 scroll-mt-28">
        <SectionHeader title="Contact" subtitle="Open to internships, collaborations, and technical opportunities." />
        <div className="mx-auto max-w-3xl rounded-3xl border p-12 text-center transition-colors bg-white/60 border-slate-200 dark:bg-slate-900/30 dark:border-slate-800 shadow-sm dark:shadow-none">
          <p className="leading-relaxed text-xl text-slate-700 dark:text-slate-200/90 transition-colors mb-8">
            Want to talk automation, web apps, or accessibility-first tools? Let's connect.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href={`mailto:${PROFILE.email}`} variant="primary">
              <i className="fa-solid fa-envelope mr-2"></i> Email Me
            </ButtonLink>
            <ButtonLink href={PROFILE.links.linkedin} variant="secondary" external>
              <i className="fa-brands fa-linkedin mr-2"></i> LinkedIn
            </ButtonLink>
            <ButtonLink href={PROFILE.links.resume} variant="secondary" external>
              <i className="fa-solid fa-file-pdf mr-2"></i> Resume
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t backdrop-blur transition-colors bg-white/50 border-slate-200 dark:bg-slate-950/40 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="font-semibold text-slate-600 dark:text-slate-300 transition-colors">
            Built with React + TypeScript + Tailwind. Focused on human outcomes.
          </p>
          <p className="mt-3">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <PortfolioQAWidget />
      
      {/* Floating Theme Toggle (Bottom Left) */}
      <ThemeToggle />
    </div>
  );
};

/* -----------------------------
   Render
------------------------------ */
const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Missing #root element. Check index.html.");
createRoot(rootEl).render(<App />);
