// Mock implementation of HTTP client for offline mode
import { random } from "lodash";

// Create a mock HTTP client that rejects all requests
const mockHttp = {
  get: async () => {
    await new Promise(resolve => setTimeout(resolve, random(300, 600)));
    return Promise.reject(new Error('[offline] HTTP requests disabled'));
  },
  post: async () => {
    await new Promise(resolve => setTimeout(resolve, random(300, 600)));
    return Promise.reject(new Error('[offline] HTTP requests disabled'));
  },
  put: async () => {
    await new Promise(resolve => setTimeout(resolve, random(300, 600)));
    return Promise.reject(new Error('[offline] HTTP requests disabled'));
  },
  delete: async () => {
    await new Promise(resolve => setTimeout(resolve, random(300, 600)));
    return Promise.reject(new Error('[offline] HTTP requests disabled'));
  },
  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} }
  }
};

export const http = mockHttp;
export default http;
