import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import * as yup from "yup";
import { loginApi } from "../../../api/authApi"; // Import the API method
import { useAuthContext } from "../../context/useAuthContext";

export default function useLogin({ request, navPath }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, checkISAuthenticated } = useAuthContext();

  // Validation schema
  //   const schemaResolver = yup.object().shape({
  //     email: yup
  //       .string()
  //       .email('Please enter a valid email')
  //       .required('Please enter Email or Phone No'),
  //     password: yup.string().required('Please enter Password'),
  //   });
  const schemaResolver = yup.object().shape({
    email: yup
      .string()
      .required("Please enter Email or Phone No")
      .test(
        "email-or-phone",
        "Please enter a valid email or phone number",
        (value) => {
          // Check if the value is a valid email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          // Check if the value is a valid phone number (adjust regex as per your requirements)
          const phoneRegex = /^[0-9]{10}$/;

          // Return true if either email or phone number is valid
          return emailRegex.test(value) || phoneRegex.test(value);
        }
      ),
    password: yup.string().required("Please enter Password"),
  });
  // React Hook Form setup
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schemaResolver),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Determine redirect URL
  const redirectUrl = searchParams.get("next") ?? navPath;

  // Login function
  const login = handleSubmit(async (values) => {
    setLoading(true);
    try {
      // Call the login API
      const response = await loginApi(
        request,
        values.email.trim(),
        values.password.trim()
      );

      if (response.token) {
        // Save session in context
        // saveSession({
        // 	...response,
        // 	token: response.token,
        // });
        localStorage.setItem("authToken", response.token);

        // Show success toast and navigate
        toast.success("Successfully logged in. Redirecting....", {
          position: "top-right",
          duration: 2000,
        });
        navigate(navPath);
      }
    } catch (error) {
      // Handle errors and show appropriate toast messages
      const errorMessage = error.message || "An error occurred during login.";
      toast.error(errorMessage, {
        position: "top-right",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  });

  return {
    loading,
    login,
    redirectUrl,
    isAuthenticated,
    control,
    checkISAuthenticated,
  };
}
