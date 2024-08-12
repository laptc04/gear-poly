import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const [categories, setInvoiceStatus] = useState([]);
  const [invoiceStatus, setCategoryForm] = useState({
    id: "",
    status_name: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [alert, setAlert] = useState({ message: "", alertClass: "" });
  const navigate = useNavigate();

  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/statusBill?page=${currentPage}`
      );
      setInvoiceStatus(response.data);
      setTotalPages(response.headers["x-total-pages"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial load
  }, [currentPage]);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setCategoryForm({
      ...invoiceStatus,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status_name", invoiceStatus.status_name);
    formData.append("file", invoiceStatus.file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (invoiceStatus.id) {
        // Update category
        const response = await axios.put(
          `http://localhost:8080/api/statusBill/${invoiceStatus.id}`,
          formData,
          config
        );
        console.log("Updated invoice-status:", response.data);
        setAlert({
          message: "Cập nhật trạng thái thành công",
          alertClass: "alert-success",
        });
      } else {
        // Add new category
        const response = await axios.post(
          "http://localhost:8080/api/statusBill",
          formData,
          config
        );
        console.log("Added category:", response.data);
        setAlert({
          message: "Thêm trạng thái mới thành công",
          alertClass: "alert-success",
        });
      }

      // Clear form after submission
      setCategoryForm({
        id: "",
        categories_name: "",
        file: null,
        image: null,
      });

      // Refresh categories list or update state as needed
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
        alertClass: "alert-danger",
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic
    // This is placeholder, you need to define your own search logic
  };

  const handleAddCategory = () => {
    navigate("/admin/invoice-statusFrom");
  };

  return (
    <main className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="text-primary">Quản Lý Trạng Thái</h2>
      </div>

      <div className="row justify-content-between mb-3">
        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleAddCategory}>
            Thêm Trạng Thái
          </button>
        </div>
        <div className="col-4">
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm"
              name="status_name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit">
              Tìm
            </button>
          </form>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Tên Trạng Thái</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.status_name}</td>
                <td>
                  <a
                    className="btn btn-primary"
                    href={`/admin/invoice-statusFrom/${item.id}`}
                  >
                    Sửa
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-end">
          <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Trước
            </button>
          </li>
          {[...Array(totalPages).keys()].map((i) => (
            <li
              key={i}
              className={`page-item ${i === currentPage ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setCurrentPage(i)}>
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
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Tiếp
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default Invoice;
