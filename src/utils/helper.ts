export const validatePolicyInputs = (data: any) => {
  const errors: any = {};

  if (!data.dob || calculateAge(data.dob) < 23 || calculateAge(data.dob) > 56) {
    errors.dob = "Age must be between 23 and 56";
  }

  if (data.sumAssured < 5000000 || data.sumAssured < 10 * data.modalPremium) {
    errors.sumAssured =
      "Sum Assured must be at least 5000000 or 10 times the Modal Premium";
  }

  if (Number(data.pt) < Number(data.ppt)) {
    errors.pt = "PT must be greater than PPT";
  }

  return errors;
};

const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  return currentDate.getFullYear() - birthDate.getFullYear();
};
