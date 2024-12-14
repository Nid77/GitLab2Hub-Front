import axios from "axios";
import { executeAxiosRequest } from "./GlobalService";

const client = axios.create({
    baseURL: "https://api.github.com/",
    headers: {
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
    },
});

export const setHubBaseUrl = (url: string) => {
    client.defaults.baseURL = "https://" + url;
};

export const setHubToken = (token: string) => {
    if (!token || token == "") throw new Error("Token is not set");
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getHubToken = () => {
    const authorization = client.defaults.headers.common["Authorization"];
    return typeof authorization === "string" ? authorization.replace("Bearer ", "") : "";
};

export const getGitHubProjects = async (token?: string) => {
    if (!getHubToken() && !token) throw new Error("Token is not set");
    if (!getHubToken() && token) setHubToken(token);
    return executeAxiosRequest(client, "/user/repos", "GET", null);
};
