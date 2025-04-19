import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const api = axios.create({ baseURL: BASE_URL });

export const searchItems = async params => {
  const response = await api.post('/search', params);
  return response.data;
};

export const searchItem = async url => {
  const response = await api.post('/search/item', { url });
  return response.data;
};
