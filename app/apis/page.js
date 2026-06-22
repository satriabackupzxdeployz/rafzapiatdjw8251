"use client";

import { useState, useRef, useCallback } from "react";
import { CATEGORIES, ENDPOINTS, SITE } from "@/lib/apiCatalog";
import {
  IcSearch, IcFolder, IcChevDown, IcChevUp, IcPlay, IcX, IcCopy,
  IcCheck, IcSpin, IcFlag, IcDownload, IcUpload, IcSpark, IcTool
} from "@/components/Icons";

const CAT_ICON = { d: IcDownload, u: IcUpload, ai: IcSpark, s: IcSearch, t: IcTool };
const CAT_COLOR = {
  d:  { bg: "bg-cyan-500",   text: "text-cyan-700",   soft: "bg-cyan-50",   border: "border-cyan-200" },
  u:  { bg: "bg-orange-500", text: "text-orange-600",  soft: "bg-orange-50", border: "border-orange-200" },
  ai: { bg: "bg-violet-500", text: "text-violet-700",  soft: "bg-violet-50", border: "border-violet-200" },
  s:  { bg: "bg-teal-500",   text: "text-teal-700",    soft: "bg-teal-50",   border: "border-teal-200" },
  t:  { bg: "bg-slate-500",  text: "text-slate-600",   soft: "bg-slate-50",  border: "border-slate-200" }
};

function MethodTag({ m }) {
  return (
    <span className={`shrink-0 rounded-lg px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider ${m === "GET" ? "bg-cyan-50 text-cyan-700" : "bg-orange-50 text-orange-600"}`}>
      {m}
    </span>
  );
}

function CopyBtn({ text }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1800); } catch {}
  }
  return (
    <button onClick={copy} className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white">
      {done ? <IcCheck s={13} /> : <IcCopy s={13} />}
    </button>
  );
}

