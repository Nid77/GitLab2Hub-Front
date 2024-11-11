"use client";
import {getGitLabProjects} from "../services/GitlabService";
import { Project } from "@/types/GitLab";
import { z } from "zod";
import { useState } from "react";
import ProjectCard from "./ProjectCard";

export default function Home() {

  const [value, setValue] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);

  function getProjects(token?: string) {
    console.log("token", token);
    getGitLabProjects().then((projects: Project[]) => {
      console.log(projects);
      setProjects(projects);
    }).catch((error: string) => {
      console.error(error);
    });

  }

  const userShema = z.object({
    token: z.string(),
  });

  function formAction(e: any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    const token = userShema.safeParse(formValues).data?.token;
    getProjects(token);
  }

  return (
    <div>

      <h1>Home</h1>

      <div>
        <h2>Get GitLab Projetcs </h2>

        <form 
        onSubmit={formAction}
        >
          <label htmlFor="">Git Lab Token</label>
          <input type="text" id="gitlab-token" placeholder="GitLab Token"/>
          <button type="submit">Submit</button>
        </form>


      </div>
        
      {projects.length === 0 && 'No projects'}

      {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}


    </div>
  );
}
