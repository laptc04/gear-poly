import request from "../../config/ApiConfig";

const loginApi = async ({ id, password }) => {
  try {
    const res = await request({
      method: "POST",
      path: "api/auth/login",
      data: {
        id,
        password,
      },
    });

    console.log("loginApi response:", res);
    
    if (!res || !res.account || !res.token) {
      throw new Error('Phản hồi API không dự kiến');
    }

    const { account, token } = res;

    return {
      account,
      token,
      role: account.role, // Kiểm tra rằng role có trong account
    };
  } catch (error) {
    console.error("Lỗi khi gọi API đăng nhập:", error);
    throw new Error(error);
  }
};

const getProfile = async () => {
  try {
    const res = await request({
      method: "GET",
      path: "api/auth/user",
    });

    if (!res || !res.account || res.account.role === undefined) {
      throw new Error('Thông tin người dùng không tồn tại hoặc không hợp lệ');
    }

    return {
      account: res.account,
      role: res.account.role,
    };
  } catch (error) {
    console.error("Lỗi khi gọi API lấy thông tin người dùng:", error);
    throw error;
  }
};
// const registerApi = async ({ id, fullname, email, password}) => {
//   try {
//     const res = await request({
//       method: "POST",
//       path: "/api/auth/register",
//       data: {
//         id,
//         fullname,
//         email,
//         password,
//       },
//     });

//     return res;
    

//   } catch (error) {
//     console.error("Lỗi API đăng ký:", error);
//     throw error;
//   }
// };

export { loginApi, getProfile };
