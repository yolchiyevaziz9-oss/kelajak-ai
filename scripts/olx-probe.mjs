// OLX HTML parsing — probe to confirm structure
import https from "https";

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let html = "";
        res.on("data", (c) => (html += c));
        res.on("end", () => resolve(html));
      })
      .on("error", reject);
  });
}

const html = await fetch("https://www.olx.uz/rabota/");
console.log("HTML size:", html.length);

const start = html.indexOf("window.__PRERENDERED_STATE__=");
if (start < 0) {
  console.log("PRERENDERED_STATE not found");
  process.exit(0);
}
const quoteStart = html.indexOf('"', start);
let i = quoteStart + 1;
while (i < html.length) {
  if (html[i] === "\\") {
    i += 2;
    continue;
  }
  if (html[i] === '"') break;
  i++;
}
const raw = html.slice(quoteStart, i + 1);
const decoded = JSON.parse(raw);
const data = JSON.parse(decoded);
const ads = data?.listing?.listing?.ads ?? [];
console.log("Total ads:", ads.length);

if (ads[0]) {
  const s = ads[0];
  console.log("---");
  console.log("keys:", Object.keys(s).slice(0, 25).join(","));
  console.log("title:", s.title);
  console.log("url:", s.url);
  console.log("location:", JSON.stringify(s.location));
  console.log("price/salary:", JSON.stringify(s.price));
  console.log("params (first 5):", JSON.stringify(s.params?.slice(0, 5)));
  console.log(
    "description (200):",
    (s.description || "").replace(/<[^>]+>/g, "").slice(0, 200)
  );
}
