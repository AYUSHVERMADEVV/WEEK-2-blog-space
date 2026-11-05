import React from "react";
import { Link } from "react-router-dom";
import { 
  Feather, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  PenSquare, 
  Compass, 
  ArrowRight,
  Database,
  Coffee,
  CheckCircle2
} from "lucide-react";

export default function AboutPage() {
  const editorialPillars = [
    {
      title: "Depth Over Clickbait",
      description:
        "We reject algorithmic outrage cycles, shallow listicles, and sensationalized headlines. Every story published on BlogSpace is created to inform, inspire, and provide intellectual substance."
    },
    {
      title: "Tactile Reading Experience",
      description:
        "Typography is not an afterthought; it is the soul of comprehension. We pair high-contrast editorial serifs with calm, off-white negative space to ensure an effortless, strain-free reading session."
    },
    {
      title: "Privacy & Local Autonomy",
      description:
        "Your stories belong to you. BlogSpace operates entirely client-side using browser LocalStorage. No tracking pixels, no intrusive paywalls, and no data harvesting."
    }
  ];

  const writingGuidelines = [
    "Ground claims in direct observation, authentic research, or personal craftsmanship.",
    "Structure long-form essays with clear conceptual subheadings and intentional pacing.",
    "Embrace concise, evocative language rather than marketing jargon or AI buzzwords.",
    "Respect the reader's attention by cutting unnecessary fluff."
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
      
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-500">
          <Feather className="w-3.5 h-3.5 text-blue-700" />
          <span>About BlogSpace</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.12]">
          An independent sanctuary for long-form thought.
        </h1>
        <p className="text-base sm:text-lg text-stone-600 font-serif leading-relaxed">
          Founded as an antidote to fleeting social feeds, BlogSpace provides a clean, distraction-free publication environment where writers and thinkers articulate ideas that stand the test of time.
        </p>
      </section>

      {/* Origin Story / Manifesto */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-8 sm:p-12 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-700">
          <span>The Platform Manifesto</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Why we built BlogSpace
        </h2>
        <div className="space-y-4 text-stone-700 font-serif text-base sm:text-lg leading-relaxed">
          <p>
            The modern internet is saturated with noise. Short-form video snippets and algorithm-optimized headlines compete for micro-seconds of our attention, leaving readers intellectually drained and writers pressured to produce disposable reactions.
          </p>
          <p>
            BlogSpace was conceived with a radically simple premise: <span className="font-semibold text-stone-900">good writing requires room to breathe</span>. Whether you are an architect analyzing how light shapes human wellness, a software engineer contemplating tactile analogue tools, or a craftsperson reflecting on the patience of the potter's wheel, your ideas deserve an elegant, uncluttered stage.
          </p>
          <p>
            Inspired by classic editorial traditions—from <em>The Paris Review</em> to modern long-form publications like <em>Medium</em>—we designed BlogSpace to feel like opening a beautifully bound volume.
          </p>
        </div>
      </section>

      {/* Three Core Pillars */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Guiding Values
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
            Our Editorial Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {editorialPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200/80 rounded-xl p-6 sm:p-8 space-y-3 hover:border-stone-300 transition-colors"
            >
              <span className="text-xs font-mono text-stone-400">0{idx + 1}.</span>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                {pillar.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Writing Guidelines for Contributors */}
      <section className="bg-[#F4F1EA] border border-stone-200 rounded-2xl p-8 sm:p-12 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Publish With Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Writing Guidelines for Contributors
          </h2>
          <p className="text-sm text-stone-600 max-w-xl">
            Anyone with a story or thoughtful perspective is welcomed to publish on BlogSpace. Here is how we maintain a high standard of editorial excellence:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {writingGuidelines.map((item, index) => (
            <div key={index} className="flex items-start gap-3 bg-white/70 p-4 rounded-xl border border-stone-200/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-sm text-stone-800 leading-snug">{item}</span>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-full transition-all shadow-xs"
          >
            <PenSquare className="w-4 h-4" />
            <span>Draft Your First Article</span>
          </Link>
        </div>
      </section>

      {/* Platform Architecture & Technology */}
      <section className="border-t border-stone-200 pt-12 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Technical Architecture
          </span>
          <h3 className="text-xl font-serif font-bold text-stone-900">
            Built with modern React and web standards
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
            BlogSpace is crafted using standard React components, React Router DOM for seamless client-side navigation, Vite for rapid build times, modern CSS with Tailwind typography, and browser LocalStorage for instantaneous, private offline persistence.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-stone-600">
          <div className="bg-white p-3 rounded-lg border border-stone-200">
            <span className="text-stone-400 block mb-1">Framework</span>
            <span className="font-bold text-stone-900">React.js 19</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-stone-200">
            <span className="text-stone-400 block mb-1">Routing</span>
            <span className="font-bold text-stone-900">React Router DOM</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-stone-200">
            <span className="text-stone-400 block mb-1">Persistence</span>
            <span className="font-bold text-stone-900">Browser LocalStorage</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-stone-200">
            <span className="text-stone-400 block mb-1">Styling</span>
            <span className="font-bold text-stone-900">Tailwind CSS 4</span>
          </div>
        </div>
      </section>

    </div>
  );
}