function CodeBox({ label, code, lang = "text" }) {
  return (
    <div className="rounded-xl overflow-hidden bg-ink">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">{label}</span>
        <CopyBtn text={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[11.5px] leading-relaxed text-cyan-100 whitespace-pre-wrap break-all">{code}</pre>
    </div>
  );
}

function EndpointCard({ ep }) {
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [reqUrl,  setReqUrl]  = useState("");
  const [curlCmd, setCurlCmd] = useState("");
  const [bugOpen, setBugOpen] = useState(false);
  const [bugMsg,  setBugMsg]  = useState("");
  const [bugSent, setBugSent] = useState(false);
  const formRef = useRef(null);

  const fields = ep.params || ep.body || [];
  const isPost = ep.method === "POST";
  const cc = CAT_COLOR[ep.category] || CAT_COLOR.t;

  function buildUrl(data) {
    const base = `${SITE.baseUrl}${ep.path}`;
    if (isPost) return base;
    const qs = new URLSearchParams();
    fields.forEach(f => { if (data[f.name]) qs.set(f.name, data[f.name]); });
    return qs.toString() ? `${base}?${qs}` : base;
  }

  function buildCurl(data) {
    if (isPost) {
      let c = `curl -X POST "${SITE.baseUrl}${ep.path}"`;
      fields.forEach(f => {
        const v = data[f.name];
        if (!v) return;
        c += v instanceof File ? ` \\\n  -F "${f.name}=@${v.name}"` : ` \\\n  -F "${f.name}=${v}"`;
      });
      return c;
    }
    const url = buildUrl(data);
    return `curl "${url}"`;
  }

  async function run(e) {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    const data = {};
    for (const [k, v] of fd.entries()) data[k] = v;

    const url = buildUrl(data);
    setReqUrl(url);
    setCurlCmd(buildCurl(data));
    setLoading(true);
    setResult(null);

    try {
      const opts = { method: ep.method };
      if (isPost) opts.body = fd;
      const res = await fetch(isPost ? `${ep.path}` : `${ep.path}?${new URLSearchParams(Object.fromEntries(fields.filter(f => data[f.name]).map(f => [f.name, data[f.name]])))}`, opts);
      const ct = res.headers.get("content-type") || "";

      if (ct.startsWith("image/")) {
        const blob = await res.blob();
        setResult({ type: "image", src: URL.createObjectURL(blob) });
      } else if (ct.startsWith("audio/")) {
        const blob = await res.blob();
        setResult({ type: "audio", src: URL.createObjectURL(blob) });
      } else {
        const json = await res.json();
        setResult({ type: "json", data: JSON.stringify(json, null, 2) });
      }
    } catch (err) {
      setResult({ type: "error", data: err.message });
    } finally {
      setLoading(false);
    }
  }

  function clear() { setResult(null); setReqUrl(""); setCurlCmd(""); if (formRef.current) formRef.current.reset(); }

  return (
    <div className="border-b border-border last:border-0">
      {/* Header row */}
      <button
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-bg"
      >
        <MethodTag m={ep.method} />
        <div className="min-w-0 flex-1">
          <span className="block truncate font-mono text-[12.5px] font-semibold text-ink">{ep.path}</span>
          <span className="block truncate text-[11.5px] text-muted mt-0.5">{ep.name}</span>
        </div>
        <span className="shrink-0 text-muted">
          {open ? <IcChevUp s={16} /> : <IcChevDown s={16} />}
        </span>
      </button>

      {/* Expanded body */}
      {open && (
        <div className="border-t border-border bg-white px-4 pb-5 pt-4 animate-fade-up">
          <div className="flex items-start justify-between gap-2 mb-4">
            <p className="text-[12.5px] leading-relaxed text-muted">{ep.description}</p>
            <button onClick={() => setBugOpen(v => !v)} className="shrink-0 rounded-lg p-1.5 text-muted transition hover:bg-orange-50 hover:text-orange-500" title="Lapor bug">
              <IcFlag s={14} />
            </button>
          </div>

          {/* Bug report inline */}
          {bugOpen && (
            <div className="mb-4 rounded-xl border border-orange-200 bg-orange-50 p-3">
              {bugSent ? (
                <p className="text-[12px] font-medium text-orange-600">Laporan terkirim. Terima kasih!</p>
              ) : (
                <>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-orange-500">Lapor Bug — {ep.path}</p>
                  <textarea
                    value={bugMsg}
                    onChange={e => setBugMsg(e.target.value)}
                    rows={2}
                    placeholder="Jelaskan error yang terjadi..."
                    className="w-full resize-none rounded-lg border border-orange-200 bg-white px-3 py-2 text-[12px] text-ink outline-none focus:border-orange-400"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button onClick={() => setBugOpen(false)} className="rounded-lg px-3 py-1.5 text-[11px] text-muted hover:bg-white">Batal</button>
                    <button onClick={() => { if (bugMsg.trim()) { setBugSent(true); setTimeout(() => { setBugOpen(false); setBugSent(false); setBugMsg(""); }, 2000); } }}
                      className="rounded-lg bg-orange-500 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-orange-600">
                      Kirim
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Form */}
          <form ref={formRef} onSubmit={run} className="space-y-3">
            {fields.map(f => (
              <div key={f.name}>
                <label className="mb-1.5 flex items-center gap-1 font-mono text-[11px] font-semibold text-ink">
                  {f.name}
                  {f.required && <span className="text-orange-500">*</span>}
                  <span className="font-sans font-normal text-muted">({f.type})</span>
                </label>
                {f.type === "file" ? (
                  <input type="file" name={f.name}
                    className="block w-full cursor-pointer rounded-xl border border-border bg-bg px-3 py-2 text-[12px] text-ink file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-100 file:px-3 file:py-1.5 file:text-[11px] file:font-semibold file:text-cyan-700 hover:file:bg-cyan-200"
                  />
                ) : (
                  <input type="text" name={f.name} required={f.required}
                    defaultValue={f.example || ""}
                    placeholder={f.example || f.name}
                    className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 font-mono text-[12px] text-ink outline-none placeholder:font-sans placeholder:text-muted/60 focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                  />
                )}
              </div>
            ))}

            <div className="flex gap-2 pt-1">
              <button type="submit" disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[12.5px] font-semibold text-white transition hover:bg-ink/80 disabled:opacity-60">
                {loading ? <IcSpin s={15} /> : <IcPlay s={15} />}
                {loading ? "Memproses..." : "Execute"}
              </button>
              {(result || reqUrl) && (
                <button type="button" onClick={clear}
                  className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-[12.5px] text-muted transition hover:bg-bg">
                  <IcX s={14} /> Clear
                </button>
              )}
            </div>
          </form>

          {/* Response */}
          {(reqUrl || result) && (
            <div className="mt-4 space-y-3 animate-fade-up">
              {reqUrl && <CodeBox label="Request URL" code={reqUrl} />}
              {curlCmd && <CodeBox label="cURL" code={curlCmd} />}
              {loading && (
                <div className="flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-[12px] text-white/60">
                  <IcSpin s={15} /> Menunggu respons...
                </div>
              )}
              {result && (
                <div>
                  {result.type === "json"  && <CodeBox label="Response" code={result.data} />}
                  {result.type === "error" && (
                    <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-mono text-[11.5px] text-orange-600">{result.data}</div>
                  )}
                  {result.type === "image" && (
                    <div className="rounded-xl overflow-hidden bg-ink p-3">
                      <img src={result.src} alt="result" className="mx-auto max-h-72 rounded-lg" />
                    </div>
                  )}
                  {result.type === "audio" && (
                    <div className="rounded-xl bg-ink p-4">
                      <audio controls src={result.src} className="w-full" />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CategoryGroup({ cat, endpoints }) {
  const [open, setOpen] = useState(false);
  const cc = CAT_COLOR[cat.slug] || CAT_COLOR.t;
  const CatIcon = CAT_ICON[cat.slug] || IcTool;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-bg"
      >
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${cc.bg} text-white`}>
          <CatIcon s={16} />
        </span>
        <div className="flex-1 min-w-0">
          <span className="block font-display text-[13.5px] font-bold text-ink">{cat.label}</span>
          <span className="block text-[11.5px] text-muted truncate">{cat.description}</span>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${cc.soft} ${cc.text}`}>
          {endpoints.length}
        </span>
        <span className="shrink-0 text-muted">
          {open ? <IcChevUp s={17} /> : <IcChevDown s={17} />}
        </span>
      </button>

      {open && (
        <div className="border-t border-border animate-fade-up">
          {endpoints.map(ep => (
            <EndpointCard key={`${ep.category}-${ep.slug}`} ep={ep} />
          ))}
        </div>
      )}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3">
      {[80, 60, 90].map(w => (
        <div key={w} className="skeleton h-[72px] w-full" />
      ))}
    </div>
  );
}

export default function ApisPage() {
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Simulate skeleton briefly then show content
  useState(() => { setTimeout(() => setLoaded(true), 600); });

  const q = query.toLowerCase();
  const filtered = CATEGORIES.map(cat => ({
    cat,
    eps: ENDPOINTS.filter(ep =>
      ep.category === cat.slug &&
      (!q || ep.name.toLowerCase().includes(q) || ep.path.toLowerCase().includes(q) || ep.description.toLowerCase().includes(q))
    )
  })).filter(({ eps }) => eps.length > 0);

  const total = filtered.reduce((s, { eps }) => s + eps.length, 0);

  return (
    <>
      {/* Header */}
      <section className="sticky top-14 z-30 border-b border-border bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
              <IcSearch s={16} />
            </span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`Cari dari ${ENDPOINTS.length} endpoint...`}
              className="h-10 w-full rounded-xl border border-border bg-bg pl-9 pr-9 text-[13px] text-ink outline-none placeholder:text-muted/70 focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
                <IcX s={15} />
              </button>
            )}
          </div>
          {query && (
            <p className="mt-2 text-[11.5px] text-muted">
              {total === 0 ? "Tidak ada endpoint cocok" : `${total} endpoint ditemukan`}
            </p>
          )}
        </div>
      </section>

      {/* List */}
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
        {!loaded ? (
          <Skeleton />
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-muted">
            <IcSearch s={36} cls="mx-auto mb-3 opacity-25" />
            <p className="text-sm">Endpoint tidak ditemukan</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(({ cat, eps }) => (
              <CategoryGroup key={cat.slug} cat={cat} endpoints={eps} />
            ))}
          </div>
        )}

        {/* Info bar bottom */}
        {loaded && !query && (
          <p className="mt-6 text-center font-mono text-[10.5px] text-muted">
            {ENDPOINTS.length} endpoint · {CATEGORIES.length} kategori · {SITE.baseUrl}
          </p>
        )}
      </div>
    </>
  );
}
