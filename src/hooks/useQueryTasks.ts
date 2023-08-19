import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../types";
import { useError } from "./useError";

export const useQueryTasks = () => {
    const { swichErrorHandling } = useError();
    const getTasks = async () => {
        const { data } = await axios.get<Task[]>(
            `${process.env.REACT_APP_API_URL}/tasks`,
            {withCredentials: true}
        );
        return data;
    };
    return useQuery<Task[], Error>({
        queryKey: ['tasks'],
        queryFn: getTasks,
        staleTime: Infinity,
        onError: (error: any) => {
            if (error.response.data.message) {
                swichErrorHandling(error.response.data.message);
            } else {
                swichErrorHandling(error.message);
            }
        },
    });
}