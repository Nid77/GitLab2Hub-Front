// types.ts

export interface Namespace {
    id: number;
    name: string;
    path: string;
    kind: "group" | "user";
    full_path: string;
    parent_id: number | null;
    avatar_url: string | null;
    web_url: string;
}

export interface Project {
    id: number;
    description: string | null;
    name: string;
    name_with_namespace: string;
    path: string;
    path_with_namespace: string;
    created_at: string;
    default_branch: string;
    tag_list: string[];
    topics: string[];
    ssh_url_to_repo: string;
    http_url_to_repo: string;
    web_url: string;
    avatar_url: string | null;
    star_count: number;
    last_activity_at: string;
    namespace: Namespace;
}
