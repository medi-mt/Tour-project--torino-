import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query'
import httpReq from "../config/axios";
const useSendOtp = () => {

    return useMutation({
        mutationFn: async (data) => {
            const res = await httpReq.post("/auth/send-otp", data);
            return res.data;
        },
    });
};


const useValidateOtp = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data) => {
            const res = await httpReq.post("/auth/check-otp", data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-data"] })
        }
    })
}



const useSendTourBasket = () => {

    return useMutation({
        mutationFn: (id) => httpReq.put(`/basket/${id}`)
    });
};





const useSendDetalUser = () => {
    return useMutation({
        mutationFn: (data) => httpReq.post("/order", data)
    });
};


const useEditUserProfile = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data) => {
            const res = await httpReq.put("user/profile", data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-data"] })
        }
    })
}



export { useSendOtp, useValidateOtp, useSendTourBasket, useSendDetalUser, useEditUserProfile }
