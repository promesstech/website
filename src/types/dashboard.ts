export interface Avatar {
    id: string;
    url: string;
};

export interface User {
    id: string;
    name: string;
    avatar: Avatar;
    email: string;
};

export interface Role {
    id: string;
    name: string;
};

export interface Team {
    id: string;
    name: string;
};

export interface Project {
    id: string;
    name: string;
};

export interface Organization {
    id: string;
    name: string;
    members: (User & { role: Role })[];
    teams: Team[];
    projects: Project[];
};

export interface Channel {
    id: string;
    name: string;
    organizationId: string;
};

export interface Message {
    id: string;
    content: string;
    authorId: string;
    channelId: string;
    createdAt: number;
    author: User;
};

export interface Member {
    id: string;
    name: string;
    email: string;
    role: ("Owner" | "Founder" | "CTO" | "Manager" | "Director" | "Employee" | "Intern")[];
    avatar: Avatar;
    team: string;
};

export interface Task {
    id: string;
    createdBy: Member;
    createdAt: number;
    description: string;
    status: "todo" | "in-progress" | "testing" | "done"
    assignees: Member[];
    dueDate: number | "none";
    priority: "none" | "low" | "medium" | "high" | "urgent";
    team: Team;
    project: Project;
};