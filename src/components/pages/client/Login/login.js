import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../../services/Auth";
import './login.css';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [cookies, setCookie] = useCookies(["token"]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { account, token, role } = await loginApi({
        id: data.id,
        password: data.password,
      });

      console.log(account)
      // console.log(data.id);
      // console.log(data.password);
      if (token) {
        const date = new Date();
        date.setHours(date.getHours() + 1);
        // console.log(token)
        // setCookie("token", token, { path: "/", expires: date });
        console.log(cookies)
        // setCookie(account)
        // // Lưu vai trò người dùng vào cookie
        const roleValue = role ? "true" : "false";
        setCookie("role", roleValue, { path: "/", expires: date });

        const encodedUserId = btoa(unescape(encodeURIComponent(account.id))); // Mã hóa Base64
        // const encodedUserIdrole = btoa(unescape(encodeURIComponent(data?.vaiTro)));
        setCookie("token", encodedUserId, {  path: "/", expires: date });
        console.log(data?.id)
        // setCookie("user", encodedUserId, { expires: date });
        // setCookie("role", encodedUserIdrole, { expires: date });
     

        // Lưu ID người dùng vào localStorage
        localStorage.setItem("userId", account.id);

        // Chuyển hướng đến trang dựa trên vai trò
        navigate(role ? "/admin" : "/");
      } else {
        setErrorMessage("Tên đăng nhập hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      setErrorMessage(error.message || "Có lỗi xảy ra");
    }
    console.log(cookies.user)
  };
  
  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-9">
            <div className="login-container">
              <h1 className="text-center pb-2 login-title">
                <a href="/index">Đăng nhập</a>
              </h1>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="id" className="form-label text-dark">Tên đăng nhập:</label>
                  <input
                    id="id"
                    name="id"
                    type="text"
                    className="form-control"
                    placeholder="Tên đăng nhập"
                    required
                    {...register("id")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-dark">Mật khẩu:</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    required
                    {...register("password")}
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    id="remember"
                    name="remember"
                    className="form-check-input"
                    type="checkbox"
                  />
                  <label className="form-check-label" htmlFor="remember">Nhớ tài khoản</label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary mt-1">Đăng nhập</button>
                </div>
              </form>
              <div className="mt-3 text-center">
                <a href="/register" className="link-offset-3 link-underline link-underline-opacity-0">Tạo tài khoản mới?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
