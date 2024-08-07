import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/products';
const REST_API_BASE_URL_Cat = 'http://localhost:8080/api/categories';


export const listIndex = () => axios.get(REST_API_BASE_URL);

export const listCat2 = () => axios.get(REST_API_BASE_URL_Cat);

export const listCatId = (id) => axios.get(REST_API_BASE_URL_Cat+'/'+id);
