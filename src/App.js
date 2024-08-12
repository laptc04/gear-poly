import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Navigate } from "react-router-dom";

//client
import UserLayout from "./components/navbar/client/userLayout";
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
import AdminLayout from "./components/navbar/admin/adminLayout";
import Kho from "./components/pages/Admin/warehouse/kho";
import Qluser from "./components/pages/Admin/users/qltkuser";
import Product from "./components/pages/Admin/products/product";
import ProductFrom from "./components/pages/Admin/products/productForm";
import Categoties from "./components/pages/Admin/categories/categories";
import ProductCustomerDetails from "./components/pages/Admin/bills";
import DetaillBill from "./components/pages/Admin/bills/detaillBill";

import CategotiesForm from "./components/pages/Admin/categories/categoriesForm";
import SalesStatistics from "./components/pages/Admin/salesStatistics";

function App() {
  return (
    <Router>
      <div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/user/home" />} />
            {/* user */}
            <Route path="/user" element={<UserLayout />}>
              <Route path="home" element={<Index />} />
              <Route path="cart" element={<Cart />} />
              <Route
                path="productDetail/:productID"
                component={ProductDetail}
                element={<ProductDetail />}
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="changePassword" element={<ChangePassword />} />
              <Route path="bill" element={<Laphoadon />} />
              <Route
                path="userInfo/:detailBillId"
                element={<Chitiethoadon />}
              />
              <Route path="userinfo" element={<TTngdung />} />
            </Route>
            {/* admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="home" element={<Qluser />} />
              <Route path="products" element={<Product />} />
              <Route path="bill" element={<ProductCustomerDetails />} />
              <Route path="bill/:id/:detailBillId" element={<DetaillBill />} />
              <Route path="statistics" element={<ThongKeTongChiTieu />} />
              <Route path="productsForm" element={<ProductFrom />} />
              <Route path="productsForm/:id" element={<ProductFrom />} />
              <Route path="categories" element={<Categoties />} />
              <Route path="categoriesForm" element={<CategotiesForm />} />
              <Route path="categoriesForm/:id" element={<CategotiesForm />} />
              {/* <Route path="statistics" element={<ThongKeTongChiTieu />} /> */}
              <Route path="wherehouse" element={<Kho />} />
              <Route path="salesstatistics" element={<SalesStatistics />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
