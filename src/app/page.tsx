"use client";
import { getGitLabProjects, setBaseUrl } from "../services/GitlabService";
import { getGitHubProjects, setHubBaseUrl } from "../services/GithubService";
import { Project } from "@/types/GitLab";
import { HubProject } from "@/types/GitHub";
import { set, z } from "zod";
import { useState } from "react";
import ProjectCard from "../components/LabProjectCard";
import HubProjectCard  from "../components/HubProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { ErrorMessages } from "@/components/Toast";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [hubProjects, setHubProjects] = useState<HubProject[]>([]);
    const [gitlabUrl, setGitlabUrl] = useState<string>("gitlab.com");
    const [githubUrl, setGithubUrl] = useState<string>("api.github.com");
    const toast = useToast();

    function getProjects(token: string | undefined, baseUrl: string) {
        if (baseUrl && baseUrl !== "") {
            setBaseUrl(baseUrl);
        }

        getGitLabProjects(token ?? "")
            .then((projects: Project[]) => {
                setProjects(projects);
            })
            .catch((error: Error) => {
                console.log(error);
                toast.toast(ErrorMessages("Error", error.message));
            });
    }
    function getHubProjects(token: string | undefined, baseUrl: string) {
        if (baseUrl && baseUrl !== "") {
            setHubBaseUrl(baseUrl);
        }

        getGitHubProjects(token ?? "")
            .then((projects: HubProject[]) => {
                setHubProjects(projects);
            })
            .catch((error: Error) => {
                console.log(error);
                toast.toast(ErrorMessages("Error", error.message));
            });
    }

    const LabShema = z.object({
        gitlabToken: z.string(),
    });

    const hubShema = z.object({
        githubToken: z.string(),
    });

    function formAction(e: any) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        const token = LabShema.safeParse(formValues).data?.gitlabToken;
        const hubToken = hubShema.safeParse(formValues).data?.githubToken;
        token != undefined && getProjects(token, gitlabUrl);
        hubToken != undefined && getHubProjects(hubToken, githubUrl);
    }

    return (
        <div className="flex flex-col gap-4 m-4 p-4">
            <h1>Migrate from GitLab to GitHub</h1>
            <Separator />

            <h2>Configuration</h2>
            <div className="flex w-full justify-center">
                <div className="flex flex-1 flex-col m-2 gap-4">
                    <h2>GitLab</h2>

                    <div>
                        <label htmlFor="gitLab-Url">GitLab Base Url</label>
                        <Input
                            placeholder="GitLab BaseUrl"
                            id="gitLab-Url"
                            value={gitlabUrl}
                            onChange={(e) => setGitlabUrl(e.target.value)}
                        />
                    </div>

                    <a href="/about/GitLabToken">
                        You need to make Acess Token in GitLab !
                    </a>

                    <form
                        onSubmit={formAction}
                        className="flex flex-col gap-2 "
                    >
                        <label htmlFor="gitlab-token">GitLab Token</label>
                        <div className="flex">
                            <Input
                                placeholder="GitLab Token"
                                id="gitlab-token"
                                name="gitlabToken"
                            />
                            <Button type="submit">Submit</Button>
                        </div>
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

                <Separator orientation="vertical" />

                <div className="flex flex-1 flex-col m-2 gap-4">
                    <h2>GitHub</h2>
                    <div>
                        <label htmlFor="gitHub-Url">GitHub Base Url</label>
                        <Input
                            placeholder="GitHub BaseUrl"
                            id="gitHub-Url"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                        />
                    </div>
                    <a href="/about/GitHubToken">
                        You need to make Acess Token in GitHub !
                    </a>

                    <form
                        onSubmit={formAction}
                        className="flex flex-col gap-2 "
                    >
                        <label htmlFor="github-token">GitHub Token</label>
                        <div className="flex">
                            <Input
                                placeholder="GitHub Token"
                                id="github-token"
                                name="githubToken"
                            />
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <h3>Projects</h3>

                        {hubProjects == undefined || hubProjects?.length === 0
                            ? "No projects"
                            : ""}

                        {hubProjects?.map((project) => (
                            <HubProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
