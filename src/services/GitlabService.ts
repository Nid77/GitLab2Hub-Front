import axios from "axios";
import { executeAxiosRequest } from "./GlobalService";

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

export const getGitLabProjects = async (token: string) => {
    if (!getToken() && !token) throw new Error("Token is required");
    if (!getToken()) setToken(token);
    return executeAxiosRequest(client, "/projects", "GET", null, {
        membership: true,
        simple: false,
        per_page: 10,
        page: 1,
    });
};
