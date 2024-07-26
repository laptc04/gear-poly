import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarClient from '../src/components/navbar/client/index';
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes } from "react-router-dom";
// import {
//   RouterProvider,
//   Route,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";

//client
import Laphoadon from "./components/pages/client/bills/laphoadon";
import TTngdung from "./components/pages/client/user_info/plTTngdung";
import Chitiethoadon from "./components/pages/client/bill_details/chitiethoadon";
import Cart from "./components/pages/client/Cart/cart";
import ProductDetail from "./components/pages/client/ProductDetail/chitietsanpham";
import Login from "./components/pages/client/Login/login";
import Register from "./components/pages/client/Register/register";
import ChangePassword from "./components/pages/client/ChangePass/changepass";
import Index from "./components/pages/client/index";

//admin
import Kho from "./components/pages/Admin/warehouse/kho";
import Qluser from "./components/pages/Admin/users/qltkuser";
import ThongKeTongChiTieu from "./components/pages/Admin/statistics/totalnam";
import Product from "./components/pages/Admin/products/product";
import Categoties from "./components/pages/Admin/categories/categories";

function App() {
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route>
  //       {/*  */}

  //       <Route path="/login" element={<Login />} />
  //       <Route path="/register" element={<Register />} />
  //       <Route path="/changepass" element={<ChangePassword />} />
  //       {/*  */}
  //       <Route path="/" element={<Index />} />
  //       <Route path="/laphoadon" element={<Laphoadon />} />
  //       <Route path="/ttnguoidung" element={<TTngdung />} />
  //       <Route path="/chitiethoadon" element={<Chitiethoadon />} />
  //       <Route path="/kho" element={<Kho />} />
  //       <Route path="/quanlyuser" element={<Qluser />} />
  //       <Route path="/thongke" element={<ThongKeTongChiTieu />} />
  //       <Route path="/ProductDetail" element={<ProductDetail />} />
  //       <Route path="/Cart" element={<Cart />} />
  //       <Route path="/product" element={<Product />} />
  //       <Route path="/categories" element={<Categoties />} />
  //     </Route>
  //   )
  // );

  return (
    <Router>
      <div>
        <NavbarClient/>
        <div className="NavbarClient">
          <Routes >
            <Route path="/" element={<Index />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
