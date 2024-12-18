import { title } from "process";

export const ToastMessages = {
    success: {
        title: "Success",
        description: "Your request was successful.",
        variant: "destructive" as const,
        duration: 4000,
    },
    error: {
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive" as const,
        duration: 5000,
    },
    info: {
        title: "Information",
        description: "This is an information message.",
        variant: "destructive" as const,
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
