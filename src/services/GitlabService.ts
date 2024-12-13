import axios from "axios";

const client = axios.create({
    baseURL: "https://gitlab.com/api/v4",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export const setBaseUrl = (url: string) => {
    client.defaults.baseURL = "https://" + url + "/api/v4";
};

export const setToken = (token: string) => {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getToken = () => {
    return client.defaults.headers.common["Authorization"];
};

const executeAxiosRequest = async (url: string, method: string, data: any, params?: any) => {
    try {
        const response = await client.request({
            url,
            method,
            data,
            params,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error("Axios Error :" + error.response?.data.message);
        } else {
            throw new Error((error as Error).message);
        }
    }
};

export const getGitLabProjects = async (token: string) => {
    if (!getToken() && !token) throw new Error("Token is required");
    if (!getToken()) setToken(token);
    return executeAxiosRequest("/projects", "GET", null, {
        membership: true,
        simple: false,
        per_page: 10,
        page: 1,
    });
};
