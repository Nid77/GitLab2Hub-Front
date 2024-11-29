"use client";
import { getGitLabProjects, setBaseUrl } from "../services/GitlabService";
import { Project } from "@/types/GitLab";
import { set, z } from "zod";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { ErrorMessages } from "@/components/Toast";

export default function Home() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [gitlabUrl, setGitlabUrl] = useState<string>("");
    const toast = useToast();

    function getProjects(token: string, baseUrl: string) {
        if (baseUrl && baseUrl !== "") {
            setBaseUrl(baseUrl);
        }

        getGitLabProjects(token)
            .then((projects: Project[]) => {
                setProjects(projects);
            })
            .catch((error: Error) => {
                console.log(error);
                toast.toast(ErrorMessages("Error", error.message));
            });
    }

    const userShema = z.object({
        gitlabToken: z.string(),
    });

    function formAction(e: any) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        const token = userShema.safeParse(formValues).data?.gitlabToken;
        getProjects(token as string, gitlabUrl);
    }

    return (
        <div className="flex flex-col gap-4 m-4">
            <h1>Migrate from GitLab to GitHub</h1>

            <label htmlFor="gitLab-Url">GitLab Base Url</label>
            <Input
                placeholder="GitLab BaseUrl"
                id="gitLab-Url"
                value={gitlabUrl}
                onChange={(e) => setGitlabUrl(e.target.value)}
            />

            <div className="flex flex-col self-center m-2 gap-4">
                <h2>Get GitLab Projetcs </h2>

                <a href="/about/GitLabToken">
                    You need to make Acess Token in GitLab
                </a>

                <form onSubmit={formAction} className="flex gap-2 ">
                    <label htmlFor="gitlab-token">GitLab Token</label>
                    <Input
                        placeholder="GitLab Token"
                        id="gitlab-token"
                        name="gitlabToken"
                    />
                    <Button type="submit">Submit</Button>
                </form>

                <div className="mt-8">
                    <h3>Projects</h3>

                    {projects == undefined || projects?.length === 0
                        ? "No projects"
                        : ""}

                    {projects?.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
}
