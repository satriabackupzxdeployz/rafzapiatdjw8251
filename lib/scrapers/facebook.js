import * as cheerio from "cheerio";
import { UA, fetchWithTimeout } from "./_shared";

const HOME = "https://fdown.world/";
const RESULT_ENDPOINT = "https://fdown.world/result.php";

export async function facebookDownload(url) {
  const homeResponse = await fetchWithTimeout(HOME, {
    headers: { "User-Agent": UA }
  });
  const cookie = homeResponse.headers.get("set-cookie") || "";

  const body = new URLSearchParams({
    codehap_link: url,
    codehap: "true"
  }).toString();

  const resultResponse = await fetchWithTimeout(RESULT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "*/*",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent": UA,
      Cookie: cookie,
      Referer: HOME
    },
    body
  });

  if (!resultResponse.ok) {
    throw new Error(`Upstream returned ${resultResponse.status}`);
  }

  const html = await resultResponse.text();
  const $ = cheerio.load(html);

  const qualities = [];
  $(".download-btn").each((_, el) => {
    const href = $(el).attr("href");
    const label = $(el).text().trim().replace(/\s+/g, " ");
    if (!href || href === "#") return;
    qualities.push({
      label,
      url: href.startsWith("http") ? href : `https://fdown.world${href}`
    });
  });

  const thumbnail = $("img").first().attr("src") || null;

  if (qualities.length === 0) {
    throw new Error("No downloadable media found for this Facebook link");
  }

  const hd = qualities.find((item) => /hd|720/i.test(item.label));
  const sd = qualities.find((item) => /sd|360/i.test(item.label));
  const image = qualities.find((item) => /image/i.test(item.label));

  return {
    source: url,
    thumbnail,
    video: hd?.url || sd?.url || qualities[0]?.url || null,
    videoSd: sd?.url || null,
    image: image?.url || thumbnail,
    qualities
  };
}
