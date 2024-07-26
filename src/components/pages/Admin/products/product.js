import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = () => {
  // Hooks for form and state management
  const [productForm, setProductForm] = useState({
    id: '',
    product_name: '',
    price: '',
    categories_id: '-1',
    description: '',
    imageEntities: []
  });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('-1');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Function to handle form changes
  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setProductForm({
        ...productForm,
        [name]: files
      });
    } else {
      setProductForm({
        ...productForm,
        [name]: value
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  // Function to update product status
  const updateStatus = (id, status) => {
    // Handle status update logic here
  };

  useEffect(() => {
    // Fetch initial data for categories and products
    // Example fetching logic
    // setCategories([...]);
    // setProducts([...]);
    // setTotalPages(...);
  }, []);

  return (
    <main className="container mt-5" style={{ height: '100%' }}>
      <div className="row">
        <div className="col-md-5">
          <h2 className="mb-3">Quản Lý Sản Phẩm</h2>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={productForm.id} />
            <div className="mb-3">
              <label htmlFor="product_name" className="form-label">Tên Sản Phẩm</label>
              <input
                id="product_name"
                className="form-control"
                type="text"
                name="product_name"
                placeholder="Tên Sản Phẩm"
                value={productForm.product_name}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Giá</label>
              <input
                id="price"
                className="form-control"
                type="number"
                name="price"
                placeholder="Giá"
                value={productForm.price}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="SoLuong" className="form-label">Số Lượng</label>
              <input
                id="SoLuong"
                className="form-control"
                type="number"
                name="SoLuong"
                placeholder="Số Lượng"
                value={productForm.SoLuong}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categories_id" className="form-label">Danh Mục</label>
              <select
                id="categories_id"
                className="form-select"
                name="categories_id"
                value={productForm.categories_id}
                onChange={handleFormChange}
              >
                <option value="-1">Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categories_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Mô Tả</label>
              <textarea
                id="description"
                className="form-control"
                name="description"
                placeholder="Mô Tả"
                value={productForm.description}
                onChange={handleFormChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">Hình Ảnh</label>
              <input
                id="file"
                className="form-control"
                type="file"
                name="file"
                multiple
                accept="image/*"
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              {productForm.imageEntities && productForm.imageEntities.map((image) => (
                <div key={image.id} className="d-inline-block me-2">
                  <img
                    src={`/images/${image.name}`}
                    style={{ width: '50px', height: '50px' }}
                    alt="product"
                  />
                  <a
                    type="button"
                    className="btn btn-warning btn-sm ms-1"
                    href={`/delete-image?id=${image.id}`}
                  >
                    Xóa
                  </a>
                </div>
              ))}
            </div>
            <button type="submit" className="btn btn-primary">
              {productForm.id ? 'Cập Nhật' : 'Thêm'}
            </button>
            <a className="btn btn-secondary ms-2" href="/refreshForm">
              Làm mới
            </a>
          </form>
        </div>
        <div className="col-md-7">
          <form className="d-flex mb-4" action="/searchProd" method="get">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm theo tên"
              name="product_name"
            />
            <input
              className="form-control me-2"
              type="number"
              placeholder="Giá thấp nhất"
              name="minPrice"
              min="0"
            />
            <input
              className="form-control me-2"
              type="number"
              placeholder="Giá cao nhất"
              name="maxPrice"
              min="0"
            />
            <button className="btn btn-outline-success" type="submit">
              Tìm
            </button>
          </form>
          <div className="mb-3">
            <a
              className="btn btn-primary me-2"
              href="/products-hidden"
            >
              Sản phẩm ẩn
            </a>
            <a
              className="btn btn-primary me-2"
              href="/products-visible"
            >
              Sản phẩm hiện
            </a>
            <br/>
            <br/>
            <form action="/search-by-category" method="get" className="d-inline">
              <select
                className="form-select"
                name="categories_id"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="-1">Tìm theo danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categories_name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Số Lượng</th>
                  <th>Danh mục</th>
                  <th>Hình Ảnh</th>
                  <th>Mô Tả</th>
                  <th>Ẩn SP</th>
                  <th>Ac</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td>{item.categoryEntity.categories_name}</td>
                    <td>
                      <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                        {item.imageEntities.map((img) => (
                          <img
                            key={img.id}
                            src={`/images/${img.name}`}
                            style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                            alt="product"
                          />
                        ))}
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
                              <h5 className="modal-title" id={`descriptionModalLabel${item.id}`}>
                                Mô tả sản phẩm
                              </h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              {item.description || 'Không có mô tả cho sản phẩm này'}
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Đóng
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.hien}
                        onChange={() => updateStatus(item.id, !item.hien)}
                      />
                    </td>
                    <td>
                      <a className="btn btn-primary" href={`/update-productsManager?id=${item.id}`}>
                        Chỉnh
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                <a className="page-link" href="#" onClick={() => setCurrentPage(currentPage - 1)}>
                  Previous
                </a>
              </li>
              {[...Array(totalPages).keys()].map((i) => (
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                  <a className="page-link" href="#" onClick={() => setCurrentPage(i)}>
                    {i + 1}
                  </a>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                <a className="page-link" href="#" onClick={() => setCurrentPage(currentPage + 1)}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

export default Product;
