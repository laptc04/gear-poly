import React from "react";
import GearPoly from "../../../images/LogoGearPoly.png";
import { AiOutlineBell } from "react-icons/ai";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineSearch } from "react-icons/ai";

const NavbarClient = () => {
  return (
    <div>
      <nav className="navbar fixed-top p-0">
        <div className="container-fluid bg-white">
          <a className="navbar-brand" href="/index">
            <img
              id="profileImage"
              src={GearPoly}
              alt="Profile"
              className="rounded-circle"
              style={{ height: "110px", width: "110px", marginTop: "5px" }}
            />
          </a>
          <div className="d-flex align-items-center m-3">
            <input
              name="product_name"
              className="form-control "
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "500px" }}
            />
            <button type="submit" className="btn btn-outline-dark  m-1">
              <i>
                <AiOutlineSearch />
              </i>
            </button>
            <button className="btn btn-outline-dark  m-1" type="submit">
              <i>
                <AiOutlineBell />
              </i>
            </button>
            <a href="/cart" className="btn btn-outline-dark  m-1">
              <i>
                <CiShoppingCart />
              </i>
            </a>
            <a href="/user/nguoidung">
              <img
                id="profileImage"
                src="/images/profile.png"
                alt="Profile"
                className="rounded-circle"
                style={{ height: "35px", width: "35px", marginTop: "5px" }}
              />
            </a>
          </div>
          <div>
            <button
              className="navbar-toggler bg-light"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  GearPoly
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/user/index"
                    >
                      <i className="fa-solid fa-house m-1"></i>Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link g-black" href="#">
                      <i className="fa-solid fa-heart m-1"></i> My favorites
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-bars m-1"></i> My account
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="/login">
                          <i className="fa-solid fa-right-to-bracket m-1"></i>{" "}
                          Login
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/user/quenmatkhau">
                          <i className="fa-solid fa-question m-1"></i> Forgot
                          Password
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/register">
                          <i className="fa-solid fa-registered m-1"></i>{" "}
                          Registration
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/logout">
                          <i className="fa-solid fa-outdent m-1"></i> Logoff
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/changePassword">
                          <i className="fa-solid fa-gears m-1"></i> Change
                          Password
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/user/nguoidung">
                          <i className="fa-solid fa-gears m-1"></i> Edit Profile
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavbarClient;
