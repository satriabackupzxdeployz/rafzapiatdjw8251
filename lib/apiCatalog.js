export const SITE = {
  name: "RAFZ API",
  tagline: "REST API gratis untuk kebutuhan downloader, uploader, AI, dan automasi proyekmu.",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://api.rafztzy.eu.cc"
};

export const CONTACT = {
  whatsapp: "6282262921585",
  telegram: "rafztzy_real",
  email: "support@rafztzy.eu.cc"
};

export const CATEGORIES = [
  {
    slug: "d",
    label: "Downloader",
    folder: "/d",
    icon: "download",
    description: "Tarik media langsung dari TikTok, Instagram, Facebook, YouTube, dan Spotify tanpa watermark."
  },
  {
    slug: "u",
    label: "Uploader",
    folder: "/u",
    icon: "upload",
    description: "Unggah gambar, video, atau file apa pun dan dapatkan tautan publik dalam hitungan detik."
  },
  {
    slug: "ai",
    label: "AI Tools",
    folder: "/ai",
    icon: "spark",
    description: "Obrolan dengan AI dan hasilkan gambar dari teks secara instan."
  },
  {
    slug: "s",
    label: "Search Tools",
    folder: "/s",
    icon: "search",
    description: "Cari lirik lagu, ringkasan Wikipedia, dan data profil TikTok publik."
  },
  {
    slug: "t",
    label: "Utility Tools",
    folder: "/t",
    icon: "tool",
    description: "Perkakas pendukung: nslookup domain, text-to-speech, dan code-to-image."
  }
];

