import UseAxiosSecure from "@/hooks/UseAxiosSecure";
import store from "@/redux/store";
import {setLoading} from "@/redux/Slicers/LoadingSlice";
import {toast} from "sonner";

export const GetBannerRequest = async (data) => {
    const axiosSecure = UseAxiosSecure(); // <-- call the hook/function
    try {
        store.dispatch(setLoading(true));

        const res = await axiosSecure.get('/Banners');

        return res.data;
    } catch (error) {
        console.log("from err", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);

    } finally {
        store.dispatch(setLoading(false));
    }
};
