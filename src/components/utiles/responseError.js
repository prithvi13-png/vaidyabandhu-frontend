export const responseError = (error) => {
  let message = 'Something went wrong.';

  // Axios error (duck typing)
  if (error && error.isAxiosError) {
    const serverMessage = error.response && error.response.data && error.response.data.message;

    if (serverMessage) {
      message = typeof serverMessage === 'string' ? serverMessage : JSON.stringify(serverMessage);
    } else if (error.response && error.response.status === 404) {
      message = 'Resource not found (404).';
    } else if (error.response && error.response.status === 500) {
      message = 'Internal server error (500). Please try again later.';
    } else {
      message = error.message || message;
    }

  } else if (error instanceof Error) {
    message = error.message;

  } else if (typeof error === 'string') {
    message = error;

  } else if (error && typeof error === 'object') {
    if ('message' in error && typeof error.message === 'string') {
      message = error.message;
    } else if ('error' in error && typeof error.error === 'string') {
      message = error.error;
    }
  }

  return message;
};
