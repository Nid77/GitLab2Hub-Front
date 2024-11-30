"use client";

import React, { useEffect, useState } from "react";
import { type HubProject } from "@/types/GitHub";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


const LabProjectCard = ({ project }: { project: HubProject }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Projet {project.full_name}</CardTitle>
                <CardDescription>
                    {project.description ? (
                        <p>{project.description}</p>
                    ) : (
                        <p>Pas de description disponible</p>
                    )}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Voir sur GitLab
                </a>
            </CardFooter>
        </Card>
    );
};

export default LabProjectCard;
