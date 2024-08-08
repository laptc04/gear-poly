import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/cart/'; // Đổi từ 'account/' thành '/' nếu không có thêm phân đoạn này trong API

export const carts = async (id) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}account/${id}`); // Sử dụng đường dẫn đúng với `account`
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const updateCartQuantity = (id, quantity) => {
  return axios.put(`${REST_API_BASE_URL}/update/${id}`, { quantity });
};

export const removeCartItem = (id) => {
  return axios.delete(`${REST_API_BASE_URL}/remove/${id}`);
};
