import { useState } from "react";
import { checkEmailAvailabilityAPI } from "../services/userService";

const useCheckEmail = () => {
  const [emailStatus, setEmailStatus] = useState<{
    isValid: boolean;
    message: string;
  }>({
    isValid: true,
    message: "",
  });

  const checkEmail = async (email: string) => {
    const result = await checkEmailAvailabilityAPI(email);
    setEmailStatus(result);
  };

  return { emailStatus, checkEmail };
};

export default useCheckEmail;
