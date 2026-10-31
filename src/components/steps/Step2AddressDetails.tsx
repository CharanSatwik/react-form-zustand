import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressDetailsSchema, AddressDetailsInput, COUNTRIES } from "@/schemas/validation";
import { useFormStore } from "@/store/useFormStore";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Home, Building2, MapPin, ArrowRight, ArrowLeft } from "lucide-react";

export const Step2AddressDetails: React.FC = () => {
  const { formData, updateAddressDetails, nextStep, prevStep, markStepComplete } =
    useFormStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressDetailsInput>({
    resolver: zodResolver(addressDetailsSchema),
    defaultValues: formData.addressDetails,
    mode: "onTouched",
  });

  // Sync form if Zustand state updates (e.g. Back/Next or Demo fill)
  useEffect(() => {
    reset(formData.addressDetails);
  }, [formData.addressDetails, reset]);

  const onSubmit = (data: AddressDetailsInput) => {
    updateAddressDetails(data);
    markStepComplete(2);
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
      aria-label="Address Details Form"
    >
      <div className="space-y-1.5 text-left mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Address Details
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Where should we send your official registration confirmation and docs?
        </p>
      </div>

      <div className="space-y-5">
        {/* Street Address */}
        <Input
          label="Street Address"
          required
          placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
          autoComplete="street-address"
          autoFocus
          icon={<Home className="h-4 w-4" />}
          error={errors.streetAddress?.message}
          {...register("streetAddress")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* City */}
          <Input
            label="City"
            required
            placeholder="e.g. Springfield"
            autoComplete="address-level2"
            icon={<Building2 className="h-4 w-4" />}
            error={errors.city?.message}
            {...register("city")}
          />

          {/* Zip Code */}
          <Input
            label="Zip / Postal Code"
            required
            placeholder="e.g. 97477"
            autoComplete="postal-code"
            icon={<MapPin className="h-4 w-4" />}
            error={errors.zipCode?.message}
            {...register("zipCode")}
          />
        </div>

        {/* Country Dropdown */}
        <Select
          label="Country"
          required
          placeholder="Select your country..."
          options={COUNTRIES.map((c) => ({ value: c.name, label: c.name }))}
          error={errors.country?.message}
          {...register("country")}
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
          Next: Account Credentials
        </Button>
      </div>
    </form>
  );
};
