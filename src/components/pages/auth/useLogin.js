// hooks/useLogin.js

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import * as yup from "yup";
import { loginApi } from "../../../api/authApi";
import { useAuthContext } from "../../context/useAuthContext";

export default function useLogin({ request, navPath }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    isAuthenticated,
    checkISAuthenticated,
    setIsAuthenticated,
    setUser,
  } = useAuthContext();

  const schemaResolver = yup.object().shape({
    email: yup
      .string()
      .required("Please enter Email or Phone No")
      .test(
        "email-or-phone",
        "Please enter a valid email or phone number",
        (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const phoneRegex = /^[0-9]{10}$/;
          return emailRegex.test(value) || phoneRegex.test(value);
        }
      ),
    password: yup.string().required("Please enter Password"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schemaResolver),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const redirectUrl = searchParams.get("next") ?? navPath;

  const login = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const response = await loginApi(
        request,
        values.email.trim(),
        values.password.trim()
      );

      if (response.data?.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setIsAuthenticated(true);
        setUser(response.data); // <-- store response data globally

        toast.success("Successfully logged in. Redirecting....", {
          position: "top-right",
          duration: 2000,
        });
        navigate(redirectUrl);
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred during login.",
        {
          position: "top-right",
          duration: 2000,
        }
      );
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
