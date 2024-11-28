export const ToastMessages = {
    success: {
      title: "Success",
      description: "Your request was successful.",
      variant: "success" as const,
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
      variant: "info" as const,
      duration: 3000,
    },
  };