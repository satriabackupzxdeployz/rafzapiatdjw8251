import * as cheerio from "cheerio";
import { UA, fetchWithTimeout } from "./_shared";

const ENDPOINT = "https://albertaibdconsortium.ca/";

export async function tiktokDownload(url) {
  const body = new URLSearchParams({ url }).toString();

  const response = await fetchWithTimeout(ENDPOINT, {
    method: "POST",
    headers: {
      "HX-Request": "true",
      "HX-Current-URL": ENDPOINT,
      "HX-Boosted": "true",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": UA
    },
    body
  });

  if (!response.ok) {
    throw new Error(`Upstream returned ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const title = $("p.mt-2.line-clamp-3").text().trim();
  const author = $("h3.mt-6").text().trim();
  const thumbnail = $("img.h-40.w-40").attr("src") || null;

  const links = [];
  $('a[href^="https://"]').each((_, el) => {
    const href = $(el).attr("href");
    const text = $(el).text().toLowerCase();
    if (!href || !href.includes("token=")) return;
    links.push({
      type: text.includes("mp3") ? "audio" : "video",
      label: $(el).text().trim(),
      url: href
    });
  });

  const video = links.find((link) => link.type === "video")?.url || null;
  const audio = links.find((link) => link.type === "audio")?.url || null;

  if (!video && !audio) {
    throw new Error("No downloadable media found for this TikTok link");
  }

  return {
    source: url,
    title: title || null,
    author: author || null,
    thumbnail,
    video,
    audio
  };
}
