import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { deleteCookie, getCookie } from "../../../services/Cookie/cookie";
const AdminNavbar = () => {
  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("role");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("originalToken");
    window.location.href = "/";
  };
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand href="#">
        <FontAwesomeIcon icon={faUserCircle} /> ADMIN
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <FontAwesomeIcon icon={faBars} />
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/admin/home" title="KHÁCH HÀNG">
            NGƯỜI DÙNG
          </Nav.Link>
          <Nav.Link href="/admin/product" title="SẢN PHẨM">
            SẢN PHẨM
          </Nav.Link>
          <Nav.Link href="/admin/category" title="DANH MỤC">
            DANH MỤC
          </Nav.Link>
          <Nav.Link href="/admin/bill" title="ĐƠN HÀNG">
            ĐƠN HÀNG
          </Nav.Link>
          <Nav.Link href="/admin/statistics" title="THỐNG KÊ">
            THỐNG KÊ
          </Nav.Link>
          <Nav.Link onClick={handleLogout}>ĐĂNG XUÁT</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
