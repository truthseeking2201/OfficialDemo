import http from "@/utils/http";

const URLS = {
  GET_APY: "/api/v1/apy",
};

export const getAPY = () => {
  return http.get(URLS.GET_APY);
};
