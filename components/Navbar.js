"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IcPlug, IcMenu, IcX, IcHome, IcLayers, IcFolder, IcWa, IcMail, IcTelegram, IcArrow } from "./Icons";
import { SITE, CATEGORIES, CONTACT } from "@/lib/apiCatalog";

const NAV = [
  { href: "/",       label: "Dashboard",     Icon: IcHome },
  { href: "/apis",   label: "List API",      Icon: IcLayers },
  { href: "/docs",   label: "Dokumentasi",   Icon: IcFolder },
  { href: "/contact",label: "Kontak & Donasi", Icon: IcWa }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-white shadow-sm">
              <IcPlug s={16} />
              <img src="/images/icon-website.png" alt="" className="absolute inset-0 h-8 w-8 rounded-xl object-cover" onError={e => e.currentTarget.style.display="none"} />
            </span>
            <span className="font-display text-[15px] font-bold tracking-tight text-ink">{SITE.name}</span>
            <span className="hidden rounded-full bg-cyan-50 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-600 sm:inline">FREE</span>
          </Link>

          <nav className="hidden gap-0.5 md:flex">
            {NAV.map(({href, label}) => (
              <Link key={href} href={href}
                className={`rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors ${pathname === href ? "bg-cyan-50 text-cyan-700" : "text-muted hover:bg-bg hover:text-ink"}`}>
                {label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setOpen(v => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-muted transition hover:bg-bg hover:text-ink md:hidden"
            aria-label="Menu"
          >
            {open ? <IcX s={18} /> : <IcMenu s={18} />}
          </button>
        </div>
      </header>

      {/* Overlay */}
      {open && <div className="fixed inset-0 z-40 animate-fade-in bg-ink/50 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />}

      {/* Slide drawer */}
      <aside className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-xl transition-transform duration-300 md:hidden ${open ? "translate-x-0 animate-slide-up" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-display text-sm font-bold text-ink">Menu Navigasi</span>
          <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-xl border border-border text-muted">
            <IcX s={16} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {NAV.map(({ href, label, Icon }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${pathname === href ? "bg-cyan-50 text-cyan-700" : "text-ink/70 hover:bg-bg"}`}>
              <Icon s={17} cls={pathname === href ? "text-cyan-500" : "text-muted"} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-bg p-5">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted">Kontak</p>
          <div className="space-y-2.5 text-xs text-muted">
            <a href={`https://wa.me/${CONTACT.whatsapp}`} className="flex items-center gap-2 hover:text-cyan-600"><IcWa s={14} />{CONTACT.whatsapp}</a>
            <a href={`https://t.me/${CONTACT.telegram}`} className="flex items-center gap-2 hover:text-cyan-600"><IcTelegram s={14} />@{CONTACT.telegram}</a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-cyan-600"><IcMail s={14} />{CONTACT.email}</a>
          </div>
        </div>
      </aside>
    </>
  );
}
