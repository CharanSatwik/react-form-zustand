import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, PersonalInfoInput } from "@/schemas/validation";
import { useFormStore } from "@/store/useFormStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Mail, Phone, ArrowRight } from "lucide-react";

export const Step1PersonalInfo: React.FC = () => {
  const { formData, updatePersonalInfo, nextStep, markStepComplete } = useFormStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData.personalInfo,
    mode: "onTouched",
  });

  // Sync form if Zustand state updates (e.g. Fill Demo Data)
  useEffect(() => {
    reset(formData.personalInfo);
  }, [formData.personalInfo, reset]);

  const onSubmit = (data: PersonalInfoInput) => {
    updatePersonalInfo(data);
    markStepComplete(1);
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
      aria-label="Personal Information Form"
    >
      <div className="space-y-1.5 text-left mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Personal Information
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Please provide your contact details to begin your account setup.
        </p>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <Input
          label="Full Name"
          required
          placeholder="e.g. Sarah Connor"
          autoComplete="name"
          autoFocus
          icon={<User className="h-4 w-4" />}
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        {/* Email Address */}
        <Input
          label="Email Address"
          type="email"
          required
          placeholder="e.g. sarah@cyberdyne.io"
          autoComplete="email"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Phone Number (Optional) */}
        <Input
          label="Phone Number"
          type="tel"
          placeholder="e.g. +1 (555) 019-2834"
          autoComplete="tel"
          helperText="We'll only use this for critical security verification."
          icon={<Phone className="h-4 w-4" />}
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-end pt-6 mt-8 border-t border-slate-100 dark:border-slate-800">
        <Button
          type="submit"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className="w-full sm:w-auto"
        >
          Next: Address Details
        </Button>
      </div>
    </form>
  );
};
