import type { Organization } from "src/types/dashboard";
import { writable } from "svelte/store";

export const organizationStore = writable<Organization>({
    id: "org_mc8fgruax5eohjwj",
    name: "Promess",
    members: [
        {
            id: "user_zup76x4is0e53a8z",
            name: "Oscar",
            email: "oscarf@gmail.com",
            avatar: {
                id: "av_3Hmi8hPvhJo97BBv",
                url: "https://avatars.dicebear.com/api/avataaars/fa.svg?translateY=-2&style=circle",
            },
            roles: [
                {
                    id: "role_CjPltmfRF3F7OL6n",
                    name: "Owner",
                    level: "c-role",
                },
                {
                    id: "role_4mKYFv4DG1NjEXYo",
                    name: "Manager",
                    level: "manager",
                },
            ],
            team: {
                id: "team_m8fgrvax5eohjwj",
                name: "Development",
            },
        },
        {
            id: "user_Tr9alOWhJTT0Ya24",
            name: "Jess",
            email: "jessicae@gmail.com",
            avatar: {
                id: "av_1mugXoKTg2qdYjhvC",
                url: "https://avatars.dicebear.com/api/avataaars/.svg?style=circle&top[]=longHair",
            },
            roles: [
                {
                    id: "role_4mKYFv4DG1NjEXYo",
                    name: "Manager",
                    level: "manager",
                },
            ],
            team: {
                id: "team_m8fgrvax5eohjwj",
                name: "Development",
            },
        },
        {
            id: "user_5KU03mTUttBBlrcf",
            name: "Paul",
            email: "paulc@gmail.com",
            avatar: {
                id: "av_PD25VCDOuxE51kP3",
                url: "https://avatars.dicebear.com/api/avataaars/paulchucweme.svg?translateY=-2&style=circle",
            },
            roles: [
                {
                    id: "role_k9wgGqY91hF6kvuN",
                    name: "Employee",
                    level: "staff",
                },
            ],
            team: {
                id: "team_m8fgrvax5eohjwj",
                name: "Development",
            },
        },
        {
            id: "user_XrUXrhsDHO9ZYIh6",
            name: "Amy",
            email: "amyg@gmail.com",
            avatar: {
                id: "av_HCWkNv1HHFa43xMI",
                url: "https://avatars.dicebear.com/api/avataaars/a.svg?translateY=-2&style=circle",
            },
            roles: [
                {
                    id: "role_k9wgGqY91hF6kvuN",
                    name: "Employee",
                    level: "staff",
                },
            ],
            team: {
                id: "team_vjcp3BEM3Tf2JQde",
                name: "Operations",
            },
        },
        {
            id: "user_2B6PV93rBkelY0f9",
            name: "Izzy",
            email: "isabelleb@gmail.com",
            avatar: {
                id: "av_6BM4n9CVrvTFMLxG",
                url: "https://avatars.dicebear.com/api/avataaars/i.svg?style=circle",
            },
            roles: [
                {
                    id: "role_4mKYFv4DG1NjEXYo",
                    name: "Manager",
                    level: "manager",
                },
            ],
            team: {
                id: "team_vjcp3BEM3Tf2JQde",
                name: "Operations",
            },
        },
        {
            id: "user_QG8jJAvTCcK6tTW9",
            name: "Hasan",
            email: "hasann@gmail.com",
            avatar: {
                id: "av_Jr7BVJi9PwvZL7tY",
                url: "https://avatars.dicebear.com/api/avataaars/.svg?top[]=shortHair&style=circle",
            },
            roles: [
                {
                    id: "role_RDGGvrm4YqIfAnXs",
                    name: "Intern",
                    level: "beginner",
                },
            ],
            team: {
                id: "team_vjcp3BEM3Tf2JQde",
                name: "Operations",
            },
        },
    ],
    teams: [
        {
            id: "team_m8fgrvax5eohjwj",
            name: "Development",
        },
        {
            id: "team_vjcp3BEM3Tf2JQde",
            name: "Operations",
        },
    ],
    projects: [
        {
            id: "project_m8fgrvax5eohjwj",
            name: "Project 1",
        },
    ],
    roles: [
        {
            id: "role_CjPltmfRF3F7OL6n",
            name: "Owner",
            level: "c-role",
        },
        {
            id: "role_4mKYFv4DG1NjEXYo",
            name: "Manager",
            level: "manager",
        },
        {
            id: "role_k9wgGqY91hF6kvuN",
            name: "Employee",
            level: "staff",
        },
        {
            id: "role_RDGGvrm4YqIfAnXs",
            name: "Intern",
            level: "beginner",
        },
    ],
});

export const setOrganization = (organization: Organization) => {
    organizationStore.set(organization);
};