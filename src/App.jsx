import React, { useEffect, useMemo, useState } from "react";
import { Github, Linkedin, Mail, MapPin, Globe, ExternalLink, ChevronRight, Send } from "lucide-react";

// =============================
// CONFIGURAÇÃO — personalize aqui
// =============================
const config = {
  nome: "Pedro Ferreira Simões",
  titulo: "Computer Engineering Student",
  resumo:
    "Aspiring software engineer passionate about technology, teamwork, and innovation.",
  localizacao: "Pombal, Portugal",
  email: "pfs.pedrosimoes@gmail.com",
  telefone: "+351 961018935",
  foto: "/Foto_eu.jpg", // coloque aqui uma foto sua (URL) se quiser
  sociais: {
    github: "https://github.com/pedrofsimoes7",
    linkedin: "https://www.linkedin.com/in/pedro-simões-b8aaaa349/",
  },
  // Para receber mensagens no seu email sem backend próprio, crie um formulário no Formspree.io e coloque o endpoint abaixo (ex: "https://formspree.io/f/abcdwxyz")
  formspreeEndpoint: "https://formspree.io/f/movnokvq",
  // Paleta — opcional: mude as cores
  corPrimaria: "from-zinc-900 to-neutral-800",
};

// =============================
// Utilidades simples
// =============================
const cx = (...classes) => classes.filter(Boolean).join(" ");

const Card = ({ children, className = "" }) => (
  <div className={cx("rounded-2xl border border-black/5 shadow-sm bg-white/80 backdrop-blur p-6 text-gray-900", className)}>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-block rounded-full border px-3 py-1 text-xs font-medium bg-white/70 border-black/5">
    {children}
  </span>
);

// =============================
// "Router" leve por hash (#/)
// =============================
const useHashRoute = () => {
  const [route, setRoute] = useState(() => window.location.hash.replace("#", "") || "/");
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [route, (to) => (window.location.hash = to)];
};

const NavLink = ({ to, children, active }) => (
  <a
    href={`#${to}`}
    className={cx(
      "px-3 py-2 rounded-xl text-sm font-medium transition", active ? "bg-white text-black" : "text-white hover:bg-white/10"
    )}
  >
    {children}
  </a>
);

