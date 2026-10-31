# Multi-Step Registration Form with React-Hook-Form & Zustand

A robust, accessible, and animated multi-step user registration application built with **Next.js (App Router)**, **React-Hook-Form**, **Zod**, and **Zustand** persistent state management.

---

## 🌟 Key Features & Requirements

### 1. Step-by-Step Registration Flow
- **Step 1: Personal Information**
  - **Full Name** (Required, minimum 2 characters, alphabetic characters + spaces/hyphens/apostrophes)
  - **Email** (Required, validated email format)
  - **Phone Number** (Optional, validated for standard international/national digit lengths 7-15 digits if entered)
- **Step 2: Address Details**
  - **Street Address** (Required, minimum 5 characters)
  - **City** (Required, minimum 2 characters)
  - **Zip Code** (Required, numeric 4-10 digits)
  - **Country** (Required, selectable from styled dropdown)
- **Step 3: Account Credentials**
  - **Username** (Required, 3-30 characters, alphanumeric + underscores/hyphens)
  - **Password** (Required, minimum 8 characters, equipped with real-time strength meter & checklist)
  - **Confirm Password** (Must match Password with custom refinement check)
  - **Password Visibility Toggles** (Quickly show/hide password and confirmation)
- **Step 4: Confirmation & Review**
  - Full readable summary of all data entered across previous steps
  - Inline **"Edit"** action buttons per card allowing direct navigation to Step 1, Step 2, or Step 3
  - Masked password with optional quick toggle
  - Terms and Conditions acknowledgment checkbox
  - Final submission with celebratory confetti animation
  - Console logging of the entire registration payload
  - Inspection card with formatted JSON payload and "Copy JSON" button
  - "Register Another Account" reset trigger

### 2. State Management with Zustand
- Global centralized store (`useFormStore`)
- Automatic persistence via Zustand `persist` middleware (`localStorage`)
- Safe SSR hydration handling to eliminate Next.js hydration mismatch errors
- Instant navigation between visited steps via clickable step tabs
- **Demo Autofill helper**: Click `Autofill Demo` in the top right to populate valid test data instantly.

### 3. Validation with React-Hook-Form & Zod
- Isolated schemas per step using `@hookform/resolvers/zod`
- Interactive validation mode (`onTouched`): inputs show immediate inline error messages upon leaving focus or attempting submission
- Navigation guards prevent moving to subsequent steps until current step inputs are valid
- Screen-reader accessible form errors with `aria-invalid`, `aria-describedby`, and `role="alert"`

### 4. Animations & Accessibility (Bonus Features)
- Direction-aware slide transitions using **Framer Motion** (slides right-to-left on "Next", left-to-right on "Back")
- Visual step indicator with progress bar percentage, step numbers, completion checkmarks, and responsive labels
- Fully responsive layout tailored for mobile, tablet, and desktop screens
- Native light and dark mode styles with Tailwind CSS

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.17+` or `v20+` or `v22+`
- npm (or yarn / pnpm)

### Installation

```bash
# Clone the repository and navigate into the folder
cd multistep-form-react-zustand

# Install dependencies
npm install
```

### Running in Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Automated Validation Tests

```bash
npm test
```

Runs 10 automated unit test cases verifying Zod validation schemas for all steps.

### Production Build

```bash
npm run build
npm start
```

---

## 📂 Project Architecture

```
multistep-form-react-zustand/
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind CSS styling and theme definitions
│   │   ├── layout.tsx           # Root Next.js layout & metadata
│   │   └── page.tsx             # Main landing page hosting the multi-step form
│   ├── components/
│   │   ├── MultiStepForm.tsx    # Orchestrator with Framer Motion transitions & toolbar
│   │   ├── StepIndicator.tsx    # Progress bar, tab indicators, and completion state
│   │   ├── steps/
│   │   │   ├── Step1PersonalInfo.tsx      # Step 1 form & RHF integration
│   │   │   ├── Step2AddressDetails.tsx    # Step 2 address inputs & dropdown
│   │   │   ├── Step3AccountCredentials.tsx# Step 3 credentials & password meter
│   │   │   ├── Step4Confirmation.tsx      # Step 4 review cards & edit triggers
│   │   │   └── SuccessView.tsx            # Celebration view, JSON log & reset
│   │   └── ui/
│   │       ├── Button.tsx                 # Styled button with variants & loading state
│   │       ├── Input.tsx                  # Accessible input with inline error & icons
│   │       ├── Select.tsx                 # Accessible country select dropdown
│   │       └── PasswordStrengthMeter.tsx  # Real-time password strength visualizer
│   ├── schemas/
│   │   └── validation.ts        # Zod schemas for Step 1, Step 2, and Step 3
│   ├── store/
│   │   └── useFormStore.ts      # Zustand store with persistence middleware
│   └── types/
│       └── form.ts              # TypeScript interfaces for multi-step form data
├── tests/
│   └── form-validation.test.mjs # 10 unit test cases for validation schemas
└── package.json
```
