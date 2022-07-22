export type Response = {
  name: string;
};

export const getMockData = async (signal: AbortSignal, params: unknown): Promise<Response> => {
  // console.log(params);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Request Success.',
      });
    }, 1000);
  });
};

// this mock interface error
export const getMockError = (signal: AbortSignal, params: unknown): Promise<Response> => {
  // console.log(params);
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('Something Error.');
    }, 1000);
  });
};
