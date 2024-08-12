import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null); // null: no filter, true: visible, false: hidden
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [product_name, setProduct_Name] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/products"),
          axios.get("http://localhost:8080/api/categories"),
        ]);

        console.log("Products:", productResponse.data);
        console.log("Categories:", categoryResponse.data);
        setProducts(productResponse.data);
        setCategories(categoryResponse.data);
        setFilteredProducts(productResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/admin/productsForm/${id}`);
  };

  const handleAddClick = () => {
    navigate("/admin/productsForm");
  };

  const filterProducts = (visibility) => {
    setSelectedFilter(visibility);
    const filtered = products.filter((product) => product.hien === visibility);
    setFilteredProducts(filtered);
  };

  const showAllProducts = () => {
    setSelectedFilter(null);
    setFilteredProducts(products);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/products/searchProd', {
  //         params: {
  //             product_name: product_name || "",
  //             minPrice: minPrice || "",
  //             maxPrice: maxPrice || "",
  //         },
  //     });
  //     setProducts(response.data); // Cập nhật danh sách sản phẩm sau khi tìm kiếm
  // } catch (error) {
  //     console.error('Error searching products:', error);
  // }
  // };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.categories_name : "Không tìm thấy";
  };

  return (
    <main className="container mt-5">
      <div className="mb-4">
        <div className="mb-3">
          {/* <form className="d-flex mb-4" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Tìm kiếm theo tên"
            value={product_name}
            onChange={(e) => setProduct_Name(e.target.value)}
          />
          <input
            className="form-control me-2"
            type="number"
            placeholder="Giá thấp nhất"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
          />
          <input
            className="form-control me-2"
            type="number"
            placeholder="Giá cao nhất"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
          />
          <button className="btn btn-outline-success" type="submit">
            Tìm
          </button>
        </form> */}
          <a className="btn btn-success me-2" onClick={handleAddClick}>
            Thêm sản phẩm mới
          </a>
          <a
            className={`btn btn-primary me-2 ${
              selectedFilter === false ? "active" : ""
            }`}
            onClick={() => filterProducts(false)}
          >
            Sản phẩm hiện
          </a>
          <a
            className={`btn btn-primary me-2 ${
              selectedFilter === true ? "active" : ""
            }`}
            onClick={() => filterProducts(true)}
          >
            Sản phẩm ẩn
          </a>
          <a
            className={`btn btn-secondary me-2 ${
              selectedFilter === null ? "active" : ""
            }`}
            onClick={showAllProducts}
          >
            Tất cả sản phẩm
          </a>
          <br />
          <br />
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Danh mục</th>
                <th>Hình Ảnh</th>
                <th>Mô Tả</th>
                <th>Ẩn Sản Phẩm</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item) => (
                <tr key={item.id}>
                  <td>{item.product_name}</td>
                  <td>
                    {item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>{item.soLuong}</td>
                  <td>{getCategoryName(item.categories_id)}</td>
                  <td>
                    <div
                      style={{
                        position: "relative",
                        width: "100px",
                        height: "100px",
                      }}
                    >
                      {Array.isArray(item.imageEntity) &&
                        item.imageEntity.length > 0 && (
                          <img
                            className="image"
                            src={`http://localhost:8080/images/${item.imageEntity[0].name}`}
                            alt="Hình ảnh không hiển thị"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-info"
                      data-bs-toggle="modal"
                      data-bs-target={`#descriptionModal${item.id}`}
                    >
                      Xem mô tả
                    </button>
                    <div
                      className="modal fade"
                      id={`descriptionModal${item.id}`}
                      tabIndex="-1"
                      aria-labelledby={`descriptionModalLabel${item.id}`}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id={`descriptionModalLabel${item.id}`}
                            >
                              Mô tả sản phẩm
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            {item.description ||
                              "Không có mô tả cho sản phẩm này"}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Đóng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="ms-2">{item.hien ? "Ẩn" : "Hiện"}</span>
                    </div>
                  </td>
                  <td>
                    <a
                      className="btn btn-primary"
                      href={`/admin/productsForm/${item.id}`}
                    >
                      Sửa
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </a>
            </li>
            {[...Array(totalPages).keys()].map((i) => (
              <li
                key={i}
                className={`page-item ${i === currentPage ? "active" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => setCurrentPage(i)}
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
                href="#"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
    </main>
  );
};

export default Product;
