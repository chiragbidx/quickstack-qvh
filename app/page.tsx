// Server Component: keep layout/content server-rendered.
// Client-only island (uses useState) is imported below; avoids marking this page "use client".
import { AgentActionPanel } from "../components/AgentActionPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-[#ffe6d8] text-zinc-900">
      <main className="flex min-h-screen w-full flex-col gap-12 px-6 py-12 sm:px-10 lg:px-16 lg:max-w-[1600px] lg:mx-auto">
        {/* Header: Panda wordmark and primary actions (docs/deploy); wraps on small screens */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-[#fb7232]/30 bg-white px-5 py-2 shadow-sm">
              <span className="text-2xl font-black tracking-tight text-[#fb7232]">Panda</span>
            </div>
            <p className="text-sm font-medium text-[#c75829] sm:text-base">
              Lightweight SaaS starter ready to ship.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end w-full sm:w-auto">
            <a
              href="https://nextjs.org/docs"
              className="w-full sm:w-auto text-center rounded-full border border-[#fb7232]/30 bg-white px-4 py-2 text-sm font-semibold text-[#c75829] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Docs
            </a>
            <a
              href="https://vercel.com/new"
              className="w-full sm:w-auto text-center rounded-full bg-[#fb7232] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md"
            >
              Deploy
            </a>
          </div>
        </header>

        {/* Hero: value prop + call-to-actions alongside feature highlight cards */}
        <section className="grid min-h-[520px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232] shadow-sm">
              Simple Panda Stack
            </p>
            <h1 className="text-4xl font-black leading-tight text-[#3f1b08] sm:text-5xl">
              Build and launch faster with a calm, opinionated starting point.
            </h1>
            <p className="max-w-3xl text-lg leading-7 text-zinc-700">
              The Panda starter pairs clean defaults with sensible layout decisions so you can focus on product, not plumbing. Fully responsive, accessible, and easy to extend.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap sm:gap-4 w-full">
              <a
                href="#features"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-[#fb7232] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md"
              >
                Explore features
              </a>
              <a
                href="#cta"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-[#fb7232]/30 bg-white px-5 py-3 text-sm font-semibold text-[#c75829] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                See how it works
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#fb7232]/30 bg-white shadow-md">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffe7dd] via-white to-[#ffd9c6] opacity-70" aria-hidden />
            <div className="relative grid gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-[#fb7232]/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#fb7232]">Launch</p>
                <p className="mt-2 text-base font-semibold text-[#4b1f0a]">Zero-fuss deploys</p>
                <p className="text-sm text-zinc-600">Prewired for Vercel with environment helpers and sane defaults.</p>
              </div>
              <div className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-[#fb7232]/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#fb7232]">Design</p>
                <p className="mt-2 text-base font-semibold text-[#4b1f0a]">Responsive by default</p>
                <p className="text-sm text-zinc-600">Layout stretches the full viewport while keeping breathable spacing.</p>
              </div>
              <div className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-[#fb7232]/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#fb7232]">Code</p>
                <p className="mt-2 text-base font-semibold text-[#4b1f0a]">Type-safe stack</p>
                <p className="text-sm text-zinc-600">Next.js App Router, TypeScript, ESLint, and formatting baked in.</p>
              </div>
              <div className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-[#fb7232]/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#fb7232]">Speed</p>
                <p className="mt-2 text-base font-semibold text-[#4b1f0a]">Ready in minutes</p>
                <p className="text-sm text-zinc-600">Opinionated setup trims decisions so you can ship faster.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Agent note: client island example (see AgentActionPanel) to store quick instructions */}
        <section className="rounded-2xl border border-[#fb7232]/20 bg-white/80 px-6 py-8 shadow-sm sm:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232]">Agent note</p>
              <h3 className="text-xl font-bold text-[#341404]">Keep a quick instruction handy</h3>
              <p className="text-sm text-[#6a3515]">
                Use this client-side panel to stash a note for future agent runs. It shows how to add interactive islands without converting the whole page to a client component.
              </p>
            </div>
            <div className="w-full max-w-xl">
              <AgentActionPanel />
            </div>
          </div>
        </section>

        {/* Footer-style CTA: condensed link lists + reassurance line */}
        <section
          id="cta"
          className="rounded-2xl border border-[#fb7232]/15 bg-gradient-to-br from-white via-[#fff5ee] to-white px-6 py-12 text-[#33170a] shadow-sm sm:px-12"
        >
          <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232]">Panda starter</p>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Stay lightweight. Launch confidently.</h2>
              <p className="text-base text-[#6a3515]">
                A calm base with generous spacing, clear typography, and production-friendly defaults so you can focus on your product.
              </p>
            </div>

            <div className="grid gap-4 rounded-xl border border-[#fb7232]/20 bg-white/80 p-6 text-sm shadow-sm sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c75829]">Product</p>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="https://nextjs.org/docs">
                  Docs
                </a>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="#features">
                  Features
                </a>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="https://vercel.com/templates">
                  Templates
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c75829]">Resources</p>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="https://vercel.com/changelog">
                  Changelog
                </a>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="https://github.com/">
                  GitHub
                </a>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="mailto:hello@example.com">
                  Support
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center border-t border-[#fb7232]/15 pt-6 text-center text-xs text-[#6a3515]">
            <span>Built with the Panda starter • MIT licensed • Ready for your next launch</span>
          </div>
        </section>
      </main>
    </div>
  );
}
