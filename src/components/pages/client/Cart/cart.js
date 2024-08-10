import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import axios from "axios";

const Cart = ({ account_id }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState({});

  const [userId, setUserId] = React.useState('');
  const [cookies] = useCookies(["token"]);


  useEffect(() => {
    if (cookies.token) {
      // Giải mã user ID từ cookie
      const decodedUserId = atob(cookies.token); // Giải mã Base64
      setUserId(decodedUserId);
    }
  }, [cookies]);

  console.log(userId)

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cart/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCartItems(userId)
      .then((data) => {
        if (data) {
          setCartItems(data);
          const initialQuantities = data.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
          }, {});
          setQuantities(initialQuantities);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, [userId]);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cartItems.reduce((acc, item) => {
        return acc + item.quantity * item.price;
      }, 0);
      setTotal(totalAmount);
    };

    calculateTotal();
  }, [cartItems]);

  

  const removeFromCart = (id) => {
    console.log(id)
    axios
      .delete(
        `http://localhost:8080/api/cart/${id}`
      )
      .then((response) => {
        console.log("Item removed:", response);
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error removing item:", error));
  };


const minus = async(maGH) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cart/item/${maGH}`
      );

      console.log(response?.data?.quantity)
        var newQuantity = response?.data?.quantity;
        console.log(newQuantity);
        if (newQuantity !== undefined && newQuantity > 1) {
            newQuantity =newQuantity-1;
            // setCount(newQuantity)
            console.log(newQuantity);
            var a = 10 ;
            const giohang = { quantity: newQuantity };
            console.log(giohang);
      const response2 = await axios.put(
              `http://localhost:8080/api/cart/${maGH}`,giohang
      );
      fetchCartItems(userId)
      .then((data) => {
        if (data) {
          setCartItems(data);
          const initialQuantities = data.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
          }, {});
          setQuantities(initialQuantities);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
        
        } else {
            console.error('Response or response data is not available');
        }
    } catch (error) {
        console.error(error);
    }
    
};

const plus =async (maGH) => {           
        try {
          const response = await axios.get(
            `http://localhost:8080/api/cart/item/${maGH}`
          );
            var newQuantity = response?.data?.quantity;
            console.log(newQuantity);
            if (newQuantity !== undefined ) {
                newQuantity =newQuantity+1;
                // setCount(newQuantity)
                console.log(newQuantity);
                var a = 10 ;
                const giohang = { quantity: newQuantity };
                console.log(giohang);
                const response2 = await axios.put(
                  `http://localhost:8080/api/cart/${maGH}`,giohang
          );
          fetchCartItems(userId)
          .then((data) => {
            if (data) {
              setCartItems(data);
              const initialQuantities = data.reduce((acc, item) => {
                acc[item.id] = item.quantity;
                return acc;
              }, {});
              setQuantities(initialQuantities);
            } else {
              console.error("Unexpected data format:", data);
            }
          })
               
            } else {
                console.error('Response or response data is not available');
            }
        } catch (error) {
            console.error(error);
        }
}

  return (
    <div className="container mt-xxl-5">
      <hr />
      <hr />
      <hr />
      <form action="/cart" method="post">

        <div className="row">
          <h3>GIỎ HÀNG</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="col-12" key={item.id}>
                {" "}
                {/* Sử dụng item.id nếu đã là duy nhất */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    height="60px"
                    width="60px"
                    src={`../../../../images/${item.productEntity.imageEntities[0].name}`} // Use item.image if available
                    className="d-block"
                    alt={item.product_id}
                  />
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1">
                      {item.productEntity.product_name}
                    </h5>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm me-1"
                        onClick={() => minus(item.id)}
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
                        onClick={() => plus(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <p className="mb-0 mx-3">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price)}
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
           <center><p>Giỏ hàng của bạn hiện đang trống.</p></center>
          )}

          <div className="d-flex justify-content-between">
            <h5 className="fw-bold">Tổng cộng:</h5>
            <h5 className="text-danger fw-bold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total)}
            </h5>
          </div>
          <a href="/user/bill" className="btn btn-danger w-100 mt-3">
            Đặt hàng
          </a>
        </div>
      </form>
    </div>
  );
};

export default Cart;
