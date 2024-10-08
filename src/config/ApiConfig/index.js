import axios from "axios";
import { Cookies } from "react-cookie";

const BASE_URL = "http://localhost:3000"; // Cập nhật BASE_URL cho phù hợp

const request = async ({
  method = "GET",
  path = "",
  data = {},
  headers = {},
}) => {
  try {
    const cookie = new Cookies();
    const token = cookie.get("token");

    const res = await axios({
      method: method,
      baseURL: BASE_URL,
      url: path,
      data: data,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API request: ", res);

    return res.data;
  } catch (error) {
    console.log("API request error: ", error);
    throw error.response?.data?.message || "Error";
  }
};

export default request;
