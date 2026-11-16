import { describe, expect, it } from "vitest";

import { joinSchema } from "./join-schema";

const valid = { fullName: "আব্দুল্লাহ", phone: "01628102071", program: "হিফজুল কোরআন" };

describe("join form rules", () => {
  it("accepts name, phone and program without optional fields", () => {
    expect(joinSchema.safeParse(valid).success).toBe(true);
  });

  it("requires a phone number", () => {
    expect(joinSchema.safeParse({ ...valid, phone: "" }).success).toBe(false);
  });

  it("requires a program", () => {
    expect(joinSchema.safeParse({ ...valid, program: "" }).success).toBe(false);
  });

  it("rejects an age above 100", () => {
    expect(joinSchema.safeParse({ ...valid, age: 120 }).success).toBe(false);
  });
});
