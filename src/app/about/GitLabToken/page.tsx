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

export const GitLabToken = () => {
    const handleLearnMore = () => {
        window.open(
            "https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html",
            "_blank"
        );
    };

    return (
        <Card className="m-12">
            <CardHeader>
                <CardTitle>Create a GitLab Access Token</CardTitle>
                <CardDescription>
                    Follow these steps to generate a GitLab access token for
                    accessing your projects.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ol className="list-decimal ml-6 space-y-2">
                    <li>
                        Log in to your GitLab account and navigate to your
                        **User Settings**:
                        <code> Profile Settings </code>.
                    </li>
                    <li>
                        In the **Access Tokens** section, click on **New
                        Personal Access Token**.
                    </li>
                    <li>
                        Provide a name for your token, such as{" "}
                        <code>GitLab2Hub</code>.
                    </li>
                    <li>Select an **expiration date** for your token.</li>
                    <li>
                        Make sure to check the following permissions:
                        <ul className="list-disc ml-4 space-y-1">
                            <li>
                                <strong>read_api</strong>: To read project
                                information.
                            </li>
                            <li>
                                <strong>read_repository</strong>: To access
                                files and commits.
                            </li>
                            <li>
                                <strong>write_repository</strong> (optional): If
                                you need to push changes.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Click **Create Personal Access Token** and copy the
                        token. Keep it secure!
                    </li>
                </ol>
                <Button
                    className="mt-4"
                    variant="link"
                    onClick={handleLearnMore}
                >
                    Learn more about GitLab tokens
                </Button>
            </CardContent>
        </Card>
    );
};

export default GitLabToken;
