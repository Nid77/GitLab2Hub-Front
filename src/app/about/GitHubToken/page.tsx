"use client";

import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const GitHubToken = () => {
    const handleLearnMore = () => {
        window.open(
            "https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token",
            "_blank"
        );
    };

    return (
        <Card className="m-12">
            <CardHeader>
                <CardTitle>Create a GitHub Personal Access Token (PAT)</CardTitle>
                <CardDescription>
                    Follow these steps to generate a GitHub PAT for accessing your repositories and performing actions via API.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ol className="list-decimal ml-6 space-y-2">
                    <li>
                        Log in to your GitHub account and go to your **Settings** page.
                    </li>
                    <li>
                        In the left sidebar, select **Developer settings**.
                    </li>
                    <li>
                        Under **Personal access tokens**, click on **Tokens (classic)**.
                    </li>
                    <li>
                        Click on **Generate new token** and provide a descriptive name for your token, such as{" "}
                        <code>GitHub2GitLab</code>.
                    </li>
                    <li>Select an **expiration date** for your token (optional).</li>
                    <li>
                        Select the required **scopes** for your token. Some common options include:
                        <ul className="list-disc ml-4 space-y-1">
                            <li>
                                <strong>repo</strong>: Full control of private repositories.
                            </li>
                            <li>
                                <strong>read:org</strong>: Read access to organization data.
                            </li>
                            <li>
                                <strong>write:repo_hook</strong>: Access to create and manage webhooks.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Click **Generate token**. Copy the generated token immediately, as it won't be shown again.
                    </li>
                </ol>
                <Button
                    className="mt-4"
                    variant="link"
                    onClick={handleLearnMore}
                >
                    Learn more about GitHub tokens
                </Button>
            </CardContent>
        </Card>
    );
};

export default GitHubToken;
