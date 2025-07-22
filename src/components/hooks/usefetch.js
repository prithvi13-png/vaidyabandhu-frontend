import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { responseError } from '../utiles/responseError';

export const useFetch = ({
  method = 'GET',
  request,
  params = {},
  payload = {},
  dontCall = false,
} = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!request) {
      console.warn('useFetch: No request provided, skipping API call.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let response;

      if (typeof request === 'function') {
        response = await request({ params, payload });
        setData(response);
        return response;
      }

      const config = { params };

      switch (method) {
        case 'POST':
          response = await axiosInstance.post(request, payload, config);
          break;
        case 'PUT':
          response = await axiosInstance.put(request, payload, config);
          break;
        case 'PATCH':
          response = await axiosInstance.patch(request, payload, config);
          break;
        case 'DELETE':
          response = await axiosInstance.delete(request, { ...config, data: payload });
          break;
        case 'GET':
        default:
          response = await axiosInstance.get(request, config);
          break;
      }

      setData(response.data);
      return response.data;

    } catch (err) {
      const cleanedError = responseError(err);
      setError(typeof cleanedError === 'string' ? cleanedError : (cleanedError?.message || "Unknown error"));
      return null;
    } finally {
      setLoading(false);
    }
  }, [method, request, params, payload]); // <-- params & payload added here

  useEffect(() => {
    if (!dontCall && request) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [fetchData, dontCall, request]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
