import Link from "next/link";
import { IcPlug, IcWa, IcTelegram, IcMail } from "./Icons";
import { SITE, CATEGORIES, CONTACT } from "@/lib/apiCatalog";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 text-white">
                <IcPlug s={14} />
              </span>
              <span className="font-display text-sm font-bold text-ink">{SITE.name}</span>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-muted">{SITE.tagline}</p>
          </div>

          <div>
            <p className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-ink">Navigasi</p>
            <ul className="space-y-2 text-xs text-muted">
              {[["Dashboard","/"],["List API","/apis"],["Dokumentasi","/docs"],["Kontak","/contact"]].map(([l,h]) => (
                <li key={h}><Link href={h} className="hover:text-cyan-600">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-ink">Kategori</p>
            <ul className="space-y-2 text-xs text-muted">
              {CATEGORIES.map(c => (
                <li key={c.slug}><Link href={`/docs#${c.slug}`} className="hover:text-cyan-600">{c.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-ink">Kontak</p>
            <ul className="space-y-2.5 text-xs text-muted">
              <li><a href={`https://wa.me/${CONTACT.whatsapp}`} className="flex items-center gap-1.5 hover:text-cyan-600"><IcWa s={13} />+{CONTACT.whatsapp}</a></li>
              <li><a href={`https://t.me/${CONTACT.telegram}`} className="flex items-center gap-1.5 hover:text-cyan-600"><IcTelegram s={13} />@{CONTACT.telegram}</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 hover:text-cyan-600"><IcMail s={13} />{CONTACT.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-[11px] text-muted sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE.name}. Gratis untuk semua developer.</span>
          <span className="font-mono">{SITE.baseUrl}</span>
        </div>
      </div>
    </footer>
  );
}
