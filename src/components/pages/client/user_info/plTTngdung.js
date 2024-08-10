import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchBillByAccountId, findAccountId } from "../../../../services/Bill";
import Swal from "sweetalert2";
import axios from "axios";
import { useCookies } from "react-cookie";
import Login from "../Login/login";
// const GradientText = styled.h2`
//   font-size: 72px;
//   background: -webkit-linear-gradient(#dd93e0, #333);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// `;

// const GradientTextH2 = styled.h2`
//   font-size: 50px;
//   background: -webkit-linear-gradient(#dd93e0, #333);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// `;

const StyledInput = styled.input`
  height: 40px;
  border: none;
  background-color: rgba(171, 177, 181, 0.205);
  width: 400px;
`;

// const StyledH3 = styled.h3`
//   font-family: "open sans", "sans-serif";
// `;

// const StyledDiv = styled.div`
//   background-color: rgba(240, 248, 255, 0.21);
// `;

// const ProfileImage = styled.img`
//   border: 5px;
// `;

// const StyledButton = styled.button`
//   height: 40px;
//   width: 60px;
// `;

// const ButtonContainer = styled.div`
//   display: inline-block;
//   justify-content: center;
//   text-align: center;
// `;

const GlobalStyle = styled.div`
  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-track {
    background: #d1e5ff;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(#642bff, #ff22e6);
    border-radius: 10px;
  }

  body {
    font-family: "Montserrat", sans-serif;
  }

  .btn {
    flex: 1 1 auto;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
  }

  .btn:hover {
    background-position: right center;
  }

  .btn-1 {
    background-image: linear-gradient(
      to right,
      #f6d365 0%,
      #fda085 51%,
      #f6d365 100%
    );
  }

  .btn-2 {
    background-image: linear-gradient(
      to right,
      #fbc2eb 0%,
      #a6c1ee 51%,
      #fbc2eb 100%
    );
  }

  .btn-3 {
    background-image: linear-gradient(
      to right,
      #84fab0 0%,
      #8fd3f4 51%,
      #84fab0 100%
    );
  }

  .btn-4 {
    background-image: linear-gradient(
      to right,
      #a1c4fd 0%,
      #c2e9fb 51%,
      #a1c4fd 100%
    );
  }

  .btn-5 {
    background-image: linear-gradient(
      to right,
      #ffecd2 0%,
      #fcb69f 51%,
      #ffecd2 100%
    );
  }

  .more-images {
    top: 0px;
    left: 100px;
    border-radius: 50%;
    background-color: white;
    padding: 5px;
  }
`;

