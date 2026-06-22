import Link from "next/link";
import { SITE, CATEGORIES, ENDPOINTS } from "@/lib/apiCatalog";
import {
  IcArrow, IcShield, IcGauge, IcLayers, IcLock,
  IcDownload, IcUpload, IcSpark, IcSearch, IcTool, IcCheck
} from "@/components/Icons";

export const metadata = {
  title: "Dashboard",
  description: SITE.tagline
};

const CAT_ICON = { d: IcDownload, u: IcUpload, ai: IcSpark, s: IcSearch, t: IcTool };
const CAT_GRAD = {
  d:  "from-cyan-400 to-cyan-600",
  u:  "from-orange-400 to-orange-500",
  ai: "from-violet-400 to-violet-600",
  s:  "from-teal-400 to-teal-600",
  t:  "from-slate-400 to-slate-500"
};

const STATS = [
  { label: "Total Endpoint",  value: String(ENDPOINTS.length) },
  { label: "Kategori",        value: String(CATEGORIES.length) },
  { label: "Biaya Akses",     value: "Gratis" },
  { label: "Butuh Login",     value: "Tidak" }
];

const FEATURES = [
  { Icon: IcShield, title: "Tanpa API Key",       desc: "Langsung pakai tanpa registrasi. Tidak perlu token atau akun." },
  { Icon: IcGauge,  title: "Respons Cepat",        desc: "Setiap endpoint dioptimasi untuk latensi serendah mungkin." },
  { Icon: IcLayers, title: "JSON Konsisten",        desc: "Struktur status, success, creator, result di setiap respons." },
  { Icon: IcLock,   title: "HTTPS & CORS",          desc: "Semua endpoint HTTPS dan mendukung header CORS penuh." },
  { Icon: IcCheck,  title: "Selalu Diperbarui",     desc: "Endpoint diuji rutin agar tetap berjalan tanpa gangguan." },
  { Icon: IcArrow,  title: "Dokumentasi Lengkap",   desc: "Parameter, cURL, respons JSON, dan live tester tersedia." }
];

export default function HomePage() {
  const epByCategory = Object.fromEntries(
    CATEGORIES.map(c => [c.slug, ENDPOINTS.filter(e => e.category === c.slug).length])
  );

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        {/* Decorative radial blobs */}
        <span aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-100/60 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
            <span className="font-mono text-[11px] font-semibold text-cyan-700 tracking-wide">FREE · NO LOGIN · CORS READY</span>
          </div>

          <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl max-w-2xl">
            REST API Gratis untuk{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-cyan-700 bg-clip-text text-transparent">
              Developer Indonesia
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-muted">
            {SITE.tagline} Langsung pakai tanpa daftar, tanpa API key, tanpa batas.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/apis"
              className="flex items-center gap-2 rounded-2xl bg-ink px-5 py-3 text-[13px] font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-card-hover">
              Jelajahi API
              <IcArrow s={15} />
            </Link>
            <Link href="/docs"
              className="flex items-center gap-2 rounded-2xl border border-border bg-white px-5 py-3 text-[13px] font-semibold text-ink shadow-card transition-transform hover:-translate-y-0.5">
              Dokumentasi
            </Link>
          </div>

          {/* Base URL pill */}
          <div className="mt-7 flex items-center gap-2">
            <span className="text-[11.5px] text-muted">Base URL</span>
            <code className="rounded-xl border border-border bg-bg px-3 py-1.5 font-mono text-[11.5px] text-cyan-700 shadow-card">
              {SITE.baseUrl}
            </code>
          </div>
        </div>
      </section>

      {/* ─── Stats bar ────────────────────────────────────────── */}
      <section className="border-y border-border bg-bg">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-border md:grid-cols-4">
          {STATS.map(s => (
            <div key={s.label} className="px-6 py-5 text-center">
              <p className="font-display text-2xl font-bold text-ink">{s.value}</p>
              <p className="mt-0.5 text-[11.5px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Category cards ───────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="font-mono text-[10.5px] uppercase tracking-widest text-cyan-500">Kategori</p>
          <h2 className="mt-1.5 font-display text-2xl font-bold text-ink">
            {CATEGORIES.length} Kategori · {ENDPOINTS.length} Endpoint
          </h2>
          <p className="mt-1 text-[13px] text-muted">Semua gratis, siap dipakai sekarang.</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => {
              const CatIcon = CAT_ICON[cat.slug] || IcTool;
              const grad    = CAT_GRAD[cat.slug]  || "from-slate-400 to-slate-500";
              return (
                <Link key={cat.slug} href={`/docs#${cat.slug}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 shadow-card transition hover:shadow-card-hover hover:-translate-y-0.5"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${grad} text-white shadow-sm`}>
                    <CatIcon s={18} />
                  </span>
                  <div>
                    <h3 className="font-display text-[14px] font-bold text-ink">{cat.label}</h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted">{cat.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-cyan-100 bg-cyan-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-700">
                      {epByCategory[cat.slug]} endpoint
                    </span>
                    <span className="text-muted transition-transform group-hover:translate-x-1">
                      <IcArrow s={15} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────── */}
      <section className="bg-ink py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="font-mono text-[10.5px] uppercase tracking-widest text-cyan-400">Kenapa RAFZ API?</p>
          <h2 className="mt-1.5 font-display text-2xl font-bold text-white">Dirancang buat developer</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
                  <Icon s={18} />
                </span>
                <h3 className="mt-3 font-display text-[13.5px] font-bold text-white">{title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-white/50">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick code example ───────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white shadow-card">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-widest text-cyan-500">Contoh pemakaian</p>
                <h2 className="mt-1.5 font-display text-xl font-bold text-ink sm:text-2xl">
                  Dua baris sudah cukup
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  Kirim GET ke endpoint, dapat JSON. Tidak perlu setup, tidak perlu token.
                </p>
                <Link href="/apis"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-sm transition hover:bg-cyan-600">
                  Coba sekarang <IcArrow s={14} />
                </Link>
              </div>

              <div className="overflow-hidden rounded-2xl bg-ink shadow-card">
                <div className="border-b border-white/10 px-4 py-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">javascript</span>
                </div>
                <pre className="overflow-x-auto px-4 py-4 font-mono text-[11.5px] leading-relaxed text-cyan-100">{`const res = await fetch(
  "${SITE.baseUrl}/d/ttmp4?url=TIKTOK_URL"
);
const data = await res.json();

console.log(data.result.download);
// → https://cdn.tiktok.com/...`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-cyan-500 to-cyan-700 py-12">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            Siap mulai integrasi?
          </h2>
          <p className="mt-2 text-[13px] text-cyan-100/80">
            Tidak ada pendaftaran. Tidak ada tagihan. Langsung pakai.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/docs"
              className="flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-[13px] font-semibold text-cyan-700 shadow-card transition-transform hover:-translate-y-0.5">
              Mulai dari Docs <IcArrow s={14} />
            </Link>
            <Link href="/contact"
              className="flex items-center gap-2 rounded-2xl border border-white/30 px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-white/10">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
