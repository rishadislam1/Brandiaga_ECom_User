import UseAxiosSecure from "@/hooks/UseAxiosSecure";
import store from "@/redux/store";
import { setLoading } from "@/redux/Slicers/LoadingSlice";
import { toast } from "sonner";

export interface OrderTrackingResponse {
  orderNumber: string;
  status: string;
  estimatedDelivery: string | null;
  shippingAddress: string;
  carrier: string;
  trackingNumber: string | null;
  items: {
    name: string;
    quantity: number;
    status: string;
  }[];
  trackingHistory: {
    date: string;
    time: string;
    status: string;
    location: string | null;
    isCompleted: boolean;
  }[];
}

export const GetOrderTracking = async (
  orderNumber: string,
  email: string,
): Promise<OrderTrackingResponse> => {
  const axiosSecure = UseAxiosSecure();
  try {
    store.dispatch(setLoading(true));

    const res = await axiosSecure.get(`/tracking/track`, {
      params: { orderNumber, email },
    });

    return res.data;
  } catch (error) {
        toast.error(error?.response?.data?.message);
  } finally {
    store.dispatch(setLoading(false));
  }
};
