import {setLoading} from "../redux/Slicers/LoadingSlice.js";
import store from "../redux/store.js";
import UseAxiosSecure from "../hooks/useAxiosSecure.jsx";
import { toast } from "sonner";


export const CreateOrderRequest = async (data) => {
  const axiosSecure = UseAxiosSecure(); // Call the hook/function
  try {
    store.dispatch(setLoading(true));

    const res = await axiosSecure.post('/Orders', data);

    return res.data;
  } catch (error) {
    console.log("from err", error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  } finally {
    store.dispatch(setLoading(false));
  }
};

export const GetOrderRequest = async (userID) => {
  const axiosSecure = UseAxiosSecure(); // Call the hook/function
  try {
    store.dispatch(setLoading(true));

    const res = await axiosSecure.get(`/Orders/user/${userID}`);

    return res.data;
  } catch (error) {
    console.log("from err", error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  } finally {
    store.dispatch(setLoading(false));
  }
};