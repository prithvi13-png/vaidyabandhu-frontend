import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import axiosInstance from "../../api/axiosInstance";
import { responseError } from "../utiles/responseError";

export const useFetch = ({
  method = "GET",
  request,
  params = {},
  payload = {},
  dontCall = false,
} = {}) => {
  const [state, setState] = useState(() => ({
    data: null,
    loading: !dontCall && Boolean(request),
    error: null,
  }));

  const abortControllerRef = useRef(null);
  const mountedRef = useRef(true);

  // Memoize serialized params/payload to prevent unnecessary re-renders
  const serializedParams = useMemo(() => JSON.stringify(params), [params]);
  const serializedPayload = useMemo(() => JSON.stringify(payload), [payload]);

  // Store latest values without causing re-renders
  const configRef = useRef({ method, request, params, payload });
  configRef.current = { method, request, params, payload };

  const updateState = useCallback((updates) => {
    if (mountedRef.current) {
      setState(prev => ({ ...prev, ...updates }));
    }
  }, []);

  const fetchData = useCallback(async (overrideParams, overridePayload) => {
    const { request: currentRequest, method: currentMethod, params: currentParams, payload: currentPayload } = configRef.current;

    if (!currentRequest) {
      console.warn("useFetch: No request provided");
      updateState({ loading: false });
      return null;
    }

    // Abort previous request
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    updateState({ loading: true, error: null });

    try {
      const finalParams = overrideParams ?? currentParams;
      const finalPayload = overridePayload ?? currentPayload;

      let response;

      if (typeof currentRequest === "function") {
        response = await currentRequest({ params: finalParams, payload: finalPayload, signal });
      } else {
        const config = { params: finalParams, signal };
        const upperMethod = currentMethod.toUpperCase();

        switch (upperMethod) {
          case "POST":
          case "PUT":
          case "PATCH":
            response = await axiosInstance[method.toLowerCase()](currentRequest, finalPayload, config);
            break;
          case "DELETE":
            response = await axiosInstance.delete(currentRequest, { ...config, data: finalPayload });
            break;
          default:
            response = await axiosInstance.get(currentRequest, config);
        }
        response = response.data;
      }

      if (!signal.aborted) {
        updateState({ data: response, loading: false });
        return response;
      }
    } catch (err) {
      if (!signal.aborted && err.name !== "AbortError" && err.name !== "CanceledError") {
        const errorMessage = responseError(err)?.message || responseError(err) || "Unknown error";
        updateState({ error: errorMessage, loading: false });
      }
    }
    return null;
  }, [updateState]);

  // Handle automatic fetching
  useEffect(() => {
    if (!dontCall && request) {
      fetchData();
    } else if (dontCall) {
      updateState({ loading: false, error: null });
    }

    return () => abortControllerRef.current?.abort();
  }, [dontCall, request, method, serializedParams, serializedPayload, fetchData]);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  return useMemo(() => ({
    ...state,
    refetch: fetchData,
  }), [state, fetchData]);
};