import React, { useEffect, useState } from "react";
import { listUser } from '../../../../services/Qluser';

const Qluser = () => {

    const [listUsers, setUser] = useState([]);

    useEffect(() => {
        listUser().then((response) => {
            setUser(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <div>
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
                                <div>
                                    {/* <h3>{`${}`}</h3> */}
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
                            <a href="/manauser" type="button" className="btn btn-primary ms-3">Làm mới</a>
                        </div>
                    </div>

                    <div className="app-title">
                        <ul className="app-breadcrumb breadcrumb side">
                            <li className="breadcrumb-item active"><b>DANH SÁCH NGƯỜI DÙNG</b></li>
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
                                                <th width="10"><input type="checkbox" id="all" /></th>
                                                <th>ID</th>
                                                <th width="150">Họ và tên</th>
                                                <th>Email</th>
                                                <th width="20">Ảnh</th>
                                                <th width="300">Địa chỉ</th>
                                                <th>SĐT</th>
                                                <th>Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listUsers.map((user, index) => (
                                                <tr key={index}>
                                                    <td><input type="checkbox" /></td>
                                                    <td>{user.id}</td>
                                                    <td>{user.fullname}</td>
                                                    <td>{user.email}</td>
                                                    <td><img src={user.photo} alt="Ảnh" width="50" /></td>
                                                    <td>{user.address}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.role ? "Admin" : "Người dùng"}</td>
                                                </tr>
                                            ))}
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
        </div>
    );
};

export default Qluser;
