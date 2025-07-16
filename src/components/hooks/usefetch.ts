import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { responseError } from '../utiles/responseError';

interface RequestOptions<P = unknown, Q = unknown> {
  params?: P;
  payload?: Q;
}

interface UseFetchOptions<P = unknown, Q = unknown> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  request?: string | ((options: RequestOptions<P, Q>) => Promise<unknown>);
  params?: P;
  payload?: Q;
  dontCall?: boolean;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<T | void>;
}

export const useFetch = <T = unknown, P = unknown, Q = unknown>({
  method = 'GET',
  request,
  params = {} as P,
  payload = {} as Q,
  dontCall = false,
}: UseFetchOptions<P, Q>): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!request) {
      // eslint-disable-next-line no-console
      console.warn('useFetch: No request provided, skipping API call.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let response;

      if (typeof request === 'function') {
        response = await request({ params, payload });
        setData(response as T);
        return response as T;
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
      return response.data as T;

    } catch (err) {
      const cleanedError = responseError(err);
      setError(typeof cleanedError === 'string' ? new Error(cleanedError) : cleanedError);
      throw cleanedError;
    } finally {
      setLoading(false);
    }
  }, [method, request, JSON.stringify(params), JSON.stringify(payload)]);

  useEffect(() => {
    if (!dontCall && request) {
      fetchData();
    }
  }, [fetchData, dontCall, request]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
