import axios from "axios";

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
            throw new Error("Status: " + error.response?.status + " - Axios Error : " + error.response?.data.message);
        } else {
            throw new Error((error as Error).message);
        }
    }
};

export const getGitHubProjects = async (token?: string) => {
    if (!getHubToken() && !token) throw new Error("Token is not set");
    if (!getHubToken() && token) setHubToken(token);
    return executeAxiosRequest("/user/repos", "GET", null);
};

const createGitHubProject = async (name: string, privateRepo: boolean, description: string) => {
    return executeAxiosRequest("/user/repos", "POST", {
        name: name,
        private: privateRepo,
        description: description,
    });
};

export const migrateHubProject = async (
    name: string,
    privateRepo: boolean,
    description: string,
    sourceRepoUrl: string
) => {
    setHubBaseUrl(process.env.BACKEND_URL || "http://localhost:3000");

    const project = await createGitHubProject(name, privateRepo, description);

    return executeAxiosRequest("/user/repos", "POST", {
        name: name,
        private: privateRepo,
        description: description,
        sourceRepoUrl: sourceRepoUrl,
        destinationRepoUrl: project.http_url_to_repo,
    });
};
