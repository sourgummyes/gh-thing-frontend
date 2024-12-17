import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const signup = async (formData) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/auth/signup`, formData);

    if (res.err) {
      throw new Error(res.err);
    }
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);

      const user = JSON.parse(atob(res.data.token.split(".")[1]));
      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signin = async (user) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/auth/signin`, user);
    console.log(res)
    if (res.data.error) {
      throw new Error(res.data.error);
    }

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token)

      const user = JSON.parse(atob(res.data.token.split(".")[1]));
      console.log(user)
      return user;
    }
    return res.data;
  } catch (error) {
    console.log(err);
    throw error;
  }
};

const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const user = JSON.parse(atob(token.split(".")[1]));
  return user;
};

const signout = () => {
  localStorage.removeItem("token");
};

export { signup, signin, getUser, signout };
