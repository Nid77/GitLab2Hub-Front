import { title } from "process";

export const ToastMessages = {
    success: {
        title: "Success",
        description: "Your request was successful.",
        variant: "success" as const,
        duration: 3000,
    },
    error: {
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive" as const,
        duration: 3000,
    },
    info: {
        title: "Information",
        description: "This is an information message.",
        variant: "info" as const,
        duration: 3000,
    },
};

export const ErrorMessages = (title: string, description: string) => {
    let msg = ToastMessages.error;
    msg.title = title;
    msg.description = description;
    return msg;
};

export const SuccessMessages = (title: string, description: string) => {
    let msg = ToastMessages.success;
    msg.title = title;
    msg.description = description;
    return msg;
};
