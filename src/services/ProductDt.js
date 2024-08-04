import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/productDt';

export const listIndex = () => axios.get(REST_API_BASE_URL);
export const fetch = (id) => axios.get(REST_API_BASE_URL+'/'+id);