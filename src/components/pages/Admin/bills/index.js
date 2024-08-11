import React, { useState, useEffect } from "react";
import { allBill } from "../../../../services/Bill";
import { allStatus } from "../../../../services/Bill"; // Assuming you have a service for fetching statuses
import Swal from "sweetalert2";
import axios from "axios";
const ProductCustomerDetails = ({ searchForm, notFoundMessage, size }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [donhang, setDonhang] = useState([]);
  const [statuses, setStatuses] = useState([]); // State to hold all statuses
  const [searchTerm, setSearchTerm] = useState("");
  const uniqueElement = Math.random();
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const donhangall = donhang.slice(startIndex, endIndex);

  // Fetch bills
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
  }, [pageSize]);

  // Fetch all statuses
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await allStatus();
        setStatuses(response.data);
        console.log(statuses);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu trạng thái:", err);
      }
    };

    fetchStatuses();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add the form submit logic here
  };

  const handleRefresh = () => {
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
    let value = Number(e.target.value);
    if (isNaN(value) || value < 1) {
      value = pageSize;
    }
    setPageSize(value);
  };

  const handleStatusChange = (e, invoiceId) => {
    const newStatusId = e.target.value;
    // // Update the status locally (if needed)
    setDonhang((prevDonhang) =>
      prevDonhang.map((detail) =>
        detail.id === invoiceId
          ? {
              ...detail,
              invoice_status: { ...detail.invoice_status, id: newStatusId },
            }
          : detail
      )
    );
  };
  const handleUpdateStatus = async (statusId, invoiceId) => {
    const newData = {
      status_id: statusId,
      id: invoiceId,
    };
    console.log(statusId);
    console.log(invoiceId);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/bill/updateStatusBill",
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

  return (
    <div className="container-fluid">
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
                <th className="text-center">Ảnh sản phẩm</th>
                <th>Số tiền</th>
                <th>Ngày</th>
                <th>Trạng thái</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {donhangall.map((detail, index) => (
                <tr key={index} className="align-middle">
                  <td>{startIndex + index + 1}</td>
                  <td>{detail.account.id}</td>
                  <td>{detail.account.fullname}</td>
                  <td>{detail.account.phone}</td>
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
                  <td>
                    <select
                      value={detail.invoice_status.id}
                      onChange={(e) => handleStatusChange(e, detail.id)}
                    >
                      {statuses.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.status_name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="text-center">
                    <button
                      className="btn btn-2 btn-primary me-2"
                      onClick={() =>
                        handleUpdateStatus(detail.invoice_status.id, detail.id)
                      }
                    >
                      Cập nhật
                    </button>

                    <a
                      href={`/admin/bill/${detail.account.id}/${btoa(
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
