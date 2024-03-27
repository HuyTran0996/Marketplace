import axios from "axios";

import Cookies from "js-cookie";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

apiService.interceptors.request.use(
  (request) => {
    //this is to test in local, remove when deploy
    const token = Cookies.get("jwt");

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    /////////////////
    console.log("Start request", request);
    return request;
  },
  (error) => {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);

    return response;
  },
  (error) => {
    // console.log("RESPONSE ERROR", error);
    // console.log("RESPONSE ERROR", error.response.data.error);
    console.log("RESPONSE ERROR", error);

    // return Promise.reject(error);
    return Promise.reject(error.response.data);

    // return errorName;
  }
);

export { apiService };
