import { z } from "zod";

// Step 1: Personal Information Schema
export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full Name is required")
    .min(2, "Full Name must be at least 2 characters")
    .max(80, "Full Name must not exceed 80 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Full Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address (e.g., alex@example.com)"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => {
      if (!val || val.length === 0) return true;
      // Allows + sign at start, digits, spaces, parentheses, hyphens, between 7 and 15 digits
      const digitsOnly = val.replace(/\D/g, "");
      return digitsOnly.length >= 7 && digitsOnly.length <= 15;
    }, {
      message: "Please enter a valid phone number (7-15 digits)",
    }),
});

export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;

// Step 2: Address Details Schema
export const addressDetailsSchema = z.object({
  streetAddress: z
    .string()
    .trim()
    .min(1, "Street address is required")
    .min(5, "Street address must be at least 5 characters"),
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .min(2, "City must be at least 2 characters"),
  zipCode: z
    .string()
    .trim()
    .min(1, "Zip code is required")
    .regex(/^\d{4,10}$/, "Zip code must be numeric and between 4 and 10 digits"),
  country: z
    .string()
    .trim()
    .min(1, "Please select your country"),
});

export type AddressDetailsInput = z.infer<typeof addressDetailsSchema>;

// Step 3: Account Credentials Schema
export const accountCredentialsSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must not exceed 30 characters")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username may only contain letters, numbers, underscores, and hyphens"
      ),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type AccountCredentialsInput = z.infer<typeof accountCredentialsSchema>;

// Countries list for Step 2 Dropdown
export const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "JP", name: "Japan" },
  { code: "BR", name: "Brazil" },
  { code: "SG", name: "Singapore" },
  { code: "NL", name: "Netherlands" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "CH", name: "Switzerland" },
  { code: "SE", name: "Sweden" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
] as const;

