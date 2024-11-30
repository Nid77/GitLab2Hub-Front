import axios from "axios";

const client = axios.create({
    baseURL: "https://api.github.com/",
    headers: {
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28"
    },
});

export const setHubBaseUrl = (url: string) => {
    client.defaults.baseURL = "https://" + url ;
};

export const setHubToken = (token: string) => {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getHubToken = () => {
    return client.defaults.headers.common["Authorization"];
};

const executeAxiosRequest = async (
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
        if (axios.isAxiosError(error)) {
            throw new Error("Axios Error :" + error.response?.data.message);
        } else {
            throw new Error((error as Error).message);
        }
    }
};

export const getGitHubProjects = async (token? : string) => {
    if (!getHubToken() && !token) throw new Error("Token is not set");
    if(!getHubToken() && token) setHubToken(token);
    return executeAxiosRequest("/user/repos", "GET", null);
}

