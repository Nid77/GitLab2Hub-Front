"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { type Project } from "./types/GitLab";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LabProjectCardProps {
    project: Project;
    selectProject: Dispatch<SetStateAction<Project | undefined>>
}

const LabProjectCard = ({ project, selectProject }: LabProjectCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Projet {project.name}</CardTitle>
                <CardDescription>
                    {project.description ? (
                        <p>{project.description}</p>
                    ) : (
                        <p>Pas de description disponible</p>
                    )}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <a
                    href={project.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Voir sur GitLab
                </a>
                <Button
                onClick={() => selectProject(project)}
                >
                    Select
                </Button>
            </CardFooter>
        </Card>
    );
};

export default LabProjectCard;
