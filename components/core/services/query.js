import { useQuery } from "@tanstack/react-query";
import httpReq from "../config/axios"

const useProfile = () => {
    return useQuery({
        queryFn: async () => {
            const res = await httpReq.get("/user/profile");
            return res.data;
        },
        queryKey: ["user-data"],
        retry: 1,
    });
}



const useGetBasket = () => {
    return useQuery({
        queryFn: async () => {
            const res = await httpReq.get('/basket');
            return res.data;
        },
        queryKey: ["user-basket"],

    });
};


const useGetUserTour = () => {
    const { data } = useProfile()

    return useQuery({
        queryFn: async () => {
            const res = await httpReq.get('/user/tours');
            return res.data;
        },
        queryKey: ["user-tour", data?.id],

    });
};

const useGetUserTransactions = () => {


    return useQuery({
        queryFn: async () => {
            const res = await httpReq.get("/user/transactions");
            return res.data;
        },
        queryKey: ["user-transactions"]

    });
};




export { useProfile, useGetBasket, useGetUserTour, useGetUserTransactions }