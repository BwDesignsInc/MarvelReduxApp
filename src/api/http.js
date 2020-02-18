import axios from 'axios';

export const apiKey = "680e11e6ae10cd6d8b0dbedc8514a138";

export const http = axios.create({
    baseURL: 'https://gateway.marvel.com:443/v1/public',
  });

export default http;