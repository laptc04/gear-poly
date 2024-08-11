import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/bill";
const REST_API_BASE_URL_CART = "http://localhost:8080/api/bill/taohoadon";
const ACCOUNT = "http://localhost:8080/api/bill/account";
const REST_API_BASE_URL1 = "http://localhost:8080/api/statusBill";
// Lấy danh sách hóa đơn theo accountId
export const fetchBillByAccountId = (accid) =>
  axios.get(`${REST_API_BASE_URL}/${accid}`);

//Lấy toàn bộ hóa đơn
export const allBill = () => axios.get(`${REST_API_BASE_URL}`);
//Tạo hóa đơn
export const findCartbyAccountId = (id) =>
  axios.get(`${REST_API_BASE_URL_CART}/${id}`);

//Lấy account theo id đn
export const findAccountId = (id) => axios.get(`${ACCOUNT}/${id}`);

//Lấy toàn bộ trạng thái
export const allStatus = () => axios.get(`${REST_API_BASE_URL1}`);
