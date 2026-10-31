import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  personalInfoSchema,
  addressDetailsSchema,
  accountCredentialsSchema,
} from "../src/schemas/validation.js";

describe("Step 1: Personal Information Validation", () => {
  test("accepts valid personal info", () => {
    const valid = {
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      phone: "+1 (555) 123-4567",
    };
    const result = personalInfoSchema.safeParse(valid);
    assert.equal(result.success, true);
  });

  test("accepts personal info with optional phone omitted", () => {
    const valid = {
      fullName: "Alan Turing",
      email: "alan@example.com",
      phone: "",
    };
    const result = personalInfoSchema.safeParse(valid);
    assert.equal(result.success, true);
  });

  test("rejects empty full name", () => {
    const invalid = {
      fullName: "",
      email: "test@example.com",
    };
    const result = personalInfoSchema.safeParse(invalid);
    assert.equal(result.success, false);
    assert.match(result.error.issues[0].message, /Full Name is required/i);
  });

  test("rejects invalid email format", () => {
    const invalid = {
      fullName: "Grace Hopper",
      email: "not-an-email",
    };
    const result = personalInfoSchema.safeParse(invalid);
    assert.equal(result.success, false);
    assert.match(result.error.issues[0].message, /valid email/i);
  });
});

describe("Step 2: Address Details Validation", () => {
  test("accepts valid address details", () => {
    const valid = {
      streetAddress: "221B Baker Street",
      city: "London",
      zipCode: "12345",
      country: "United Kingdom",
    };
    const result = addressDetailsSchema.safeParse(valid);
    assert.equal(result.success, true);
  });

  test("rejects non-numeric zip code", () => {
    const invalid = {
      streetAddress: "221B Baker Street",
      city: "London",
      zipCode: "ABCDE",
      country: "United Kingdom",
    };
    const result = addressDetailsSchema.safeParse(invalid);
    assert.equal(result.success, false);
    assert.match(result.error.issues[0].message, /Zip code must be numeric/i);
  });

  test("rejects short street address", () => {
    const invalid = {
      streetAddress: "St",
      city: "London",
      zipCode: "12345",
      country: "United Kingdom",
    };
    const result = addressDetailsSchema.safeParse(invalid);
    assert.equal(result.success, false);
    assert.match(result.error.issues[0].message, /at least 5 characters/i);
  });
});

describe("Step 3: Account Credentials Validation", () => {
  test("accepts valid credentials with matching passwords", () => {
    const valid = {
      username: "supercoder_42",
      password: "Password123!",
      confirmPassword: "Password123!",
    };
    const result = accountCredentialsSchema.safeParse(valid);
    assert.equal(result.success, true);
  });

  test("rejects password shorter than 8 characters", () => {
    const invalid = {
      username: "user123",
      password: "pass",
      confirmPassword: "pass",
    };
    const result = accountCredentialsSchema.safeParse(invalid);
    assert.equal(result.success, false);
    assert.match(result.error.issues[0].message, /at least 8 characters/i);
  });

  test("rejects mismatched confirm password", () => {
    const invalid = {
      username: "user123",
      password: "Password123!",
      confirmPassword: "DifferentPassword456!",
    };
    const result = accountCredentialsSchema.safeParse(invalid);
    assert.equal(result.success, false);
    const hasMismatch = result.error.issues.some((i) =>
      i.message.includes("Passwords do not match")
    );
    assert.equal(hasMismatch, true);
  });
});

