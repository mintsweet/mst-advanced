export type Response = {
  name: string;
};

export const getMockData = async (params: unknown): Promise<Response> => {
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
export const getMockError = (params: unknown): Promise<Response> => {
  // console.log(params);
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('Something Error.');
    }, 1000);
  });
};