const Header = ({ route }) => (
  <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/50 border-b border-white/10">
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <a href="#/" className="font-semibold tracking-tight text-white">{config.nome}</a>
        <nav className="flex gap-1">
          <NavLink to="/" active={route === "/"}>Home</NavLink>
          <NavLink to="/about" active={route === "/about"}>About</NavLink>
          <NavLink to="/projects" active={route === "/projects"}>Projects</NavLink>
          <NavLink to="/faq" active={route === "/faq"}>FAQ</NavLink>
        </nav>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative overflow-hidden">
    <div className={cx("absolute inset-0 -z-10 bg-gradient-to-br", config.corPrimaria)} />
    <div className="max-w-5xl mx-auto px-4 py-20 text-white">
      <div className="grid md:grid-cols-[auto,1fr] items-center gap-8">
        <div>
          <div className="w-28 h-28 rounded-2xl overflow-hidden ring-2 ring-white/40 shadow-xl bg-white/10">
            {config.foto ? (
              <img src={config.foto} alt={config.nome} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">👋</div>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">{config.nome}</h1>
          <p className="mt-3 text-lg md:text-xl opacity-95">{config.titulo}</p>
          <p className="mt-6 max-w-2xl opacity-95">{config.resumo}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
  <a
    href="#/projects"
    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-xl bg-white text-black px-4 py-3 font-medium shadow font-luxury"
  >
    View projects <ChevronRight size={18} />
  </a>
  <a
    href="#/about"
    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-xl border border-white/40 px-4 py-3 font-medium font-luxury"
  >
    About me
  </a>
</div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm opacity-90">
            <span className="inline-flex items-center gap-2"><MapPin size={16} /> {config.localizacao}</span>
            <a className="inline-flex items-center gap-2 underline" href={`mailto:${config.email}`}><Mail size={16} /> {config.email}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const About = () => (
  <main className="max-w-5xl mx-auto px-4 py-12">
    <div className="grid md:grid-cols-[1fr,1.2fr] gap-8">
      {/* Card — About me */}
      <Card>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight font-luxury-heading">
          About me
        </h2>
        <p className="mt-3 leading-relaxed">
          I am a 3rd-year Computer Engineering student at the Polytechnic Institute of Castelo Branco. 
          I successfully completed an Erasmus+ semester in Poland, which strengthened my adaptability to different cultural 
          and professional contexts and improved my teamwork and problem-solving skills.
          I also have experience volunteering at public and sports events and have participated in technology
          initiatives such as the Global Game Jam. I’m looking for opportunities to apply my academic knowledge,
          learn quickly, and contribute actively to the teams I join.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Python","Java","C++","JavaScript","Django","HTML","CSS","React","Node.js","Next.js","PostgreSQL","Tailwind CSS","Unity","Databases","Microsoft Office"].map(s => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          {config.sociais.github && (
            <a className="inline-flex items-center gap-2 underline" href={config.sociais.github} target="_blank" rel="noreferrer">
              <Github size={18} /> GitHub
            </a>
          )}
          {config.sociais.linkedin && (
            <a className="inline-flex items-center gap-2 underline" href={config.sociais.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} /> LinkedIn
            </a>
          )}
          {config.sociais.site && (
            <a className="inline-flex items-center gap-2 underline" href={config.sociais.site} target="_blank" rel="noreferrer">
              <Globe size={18} /> Site
            </a>
          )}
        </div>
      </Card>

      {/* Coluna direita */}
      <div className="grid gap-6">
        <Card>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight font-luxury-heading">
            Experience
          </h3>
          <ul className="mt-3 space-y-4">
            <li>
              <div className="flex items-center justify-between">
                <p className="font-medium">Volunteering — Public & Sports Events</p>
                <span className="text-sm opacity-60">2019 — Current</span>
              </div>
              <p className="text-sm mt-1 opacity-90">
                Team assistance during public/sports events; collaboration, responsibility, and communication under time constraints.
              </p>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <p className="font-medium">Global Game Jam — Participant</p>
                <span className="text-sm opacity-60">2024 — 2025</span>
              </div>
              <p className="text-sm mt-1 opacity-90">
                Rapid prototyping with Unity/Unreal; teamwork and scope management within strict deadlines.
              </p>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <p className="font-medium">Erasmus+ — International teamwork</p>
                <span className="text-sm opacity-60">2025</span>
              </div>
              <p className="text-sm mt-1 opacity-90">
                Cross-cultural collaboration and project work in English (Distributed Systems, Web Dev, HCI, Data Structures).
              </p>
            </li>
          </ul>
        </Card>

        <Card>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight font-luxury-heading">
            Education & Certifications
          </h3>
          <ul className="mt-3 list-disc list-inside text-sm leading-relaxed opacity-90">
            <li><span className="font-medium">B.Sc. in Computer Engineering</span> — Polytechnic Institute of Castelo Branco (2023 — Present).  
              Focus on programming, software development, databases, algorithms, OOP and web technologies.</li>
            <li><span className="font-medium">Erasmus+ Semester in Computer Science</span> — Białystok University of Technology, Poland (Spring 2025).  
              Courses in distributed systems, web development, human-computer interaction, and data structures.</li>
            <li><span className="font-medium">HackerRank</span> — Certificate of Accomplishment (2025).  
            Python(Basic). https://www.hackerrank.com/certificates/iframe/a7cc47f70cd4</li>
          </ul>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold tracking-tight">Skills</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Teamwork","Effective communication","Adaptability","Time management","Problem solving","Proactivity","Ethics & commitment"].map(s => <Badge key={s}>{s}</Badge>)}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold tracking-tight">Languages</h3>
          <ul className="mt-3 text-sm leading-relaxed opacity-90">
            <li>Portuguese — Native</li>
            <li>English — Intermediate (understanding and effective communication in academic/professional contexts)</li>
            <li>Spanish — Basic (understanding)</li>
          </ul>
        </Card>
      </div>
    </div>
  </main>
);


const ProjectCard = ({ title, description, tags = [], repo }) => (
  <Card>
    <div className="flex items-start justify-between gap-6">
      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="mt-1 text-sm opacity-90">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (<Badge key={t}>{t}</Badge>))}
        </div>
      </div>
      <div className="flex flex-col gap-2 shrink-0">
        {repo && (
          <a
            className="inline-flex items-center gap-1 underline"
            href={repo}
            target="_blank"
            rel="noreferrer"
          >
            Code <Github size={16} />
          </a>
        )}
      </div>
    </div>
  </Card>
);

const Projects = () => {
  const projects = useMemo(() => [
    {
      title: "StoreEverything",
      description:
        "Spring Boot CRUD app to store and manage items. MVC structure with templates, static assets and persistence.",
      tags: ["Java", "Spring Boot", "HTML", "CSS"],
      repo: "https://github.com/pedrofsimoes7/StoreEverything",
    },
    {
      title: "home_budget",
      description:
        "Personal finance web app built with Django: authentication, categories/entries and simple reports.",
      tags: ["Python", "Django", "HTML", "CSS"],
      repo: "https://github.com/pedrofsimoes7/home_budget",
    },
    {
      title: "travel_agency",
      description:
        "My very first front-end page using only HTML/CSS. Includes responsive layout, gallery and embedded video.",
      tags: ["HTML", "CSS", "Responsive"],
      repo: "https://github.com/pedrofsimoes7/travel_agency",
    },
    {
      title: "Global Game Jam",
      description:
        "48-hour challenge and my very first contact with Unity. Collaborated with a small team to deliver a working prototype.",
      tags: ["Unity", "Game Jam", "Teamwork"],
      repo: "https://github.com/pedrofsimoes7/GlobalGameJam", // se tiveres link direto para o repo/jogo, mete aqui
    },
  ], []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
          Featured projects
        </h2>
        <a
          href={config.sociais.github}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex justify-center items-center gap-2 underline"
        >
          <Github size={18} /> View all on GitHub
        </a>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (<ProjectCard key={p.title} {...p} />))}
      </div>
    </main>
  );
};


