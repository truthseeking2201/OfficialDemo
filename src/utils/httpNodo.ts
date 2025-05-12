import axios from "axios";
import CryptoJS from "crypto-js";

const apiKey =
  import.meta.env.VITE_NODO_APP_URL_API_KEY ||
  "d0b51610b3a2c68205abd8f974fbc87b";
const apiSecret =
  import.meta.env.VITE_NODO_APP_URL_API_KEY_API_SECRET ||
  "35416546187b8f78409490e260a1dddc778712c1c46882f787e65a7ab13da9ec";

const http = axios.create({
  baseURL: "https://api-dev.nodo.xyz",
});
// Thêm interceptor để ký mỗi request
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

    console.log("==payload", {
      method,
      fullPath,
      timestamp,
      bodyString,
      apiKey,
      apiSecret,
    });
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

export default http;
