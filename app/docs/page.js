"use client";

import { useState } from "react";
import { CATEGORIES, ENDPOINTS, SITE } from "@/lib/apiCatalog";
import {
  IcDownload, IcUpload, IcSpark, IcSearch, IcTool,
  IcChevDown, IcChevUp, IcCopy, IcCheck, IcArrow, IcLayers
} from "@/components/Icons";

const CAT_ICON  = { d: IcDownload, u: IcUpload, ai: IcSpark, s: IcSearch, t: IcTool };
const CAT_COLOR = {
  d:  "from-cyan-400 to-cyan-600",
  u:  "from-orange-400 to-orange-600",
  ai: "from-violet-400 to-violet-600",
  s:  "from-teal-400 to-teal-600",
  t:  "from-slate-400 to-slate-600"
};
const CAT_SOFT  = {
  d: "bg-cyan-50 text-cyan-700 border-cyan-200",
  u: "bg-orange-50 text-orange-600 border-orange-200",
  ai:"bg-violet-50 text-violet-700 border-violet-200",
  s: "bg-teal-50 text-teal-700 border-teal-200",
  t: "bg-slate-50 text-slate-600 border-slate-200"
};

function CopyBtn({ text }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1800); } catch {}
  }
  return (
    <button onClick={copy} className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white">
      {done ? <IcCheck s={12} /> : <IcCopy s={12} />}
    </button>
  );
}

