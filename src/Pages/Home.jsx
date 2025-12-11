import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";

// ----- COMPONENTS -----

const StatusBadge = memo(() => (
  <div className="inline-block animate-float" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text text-sm font-medium flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Frontend
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ onClick, text, icon: Icon }) => (
  <button onClick={onClick} className="group relative w-[160px]">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
    <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden">
      <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm transition-all duration-300 group-hover:gap-3">
        <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium">
          {text}
        </span>
        <Icon
          className={`w-4 h-4 text-gray-200 transition-all duration-300 ${
            text === "Contact" ? "group-hover:translate-x-1" : "group-hover:rotate-45"
          }`}
        />
      </span>
    </div>
  </button>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// ----- CONSTANTS -----
const WORDS = ["Information security & Software development", "Tech Enthusiast"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/aqshal1311" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/ahalief" },
  { icon: Instagram, link: "https://www.instagram.com/ah_alief" }
];

// ----- MAIN HOME COMPONENT -----

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Smooth scroll
  const smoothScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
  }, []);

  useEffect(() => setIsLoaded(true), []);

  const handleTyping = useCallback(() => {
    const currentWord = WORDS[wordIndex];

    if (isTyping) {
      if (charIndex < currentWord.length) {
        setText((prev) => prev + currentWord[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), 1500);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? 100 : 50);
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <div id="Home" className="min-h-screen bg-[#030014] px-[5%] lg:px-[10%] overflow-hidden">
      <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

        <div className="container mx-auto flex flex-col lg:flex-row items-center h-screen justify-between">

          {/* LEFT */}
          <div className="w-full lg:w-1/2 space-y-6" data-aos="fade-right">
            <StatusBadge />
            <MainTitle />

            {/* Typing */}
            <div className="flex items-center h-8">
              <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                {text}
              </span>
              <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
            </div>

            <p className="text-gray-400 max-w-xl leading-relaxed">
              Menciptakan Website Yang Inovatif, Fungsional, dan User-Friendly untuk Solusi Digital.
            </p>

            {/* Tech List */}
            <div className="flex flex-wrap gap-3">
              {TECH_STACK.map((t, i) => <TechStack key={i} tech={t} />)}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <CTAButton text="Projects" icon={ExternalLink} onClick={() => smoothScrollTo("Portofolio")} />
              <CTAButton text="Contact" icon={Mail} onClick={() => smoothScrollTo("Contact")} />
            </div>

            {/* Social */}
            <div className="hidden sm:flex gap-4">
              {SOCIAL_LINKS.map((s, i) => <SocialLink key={i} {...s} />)}
            </div>
          </div>

          {/* RIGHT — ANIMATED ORB + LOTTIE */}
          <div className="relative w-full lg:w-1/2 h-[470px] sm:h-[550px] flex items-center justify-center mt-10 lg:mt-0"
            data-aos="fade-left"
          >
            <div className="absolute w-[340px] h-[340px] rounded-full bg-gradient-to-br from-purple-600/30 via-indigo-500/20 to-blue-500/30 blur-3xl animate-pulse-slow"></div>

            <div className="absolute w-[300px] h-[300px] border border-purple-400/30 rounded-full animate-spin-slower"></div>

            <div className="absolute w-[350px] h-[350px] border border-indigo-400/20 rounded-full animate-float"></div>

            <DotLottieReact
              src="https://lottie.host/45ecdd4c-2af1-4d06-ae13-157a4a204c76/wN7MhDkQNE.lottie"
              autoplay
              loop
              className="relative w-[260px]"
            />
          </div>

        </div>
      </div>

      {/* ----- ANIMATIONS ----- */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes rotate-slow {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.45; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slower { animation: rotate-slow 14s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default memo(Home);
