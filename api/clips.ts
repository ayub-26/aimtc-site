import { json, readState } from "./_lib.js";

// সবার জন্য খোলা: শুধু তৈরি অডিওর তালিকা পড়া যায়
export async function GET() {
  try {
    return json({ clips: (await readState()).clips });
  } catch (error) {
    console.error(error);
    return json({ error: "তালিকা পড়া যায়নি" }, 500);
  }
}
