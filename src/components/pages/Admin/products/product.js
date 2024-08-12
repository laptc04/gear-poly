import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null); // null: no filter, true: visible, false: hidden
  const [currentProduct, setCurrentProduct] = useState(null); // Product currently being viewed
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/products"),
          axios.get("http://localhost:8080/api/categories"),
        ]);

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

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.categories_name : "Không tìm thấy";
  };

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setCurrentProduct(product);
    setShow(true);
  };

  return (
    <main className="container mt-5">
      <div className="mb-4">
        <div className="mb-3">
          <Button variant="success" className="me-2" onClick={handleAddClick}>
            Thêm sản phẩm mới
          </Button>
          <Button
            variant="primary"
            className={`me-2 ${selectedFilter === false ? "active" : ""}`}
            onClick={() => filterProducts(false)}
          >
            Sản phẩm hiện
          </Button>
          <Button
            variant="primary"
            className={`me-2 ${selectedFilter === true ? "active" : ""}`}
            onClick={() => filterProducts(true)}
          >
            Sản phẩm ẩn
          </Button>
          <Button
            variant="secondary"
            className={`me-2 ${selectedFilter === null ? "active" : ""}`}
            onClick={showAllProducts}
          >
            Tất cả sản phẩm
          </Button>
          <br />
          <br />
        </div>
        <div className="table-responsive">
          <Table hover bordered>
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
                    <Button variant="info" onClick={() => handleShow(item)}>
                      Xem mô tả
                    </Button>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="ms-2">
                        {item.hien ? "Ẩn" : "Hiện"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => handleEditClick(item.id)}>
                      Sửa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Modal for Viewing Description */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {currentProduct ? currentProduct.product_name : "Thông tin sản phẩm"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentProduct ? (
              <>
                <p><strong>Giá:</strong> {currentProduct.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
                <p><strong>Danh mục:</strong> {getCategoryName(currentProduct.categories_id)}</p>
                <p><strong>Mô tả:</strong> {currentProduct.description || "Không có mô tả cho sản phẩm này"}</p>
              </>
            ) : (
              <p>Không có thông tin sản phẩm để hiển thị.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  );
};

export default Product;
