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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  // Store the latest values in refs to avoid stale closures
  const latestValues = useRef({
    method,
    request,
    params,
    payload,
  });

  // Update refs whenever values change
  useEffect(() => {
    latestValues.current = { method, request, params, payload };
  }, [method, request, params, payload]);

  // Stable fetchData function that doesn't cause re-renders
  const fetchData = useCallback(async (overrideParams, overridePayload) => {
    const {
      request: currentRequest,
      method: currentMethod,
      params: currentParams,
      payload: currentPayload,
    } = latestValues.current;

    if (!currentRequest) {
      console.warn("useFetch: No request provided, skipping API call.");
      return null;
    }

    // Cancel previous request if it's still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    setError(null);

    try {
      let response;

      // Use override values if provided, otherwise use current values
      const finalParams =
        overrideParams !== undefined ? overrideParams : currentParams;
      const finalPayload =
        overridePayload !== undefined ? overridePayload : currentPayload;

      if (typeof currentRequest === "function") {
        response = await currentRequest({
          params: finalParams,
          payload: finalPayload,
          signal,
        });

        // Check if request was aborted
        if (signal.aborted) {
          return null;
        }

        setData(response);
        return response;
      }

      const config = {
        params: finalParams,
        signal,
      };

      switch (currentMethod.toUpperCase()) {
        case "POST":
          response = await axiosInstance.post(
            currentRequest,
            finalPayload,
            config
          );
          break;
        case "PUT":
          response = await axiosInstance.put(
            currentRequest,
            finalPayload,
            config
          );
          break;
        case "PATCH":
          response = await axiosInstance.patch(
            currentRequest,
            finalPayload,
            config
          );
          break;
        case "DELETE":
          response = await axiosInstance.delete(currentRequest, {
            ...config,
            data: finalPayload,
          });
          break;
        case "GET":
        default:
          response = await axiosInstance.get(currentRequest, config);
          break;
      }

      // Check if request was aborted before setting data
      if (!signal.aborted) {
        setData(response.data);
        return response.data;
      }

      return null;
    } catch (err) {
      // Don't set error if request was aborted
      if (err.name === "AbortError" || err.name === "CanceledError") {
        return null;
      }

      const cleanedError = responseError(err);
      const errorMessage =
        typeof cleanedError === "string"
          ? cleanedError
          : cleanedError?.message || "Unknown error";

      setError(errorMessage);
      return null;
    } finally {
      // Only set loading to false if the request wasn't aborted
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, []); // Empty dependency array - function reference never changes

  // Separate effect that triggers when we want to make API calls
  useEffect(() => {
    if (!dontCall && request) {
      fetchData();
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    dontCall,
    request,
    method,
    JSON.stringify(params),
    JSON.stringify(payload),
    fetchData,
  ]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
