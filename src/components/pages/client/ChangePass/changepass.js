import React, { useState } from 'react';
import './changepass.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (newPassword !== confirmPassword) {
    //   setMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
    //   setMessageType('error');
    //   return;
    // }

    // try {
    //   const response = await fetch('/changePassword', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ oldPassword, newPassword }),
    //   });
    //   const data = await response.json();
    //   if (data.success) {
    //     setMessage('Đổi mật khẩu thành công!');
    //     setMessageType('success');
    //   } else {
    //     setMessage(data.message || 'Đổi mật khẩu thất bại');
    //     setMessageType('error');
    //   }
    // } catch (error) {
    //   setMessage('Lỗi khi đổi mật khẩu');
    //   setMessageType('error');
    // }
  };

  return (
    <div className="change-password-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-9">
            <div className="change-password-container">
              <h1 className="text-center pb-2 change-password-title">
                <a href="/user/index">Đổi mật khẩu GearPoly</a>
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label text-dark">Mật khẩu cũ:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    placeholder="Mật khẩu cũ"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label text-dark">Mật khẩu mới:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    placeholder="Mật khẩu mới"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label text-dark">Xác nhận mật khẩu mới:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Xác nhận mật khẩu mới"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {message && (
                  <div className={messageType === 'error' ? 'text-danger' : 'text-success'}>
                    <p>{message}</p>
                  </div>
                )}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary mt-1">Cập nhật</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
