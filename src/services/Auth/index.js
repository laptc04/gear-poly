import request from "../../config/ApiConfig";

const loginApi = async ({ id, password }) => {
  try {
    const res = await request({
      method: "POST",
      path: "/auth/login",
      data: {
        id: id,
        password: password,
        // device: "website"
      },
    });

    console.log("loginApi response:", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi gọi API đăng nhập:", error);
    throw error;
  }
};

const getProfile = async () => {
  const res = await request({
    method: "GET",
    path: "/user",
  });

  return res;
};


export { loginApi, getProfile };
