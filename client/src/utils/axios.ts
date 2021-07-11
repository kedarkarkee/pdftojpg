import axios from 'axios';
export const baseURL = 'http://3.232.224.65:8080';
export const clientUrl = 'http://3.232.224.65:8080';
const instance = axios.create({
baseURL,
});

export default instance;