import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async ({
  name,
  mobile,
  email,
  password,
}: {
  name: string;
  mobile: string;
  email: string;
  password: string;
}) => {
  try {
    const result = await axios.post(BACKEND_URL + "user/register", {
      name,
      mobile,
      email,
      password,
    });

    const { message, status, token } = result.data;

    if (status != 200) {
      throw new Error(message);
    }

    localStorage.setItem("token", token);

    return true;
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const result = await axios.post(BACKEND_URL + "user/login", {
      email,
      password,
    });

    const { status, message, token } = result.data;

    if (status != 200) {
      throw new Error(message);
    }

    localStorage.setItem("token", token);

    return true;
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
};
