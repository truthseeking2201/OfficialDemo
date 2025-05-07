import http from "@/utils/http";

const URLS = {
  SAMPLE: "/api/v1/poll-user?limit=10&offset=0&order_by=-start_time",
};

export const getSample = () => {
  return http.get(URLS.SAMPLE);
};
