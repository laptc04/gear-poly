import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = ({ account_id }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState({});





  const fetchCartItems = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/account/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };



  useEffect(() => {
    const account_id2 = 'A001';
    fetchCartItems(account_id2)
      .then(data => {
        if (data) {
          setCartItems(data);
          const initialQuantities = data.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
          }, {});
          setQuantities(initialQuantities);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, [account_id]);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cartItems.reduce((acc, item) => {
        return acc + item.quantity * item.productEntity.price;
      }, 0);
      setTotal(totalAmount);
    };

    calculateTotal();
  }, [cartItems]);



  const updateQuantity = async (id, newQuantity) => {
    try {
      const response = await axios.put("http://localhost:8080/api/cart/update-quantity", {
        id: id,                // Sử dụng ID của CartEntity
        quantiy: newQuantity, // Sửa lỗi chính tả
      });
      if (response.status === 200) { // Kiểm tra trạng thái 200 (OK)
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === id ? { ...item, quantiy: newQuantity } : item
          )
        );
        setQuantities(prevQuantities => ({
          ...prevQuantities,
          [id]: newQuantity
        }));
        console.log("Quantity updated successfully");
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error('Error updating quantity', error);
    }
  };
  


const removeFromCart = (id) => {
  const account_id2 = 'A001';
  const idCart = 246;  // Sử dụng id truyền vào thay vì hardcode
  axios.delete(`http://localhost:8080/api/cart/delete-cart/${account_id2}/${idCart}`)
    .then(response => {
      console.log('Item removed:', response);
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    })
    .catch(error => console.error('Error removing item:', error));
};

  return (
    <div className="container mt-xxl-5">
      <hr />
      <form action="/cart" method="post">
        <div className="row">
          <h3>GIỎ HÀNG</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="col-12" key={item.id}>  {/* Sử dụng item.id nếu đã là duy nhất */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    height="60px"
                    width="60px"
                    src={`http://localhost:8080/images/abc.png`} // Use item.image if available
                    className="d-block"
                    alt={item.productEntity.product_name}
                  />
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1">{item.productEntity.product_name}</h5>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm me-1"
                        onClick={() => updateQuantity(item.id, Math.max(1, quantities[item.quantiy] - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control form-control-sm text-center"
                        value={item.quantity}
                        min="1"
                        style={{ width: "50px" }}
                        readOnly
                      />
                      <button
                        type="button"
                        className="btn btn-success btn-sm ms-1"
                        onClick={() => updateQuantity(item.id, (quantities[item.quantiy] || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="mb-0 mx-3">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.productEntity.price)}
                    </p>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p>Giỏ hàng của bạn hiện đang trống.</p>
          )}

          <div className="d-flex justify-content-between">
            <h5 className="fw-bold">Tổng cộng:</h5>
            <h5 className="text-danger fw-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</h5>

          </div>
          <a href="/taohoadon" className="btn btn-danger w-100 mt-3">
            Đặt hàng
          </a>
        </div>
      </form>
    </div>
  );
};

export default Cart;
