import {setLoading} from "../redux/Slicers/LoadingSlice.js";
import store from "../redux/store.js";
import UseAxiosSecure from "../hooks/useAxiosSecure.jsx";

import {toast} from "sonner";


export const LoginRequest = async (data) => {
    const axiosSecure = UseAxiosSecure(); // <-- call the hook/function
    try {
        store.dispatch(setLoading(true));

        const res = await axiosSecure.post('/Users/login',data);

        return res.data;
    } catch (error) {
        console.log("from err", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);

    } finally {
        store.dispatch(setLoading(false));
    }
};

export const SignupRequest = async (data) => {
    const axiosSecure = UseAxiosSecure(); // <-- call the hook/function
    try {
        store.dispatch(setLoading(true));

        const res = await axiosSecure.post('/Users/register',data);

        return res.data;
    } catch (error) {
        console.log("from err", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);

    } finally {
        store.dispatch(setLoading(false));
    }
};

export const UserProfile = async () => {
    const axiosSecure = UseAxiosSecure(); // <-- call the hook/function
    try {
        store.dispatch(setLoading(true));

        const res = await axiosSecure.get('/Users/profile');

        return res.data;
    } catch (error) {
        console.log("from err", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);

    } finally {
        store.dispatch(setLoading(false));
    }
};


export const UpdateProfileRequest = async (userId, data) => {
    const axiosSecure = UseAxiosSecure(); // <-- call the hook/function
    try {
        store.dispatch(setLoading(true));

        const res = await axiosSecure.put(`/Users/${userId}`, data);

        return res.data;
    } catch (error) {
        console.log("from err", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);

    } finally {
        store.dispatch(setLoading(false));
    }
};


export const UserSubscribe = async (data) => {
    const axiosSecure = UseAxiosSecure(); // <-- call the hook/function
    try {
        store.dispatch(setLoading(true));

        const res = await axiosSecure.post(`/Users/subscribe`, data);

        return res.data;
    } catch (error) {
        console.log("from err", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);

    } finally {
        store.dispatch(setLoading(false));
    }
};