import axios from "axios";

const client = axios.create({
    baseURL: "https://gitlab.com/api/v4",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export const getGitLabProjects = async (token: string) => {
    try {
        if (!token) {
            throw new Error("No token provided");
        }

        client.defaults.headers.Authorization = `Bearer ${token}`;
        const response = await client.get("/projects");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                "Axios Error:" +
                    error.response?.status +
                    "- Message :" +
                    error.response?.data
            );
        } else {
            throw new Error(
                "Error: " + error
            );
        }
    }
};
