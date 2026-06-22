"use client";
import { useEffect, useState, useCallback } from "react";
import { IcCheck, IcX } from "./Icons";

let _emit = null;
export function toast(msg, type = "success") { _emit && _emit({ msg, type, id: Date.now() }); }

export default function ToastProvider() {
  const [items, setItems] = useState([]);
  const dismiss = useCallback((id) => setItems(prev => prev.filter(t => t.id !== id)), []);

  useEffect(() => {
    _emit = (t) => {
      setItems(prev => [...prev, t]);
      setTimeout(() => dismiss(t.id), 3000);
    };
    return () => { _emit = null; };
  }, [dismiss]);

  return (
    <div className="fixed bottom-6 left-1/2 z-[1000] flex -translate-x-1/2 flex-col items-center gap-2 pointer-events-none">
      {items.map(t => (
        <div
          key={t.id}
          className="animate-fade-up pointer-events-auto flex items-center gap-2.5 rounded-2xl bg-ink px-5 py-3 text-sm font-medium text-white shadow-toast"
        >
          {t.type === "success"
            ? <IcCheck s={16} cls="text-cyan-400" />
            : <IcX s={16} cls="text-orange-500" />}
          {t.msg}
        </div>
      ))}
    </div>
  );
}
