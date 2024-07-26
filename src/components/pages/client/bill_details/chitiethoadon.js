import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f5f5f5;
    color: #333;
  }
`;

const InvoiceContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
`;

// const PrimaryText = styled.h1`
//   color: #006d5b;
//   font-size: 48px;
// `;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;

  thead th {
    background-color: #006d5b;
    color: white;
    padding: 8px;
  }

  tbody td {
    vertical-align: middle;
    padding: 8px;
    border: 1px solid #ddd;
  }
`;

// const TotalRow = styled.div`
//   font-weight: bold;
//   font-size: 1.25rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 20px;
// `;

// const Alert = styled.div`
//   text-align: center;
//   background-color: green;
//   &.alert {
//     role: alert;
//   }
//   h3 {
//     color: white;
//   }
// `;

const Chitiethoadon = () => {
  return (
    <div>
      {/* {message && (
        <div
          className={`alert text-center bg-success ${alertClass}`}
          role="alert"
        >
          <h3 className="text-white">{message}</h3>
        </div>
      )} */}
      <GlobalStyle />
      <div className="invoice-container">
        <InvoiceContainer>
          <h1 className="text-primary">HÓA ĐƠN</h1>
          <p>Ngày lập: 20/07/2024</p>
          <hr />
          <strong>Địa chỉ nhận hàng:</strong>
          <br />
          <p>Cần Thơ</p>
          <Table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>STT</th>
                <th className="text-center">Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {/* {hoadon.map((item, index) => (
              <tr key={index} className="align-middle">
                <td>{index + 1}</td>
                <td className="text-center">
                  {item.productEntity.imageEntities.length > 0 && (
                    <img
                      src={`/images/${item.productEntity.imageEntities[0].name}`}
                      className="rounded mx-auto d-inline-block align-middle main-image"
                      width="50"
                      height="50"
                      alt=""
                    />
                  )}
                </td>
                <td>{item.productEntity.product_name}</td>
                <td>{formatNumber(item.price)} VNĐ</td>
                <td>{item.quantity}</td>
                <td>{formatNumber(item.total_price)} VNĐ</td>
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
                <td>Màn hình</td>
                <td>300.000 VNĐ</td>
                <td>1</td>
                <td>300.000 VNĐ</td>
              </tr>
            </tbody>
          </Table>
          <div className="total-row d-flex justify-content-between align-items-center">
            {/* {showPagination && (
            <nav className="tohop" aria-label="Page navigation example">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <a
                    className="page-link"
                    href={`/chitiet?id=${id}&page=${
                      currentPage - 1
                    }&size=${size}`}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {[...Array(totalPages).keys()].map((i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      i + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      href={`/chitiet?id=${id}&page=${i + 1}&size=${size}`}
                    >
                      {i + 1}
                    </a>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href={`/chitiet?id=${id}&page=${
                      currentPage + 1
                    }&size=${size}`}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          )} */}
            <div className="text-end total-amount">
              <p className="text-danger">Tổng tiền: 300.000 VNĐ</p>
            </div>
          </div>
          <hr />
          <div className="row mt-4">
            <div className="col-2"></div>
            <div className="col">
              <strong>
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href="/index"
                >
                  GearPoly
                </a>
              </strong>
              <br />
              <p>
                Chuyên phụ kiện Laptop, PC <br />
                Toà nhà FPT Polytechnic, Đ. Số 22, Thường Thạnh, Cái Răng, Cần
                Thơ, Việt Nam <br />
                <a href="mailto:laptcpc06384@fpt.edu.vn">
                  laptcpc06384@fpt.edu.vn
                </a>
              </p>
            </div>
            <div className="col">
              <strong>Thông tin liên hệ</strong>
              <br />
              <p>
                <a href="mailto:luantnhpc06353@fpt.edu.vn">
                  luantnhpc06353@fpt.edu.vn
                </a>
                <br />
                <a href="mailto:phuntpc06376@fpt.edu.vn">
                  phuntpc06376@fpt.edu.vn
                </a>
                <br />
                <a href="mailto:quangttpc06371@fpt.edu.vn">
                  quangttpc06371@fpt.edu.vn
                </a>
                <br />
                <a href="mailto:tiendmpc06340@fpt.edu.vn">
                  tiendmpc06340@fpt.edu.vn
                </a>
                <br />
              </p>
            </div>
            <div className="col-1"></div>
          </div>
        </InvoiceContainer>
      </div>
    </div>
  );
};
export default Chitiethoadon;