// substitui TODO o componente FAQ por este
const FAQ = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!config.formspreeEndpoint) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch(config.formspreeEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }, // prevents redirect
      });
      if (res.ok) { setStatus("success"); form.reset(); }
      else {
        const j = await res.json().catch(() => ({}));
        setErrorMsg(j?.errors?.[0]?.message || "Could not send. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection.");
      setStatus("error");
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <Card>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
        <details className="mt-4 group">
          <summary className="cursor-pointer font-medium">Are you available for new opportunities?</summary>
          <p className="mt-2 text-sm opacity-90">Yes — send me some details and a timeframe.</p>
        </details>
        <details className="mt-3 group">
          <summary className="cursor-pointer font-medium">What technologies do you use daily?</summary>
          <p className="mt-2 text-sm opacity-90">Mainly Python, Java, C++, HTML/CSS, and game engines (Unity/Unreal).</p>
        </details>
      </Card>

      <Card className="mt-6">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact me</h3>

        {!config.formspreeEndpoint && (
          <div className="mt-2 text-sm opacity-90">
            Add your Formspree endpoint in <code>config.formspreeEndpoint</code> to enable the form.
          </div>
        )}

        {config.formspreeEndpoint && status === "success" && (
          <div className="mt-4 rounded-xl border border-green-600/30 bg-green-600/10 px-4 py-3 text-sm">
            ✅ Message sent. Thanks! I’ll get back to you soon.
          </div>
        )}

        {config.formspreeEndpoint && status !== "success" && (
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-1">
              <label className="text-sm font-medium">Name</label>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-neutral-500/40 bg-white/70 px-4 py-3 text-base
                           focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                placeholder="Your name"
              />
            </div>

            <div className="md:col-span-1">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-xl border border-neutral-500/40 bg-white/70 px-4 py-3 text-base
                           focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                placeholder="you@example.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Message</label>
              <textarea
                name="message"
                rows={6}
                required
                className="mt-1 w-full rounded-xl border border-neutral-500/40 bg-white/70 px-4 py-3 text-base
                           focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                placeholder="How can I help?"
              />
            </div>

            {status === "error" && (
              <p className="md:col-span-2 text-sm text-red-600">{errorMsg}</p>
            )}

            {/* simple honeypot */}
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="md:col-span-2 flex justify-center">
              <button
                disabled={status === "loading"}
                className="w-full md:w-auto inline-flex items-center gap-2 rounded-xl bg-black text-white px-6 py-3 font-medium
                           hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white/70 disabled:opacity-60"
              >
                <Send size={18} /> {status === "loading" ? "Sending…" : "Send"}
              </button>
            </div>
          </form>
        )}
      </Card>
    </main>
  );
};



const Footer = () => (
  <footer className="mt-auto py-4 bg-neutral-900 border-t border-white/10">
    <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center gap-2 text-sm text-white text-center">
      <p>© {new Date().getFullYear()} {config.nome}. Todos os direitos reservados.</p>
      <div className="flex items-center gap-4">
        {config.sociais.github && (
          <a className="inline-flex items-center gap-1 underline text-white" href={config.sociais.github} target="_blank" rel="noreferrer">
            <Github size={16} /> GitHub
          </a>
        )}
        {config.sociais.linkedin && (
          <a className="inline-flex items-center gap-1 underline text-white" href={config.sociais.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={16} /> LinkedIn
          </a>
        )}
        <a className="inline-flex items-center gap-1 underline text-white" href={`mailto:${config.email}`}>
          <Mail size={16} /> Email
        </a>
      </div>
    </div>
  </footer>
);

// =============================
// APP
// =============================
export default function PortfolioSite() {
const [route] = useHashRoute();


return (
<div className="min-h-screen flex flex-col bg-neutral-950 text-white font-luxury">
<Header route={route} />
{route === "/" && (
<>
<Hero />
<About />
<Projects/>
</>
)}
{route === "/about" && <About />}
{route === "/projects" && <Projects />}
{route === "/faq" && <FAQ />}
<Footer />
</div>
);
}
