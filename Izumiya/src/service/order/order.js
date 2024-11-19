import axios from "axios";

export const createInvoice = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/order/create/checkout";
    const res = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data.result.order;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const createInvoiceBuyNow = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/order/create/buy-now";
    const res = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data.result.order;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getAllOrders = async () => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/order/get-all-orders";
    const res = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.result;
  } catch (error) {
    return error;
  }
};
export const getOwnOrders = async () => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/order/get-my-orders";
    const res = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.result;
  } catch (error) {
    return error;
  }
};
export const getOrderById = async (orderId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/order/${orderId}`;
    const res = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.result;
  } catch (error) {
    return error.response.data;
  }
};
