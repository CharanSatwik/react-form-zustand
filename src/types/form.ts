export interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
}

export interface AddressDetails {
  streetAddress: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface AccountCredentials {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface MultiStepFormData {
  personalInfo: PersonalInfo;
  addressDetails: AddressDetails;
  accountCredentials: AccountCredentials;
}

export type StepNumber = 1 | 2 | 3 | 4;

export interface StepConfig {
  number: StepNumber;
  id: string;
  title: string;
  description: string;
  shortTitle: string;
}

