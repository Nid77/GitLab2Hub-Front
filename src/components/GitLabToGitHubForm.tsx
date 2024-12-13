"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { set } from "zod";

interface GitLabToGitHubFormProps {
    formAction: (e: FormEvent<HTMLFormElement>) => void;
    nameValue?: string;
    privValue?: boolean;
    descValue?: string;
}

export function GitLabToGitHubForm({ formAction, nameValue, privValue, descValue }: GitLabToGitHubFormProps) {
    const [name, setName] = useState<string | undefined>(nameValue);
    const [priv, setPriv] = useState<boolean | undefined>(privValue);
    const [desc, setDesc] = useState<string | undefined>(descValue);

    useEffect(() => {
        setName(nameValue);
    }, [nameValue]);

    useEffect(() => {
        setPriv(privValue);
    }, [privValue]);

    useEffect(() => {
        setDesc(descValue);
    }, [descValue]);

    return (
        <Card className="w-[450px] mx-auto mt-8">
            <CardHeader>
                <CardTitle>GitLab to GitHub Migration</CardTitle>
                <CardDescription>
                    Fill in the details below to migrate your GitLab repository to GitHub.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="migratehub" onSubmit={formAction}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="github-repo-name">GitHub Repository Name</Label>
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

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="isprivate"
                                name="isprivate"
                                checked={priv ?? false}
                                onCheckedChange={(e) => setPriv(!priv)}
                            />
                            <label
                                htmlFor="isprivate"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Make this repository private
                            </label>
                        </div>

                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="description">Repository description</Label>
                            <Textarea
                                placeholder="Type your description here."
                                id="description"
                                name="description"
                                value={desc ?? ""}
                                onChange={(e) => setDesc(e.target.value)}
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
