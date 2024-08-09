import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css';

const Register = () => {
    const [id, setId] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    // Các biến trạng thái để lưu thông báo lỗi của từng trường
    const [errors, setErrors] = useState({
        id: '',
        fullname: '',
        email: '',
        password: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            id: '',
            fullname: '',
            email: '',
            password: ''
        };

        if (!id || id.length < 6) {
            newErrors.id = 'Tên đăng nhập phải có ít nhất 6 ký tự';
            isValid = false;
        }
        if (!fullname) {
            newErrors.fullname = 'Họ và tên không được bỏ trống';
            isValid = false;
        }
        if (!email) {
            newErrors.email = 'Email không được bỏ trống';
            isValid = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
            newErrors.email = 'Email phải có định dạng @gmail.com';
            isValid = false;
        }
        if (!password) {
            newErrors.password = 'Mật khẩu không được bỏ trống';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Kiểm tra dữ liệu trước khi gửi yêu cầu
        if (!validateForm()) return;

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    fullname,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessageType('success');
                setMessage('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
            } else {
                const error = await response.text();
                console.error('Lỗi từ server:', error);
                setMessageType('danger');
                setMessage(`Đăng ký thất bại: ${error}`);
            }
        } catch (error) {
            setMessageType('danger'); 
            setMessage(`Lỗi hệ thống: ${error.message}`);
        }
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
                            {message && (
                                <div className={`alert alert-${messageType}`} role="alert">
                                    {message}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="id" className="form-label text-dark">Tên đăng nhập:</label>
                                    <input
                                        name="id"
                                        className="form-control"
                                        id="id"
                                        placeholder="Tên đăng nhập"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                    {errors.id && <div className="text-danger">{errors.id}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fullname" className="form-label text-dark">Họ và tên:</label>
                                    <input
                                        name="fullname"
                                        className="form-control"
                                        id="fullname"
                                        placeholder="Họ và tên"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                    {errors.fullname && <div className="text-danger">{errors.fullname}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-dark">Email:</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="example@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label text-dark">Mật khẩu:</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                </div>
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
