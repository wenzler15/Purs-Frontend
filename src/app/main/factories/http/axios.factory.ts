import axios, { AxiosInstance } from 'axios';

export const makeAxios = (): AxiosInstance => {
  const { VITE_API_BASE_URL } = process.env;
  return axios.create({
    baseURL: VITE_API_BASE_URL
  });
};
