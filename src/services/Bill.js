import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/bill";

//lấy hóa đơn theo account đã có
export const fetchBillById = (accountId, billId) =>
  axios.get(`${REST_API_BASE_URL}/${accountId}/${billId}`);

// Lấy danh sách hóa đơn theo accountId
export const fetchBillsByAccountId = (accountId) =>
  axios.get(REST_API_BASE_URL + "/" + accountId);
