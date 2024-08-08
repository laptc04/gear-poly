import React, { useState, useEffect } from "react";
import Image1 from "../../../../images/sanpham1.webp";
import { carts, updateCartQuantity, removeCartItem } from '../../../../services/Cart';

const Cart = ({account_id}) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState({});
  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await carts(account_id);
        if (data && Array.isArray(data.items)) {
          setCartItems(data.items); // Adjust according to your API response structure
          setTotal(data.total); // Adjust according to your API response structure
          setQuantities(data.items.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {}));
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [account_id]);

  const updateQuantity = (id, quantity) => {
    setQuantities(prevQuantities => ({ ...prevQuantities, [id]: quantity }));
    updateCartQuantity(id, quantity)
      .then(response => console.log('Cart updated:', response))
      .catch(error => console.error('Error updating cart:', error));
  };

  const removeFromCart = (id) => {
    removeCartItem(id)
      .then(response => {
        console.log('Item removed:', response);
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        // Optionally update total or quantities here if needed
      })
      .catch(error => console.error('Error removing item:', error));
  };

  return (
    <div className="container mt-xxl-5">
      <hr />
      <hr />
      <form action="/cart" method="post">
        <div className="row">
          <h3>GIỎ HÀNG</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="col-12" key={item.id}>
                <div className="d-flex align-items-center mb-3">
                  <img
                    height="60px"
                    width="60px"
                    src={Image1}
                    className="d-block"
                    alt={item.name}
                  />
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1">{item.product_id}</h5>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm me-1"
                        onClick={() => updateQuantity(item.id, Math.max(1, quantities[item.id] - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control form-control-sm text-center"
                        value={quantities[item.id] || 1}
                        min="1"
                        style={{ width: "50px" }}
                        readOnly
                      />
                      <button
                        type="button"
                        className="btn btn-success btn-sm ms-1"
                        onClick={() => updateQuantity(item.id, quantities[item.id] + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="mb-0 mx-3">{item.price} VNĐ</p>
                    <button
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
            <h5 className="text-danger fw-bold">{total}VNĐ</h5>
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
