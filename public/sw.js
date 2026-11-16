// AIMTC সার্ভিস ওয়ার্কার — অফলাইন সাপোর্ট
// সাইটে বড় পরিবর্তন করলে নিচের সংস্করণ নম্বর বাড়ান (v1 → v2)
const CACHE = "aimtc-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.add("/index.html")));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // পেজ খোলা: আগে নেটওয়ার্ক, না পেলে সংরক্ষিত পেজ
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("/index.html")),
    );
    return;
  }

  // ছবি, CSS, JS: আগে সংরক্ষিত, না থাকলে নেটওয়ার্ক থেকে এনে সংরক্ষণ
  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        }),
    ),
  );
});
