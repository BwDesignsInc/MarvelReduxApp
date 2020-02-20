import axios from 'axios';
import { config } from './config'
export const apiKey = "680e11e6ae10cd6d8b0dbedc8514a138";

export const http = axios.create({
    baseURL: config.baseUrl,
  });

export default http;