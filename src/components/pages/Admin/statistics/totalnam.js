import React from 'react';

const ThongKeTongChiTieu = () => {
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="row">
                    <div className="col-6">
                        <form action="/searchByName" method="get">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Tìm kiếm theo tên</label>
                                <div style={{ display: 'flex' }}>
                                    <input type="text" className="form-control" name="name" id="" aria-describedby="helpId" placeholder="" />
                                    <button type="submit" className="btn btn-primary ms-2">Tìm</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-6">
                        <form action="/searchByPhone" method="get">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Tìm kiếm theo số điện thoại</label>
                                <div style={{ display: 'flex' }}>
                                    <input type="text" className="form-control" name="phone" id="" aria-describedby="helpId" placeholder="" />
                                    <button type="submit" className="btn btn-primary ms-2">Tìm</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-2">
                        <a href="/manauser" type="button" className="btn btn-primary ms-3"> Làm mới </a>
                    </div>
                    <div className="col-4">
                        <form action="/totalnam">
                            <button className="btn btn-primary btn-sm trash" title="Danh thu năm">
                                <i className="fa-regular fa-clipboard"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="app-title">
                    <ul className="app-breadcrumb breadcrumb side">
                        <li className="breadcrumb-item active"><b>Thống kê tổng chi tiêu mỗi năm của người dùng</b></li>
                    </ul>
                    <div id="clock"></div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="tile">
                            <div className="tile-body">
                                <table className="table table-hover table-bordered js-copytextarea" cellPadding="0" cellSpacing="0" border="0" id="sampleTable">
                                    <thead>
                                        <tr>
                                            <th width="30">Mã người dùng</th>
                                            <th width="30">Năm</th>
                                            <th width="30">Tổng Tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                            <td>123</td>
                                            <td width="150">2024</td>
                                            <td>Nguoidung1@gmail.com</td>
                                        </tr>  
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation">
                                <ul className="pagination">
                                    {/* Pagination logic here */}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThongKeTongChiTieu;
