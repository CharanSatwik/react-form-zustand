import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  accountCredentialsSchema,
  AccountCredentialsInput,
} from "@/schemas/validation";
import { useFormStore } from "@/store/useFormStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PasswordStrengthMeter } from "@/components/ui/PasswordStrengthMeter";
import {
  AtSign,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export const Step3AccountCredentials: React.FC = () => {
  const {
    formData,
    updateAccountCredentials,
    nextStep,
    prevStep,
    markStepComplete,
  } = useFormStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccountCredentialsInput>({
    resolver: zodResolver(accountCredentialsSchema),
    defaultValues: formData.accountCredentials,
    mode: "onTouched",
  });

  const passwordValue = useWatch({ control, name: "password" });

  useEffect(() => {
    reset(formData.accountCredentials);
  }, [formData.accountCredentials, reset]);

  const onSubmit = (data: AccountCredentialsInput) => {
    updateAccountCredentials(data);
    markStepComplete(3);
    nextStep();
  };

  const handleBack = () => {
    prevStep();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
      aria-label="Account Credentials Form"
    >
      <div className="space-y-1.5 text-left mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Account Credentials
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Create a secure username and password to protect your account.
        </p>
      </div>

      <div className="space-y-5">
        {/* Username */}
        <Input
          label="Username"
          required
          placeholder="e.g. alex_rivers"
          autoComplete="username"
          autoFocus
          icon={<AtSign className="h-4 w-4" />}
          helperText="Alphanumeric characters, underscores, and hyphens allowed."
          error={errors.username?.message}
          {...register("username")}
        />

        {/* Password */}
        <div>
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="At least 8 characters..."
            autoComplete="new-password"
            icon={<Lock className="h-4 w-4" />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none p-1 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            error={errors.password?.message}
            {...register("password")}
          />
          {/* Dynamic Password Strength Visualizer */}
          <PasswordStrengthMeter password={passwordValue} />
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          required
          placeholder="Re-enter your password..."
          autoComplete="new-password"
          icon={<ShieldCheck className="h-4 w-4" />}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none p-1 cursor-pointer"
              aria-label={
                showConfirmPassword
                  ? "Hide confirmation password"
                  : "Show confirmation password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-100 dark:border-slate-800 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back
        </Button>

        <Button
          type="submit"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Next: Review & Confirm
        </Button>
      </div>
    </form>
  );
};
