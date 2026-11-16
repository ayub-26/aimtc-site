import { z } from "zod";

// Bangladeshi or international phone: digits, spaces, +, - ; 6–20 chars after trimming.
export const joinSchema = z.object({
  fullName: z.string().trim().min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে").max(100, "নাম ১০০ অক্ষরের মধ্যে লিখুন"),
  phone: z
    .string()
    .trim()
    .min(6, "সঠিক ফোন নম্বর দিন")
    .max(20, "সঠিক ফোন নম্বর দিন")
    .regex(/^[+0-9\s-]+$/, "শুধু সংখ্যা ব্যবহার করুন"),
  email: z
    .string()
    .trim()
    .max(255)
    .email("সঠিক ইমেইল দিন")
    .optional()
    .or(z.literal("")),
  age: z
    .union([z.coerce.number().int("সঠিক বয়স দিন").min(4, "বয়স ৪ থেকে ১০০ এর মধ্যে দিন").max(100, "বয়স ৪ থেকে ১০০ এর মধ্যে দিন"), z.literal("")])
    .optional(),
  program: z.string().trim().min(2, "একটি প্রোগ্রাম নির্বাচন করুন").max(100),
  message: z.string().trim().max(1000, "বার্তা ১০০০ অক্ষরের মধ্যে লিখুন").optional().or(z.literal("")),
});

export type JoinInput = z.input<typeof joinSchema>;
