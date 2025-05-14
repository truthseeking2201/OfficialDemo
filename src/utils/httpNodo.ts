// Mock implementation of Axios for offline mode
import CryptoJS from "crypto-js";
import { random } from "lodash";

const mockAxios = {
  create: () => {
    return {
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
  }
};

const apiKey = "offline-mode-api-key";
const apiSecret = "offline-mode-api-secret";
const baseURL = "https://offline-mode-api.example";

// Create mock http client
const http = mockAxios.create();

// We'll keep these commented out so they don't appear in the output,
// but the real implementation would be left intact for reference
/*
http.interceptors.request.use(
  (config) => {
    const method = config.method.toUpperCase();
    const url = new URL(config.url, config.baseURL);
    const fullPath = url.pathname + (url.search ? url.search : "");

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const bodyString =
      ["POST", "PUT", "PATCH"].includes(method) && config.data
        ? JSON.stringify(config.data)
        : "";

    const rawString = `${method}${fullPath}${bodyString}${timestamp}`;
    const signature = CryptoJS.HmacSHA256(rawString, apiSecret).toString();
    
    // add headers
    config.headers["x-api-key"] = apiKey;
    config.headers["x-timestamp"] = timestamp;
    config.headers["x-signature"] = signature;
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
http.interceptors.response.use(
  (response) => {
    // Return JSON data
    if (response.data) {
      return response.data.data != undefined
        ? response.data.data
        : response.data;
    }
    return response;
  },
  (error) => {
    const err = (error.response && error.response.data) || error;
    if (error.response && error.response.status === 401) {
      return Promise.reject(err);
    }

    if (error.response && error.response.status) {
      err.status = error.response.status;
    }

    return Promise.reject(err);
  }
);
*/

export default http;
