import React from "react";
import GearPoly from "../../../images/LogoGearPoly.png";
import { AiOutlineBell } from "react-icons/ai";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineSearch } from "react-icons/ai";
import Dropdown from "react-bootstrap/Dropdown";
import { deleteCookie, getCookie } from "../../../services/Cookie/cookie";

const NavbarClient = () => {
  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("role");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("originalToken");
    window.location.href = "/";
  };
  return (
    <div>
      <nav className="navbar fixed-top p-0">
        <div className="container-fluid bg-white">
          <a className="navbar-brand" href="/">
            <img
              id="profileImage"
              src={GearPoly}
              alt="Profile"
              className="rounded-circle"
              style={{ height: "110px", width: "110px", marginTop: "5px" }}
            />
          </a>
          <div className="d-flex align-items-center m-3">
            <button className="btn btn-outline-dark  m-1" type="submit">
              <i>
                <AiOutlineBell />
              </i>
            </button>
            <a href="/user/cart" className="btn btn-outline-dark  m-1">
              <i>
                <CiShoppingCart />
              </i>
            </a>
            <a href="/user/userinfo">
              <img
                id="profileImage"
                src="/images/profile.png"
                alt="Profile"
                className="rounded-circle"
                style={{ height: "35px", width: "35px", marginTop: "5px" }}
              />
            </a>
          </div>
          <Dropdown>
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
              style={{ height: "35px", width: "205px", marginTop: "5px" }}
            >
              Tài khoản
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/user/login">Đăng nhập</Dropdown.Item>
              <Dropdown.Item href="/user/register">Đăng ký</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </div>
  );
};
export default NavbarClient;
