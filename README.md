# আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার — ওয়েবসাইট

সম্পূর্ণ static সাইট (React + TanStack + Tailwind)। কোনো সার্ভার, ডেটাবেস বা API key লাগে না।
ভর্তি ফর্ম পূরণ করলে তথ্যসহ WhatsApp বার্তা খোলে (নম্বর `src/lib/site-data.ts`-এ)।

## চালানো
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # ফলাফল: dist/client/
```

## অনলাইনে দেওয়া
`dist/client/` ফোল্ডারটি Netlify, Cloudflare Pages, GitHub Pages বা যেকোনো হোস্টিংয়ে আপলোড করুন।
সব ঠিকানা `index.html`-এ ফেরত পাঠাতে হবে (`public/_redirects` Netlify/Cloudflare-এর জন্য দেওয়া আছে)।
Nginx হলে: `try_files $uri /index.html;`। Docker: `docker build -t aimtc . && docker run -p 80:80 aimtc`

## বিষয়বস্তু বদলানো
ঠিকানা, ফোন, ইমেইল, WhatsApp, প্রোগ্রাম, আয়াত, হাদিস, গ্যালারি — সব `src/lib/site-data.ts`-এ। ছবি `src/assets/`-এ।
