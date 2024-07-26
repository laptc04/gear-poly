import React from "react";

const Laphoadon = () => {
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col-8 img-thumbnail">
        <form action="/taohoadon" method="post">
          <input type="hidden" name="id" />
          <h3 className="text-center text-danger mt-4">THÔNG TIN THANH TOÁN</h3>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              Họ và tên
            </label>
            <input
              type="text"
              name="fullname"
              className="form-control"
              id="fullname"
              aria-describedby="helpId"
              placeholder=""
            />
            {/* <p className="text-danger">{message1}</p> */}
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              id="phone"
              aria-describedby="helpId"
              placeholder=""
            />
            {/* <p className="text-danger">{message2}</p> */}
          </div>
          <label htmlFor="address" className="form-label">
            Địa chỉ nhận hàng
          </label>
          <div className="mb-3">
            <textarea
              name="address"
              id="address"
              style={{ width: "100%", height: "100px" }}
            >
              Cần Thơ
            </textarea>
            {/* <p className="text-danger">{message3}</p> */}
          </div>
          <input type="hidden" name="email" />
          <h4>Sản phẩm đã chọn</h4>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th className="text-center" style={{ width: "115px" }}>
                    Hình ảnh
                  </th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng giá</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                <tr>
                  <td>1</td>
                  <td>
                    <img
                      src="image source"
                      className="img-fluid rounded-top"
                      alt=""
                    />
                  </td>
                  <td>Màn hình</td>
                  <td>300.000 VNĐ</td>
                  <td>1</td>
                  <td>300.000 VNĐ</td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>
                    <img
                      src="image source"
                      className="img-fluid rounded-top"
                      alt=""
                    />
                  </td>
                  <td>Màn hình</td>
                  <td>300.000 VNĐ</td>
                  <td>1</td>
                  <td>300.000 VNĐ</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-primary mb-2">
                Mua sản phẩm
              </button>
              <a
                className="btn btn-danger ms-1 mb-2"
                href="/cart"
                role="button"
              >
                Hủy
              </a>
              <h5 className="text-danger ms-auto">Tổng giá: 3.000.000đ</h5>
            </div>
          </div>
        </form>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default Laphoadon;
