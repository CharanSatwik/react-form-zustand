import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  MultiStepFormData,
  PersonalInfo,
  AddressDetails,
  AccountCredentials,
  StepNumber,
} from "@/types/form";

export interface FormState {
  currentStep: StepNumber;
  direction: 1 | -1;
  formData: MultiStepFormData;
  completedSteps: number[];
  isSubmitted: boolean;
  submittedPayload: MultiStepFormData | null;
  _hasHydrated: boolean;

  // Actions
  setStep: (step: StepNumber) => void;
  nextStep: () => void;
  prevStep: () => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateAddressDetails: (data: Partial<AddressDetails>) => void;
  updateAccountCredentials: (data: Partial<AccountCredentials>) => void;
  markStepComplete: (step: StepNumber) => void;
  submitForm: () => MultiStepFormData;
  resetForm: () => void;
  fillDemoData: () => void;
  setHasHydrated: (state: boolean) => void;
}

const initialFormData: MultiStepFormData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
  },
  addressDetails: {
    streetAddress: "",
    city: "",
    zipCode: "",
    country: "",
  },
  accountCredentials: {
    username: "",
    password: "",
    confirmPassword: "",
  },
};

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      direction: 1,
      formData: initialFormData,
      completedSteps: [],
      isSubmitted: false,
      submittedPayload: null,
      _hasHydrated: false,

      setStep: (step: StepNumber) => {
        const current = get().currentStep;
        set({
          currentStep: step,
          direction: step > current ? 1 : -1,
        });
      },

      nextStep: () => {
        const current = get().currentStep;
        if (current < 4) {
          const next = (current + 1) as StepNumber;
          const completed = new Set(get().completedSteps);
          completed.add(current);
          set({
            currentStep: next,
            direction: 1,
            completedSteps: Array.from(completed),
          });
        }
      },

      prevStep: () => {
        const current = get().currentStep;
        if (current > 1) {
          set({
            currentStep: (current - 1) as StepNumber,
            direction: -1,
          });
        }
      },

      updatePersonalInfo: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            personalInfo: { ...state.formData.personalInfo, ...data },
          },
        })),

      updateAddressDetails: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            addressDetails: { ...state.formData.addressDetails, ...data },
          },
        })),

      updateAccountCredentials: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            accountCredentials: {
              ...state.formData.accountCredentials,
              ...data,
            },
          },
        })),

      markStepComplete: (step: StepNumber) =>
        set((state) => {
          const completed = new Set(state.completedSteps);
          completed.add(step);
          return { completedSteps: Array.from(completed) };
        }),

      submitForm: () => {
        const data = get().formData;
        const completed = [1, 2, 3, 4];
        // Log explicitly to browser console as specified in requirements
        console.group("🚀 Multi-Step Registration Form Submitted");
        console.log("Full Submission Data:", data);
        console.log("Personal Info:", data.personalInfo);
        console.log("Address Details:", data.addressDetails);
        console.log("Account Credentials:", {
          username: data.accountCredentials.username,
          password: "••••••••", // mask password for log display safety
        });
        console.log("Timestamp:", new Date().toISOString());
        console.groupEnd();

        set({
          isSubmitted: true,
          submittedPayload: data,
          completedSteps: completed,
        });

        return data;
      },

      resetForm: () =>
        set({
          currentStep: 1,
          direction: -1,
          formData: initialFormData,
          completedSteps: [],
          isSubmitted: false,
          submittedPayload: null,
        }),

      fillDemoData: () =>
        set({
          formData: {
            personalInfo: {
              fullName: "Jane Doe",
              email: "jane.doe@example.com",
              phone: "+1 (555) 234-5678",
            },
            addressDetails: {
              streetAddress: "742 Evergreen Terrace",
              city: "Springfield",
              zipCode: "97477",
              country: "United States",
            },
            accountCredentials: {
              username: "janedoe_dev",
              password: "SuperSecretPassword123!",
              confirmPassword: "SuperSecretPassword123!",
            },
          },
          completedSteps: [1, 2, 3],
        }),

      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
    }),
    {
      name: "multistep-form-registration-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

