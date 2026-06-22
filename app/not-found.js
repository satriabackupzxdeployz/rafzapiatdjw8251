import Link from "next/link";
import { IcTool, IcArrow } from "@/components/Icons";

export const metadata = { title: "404 — Halaman Tidak Ditemukan" };

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-white shadow-card text-muted">
          <IcTool s={24} />
        </span>
        <h1 className="mt-5 font-display text-5xl font-bold text-ink">404</h1>
        <p className="mt-1 font-display text-lg font-semibold text-muted">Halaman tidak ditemukan</p>
        <p className="mt-2 max-w-xs text-[13px] text-muted mx-auto">
          Endpoint yang kamu cari mungkin ada di halaman dokumentasi.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/"
            className="flex items-center gap-2 rounded-2xl bg-ink px-5 py-2.5 text-[13px] font-semibold text-white shadow-card transition hover:-translate-y-0.5">
            Dashboard
          </Link>
          <Link href="/docs"
            className="flex items-center gap-2 rounded-2xl border border-border bg-white px-5 py-2.5 text-[13px] font-semibold text-ink shadow-card transition hover:-translate-y-0.5">
            Dokumentasi <IcArrow s={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
