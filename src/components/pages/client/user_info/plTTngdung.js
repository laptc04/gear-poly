import React from "react";
import styled from "styled-components";

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
                  <div className="col-9">
                    <form
                      id="uploadForm"
                      action="/update-user"
                      method="post"
                      encType="multipart/form-data"
                      // onSubmit={handleSubmit}
                    >
                      <div className="row position-relative">
                        <h3 className="nd mt-1 text-center" id="h2">
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
                            value="ABC"
                            type="text"
                            placeholder="ID"
                          />
                          {/* <input value={account?.id} type="hidden" name="id" /> */}
                          <h3>Họ và tên</h3>
                          <StyledInput
                            className="rounded"
                            value="{account?.fullname}"
                            type="text"
                            name="fullname"
                            placeholder="fullname"
                          />
                          {/* <small className="text-danger">{hoten}</small> */}
                          <h3>Số điện thoại</h3>
                          <StyledInput
                            className="rounded"
                            value="{account?.phone}"
                            type="text"
                            name="phone"
                            placeholder="phone"
                          />
                          {/* <small className="text-danger">{sdt}</small> */}
                          <h3>Email</h3>
                          <StyledInput
                            className="rounded"
                            type="email"
                            name="email"
                            placeholder="email"
                            value="{account?.email}"
                          />
                          {/* <small className="text-danger">{email}</small> */}
                          <h3>Địa chỉ</h3>
                          <textarea
                            className="rounded"
                            value="{account?.address}"
                            style={{
                              width: "60vh",
                              backgroundColor: "rgba(171, 177, 181, 0.205)",
                            }}
                            name="address"
                            placeholder="address"
                          ></textarea>
                          {/* <small className="text-danger">{diachi}</small> */}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col d-inline mt-3 mb-3">
                          <button type="submit" className="btn btn-1">
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
                      <tbody>
                        {/* {bills.map((item, index) => (
                          <tr className="align-middle" key={index}>
                            <td>{index + 1}</td>
                            <td scope="row" className="text-center">
                              <div className="text-nowrap">
                                <div className="image-container">
                                  {item.billEntity
                                    .slice(0, 3)
                                    .map((image, idx) => (
                                      <img
                                        key={idx}
                                        src={`/images/${image.ProductEntity?.imageEntities[0]?.name}`}
                                        className="rounded mx-auto ms-1 d-inline-block align-middle main-image"
                                        width="50px"
                                        height="50px"
                                        alt=""
                                      />
                                    ))}
                                  {item.billEntity.length > 3 && (
                                    <small className="align-middle more-images">
                                      +{item.billEntity.length - 3}
                                    </small>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="fw-bold">
                              {item?.total.toLocaleString("de-DE")} VNĐ
                            </td>
                            <td>
                              {new Date(item?.billDate).toLocaleDateString(
                                "vi-VN"
                              )}
                            </td>
                            <td className="text-center">
                              <a
                                href={`/chitiet?id=${item?.id}`}
                                target="_parent"
                                className="btn btn-2"
                              >
                                Chi tiết
                              </a>
                            </td>
                          </tr>
                        ))} */}
                        <tr>
                          <td>1</td>
                          <td>
                            <img
                              src="image source"
                              class="img-fluid rounded-top"
                              alt=""
                            />
                          </td>
                          <td>300.000 VNĐ</td>
                          <td>20/07/2024</td>
                          <td className="text-center">
                            <button name="" id="" className="btn btn-primary">
                              Chi tiết
                            </button>
                          </td>
                        </tr>
                      </tbody>
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
