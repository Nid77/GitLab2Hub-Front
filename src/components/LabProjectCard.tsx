"use client";

import React, { useEffect, useState } from "react";
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

const LabProjectCard = ({ project }: { project: Project }) => {
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
            <CardFooter>
                <a
                    href={project.web_url}
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
