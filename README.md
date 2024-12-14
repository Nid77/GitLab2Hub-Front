# GitLab2Hub-Back

This is the frontend part of the GitLab2Hub project.

> **Note**: This project is **not** meant to be run as a standalone application. It is designed to work in conjunction with the [backend part](https://github.com/Nid77/GitLab2Hub-Back).

## Requirements

To run this backend project, you need the following:

-   **Node.js** version 20.x or higher
-   **npm** (Node Package Manager)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Nid77/GitLab2Hub-Front.git
    ```

2. Navigate to the project directory:

    ```bash
     cd GitLab2Hub-Back
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Configuration

Make sure to create a `.env` file with the following content:

```bash
BACKEND_URL=your_backend_url
AUTH_TOKEN=your_auth_token
```

## Running the Application

Start the server in development mode:

```bash
npm run dev
```

Start the server in production mode:

```bash
npm run build
npm start
```
