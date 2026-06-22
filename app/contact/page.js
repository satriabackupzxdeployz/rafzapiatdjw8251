import { CONTACT, SITE } from "@/lib/apiCatalog";
import { IcWa, IcTelegram, IcMail, IcHeart, IcQr } from "@/components/Icons";
import QrisImage from "@/components/QrisImage";

export const metadata = {
  title: "Kontak & Donasi",
  description: `Hubungi tim ${SITE.name} atau dukung pengembangan lewat donasi QRIS.`
};

const CARDS = [
  { Icon: IcWa,       label: "WhatsApp", value: `+${CONTACT.whatsapp}`, href: `https://wa.me/${CONTACT.whatsapp}`,      hint: "Balas dalam beberapa jam",   color: "text-green-600 bg-green-50 border-green-100" },
  { Icon: IcTelegram, label: "Telegram", value: `@${CONTACT.telegram}`, href: `https://t.me/${CONTACT.telegram}`,       hint: "Respons lebih cepat",        color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
  { Icon: IcMail,     label: "Email",    value: CONTACT.email,           href: `mailto:${CONTACT.email}`,               hint: "Bug report & kerjasama",     color: "text-orange-500 bg-orange-50 border-orange-100" }
];

const FAQ = [
  { q: "Apakah RAFZ API benar-benar gratis?",             a: "Ya. Semua endpoint tersedia gratis, tanpa API key, tanpa pendaftaran." },
  { q: "Apakah ada rate limit per hari?",                  a: "Belum ada rate limit ketat. Penggunaan wajar sangat dianjurkan agar layanan tetap stabil." },
  { q: "Endpoint tidak merespons, apa yang harus dilakukan?", a: "Coba beberapa saat lagi. Jika berlanjut, hubungi kami via WhatsApp atau Telegram." },
  { q: "Bisa request endpoint baru?",                      a: "Bisa. Kirim permintaanmu via WhatsApp atau Telegram dan kami akan pertimbangkan." }
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-border bg-white px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[10.5px] uppercase tracking-widest text-cyan-500">Hubungi Kami</p>
          <h1 className="mt-1.5 font-display text-2xl font-bold text-ink sm:text-3xl">Kontak & Donasi</h1>
          <p className="mt-1.5 max-w-lg text-[13px] text-muted">
            Ada pertanyaan, bug, atau ingin request endpoint baru? Pilih platform paling nyaman.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">

          {/* ── Left ─────────────────────────────────────────── */}
          <div className="space-y-8">

            {/* Contact cards */}
            <div>
              <h2 className="mb-4 font-display text-[15px] font-bold text-ink">Hubungi Kami</h2>
              <div className="space-y-2.5">
                {CARDS.map(({ Icon, label, value, href, hint, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-card transition hover:shadow-card-hover hover:-translate-y-0.5">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${color}`}>
                      <Icon s={19} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-[13px] font-bold text-ink">{label}</p>
                      <p className="truncate font-mono text-[11.5px] text-muted">{value}</p>
                    </div>
                    <span className="hidden shrink-0 rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] text-muted sm:inline">
                      {hint}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="mb-4 font-display text-[15px] font-bold text-ink">Pertanyaan Umum</h2>
              <div className="space-y-3">
                {FAQ.map(({ q, a }) => (
                  <div key={q} className="rounded-2xl border border-border bg-white p-4 shadow-card">
                    <p className="font-display text-[13px] font-bold text-ink">{q}</p>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Donasi ─────────────────────────────────── */}
          <div>
            <div className="sticky top-20 overflow-hidden rounded-3xl border border-border bg-white shadow-card">
              {/* Gradient header */}
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                  <IcHeart s={19} />
                </span>
                <h2 className="mt-3 font-display text-[17px] font-bold text-white">Dukung RAFZ API</h2>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-cyan-100/80">
                  RAFZ API dibuat secara sukarela. Donasi kecilmu membantu server tetap jalan dan fitur terus berkembang.
                </p>
              </div>

              {/* QRIS block */}
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2 text-[12.5px] font-semibold text-ink">
                  <IcQr s={16} cls="text-cyan-500" />
                  Scan QRIS untuk donasi
                </div>

                <div className="flex justify-center">
                  <div className="rounded-2xl border-2 border-dashed border-cyan-200 bg-cyan-50/40 p-3">
                    <QrisImage />
                  </div>
                </div>

                <ul className="mt-5 space-y-2">
                  {["Donasi berapa pun sangat dihargai","Tidak ada jumlah minimum","Membantu biaya server & pengembangan"].map(t => (
                    <li key={t} className="flex items-start gap-2 text-[12px] text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
