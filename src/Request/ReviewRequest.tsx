import UseAxiosSecure from "@/hooks/UseAxiosSecure";
import store from "@/redux/store";
import {setLoading} from "@/redux/Slicers/LoadingSlice";
import {showError} from "@/components/ToasterComponent";



interface Review {
    reviewId: string;
    userId: string;
    username: string;
    productId: string;
    productName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface PostReviewPayload {
    productId: string;
    rating: number;
    comment: string;
}
export const AddReviewRequest = async (payload: PostReviewPayload): Promise<{ data: Review }> =>{
    const axiosSecure = UseAxiosSecure();
    try {
        store.dispatch(setLoading(true));

        const res = await axiosSecure.post('/Reviews',payload);

        return res.data;
    } catch (error) {

        showError(error?.response?.data?.message || error?.response?.data?.Message);
    } finally {
        store.dispatch(setLoading(false));
    }
}


export const GetReviewsRequest = async (productId: string): Promise<{ data: Review[] }> =>{
    const axiosSecure = UseAxiosSecure();
    try {
        store.dispatch(setLoading(true));

        const res = await axiosSecure.get(`/Reviews/product/${productId}`);

        return res.data;
    } catch (error) {

        showError(error?.response?.data?.message || error?.response?.data?.Message);
    } finally {
        store.dispatch(setLoading(false));
    }
}