export const ENDPOINTS = [
  {
    category: "d",
    slug: "ttmp4",
    name: "TikTok Downloader (MP4)",
    method: "GET",
    path: "/d/ttmp4",
    description: "Unduh video TikTok tanpa watermark dalam format MP4.",
    params: [{ name: "url", required: true, type: "string", example: "https://www.tiktok.com/@user/video/123456789" }],
    sampleResult: { title: "string", author: "string", thumbnail: "url", format: "mp4", download: "url" }
  },
  {
    category: "d",
    slug: "ttmp3",
    name: "TikTok Downloader (MP3)",
    method: "GET",
    path: "/d/ttmp3",
    description: "Ekstrak audio dari video TikTok dalam format MP3.",
    params: [{ name: "url", required: true, type: "string", example: "https://www.tiktok.com/@user/video/123456789" }],
    sampleResult: { title: "string", author: "string", thumbnail: "url", format: "mp3", download: "url" }
  },
  {
    category: "d",
    slug: "ttimg",
    name: "TikTok Downloader (Thumbnail)",
    method: "GET",
    path: "/d/ttimg",
    description: "Ambil thumbnail/cover dari sebuah video TikTok.",
    params: [{ name: "url", required: true, type: "string", example: "https://www.tiktok.com/@user/video/123456789" }],
    sampleResult: { title: "string", author: "string", format: "jpg", download: "url" }
  },
  {
    category: "d",
    slug: "igmp4",
    name: "Instagram Downloader (MP4)",
    method: "GET",
    path: "/d/igmp4",
    description: "Unduh reel atau video dari sebuah postingan Instagram publik.",
    params: [{ name: "url", required: true, type: "string", example: "https://www.instagram.com/p/POST_ID" }],
    sampleResult: { username: "string", caption: "string", thumbnail: "url", format: "mp4", download: "url" }
  },
  {
    category: "d",
    slug: "igmp3",
    name: "Instagram Downloader (MP3)",
    method: "GET",
    path: "/d/igmp3",
    description: "Ambil berkas audio dari video Instagram.",
    params: [{ name: "url", required: true, type: "string", example: "https://www.instagram.com/p/POST_ID" }],
    sampleResult: { username: "string", caption: "string", thumbnail: "url", format: "mp3", download: "url", note: "string" }
  },
  {
    category: "d",
    slug: "igimg",
    name: "Instagram Downloader (Foto)",
    method: "GET",
    path: "/d/igimg",
    description: "Unduh foto atau carousel dari sebuah postingan Instagram.",
    params: [{ name: "url", required: true, type: "string", example: "https://www.instagram.com/p/POST_ID" }],
    sampleResult: { username: "string", caption: "string", format: "jpg", download: "url", images: ["url"] }
  },
  {
    category: "d",
    slug: "fbmp4",
    name: "Facebook Downloader (MP4)",
    method: "GET",
    path: "/d/fbmp4",
    description: "Unduh video Facebook publik dalam kualitas HD maupun SD.",
    params: [{ name: "url", required: true, type: "string", example: "https://www.facebook.com/share/r/abc123" }],
    sampleResult: { thumbnail: "url", format: "mp4", download: "url", qualities: [{ label: "string", url: "url" }] }
  },
  {
    category: "d",
    slug: "fbmp3",
    name: "Facebook Downloader (MP3)",
    method: "GET",
    path: "/d/fbmp3",
    description: "Ambil berkas audio dari video Facebook.",
    params: [{ name: "url", required: true, type: "string", example: "https://www.facebook.com/share/r/abc123" }],
    sampleResult: { thumbnail: "url", format: "mp3", download: "url", note: "string" }
  },
  {
    category: "d",
    slug: "fbimg",
    name: "Facebook Downloader (Thumbnail)",
    method: "GET",
    path: "/d/fbimg",
    description: "Ambil thumbnail dari sebuah video atau postingan Facebook.",
    params: [{ name: "url", required: true, type: "string", example: "https://www.facebook.com/share/r/abc123" }],
    sampleResult: { format: "jpg", download: "url" }
  },
  {
    category: "d",
    slug: "ytmp4",
    name: "YouTube Downloader (MP4)",
    method: "GET",
    path: "/d/ytmp4",
    description: "Unduh video YouTube dengan kualitas yang bisa diatur.",
    params: [
      { name: "url", required: true, type: "string", example: "https://youtu.be/dQw4w9WgXcQ" },
      { name: "quality", required: false, type: "string", example: "720" }
    ],
    sampleResult: { title: "string", duration: "string", thumbnail: "url", format: "mp4", quality: "720", download: "url" }
  },
  {
    category: "d",
    slug: "ytmp3",
    name: "YouTube Downloader (MP3)",
    method: "GET",
    path: "/d/ytmp3",
    description: "Konversi video YouTube menjadi audio MP3.",
    params: [{ name: "url", required: true, type: "string", example: "https://youtu.be/dQw4w9WgXcQ" }],
    sampleResult: { title: "string", duration: "string", thumbnail: "url", format: "mp3", download: "url" }
  },
  {
    category: "d",
    slug: "ytimg",
    name: "YouTube Downloader (Thumbnail)",
    method: "GET",
    path: "/d/ytimg",
    description: "Ambil thumbnail resolusi tinggi dari sebuah video YouTube.",
    params: [{ name: "url", required: true, type: "string", example: "https://youtu.be/dQw4w9WgXcQ" }],
    sampleResult: { title: "string", duration: "string", format: "jpg", download: "url" }
  },
  {
    category: "d",
    slug: "spmp3",
    name: "Spotify Downloader (MP3)",
    method: "GET",
    path: "/d/spmp3",
    description: "Unduh lagu dari tautan Spotify dalam format MP3.",
    params: [{ name: "url", required: true, type: "string", example: "https://open.spotify.com/track/TRACK_ID" }],
    sampleResult: { title: "string", artists: "string", cover: "url", durationMs: 0, format: "mp3", download: "url" }
  },
  {
    category: "u",
    slug: "img2url",
    name: "Img2Url",
    method: "POST",
    path: "/u/img2url",
    description: "Unggah berkas gambar dan dapatkan tautan publiknya.",
    body: [{ name: "file", required: true, type: "file", example: "gambar.jpg" }],
    sampleResult: { url: "url", name: "string", size: 0, type: "image/jpeg" }
  },
  {
    category: "u",
    slug: "vid2url",
    name: "Vid2Url",
    method: "POST",
    path: "/u/vid2url",
    description: "Unggah berkas video dan dapatkan tautan publiknya.",
    body: [{ name: "file", required: true, type: "file", example: "video.mp4" }],
    sampleResult: { url: "url", name: "string", size: 0, type: "video/mp4" }
  },
  {
    category: "u",
    slug: "file2url",
    name: "File2Url",
    method: "POST",
    path: "/u/file2url",
    description: "Unggah berkas apa pun ke Catbox dan dapatkan tautan publiknya.",
    body: [{ name: "file", required: true, type: "file", example: "dokumen.zip" }],
    sampleResult: { url: "url", name: "string", size: 0, type: "application/zip" }
  },
  {
    category: "ai",
    slug: "chat",
    name: "AI Chat",
    method: "GET",
    path: "/ai/chat",
    description: "Mengobrol dengan model AI dan menerima jawaban dalam Bahasa Indonesia.",
    params: [
      { name: "text", required: true, type: "string", example: "Jelaskan apa itu REST API" },
      { name: "model", required: false, type: "string", example: "x-ai/grok-3-mini-beta" }
    ],
    sampleResult: { model: "string", sessionId: "string", answer: "string" }
  },
  {
    category: "ai",
    slug: "image",
    name: "Text to Image",
    method: "GET",
    path: "/ai/image",
    description: "Hasilkan gambar dari deskripsi teks menggunakan AI.",
    params: [
      { name: "prompt", required: true, type: "string", example: "neon samurai walking in the rain" },
      { name: "ratio", required: false, type: "string", example: "1:1" }
    ],
    sampleResult: { prompt: "string", ratio: "1:1", image: "url" }
  },
  {
    category: "s",
    slug: "lyrics",
    name: "Lyrics Search",
    method: "GET",
    path: "/s/lyrics",
    description: "Cari lirik lagu berdasarkan judul dan nama artis.",
    params: [{ name: "q", required: true, type: "string", example: "Lathi Weird Genius" }],
    sampleResult: { title: "string", artist: "string", album: "string", duration: "string", lyrics: "string" }
  },
  {
    category: "s",
    slug: "wiki",
    name: "Wikipedia Search",
    method: "GET",
    path: "/s/wiki",
    description: "Cari ringkasan artikel Wikipedia Bahasa Indonesia.",
    params: [{ name: "q", required: true, type: "string", example: "Kota Bandung" }],
    sampleResult: { title: "string", url: "url", summary: "string", relatedResults: [{ title: "string", snippet: "string" }] }
  },
  {
    category: "s",
    slug: "ttstalk",
    name: "TikTok Stalk",
    method: "GET",
    path: "/s/ttstalk",
    description: "Lihat data profil publik dan video terbaru sebuah akun TikTok.",
    params: [{ name: "username", required: true, type: "string", example: "tiktok" }],
    sampleResult: { username: "string", avatar: "url", followers: 0, following: 0, likes: 0, videos: [{ cover: "url", downloadUrl: "url" }] }
  },
  {
    category: "t",
    slug: "nslookup",
    name: "NS Lookup",
    method: "GET",
    path: "/t/nslookup",
    description: "Periksa informasi web server dan DNS dari sebuah domain.",
    params: [{ name: "domain", required: true, type: "string", example: "google.com" }],
    sampleResult: { domain: "string", records: "object" }
  },
  {
    category: "t",
    slug: "tts",
    name: "Text to Speech",
    method: "GET",
    path: "/t/tts",
    description: "Ubah teks menjadi suara dalam format audio.",
    params: [{ name: "text", required: true, type: "string", example: "Selamat datang di RAFZ API" }],
    sampleResult: { text: "string", audio: "url" }
  },
  {
    category: "t",
    slug: "code2img",
    name: "Code to Image",
    method: "GET",
    path: "/t/code2img",
    description: "Ubah cuplikan kode menjadi gambar PNG siap dibagikan. Mengembalikan berkas gambar secara langsung.",
    params: [
      { name: "code", required: true, type: "string", example: "console.log('Hello RAFZ API')" },
      { name: "lang", required: false, type: "string", example: "javascript" },
      { name: "theme", required: false, type: "string", example: "seti" }
    ],
    responseType: "image"
  }
];

export function getEndpointsByCategory(slug) {
  return ENDPOINTS.filter((endpoint) => endpoint.category === slug);
}

export function getCategory(slug) {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getEndpoint(category, slug) {
  return ENDPOINTS.find((endpoint) => endpoint.category === category && endpoint.slug === slug);
}
