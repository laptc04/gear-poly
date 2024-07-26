import React from "react";

const Kho = () => {
    return (
        <div class="container">
            <div class="row mt-3">
              <div class="col-6">
                <form action="/searchByName" method="get">
                  <div class="mb-3">
                    <label for="" class="form-label text-danger">Tìm kiếm theo tên</label>
                    <div style={{ display: 'flex' }}>
                      <input type="text" class="form-control" name="name" id=""
                        aria-describedby="helpId" placeholder=""/>
                      <button type="submit" class="btn btn-dark ms-2">Tìm</button>
                    </div>
                  </div>
                </form>
              </div>
      
              <div class="col-6">
                <form action="/searchByCategory" method="get">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label text-danger">Tìm
                      kiếm theo danh mục</label>
                    <div style={{ display: 'flex' }}>
                      <select name="categoryId" class="form-select"
                        aria-label="Default select example">
                        <option selected value="-1" disabled>-----Chọn danh mục------</option>
                        <option></option>
                      </select>
                      <button type="submit" class="btn btn-dark ms-2">Lọc</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
                  
            <form>
      <div className="col-6">
        <label className="text-danger mb-3 mt-3">Tìm kiếm theo khoảng giá</label>
      </div>
      <div className="row">
        <div className="col-4" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ flexBasis: '100px', marginRight: '10px' }}>Từ:</label>
          <input
            type="number"
            className="form-control"
            style={{ flexGrow: 1 }}
            name="minPrice"
            placeholder=""
          />
        </div>
        <div className="col-4" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ flexBasis: '70px' }}>đến</label>
          <input
            type="number"
            className="form-control"
            style={{ flexGrow: 1 }}
            name="maxPrice"
            placeholder=""
          />
        </div>
        <div className="col-4">
          <button type="submit" className="btn btn-dark">Tìm</button>
        </div>
      </div>
        {/* <div className="alert alert-danger mt-3" role="alert">
          <p>{}</p>
        </div> */}
    </form>
      
      
    <div className="btn-add mt-5 mb-3">
                <a href="/add-product" type="button" className="btn btn-danger">
                    Thêm sản phẩm
                </a>
                <a href="/product" type="button" className="btn btn-danger ms-3">
                    Làm mới
                </a>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                            <th scope="col">ID</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <th>1</th>
                                <td>Sản phẩm 1</td>
                                <td>10.000</td>
                                <td>1</td>
                                <td>
                                    <div className="row gap-3 justify-content-center">
                                        <div className="col-auto">
                                            <a className="btn btn-primary" role="button">Sửa</a>
                                        </div>
                                        <div className="col-auto">
                                            <form method="post" action="/delete-product">
                                                <input type="hidden" name="id"/>
                                                <button className="btn btn-danger">Xóa</button>
                                            </form>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>

            <nav aria-label="Page navigation">
                {(
                    <ul className="pagination">
                        <li class="page-item">
                            <a class="page-link">
                                First
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link">
                                Previous
                            </a>
                        </li>
                            <li class="page-item">
                                <a class="page-link">
                                1
                                </a>
                            </li>
                        <li class="page-item">
                            <a class="page-link">
                                Next
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link">
                                Last
                            </a>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );};export default Kho;