const TTngdung = () => {
  // const userId = localStorage.getItem("userId");
  const uniqueElement = Math.random();
  const [listBill, setListBill] = useState([]);
  const [userId, setUserId] = React.useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    const storedOriginalToken = sessionStorage.getItem("originalToken");

    if (cookies.token && storedOriginalToken) {
      try {
        // Giải mã token hiện tại từ cookie
        const decodedToken = decodeURIComponent(escape(atob(cookies.token)));
        const extractedUserId = decodedToken.split("_")[0];

        // Giải mã token gốc đã lưu
        const originalDecodedToken = decodeURIComponent(
          escape(atob(storedOriginalToken))
        );
        const originalUserId = originalDecodedToken.split("_")[0];

        if (cookies.token !== storedOriginalToken) {
          console.log("Token đã thay đổi, đặt lại token gốc.");
          setCookie("token", storedOriginalToken, {
            HttpOnly: true,
            Secure: true,
            path: "/",
            expires: new Date(Date.now() + 3600 * 1000),
          });
        } else {
          setUserId(originalUserId); // Đặt ID người dùng vào trạng thái
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra token:", error);
      }
    }
  }, [cookies.token, setCookie]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetchBillByAccountId(userId);
        console.log("Phản hồi từ API:", response.data); // Ghi log toàn bộ phản hồi từ API
        console.log(userId);
        setListBill(response.data.reverse());
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu hóa đơn:", err);
      }
    };

    fetchBills();
  }, [userId]);

  const [account, setAccount] = useState();
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errorEmail, setErrorEmail] = useState();
  const [errorPhone, setErrorPhone] = useState();

  const validateEmail = (email) => {
    // Regular expression to check if the email ends with @gmail.com or @fpt.edu.vn
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|fpt\.edu\.vn)$/;
    return regex.test(email.trim());
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^0[3|8|7|5|9]\d{8}$/;
    return phoneRegex.test(phone);
  };

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await findAccountId(userId);
        console.log("Phản hồi từ API:", response.data); // Ghi log toàn bộ phản hồi từ API
        setAccount(response.data.id);
        setFullname(response.data.fullname);
        setPhone(response.data.phone);
        setEmail(response.data.email);
        setAddress(response.data.address);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu hóa đơn:", err);
      }
    };
    fetchBills();
  }, [userId]);

  const updateAccount = async () => {
    if (!fullname.trim()) {
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      return;
    } else {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/bill/AllAccount"
        );
        const users = response.data;
        const response1 = await findAccountId(userId);
        const emailaccount = response1.data.email;
        const emailExists = users.some((user) => user.email === email);
        if (account === userId) {
          if (email === emailaccount) {
          } else {
            if (emailExists) {
              setErrorEmail("Email này đã tồn tại!");
              setTimeout(() => setErrorEmail(""), 3000);
              return;
            }
          }
        }
      } catch (error) {
        console.error("There was an error fetching the users!", error);
        setErrorEmail("Đã xảy ra lỗi khi kiểm tra email!");
      }
    }
    if (!phone.trim() || !validatePhone(phone)) {
      return;
    } else {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/bill/AllAccount"
        );
        const users = response.data;
        const response1 = await findAccountId(userId);
        const phoneAccount = response1.data.phone;
        const phonelExists = users.some((user) => user.phone === phone);
        if (account === userId) {
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
      id: userId,
      fullname: fullname,
      phone: phone,
      email: email,
      address: address,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/bill/update",
        newData
      );
      if (response.status === 201) {
        Swal.fire({
          title: "Cập nhật thành công",
          timer: 1500,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Cập nhật thất bại",
          timer: 1500,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Cập nhật thấy bại",
        timer: 1500,
        icon: "error",
      });
    }
  };

  const renderTableRows = () => {
    return listBill.map((item, index) => (
      <tr className="align-middle" key={item.id || index}>
        <td>{index + 1}</td>
        <td scope="row" className="text-center">
          <div className="text-nowrap">
            <div className="image-container">
              {item.detailBill?.slice(0, 3).map((image, idx) => (
                <img
                  key={idx}
                  src={`/images/${image.ProductEntity?.imageEntities[0]?.name}`}
                  className="rounded mx-auto ms-1 d-inline-block align-middle main-image"
                  width="50px"
                  height="50px"
                  alt=""
                />
              ))}
              {item.billEntity?.length > 3 && (
                <small className="align-middle more-images">
                  +{item.billEntity.length - 3}
                </small>
              )}
            </div>
          </div>
        </td>
        <td className="fw-bold">{item?.total.toLocaleString("de-DE")} VNĐ</td>
        <td>
          {new Date(item?.billDate).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </td>
        <td className="text-center">
          <a
            href={`/user/userInfo/${btoa(
              unescape(encodeURIComponent(`${item.id}_${uniqueElement}`))
            )}`}
            target="_parent"
            className="btn btn-2"
          >
            Chi tiết
          </a>
        </td>
      </tr>
    ));
  };

  return (
    <GlobalStyle>
      <div className="main">
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabIndex="0"
          >
            <div className="container-fluid">
              <div>
                <div className="row">
                  <div className="col"></div>
                  <div className="col-4">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="row position-relative">
                        <h3 className="nd mt-1" id="h2">
                          Tài khoản
                        </h3>
                        <div className="col mt-3">
                          {/* <ProfileImage
                            id="profileImage"
                            src={`/images/${image}`}
                            style={{ borderRadius: '50%', width: '100px', height: '100px' }}
                            alt="Profile Image"
                            onClick={handleImageClick}
                          /> */}
                          <input
                            type="file"
                            name="image"
                            id="imageInput"
                            style={{ display: "none" }}
                            accept="image/*"
                          />
                          <h3>Tên tài khoản</h3>
                          <StyledInput
                            className="rounded"
                            disabled
                            value={account}
                            type="text"
                            placeholder="ID"
                          />
                          {/* <input value={account?.id} type="hidden" name="id" /> */}
                          <h3>Họ và tên</h3>
                          <StyledInput
                            className="rounded"
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="fullname"
                          />
                          <br></br>
                          <small className="text-danger">
                            {!fullname.trim() ? "Tên không được bỏ trống" : ""}
                          </small>
                          <h3>Số điện thoại</h3>
                          <StyledInput
                            className="rounded"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            name="phone"
                            placeholder="phone"
                          />
                          <br></br>
                          <small className="text-danger">
                            {!phone.trim()
                              ? "Số điện thoại không được bỏ trống"
                              : !validatePhone(phone)
                              ? "Số điện thoại không hợp lệ!"
                              : errorPhone}
                          </small>
                          <h3>Email</h3>
                          <StyledInput
                            className="rounded"
                            type="email"
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <br></br>
                          <small className="text-danger">
                            {!email.trim()
                              ? "Email không được bỏ trống"
                              : !validateEmail(email)
                              ? "Email không hợp lệ!"
                              : errorEmail}
                          </small>
                          <h3>Địa chỉ</h3>
                          <textarea
                            className="rounded"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{
                              width: "58vh",
                              backgroundColor: "rgba(171, 177, 181, 0.205)",
                            }}
                            name="address"
                            placeholder="address"
                          ></textarea>
                          <br></br>
                          <small className="text-danger">
                            {!address.trim()
                              ? "Địa chỉ không được bỏ trống"
                              : ""}
                          </small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col d-inline mt-3 mb-3">
                          <button onClick={updateAccount} className="btn btn-1">
                            Cập nhật tài khoản
                          </button>
                          <a
                            href="/changePassword"
                            target="_parent"
                            className="btn btn-2"
                          >
                            Đổi mật khẩu
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col"></div>
                  <hr />
                  <div className="col">
                    <table className="table mt-4 table-hover table-sm table-bordered">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th
                            style={{ width: "210px" }}
                            className="text-center"
                          >
                            Hình ảnh
                          </th>
                          <th>Tổng tiền</th>
                          <th>Ngày mua</th>
                          <th className="text-center">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>{renderTableRows()}</tbody>
                    </table>
                    {/* <nav className="tohop" aria-label="Page navigation example">
                      <ul
                        className="pagination"
                        style={{ display: totalPages > 1 ? "block" : "none" }}
                      >
                        <li
                          className={`page-item ${
                            currentPage === 0 ? "disabled" : ""
                          }`}
                        >
                          <a
                            className="page-link"
                            href={`/user/nguoidung?page=${
                              currentPage > 0 ? currentPage - 1 : 0
                            }&size=10`}
                          >
                            Previous
                          </a>
                        </li>
                        {[...Array(totalPages).keys()].map((i) => (
                          <li
                            key={i}
                            className={`page-item ${
                              i === currentPage ? "active" : ""
                            }`}
                          >
                            <a
                              className="page-link"
                              href={`/user/nguoidung?page={i}&size=10`}
                            >
                              {i + 1}
                            </a>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage === totalPages - 1 ? "disabled" : ""
                          }`}
                        >
                          <a
                            className="page-link"
                            href={`/user/nguoidung?page=${
                              currentPage < totalPages - 1
                                ? currentPage + 1
                                : totalPages - 1
                            }&size=10`}
                          >
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex="0"
          >
            <div className="container-fluid">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </GlobalStyle>
  );
};
export default TTngdung;
