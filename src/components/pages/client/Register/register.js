import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css';

const Register = () => {
    const [id, setId] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    //const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // try {
        //     const response = await fetch('/register', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ id, fullname, email, password })
        //     });
        //     const data = await response.json();
        //     if (data.success) {
        //         setMessage('Đăng ký thành công!');
        //         history.push('/login');
        //     } else {
        //         setMessage(data.message || 'Đã xảy ra lỗi khi đăng ký.');
        //     }
        // } catch (error) {
        //     console.error('Lỗi khi đăng ký:', error);
        //     setMessage('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.');
        // }
    };

    return (
        <div className="register-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 col-sm-9">
                        <div className="register-container">
                            <h1 className="text-center pb-2 register-title">
                                <a href="/index">Đăng ký GearPoly</a>
                            </h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="id" className="form-label text-dark">Tên đăng nhập:</label>
                                    <input
                                        name="id"
                                        className="form-control"
                                        id="id"
                                        placeholder="Tên đăng nhập"
                                        required
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fullname" className="form-label text-dark">Họ và tên:</label>
                                    <input
                                        name="fullname"
                                        className="form-control"
                                        id="fullname"
                                        placeholder="Họ và tên"
                                        required
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-dark">Email:</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="example@gmail.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label text-dark">Mật khẩu:</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Mật khẩu"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {message && (
                                    <div className="text-danger">
                                        <p>{message}</p>
                                    </div>
                                )}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary mt-1">Đăng ký</button>
                                </div>
                            </form>
                            <div className="mt-3 text-center">
                                <a href="/login" className="link-offset-3 link-underline link-underline-opacity-0">Đã có tài khoản? Đăng nhập</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
