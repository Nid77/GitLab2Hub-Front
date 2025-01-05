import axios, { AxiosInstance } from "axios";

export const executeAxiosRequest = async (
    client: AxiosInstance,
    url: string,
    method: string,
    data: any,
    params?: any
) => {
    try {
        const response = await client.request({
            url,
            method,
            data,
            params,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.status) {
            throw new Error("Status: " + error.status + "Error :" + JSON.stringify(error.response?.data));
        } else {
            throw new Error((error as Error).message);
        }
    }
};
