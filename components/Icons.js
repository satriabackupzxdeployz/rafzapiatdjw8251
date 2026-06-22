function Svg({ ch, s = 22, cls }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
      strokeLinejoin="round" className={cls}>{ch}</svg>
  );
}
export function IcPlug(p)      { return <Svg {...p} ch={<><path d="M9 7V3.5M15 7V3.5"/><path d="M6.5 7h11a1 1 0 0 1 1 1v3a6.5 6.5 0 0 1-13 0V8a1 1 0 0 1 1-1Z"/><path d="M12 16.5V19M8.5 21h7"/></>}/>; }
export function IcDownload(p)  { return <Svg {...p} ch={<><path d="M12 3v12M6.5 10.5 12 16l5.5-5.5M4.5 19.5h15"/></>}/>; }
export function IcUpload(p)    { return <Svg {...p} ch={<><path d="M12 21V9M6.5 13.5 12 8l5.5 5.5M4.5 4.5h15"/></>}/>; }
export function IcSpark(p)     { return <Svg {...p} ch={<><path d="M12 3v4M12 17v4M3 12h4M17 12h4m-10.5-5.5 2.5 2.5M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5"/><circle cx="12" cy="12" r="2.4"/></>}/>; }
export function IcSearch(p)    { return <Svg {...p} ch={<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.6-4.6"/></>}/>; }
export function IcTool(p)      { return <Svg {...p} ch={<><path d="M14.7 6.3a3.5 3.5 0 0 1 4.9 4.9l-7.6 7.6a2 2 0 0 1-2.8 0l-2.1-2.1a2 2 0 0 1 0-2.8l7.6-7.6Z"/><path d="m9 13-5.5 5.5M14.7 6.3 13 4.6a3.5 3.5 0 0 0-4.9 0L6.4 6.3a1 1 0 0 0 0 1.4l1.5 1.5"/></>}/>; }
export function IcWa(p)        { return <Svg {...p} ch={<><path d="M7 17.2 4.5 19l1-3.3A7.5 7.5 0 1 1 12 19.5a7.4 7.4 0 0 1-5-1.9Z"/><path d="M9 9.7c0 3 2.3 5.3 5.3 5.3.6 0 .9-.5.7-1l-.6-1.4a.8.8 0 0 0-1-.4l-.7.3a4.2 4.2 0 0 1-2.2-2.2l.3-.7a.8.8 0 0 0-.4-1L9 8c-.5-.2-1 .1-1 .7Z"/></>}/>; }
export function IcTelegram(p)  { return <Svg {...p} ch={<><path d="m4 12.2 15.2-6.4c.7-.3 1.4.3 1.1 1L17.6 19a.9.9 0 0 1-1.5.3l-3.6-3.3-2 2-.5-4.2L18 8.7 8.7 13.4 4 12.2Z"/></>}/>; }
export function IcMail(p)      { return <Svg {...p} ch={<><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4.5 7 7.5 6 7.5-6"/></>}/>; }
export function IcHeart(p)     { return <Svg {...p} ch={<><path d="M12 20s-7.2-4.4-9.4-9A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 9.4 4c-2.2 4.6-9.4 9-9.4 9Z"/></>}/>; }
export function IcQr(p)        { return <Svg {...p} ch={<><rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2.5v2.5h-2.5zM19.5 14.5h1v1h-1zM14.5 19.5h1v1h-1zM17.5 17.5h2.5v2.5h-2.5z"/></>}/>; }
export function IcCopy(p)      { return <Svg {...p} ch={<><rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M5.5 15.5h-1a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>}/>; }
export function IcCheck(p)     { return <Svg {...p} ch={<><path d="m4.5 12.5 5 5 10-11"/></>}/>; }
export function IcChevDown(p)  { return <Svg {...p} ch={<><path d="m7 9.5 5 5 5-5"/></>}/>; }
export function IcChevUp(p)    { return <Svg {...p} ch={<><path d="m7 14.5 5-5 5 5"/></>}/>; }
export function IcArrow(p)     { return <Svg {...p} ch={<><path d="M4 12h16M13 6l6 6-6 6"/></>}/>; }
export function IcMenu(p)      { return <Svg {...p} ch={<><path d="M4 7h16M4 12h16M4 17h16"/></>}/>; }
export function IcX(p)         { return <Svg {...p} ch={<><path d="m6 6 12 12M18 6 6 18"/></>}/>; }
export function IcPlay(p)      { return <Svg {...p} ch={<><path d="M8 5.5v13l11-6.5-11-6.5Z"/></>}/>; }
export function IcFlag(p)      { return <Svg {...p} ch={<><path d="M4 4v16M4 4h12l-3 5 3 5H4"/></>}/>; }
export function IcFolder(p)    { return <Svg {...p} ch={<><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></>}/>; }
export function IcHome(p)      { return <Svg {...p} ch={<><path d="m3 9.5 9-7 9 7V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z"/><path d="M9 21V12h6v9"/></>}/>; }
export function IcLayers(p)    { return <Svg {...p} ch={<><path d="M12 3.5 4 8l8 4.5L20 8l-8-4.5ZM4 12l8 4.5L20 12M4 16l8 4.5L20 16"/></>}/>; }
export function IcShield(p)    { return <Svg {...p} ch={<><path d="M12 3.5 19 6v5.5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-2.5ZM9 12l2 2 4-4.5"/></>}/>; }
export function IcGauge(p)     { return <Svg {...p} ch={<><path d="M4.5 16.5a8 8 0 1 1 15 0"/><path d="M12 13.5 15.5 9"/><circle cx="12" cy="13.5" r="1.1"/></>}/>; }
export function IcLock(p)      { return <Svg {...p} ch={<><rect x="5.5" y="11" width="13" height="9" rx="2"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"/></>}/>; }
export function IcBell(p)      { return <Svg {...p} ch={<><path d="M6 10a6 6 0 0 1 12 0v4l2 2H4l2-2v-4Z"/><path d="M10 20a2 2 0 0 0 4 0"/></>}/>; }
export function IcSpin(p)      { return <Svg {...p} ch={<><path d="M12 3a9 9 0 1 0 9 9" strokeOpacity=".3"/><path d="M21 12A9 9 0 0 0 12 3"/></>} cls={(p.cls||"") + " animate-spin"}/>; }
export function IcTrash(p)     { return <Svg {...p} ch={<><path d="M4.5 7.5h15M9.5 7.5V5.5h5V7.5M10 11v6M14 11v6M5.5 7.5l1 12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2l1-12"/></>}/>; }
