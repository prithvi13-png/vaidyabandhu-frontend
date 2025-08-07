import { useState, useEffect, useCallback, useRef } from "react";
import axiosInstance from "../../api/axiosInstance";
import { responseError } from "../utiles/responseError";

export const useFetch = ({
  method = "GET",
  request,
  params = {},
  payload = {},
  dontCall = false,
} = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  const fetchData = useCallback(async () => {
    if (!request) {
      console.warn("useFetch: No request provided, skipping API call.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let response;

      if (typeof request === "function") {
        response = await request({
          params: params || {},
          payload: payload || {},
        });
        if (isMounted.current) setData(response);
        return response;
      }

      const config = { params: params || {} };

      switch (method.toUpperCase()) {
        case "POST":
          response = await axiosInstance.post(request, payload, config);
          break;
        case "PUT":
          response = await axiosInstance.put(request, payload, config);
          break;
        case "PATCH":
          response = await axiosInstance.patch(request, payload, config);
          break;
        case "DELETE":
          response = await axiosInstance.delete(request, {
            ...config,
            data: payload,
          });
          break;
        case "GET":
        default:
          response = await axiosInstance.get(request, config);
          break;
      }

      if (isMounted.current) setData(response.data);
      return response.data;
    } catch (err) {
      if (isMounted.current) {
        setData(null);
        const cleanedError = responseError(err);
        setError(
          typeof cleanedError === "string"
            ? cleanedError
            : cleanedError?.message || "Unknown error"
        );
      }
      return null;
    } finally {
      if (isMounted.current) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, request, JSON.stringify(params), JSON.stringify(payload)]);

  useEffect(() => {
    isMounted.current = true;
    if (!dontCall && request) {
      fetchData();
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [fetchData, dontCall, request]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