function CodeBox({ label, code }) {
  return (
    <div className="overflow-hidden rounded-xl bg-ink">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-mono text-[9.5px] uppercase tracking-widest text-white/40">{label}</span>
        <CopyBtn text={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[11px] leading-relaxed text-cyan-100 whitespace-pre-wrap break-all">{code}</pre>
    </div>
  );
}

function buildCurl(ep) {
  const base = `${SITE.baseUrl}${ep.path}`;
  if (ep.method === "POST") {
    const parts = (ep.body || []).map(f => `-F "${f.name}=@${f.example || f.name}"`);
    return `curl -X POST "${base}" \\\n  ${parts.join(" \\\n  ")}`;
  }
  const qs = (ep.params || []).map(f => `${f.name}=${encodeURIComponent(f.example || "")}`).join("&");
  return `curl "${base}${qs ? "?" + qs : ""}"`;
}

function buildSample(ep) {
  if (ep.responseType === "image") return "// Mengembalikan berkas gambar (image/png) langsung, bukan JSON.";
  return JSON.stringify({ status: 200, success: true, creator: "RAFZ API", result: ep.sampleResult || {} }, null, 2);
}

function EndpointRow({ ep }) {
  const [open, setOpen] = useState(false);
  const fields = ep.params || ep.body || [];
  const soft = CAT_SOFT[ep.category] || CAT_SOFT.t;

  return (
    <div id={`${ep.category}-${ep.slug}`} className="scroll-mt-32 border-b border-border last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-bg"
      >
        <span className={`shrink-0 rounded-lg px-2 py-0.5 font-mono text-[10px] font-bold ${ep.method === "GET" ? "bg-cyan-50 text-cyan-700" : "bg-orange-50 text-orange-600"}`}>
          {ep.method}
        </span>
        <div className="min-w-0 flex-1">
          <span className="block truncate font-mono text-[12.5px] font-semibold text-ink">{ep.path}</span>
          <span className="block truncate text-[11.5px] text-muted">{ep.name}</span>
        </div>
        <span className="shrink-0 text-muted">{open ? <IcChevUp s={15} /> : <IcChevDown s={15} />}</span>
      </button>

      {open && (
        <div className="border-t border-border bg-white px-5 pb-6 pt-5 animate-fade-up">
          <p className="mb-5 text-[12.5px] leading-relaxed text-muted">{ep.description}</p>

          {/* Params table */}
          {fields.length > 0 && (
            <div className="mb-5">
              <p className="mb-2 font-display text-[11px] font-bold uppercase tracking-wider text-ink">
                {ep.method === "POST" ? "Form Data" : "Query Parameter"}
              </p>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-[11.5px]">
                  <thead className="border-b border-border bg-bg">
                    <tr>
                      {["Nama","Tipe","Wajib","Contoh"].map(h => (
                        <th key={h} className="px-3 py-2 font-semibold text-muted">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {fields.map(f => (
                      <tr key={f.name}>
                        <td className="px-3 py-2 font-mono font-semibold text-ink">{f.name}</td>
                        <td className="px-3 py-2 text-muted">{f.type}</td>
                        <td className="px-3 py-2">{f.required ? <span className="font-semibold text-orange-500">Ya</span> : <span className="text-muted">Tidak</span>}</td>
                        <td className="px-3 py-2 font-mono text-muted truncate max-w-[120px]">{f.example || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <CodeBox label="cURL" code={buildCurl(ep)} />
            <CodeBox label="Contoh Respons" code={buildSample(ep)} />
          </div>

          <a
            href={`/apis`}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-cyan-500 px-3.5 py-2 text-[12px] font-semibold text-white transition hover:bg-cyan-600"
          >
            Coba di API Explorer
            <IcArrow s={13} />
          </a>
        </div>
      )}
    </div>
  );
}

function CategorySection({ cat }) {
  const [open, setOpen] = useState(true);
  const eps = ENDPOINTS.filter(ep => ep.category === cat.slug);
  const CatIcon = CAT_ICON[cat.slug] || IcTool;
  const grad   = CAT_COLOR[cat.slug] || "from-slate-400 to-slate-600";
  const soft   = CAT_SOFT[cat.slug]  || "bg-slate-50 text-slate-600 border-slate-200";

  return (
    <section id={cat.slug} className="scroll-mt-28">
      <button
        onClick={() => setOpen(v => !v)}
        className="mb-3 flex w-full items-center gap-3 text-left"
      >
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${grad} text-white shadow-sm`}>
          <CatIcon s={17} />
        </span>
        <div className="flex-1">
          <span className="font-display text-[15px] font-bold text-ink">{cat.label}</span>
          <span className="ml-2 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold ${soft}">{eps.length}</span>
        </div>
        <span className="text-muted">{open ? <IcChevUp s={16} /> : <IcChevDown s={16} />}</span>
      </button>

      {open && (
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card animate-fade-up">
          {eps.map(ep => <EndpointRow key={`${ep.category}-${ep.slug}`} ep={ep} />)}
        </div>
      )}
    </section>
  );
}

export default function DocsPage() {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className="mx-auto flex max-w-5xl gap-0 px-0">
      {/* Desktop sidebar */}
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-52 shrink-0 overflow-y-auto border-r border-border bg-white py-6 pl-4 pr-3 xl:block">
        <p className="mb-3 flex items-center gap-2 px-2 font-mono text-[10px] uppercase tracking-widest text-muted">
          <IcLayers s={13} /> Referensi
        </p>
        <nav className="space-y-0.5">
          <a href="#intro" className="flex items-center rounded-xl px-3 py-2 text-[12px] text-muted transition hover:bg-bg hover:text-ink">Pengantar</a>
          <a href="#format" className="flex items-center rounded-xl px-3 py-2 text-[12px] text-muted transition hover:bg-bg hover:text-ink">Format Respons</a>
        </nav>
        <div className="mt-4 border-t border-border pt-4">
          <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-widest text-muted">Kategori</p>
          <nav className="space-y-0.5">
            {CATEGORIES.map(cat => {
              const CatIcon = CAT_ICON[cat.slug] || IcTool;
              const eps = ENDPOINTS.filter(ep => ep.category === cat.slug);
              return (
                <a key={cat.slug} href={`#${cat.slug}`}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] text-muted transition hover:bg-bg hover:text-ink">
                  <CatIcon s={13} />
                  <span className="flex-1">{cat.label}</span>
                  <span className="rounded-full bg-bg px-1.5 font-mono text-[10px]">{eps.length}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1 px-4 py-6 sm:px-6">
        {/* Page title */}
        <div className="mb-8 border-b border-border pb-6">
          <p className="font-mono text-[10.5px] uppercase tracking-widest text-cyan-500">Referensi API</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-ink">Dokumentasi</h1>
          <p className="mt-1 text-[13px] text-muted">
            {ENDPOINTS.length} endpoint tersedia. Setiap endpoint dilengkapi parameter, contoh cURL, dan respons JSON.
          </p>
        </div>

        {/* Pengantar */}
        <section id="intro" className="mb-8 scroll-mt-24">
          <h2 className="mb-3 font-display text-[15px] font-bold text-ink">Pengantar</h2>
          <p className="mb-3 text-[12.5px] leading-relaxed text-muted">
            Semua endpoint dapat diakses secara publik tanpa autentikasi. Gunakan base URL berikut:
          </p>
          <CodeBox label="Base URL" code={SITE.baseUrl} />
        </section>

        {/* Format */}
        <section id="format" className="mb-8 scroll-mt-24">
          <h2 className="mb-3 font-display text-[15px] font-bold text-ink">Format Respons</h2>
          <CodeBox label="JSON" code={`{\n  "status": 200,\n  "success": true,\n  "creator": "RAFZ API",\n  "result": { ... }\n}\n\n// Error:\n{\n  "status": 400,\n  "success": false,\n  "creator": "RAFZ API",\n  "message": "Parameter 'url' is required"\n}`} />
        </section>

        {/* Categories */}
        <div className="space-y-8">
          {CATEGORIES.map(cat => (
            <CategorySection key={cat.slug} cat={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}
