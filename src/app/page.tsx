"use client";
import { getGitLabProjects } from "../services/GitlabService";
import { Project } from "@/types/GitLab";
import { z } from "zod";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { ToastMessages } from "@/components/Toast";

export default function Home() {
    const [projects, setProjects] = useState<Project[]>([]);
    const toast = useToast();

    function getProjects(token: string) {
        getGitLabProjects(token)
            .then((projects: Project[]) => {
                setProjects(projects);
            })
            .catch((error: string) => {
                console.log("error when getting projects " + error);
                toast.toast(ToastMessages.error);
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
        getProjects(token as string);
    }

    return (
        <div className="flex flex-col gap-4 m-4">
            <h1>Migarte from GitLab to GitHub</h1>

            <div className="flex flex-col self-center m-2 gap-4">
                <h2>Get GitLab Projetcs </h2>

                <form onSubmit={formAction} className="flex gap-2">
                    <label htmlFor="gitlab-token">Git Lab Token</label>
                    <Input
                        placeholder="GitLab Token"
                        id="gitlab-token"
                        name="gitlabToken"
                    />
                    <Button type="submit">Click me</Button>
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
