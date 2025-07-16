import { AxiosError } from 'axios';

export const responseError = (error: unknown): string => {
  let message = 'Something went wrong.';

  if (error instanceof AxiosError) {
    const serverMessage = error.response?.data?.message;

    if (serverMessage) {
      message = typeof serverMessage === 'string' ? serverMessage : JSON.stringify(serverMessage);
    } else if (error.response?.status === 404) {
      message = 'Resource not found (404).';
    } else if (error.response?.status === 500) {
      message = 'Internal server error (500). Please try again later.';
    } else {
      message = error.message;
    }

  } else if (error instanceof Error) {
    message = error.message;

  } else if (typeof error === 'string') {
    message = error;

  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    // This ensures error is not null and has a message property
    const maybeError = error as { message?: string };
    if (typeof maybeError.message === 'string') {
      message = maybeError.message;
    }
  } else if (typeof error === 'object' && error !== null && 'error' in error) {
    // This ensures error is not null and has a message property
    const maybeError = error as { error?: string };
    if (typeof maybeError.error === 'string') {
      message = maybeError.error;
    }
  }

  return message;
};
