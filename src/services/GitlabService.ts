import axios from "axios";

const client = axios.create({
    baseURL: "https://gitlab.com/api/v4",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        membership: "true",
    },
});

export const setBaseUrl = (url: string) => {
    client.defaults.baseURL = "https://" + url + "/api/v4";
};

export const getGitLabProjects = async (token: string) => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("baseURL", client.defaults.baseURL);
        const response = await client.get("/projects", {
            params: {
                membership: true,
                simple: true,
                per_page: 10,
                page: 1,
            },
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
