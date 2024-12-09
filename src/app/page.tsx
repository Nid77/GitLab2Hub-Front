"use client";

import { set, z } from "zod";
import { FormEvent, use, useEffect, useState } from "react";
import ProjectCard from "../components/LabProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { ErrorMessages } from "@/components/Toast";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getGitLabProjects, setBaseUrl } from "../services/GitlabService";
import { Project } from "@/types/GitLab";

import { createGitHubProject, setHubBaseUrl } from "../services/GithubService";
import { GitLabToGitHubForm } from "@/components/GitLabToGitHubForm";
import { HubProject } from "@/types/GitHub";
import { setHubToken } from "../services/GithubService";

export default function Home() {
    const [projects, setLabProjects] = useState<Project[]>([]);
    const [project, setLabProject] = useState<Project | undefined>();
    const [gitlabUrl, setGitlabUrl] = useState<string>("gitlab.com");
    const [githubUrl, setGithubUrl] = useState<string>("api.github.com");

    const toast = useToast();

    function getProjects(token: string | undefined, baseUrl: string) {
        if (baseUrl && baseUrl !== "") setBaseUrl(baseUrl);

        getGitLabProjects(token ?? "")
            .then((projects: Project[]) => {
                setLabProjects(projects);
            })
            .catch((error: Error) => {
                console.log(error);
                toast.toast(
                    ErrorMessages(
                        "Error when getting lab projects",
                        error.message
                    )
                );
            });
    }

    function makeHubProject(baseUrl: string, name: string) {
        if (baseUrl && baseUrl !== "") setHubBaseUrl(baseUrl);

        createGitHubProject(name, "test", false)
            .then((project: HubProject) => {
                console.log("Project created : " + project);
            })
            .catch((error: Error) => {
                console.log(error);
                toast.toast(
                    ErrorMessages(
                        "Error when making hub project",
                        error.message
                    )
                );
            });
    }

    const LabShema = z.object({
        gitlabToken: z.string(),
    });

    const HubShema = z.object({
        githubRepoName: z.string(),
    });

    function formAction(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        const token = LabShema.safeParse(formValues).data?.gitlabToken;
        if (token) getProjects(token, gitlabUrl);
    }

    function handleHubForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        const name = HubShema.safeParse(formValues).data?.githubRepoName;
        if (name) makeHubProject(githubUrl, name);
    }

    return (
        <div className="flex flex-col gap-4 m-4 p-4">
            <h1>Migrate from GitLab to GitHub</h1>
            <Separator />

            <h2>Configuration</h2>
            <div className="flex w-full justify-center gap-4">
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

                        <ScrollArea className=" h-[400px] rounded-md border p-4">
                            {projects == undefined || projects?.length === 0
                                ? "No projects"
                                : ""}

                            {projects?.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    selectProject={setLabProject}
                                />
                            ))}
                        </ScrollArea>
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
                                onChange={(e) => {
                                    setHubToken(e.target.value);
                                }}
                            />
                        </div>
                    </form>

                    <div className="mt-8">
                        <h3>Make a gitHub repository</h3>
                        <GitLabToGitHubForm
                            formAction={handleHubForm}
                            urlValue={gitlabUrl}
                            nameValue={project?.name}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
