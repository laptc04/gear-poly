import React, { useEffect, useState } from "react";
import { findCartbyAccountId, findAccountId } from "../../../../services/Bill";
import axios from "axios";
import Swal from "sweetalert2";

const Laphoadon = () => {
  const id = localStorage.getItem("userId");
  const [listCart, setListCart] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await findCartbyAccountId(id);
        console.log("Phản hồi từ API:", response.data); // Ghi log toàn bộ phản hồi từ API
        console.log(id);
        setListCart(response.data);
        console.log(listCart);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu hóa đơn:", err);
      }
    };

    fetchBills();
  }, [id]);

  const totalPrice = listCart.reduce((acc, item) => acc + item.price, 0);
  const formatNumber = (num) => num?.toLocaleString("de-DE");

  const [account, setAccount] = useState();
  const [fullname, setFullname] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [errorPhone, setErrorPhone] = useState();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await findAccountId(id);
        console.log("Phản hồi từ API:", response.data);
        setAccount(response.data.id); // Ghi log toàn bộ phản hồi từ API
        setFullname(response.data.fullname);
        setPhone(response.data.phone);
        setAddress(response.data.address);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu hóa đơn:", err);
      }
    };
    fetchBills();
  }, [id]);

  const validatePhone = (phone) => {
    const phoneRegex = /^0[3|8|7|5|9]\d{8}$/;
    return phoneRegex.test(phone);
  };

  const addBill = async () => {
    if (!fullname.trim()) {
      return;
    }
    if (!phone.trim() || !validatePhone(phone)) {
      return;
    } else {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/bill/AllAccount"
        );
        const users = response.data;
        const response1 = await findAccountId(id);
        const phoneAccount = response1.data.phone;
        const phonelExists = users.some((user) => user.phone === phone);
        if (account === id) {
          if (phone === phoneAccount) {
          } else {
            if (phonelExists) {
              setErrorPhone("Số điện thoại này đã tồn tại!");
              setTimeout(() => setErrorPhone(""), 3000);
              return;
            }
          }
        }
      } catch (error) {
        console.error("There was an error fetching the users!", error);
        setErrorPhone("Đã xảy ra lỗi khi kiểm tra Phone!");
      }
      setErrorPhone("");
    }
    if (!address.trim()) {
      return;
    }
    const newData = {
      account_id: id,
      fullname: fullname,
      phone: phone,
      address: address,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/bill",
        newData
      );
      if (response.status === 201) {
        Swal.fire({
          title: "Đã gửi đơn hàng",
          timer: 1500,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Can not add to cart",
          timer: 1500,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "An error occurred",
        timer: 1500,
        icon: "error",
      });
    }
  };

  return (
    <div className="row">
      <div className="col"></div>
      <div className="col-8 img-thumbnail">
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="hidden" name="id" />
          <h3 className="text-center text-danger mt-4">THÔNG TIN THANH TOÁN</h3>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              Họ và tên
            </label>
            <input
              type="text"
              name="fullname"
              className="form-control"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <small className="text-danger">
              {!fullname ? "Tên không được bỏ trống" : ""}
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <small className="text-danger">
              {!phone
                ? "Số điện thoại không được bỏ trống"
                : !validatePhone(phone)
                ? "Số điện thoại không hợp lệ!"
                : errorPhone}
            </small>
          </div>
          <label htmlFor="address" className="form-label">
            Địa chỉ nhận hàng
          </label>
          <div className="mb-3">
            <textarea
              name="address"
              id="address"
              style={{ width: "100%", height: "100px" }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <small className="text-danger">
              {!address ? "Địa chỉ không được bỏ trống" : ""}
            </small>
          </div>
          <input type="hidden" name="email" />
          <h4>Sản phẩm đã chọn</h4>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th className="text-center" style={{ width: "115px" }}>
                    Hình ảnh
                  </th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {listCart.length > 0 ? (
                  listCart.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={item.image}
                          className="img-fluid rounded-top"
                          alt={item.productEntity.name}
                        />
                      </td>
                      <td>{item.productEntity.product_name}</td>
                      <td>{formatNumber(item.productEntity.price)} VNĐ</td>
                      <td>{item.quantity}</td>
                      <td>{formatNumber(item.price)} VNĐ</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Giỏ hàng trống
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <hr />
            <div className="d-flex align-items-center">
              {listCart.length > 0 && (
                <button onClick={addBill} className="btn btn-primary mb-2">
                  Mua sản phẩm
                </button>
              )}
              <a
                className="btn btn-danger ms-1 mb-2"
                href="/cart"
                role="button"
              >
                Hủy
              </a>
              <h5 className="text-danger ms-auto">
                Tổng giá: {totalPrice.toLocaleString()} VNĐ
              </h5>
            </div>
          </div>
        </form>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default Laphoadon;
