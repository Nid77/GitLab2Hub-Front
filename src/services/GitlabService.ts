import axios from "axios";

const client = axios.create({
    baseURL: "https://gitlab.com/api/v4",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
    }
});


export const getGitLabProjects = async () => {
    try {
        const response = await client.get("/projects");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


