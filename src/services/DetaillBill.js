import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/detaillBill";

//lấy hóa đơn theo account đã có
export const fetchDetailBillById = (billId) =>
  axios.get(`${REST_API_BASE_URL}/${billId}`);
