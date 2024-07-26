import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({
    id: '',
    categories_name: '',
    file: null,
    image: null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [alert, setAlert] = useState({ message: '', alertClass: '' });

  useEffect(() => {
    // Fetch categories and set state
    fetchCategories();
  }, [currentPage]);

  const fetchCategories = () => {
    // Fetch categories data from API and setCategories, setTotalPages, etc.
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setCategoryForm({
      ...categoryForm,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to server and handle response
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search with searchQuery
  };

  return (
    <main className="container mt-5" style={{ height: '400px' }}>
      <div>
        <div className="main">
          {alert.message && (
            <div className={`alert ${alert.alertClass}`} role="alert">
              <span>{alert.message}</span>
            </div>
          )}
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel">
              <div className="container-fluid">
                <div>
                  <div className="row">
                    <div className="col">
                      <div className="row position-relative">
                        <div className="position-absolute top-0 start-50 end-50" style={{ marginLeft: '-25vh' }}>
                          <h2 className="nd">Quản Lý Danh Mục</h2>
                        </div>
                        <br /><br /><br />
                        <form
                          onSubmit={handleSubmit}
                          style={{ marginLeft: '17vh' }}
                          encType="multipart/form-data"
                        >
                          <input type="hidden" name="id" value={categoryForm.id} />
                          <div className="col">
                            <h3>Tên Danh Mục</h3>
                            <input
                              className="rounded"
                              type="text"
                              style={{ width: '60vh' }}
                              name="categories_name"
                              placeholder="Tên Danh Mục"
                              value={categoryForm.categories_name}
                              onChange={handleFormChange}
                            />
                            <br />
                            <h3>Hình Ảnh</h3>
                            <input
                              className="rounded p-1"
                              type="file"
                              style={{ width: '60vh' }}
                              name="file"
                              multiple
                              accept="image/*"
                              onChange={handleFormChange}
                            />
                          </div>
                          {categoryForm.image && (
                            <div className="mb-3">
                              <img
                                src={`/images/${categoryForm.image}`}
                                style={{ width: '100px', height: '100px' }}
                                alt="category"
                              />
                            </div>
                          )}
                          <br />
                          <div className="col d-inline mt-5">
                            <button type="submit" className="btn btn-primary">
                              {categoryForm.id ? 'Cập Nhật' : 'Thêm'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col">
                      <form className="d-flex ms-auto" onSubmit={handleSearch}>
                        <div className="d-flex">
                          <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Tìm kiếm"
                            name="categories_name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <button className="btn btn-outline-success" type="submit">
                            Tìm
                          </button>
                        </div>
                      </form>
                      <table className="table mt-4 table-hover table-sm">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Tên Danh Mục</th>
                            <th>Hình Ảnh</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((item) => (
                            <tr key={item.id}>
                              <th>{item.id}</th>
                              <td>{item.categories_name}</td>
                              <td>
                                <img
                                  src={`/images/${item.image}`}
                                  className="img-thumbnail me-3"
                                  alt="Product"
                                  style={{ width: '150px', height: '150px' }}
                                />
                              </td>
                              <td>
                                <a className="btn btn-2 btn-success" href={`/update-categoriesManager?id=${item.id}`}>
                                  Sửa
                                </a>
                                <br />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <nav className="tohop" aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                            <a
                              className="page-link"
                              href="#"
                              onClick={() => setCurrentPage(currentPage - 1)}
                            >
                              Previous
                            </a>
                          </li>
                          {[...Array(totalPages).keys()].map((i) => (
                            <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                              <a
                                className="page-link"
                                href="#"
                                onClick={() => setCurrentPage(i)}
                              >
                                {i + 1}
                              </a>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                            <a
                              className="page-link"
                              href="#"
                              onClick={() => setCurrentPage(currentPage + 1)}
                            >
                              Next
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Categories;
