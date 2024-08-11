import React, { useState, useEffect } from "react";
import { allBill } from "../../../../services/Bill";

const ProductCustomerDetails = ({ searchForm, notFoundMessage, size }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const uniqueElement = Math.random();
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;

  const [donhang, setDonhang] = useState([]);
  const donhangall = donhang.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await allBill();
        const bills = response.data.reverse();
        setTotalPages(Math.ceil(bills.length / pageSize));
        setDonhang(bills);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu hóa đơn:", err);
      }
    };

    fetchBills();
  }, [pageSize]); // Update pageSize in dependency array

  useEffect(() => {
    // Adjust currentPage when totalPages change
    setCurrentPage((prevPage) => Math.min(prevPage, totalPages - 1));
  }, [totalPages]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add the form submit logic here
  };

  const handleRefresh = () => {
    // Add the refresh logic here
    setPageSize(10); // Reset pageSize to default
    setCurrentPage(0); // Reset to first page
  };

  const increasePageSize = () => {
    setPageSize((prevPageSize) => {
      const newSize = prevPageSize + 5;
      setCurrentPage((prevPage) =>
        Math.min(prevPage, Math.ceil(donhang.length / newSize) - 1)
      );
      return newSize;
    });
  };

  const decreasePageSize = () => {
    setPageSize((prevPageSize) => {
      const newSize = Math.max(5, prevPageSize - 5);
      setCurrentPage((prevPage) =>
        Math.min(prevPage, Math.ceil(donhang.length / newSize) - 1)
      );
      return newSize;
    });
  };

  const handlePageSizeChange = (e) => {
    // Lấy giá trị nhập vào
    let value = Number(e.target.value);

    if (isNaN(value) || value < 1) {
      value = pageSize;
      setPageSize(value);
      return;
    }
    setPageSize(value);
  };

  return (
    <div className="container">
      <h1 className="my-4">ĐƠN HÀNG</h1>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit}>
        <input
          name="account_id"
          className="form-control me-2 m-1"
          type="text"
          placeholder="Search"
          aria-label="Search"
          style={{ width: "500px" }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit" className="btn btn-outline-light text-dark m-1">
          Tìm kiếm
        </button>
        <button
          type="button"
          className="btn btn-info btn-4"
          onClick={handleRefresh}
        >
          Làm mới
        </button>
      </form>

      {/* Display message if no results found */}
      {notFoundMessage && (
        <div className="alert alert-warning mt-3" role="alert">
          <p>{notFoundMessage}</p>
        </div>
      )}

      {/* Display table only if there are results */}
      {donhangall?.length > 0 && (
        <div id="searchResults">
          <table className="table table-striped table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>STT</th>
                <th>ID khách hàng</th>
                <th>Họ tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th className="text-center">Ảnh sản phẩm</th>
                <th>Số tiền</th>
                <th>Ngày</th>
                <th className="text-center">Xem chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {donhangall.map((detail, index) => (
                <tr key={index} className="align-middle">
                  <td>{startIndex + index + 1}</td>
                  <td>{detail.account.id}</td>
                  <td>{detail.account.fullname}</td>
                  <td>{detail.account.phone}</td>
                  <td>{detail.account.email}</td>
                  <td scope="row" className="text-center">
                    <div className="text-nowrap">
                      <div className="image-container">
                        {detail.detailBill.slice(0, 3).map((image, i) => (
                          <img
                            key={i}
                            src={`http://localhost:8080/images/${image.productEntity?.imageEntities[0]?.name}`}
                            className="rounded mx-auto ms-1 d-inline-block align-middle main-image"
                            width="50px"
                            height="50px"
                            alt=""
                          />
                        ))}
                        {detail.detailBill.length > 3 && (
                          <small className="align-middle more-images">
                            +{detail.detailBill.length - 3}
                          </small>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    {new Intl.NumberFormat("de-DE").format(detail.total)} VNĐ
                  </td>
                  <td>
                    {new Date(detail?.billDate).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="text-center">
                    <a
                      href={`/admin/bill/${btoa(
                        unescape(
                          encodeURIComponent(`${detail.id}_${uniqueElement}`)
                        )
                      )}`}
                      target="_parent"
                      className="btn btn-2 btn-primary"
                    >
                      Chi tiết
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Page Size Controls */}
          <div className="d-flex align-items-center my-3">
            <button
              className="btn btn-outline-secondary me-2"
              onClick={decreasePageSize}
            >
              -
            </button>
            <input
              type="number"
              className="form-control me-2"
              min={1}
              value={pageSize}
              onChange={handlePageSizeChange}
              style={{ width: "100px" }}
            />
            <button
              className="btn btn-outline-secondary"
              onClick={increasePageSize}
            >
              +
            </button>
            <span className="ms-2">Mục</span>
          </div>

          {/* Pagination Section */}
          <nav aria-label="Page navigation example" className="mt-3">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    currentPage > 0 && setCurrentPage(currentPage - 1)
                  }
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages).keys()].map((i) => (
                <li
                  key={i}
                  className={`page-item ${i === currentPage ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages - 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    currentPage < totalPages - 1 &&
                    setCurrentPage(currentPage + 1)
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProductCustomerDetails;
