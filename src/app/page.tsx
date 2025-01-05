"use client";

import { set, z } from "zod";
import { FormEvent, useEffect, useState } from "react";
import ProjectCard from "../components/LabProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { ErrorMessages, SuccessMessages } from "@/components/Toast";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getGitLabProjects, setBaseUrl } from "../services/GitlabService";
import { Project } from "@/types/GitLab";

import { setHubBaseUrl } from "@/services/GithubService";
import { GitLabToGitHubForm } from "@/components/GitLabToGitHubForm";
import { migrateHubProject } from "@/services/BackService";
import { setHubToken, setLabToken } from "@/services/BackService";

export default function Home() {
    const [projects, setLabProjects] = useState<Project[]>([]);
    const [project, setLabProject] = useState<Project | undefined>();
    const [gitlabUrl, setGitlabUrl] = useState<string>("gitlab.com");
    const [githubUrl, setGithubUrl] = useState<string>("api.github.com");
    const [tmpLabToken, setTmpLabToken] = useState<string>("");

    const toast = useToast();

    function getProjects(baseUrl: string) {
        if (baseUrl && baseUrl !== "") setBaseUrl(baseUrl);
        getGitLabProjects(tmpLabToken ?? "")
            .then((projects: Project[]) => {
                setLabProjects(projects);
            })
            .catch((error: Error) => {
                console.log(error);
                toast.toast(ErrorMessages("Error when getting lab projects", error.message));
            });
    }

    function migrateProject(name: string, privateRepo: boolean, description: string) {
        if (githubUrl && githubUrl !== "") setHubBaseUrl(githubUrl);

        migrateHubProject(githubUrl, name, privateRepo, description, project?.http_url_to_repo ?? "")
            .then(() => {
                toast.toast(SuccessMessages("Success", `Project ${project?.name} migrated successfully`));
            })
            .catch((error: Error) => {
                console.log(error);
                toast.toast(ErrorMessages("Error when making hub project", error.message));
            });
    }

    const HubShema = z.object({
        githubRepoName: z.string().min(1),
        isprivate: z.string().optional(),
        description: z.string(),
    });

    function formAction(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        getProjects(gitlabUrl);
    }

    function handleHubForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        const result = HubShema.safeParse(formValues);
        if (result.success) {
            const { githubRepoName, isprivate, description } = result.data;
            migrateProject(githubRepoName, isprivate === "on" ? true : false, description);
        }
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

                    <a href="/about/GitLabToken" target="_blank">
                        You need to make Acess Token in GitLab !
                    </a>

                    <form onSubmit={formAction} className="flex flex-col gap-2 ">
                        <label htmlFor="gitlab-token">GitLab Token</label>
                        <div className="flex">
                            <Input
                                placeholder="GitLab Token"
                                value={tmpLabToken}
                                onChange={(e) => {
                                    setTmpLabToken(e.target.value);
                                }}
                            />
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <h3>Projects</h3>

                        <ScrollArea className=" h-[500px] rounded-md border p-4">
                            {projects == undefined || projects?.length === 0 ? "No projects" : ""}

                            {projects?.map((project) => (
                                <ProjectCard key={project.id} project={project} selectProject={setLabProject} />
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
                    <a href="/about/GitHubToken" target="_blank">
                        You need to make Acess Token in GitHub !
                    </a>

                    <form className="flex flex-col gap-2 ">
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
                            nameValue={project?.name}
                            privValue={project?.visibility === "private" ? true : false}
                            descValue={project?.description ?? ""}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
