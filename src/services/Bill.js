import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/bill";

// Lấy danh sách hóa đơn theo accountId
export const fetchBillByAccountId = (accid) =>
  axios.get(`${REST_API_BASE_URL}/${accid}`);
