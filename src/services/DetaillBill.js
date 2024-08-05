import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/api/bill";
const REST_API_BASE_URL1 = "http://localhost:8080/api/detaillBill";

//lấy hóa đơn theo account đã có
export const fetchBillByaccId = (accountId, billId) =>
  axios.get(`${REST_API_BASE_URL}/${accountId}/${billId}`);

export const finDetaillBillbyBillId = (billId) =>
  axios.get(`${REST_API_BASE_URL1}/${billId}`);
