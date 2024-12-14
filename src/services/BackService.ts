import axios from "axios";
import { executeAxiosRequest } from "./GlobalService";

const client = axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
});

export const setLabToken = (token: string) => {
    client.defaults.headers.common["gitlabtoken"] = token;
};

export const setHubToken = (token: string) => {
    client.defaults.headers.common["githubtoken"] = token;
};

export const migrateHubProject = async (
    gitHubUrl: string,
    name: string,
    privateRepo: boolean,
    description: string,
    sourceRepoUrl: string
) => {
    return executeAxiosRequest(client, "/api/github/migrate", "POST", {
        gitHubUrl: gitHubUrl,
        name: name,
        private: privateRepo,
        description: description,
        sourceRepoUrl: sourceRepoUrl,
    });
};
