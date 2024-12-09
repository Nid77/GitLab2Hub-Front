"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useState } from "react";
import React from "react";

interface GitLabToGitHubFormProps {
    formAction: (e: FormEvent<HTMLFormElement>) => void;
    urlValue?: string;
    nameValue?: string;
}

export function GitLabToGitHubForm({ formAction, urlValue, nameValue }: GitLabToGitHubFormProps) {

    
    const [url, setUrl] = useState<string | undefined>(urlValue);
    const [name, setName] = useState<string | undefined>(nameValue);

    useEffect(() => {
        setName(nameValue)
      }, [nameValue]);
      
    return (
        <Card className="w-[450px] mx-auto mt-8">
            <CardHeader>
                <CardTitle>GitLab to GitHub Migration</CardTitle>
                <CardDescription>
                    Fill in the details below to migrate your GitLab repository
                    to GitHub.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="migratehub" onSubmit={formAction}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="gitlab-repo-url">
                                GitLab Repository URL
                            </Label>
                            <Input
                                id="gitlab-repo-url"
                                name="gitlabRepoUrl"
                                placeholder="gitlab.com/your-repo"
                                value={url ?? ""}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="github-repo-name">
                                GitHub Repository Name
                            </Label>
                            <Input
                                id="github-repo-name"
                                name="githubRepoName"
                                placeholder="Name of the new GitHub repository"
                                type="text"
                                value={name ?? ""}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button form="migratehub" type="submit">
                    Migrate
                </Button>
            </CardFooter>
        </Card>
    );
}

export default GitLabToGitHubForm;
