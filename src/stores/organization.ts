import type { Organization } from "src/types/dashboard";
import { writable } from "svelte/store";

export const organizationStore = writable<Organization>({
    id: "org_mc8fgruax5eohjwj",
    name: "Alertbot",
    members: [],
    teams: [
        {
            id: "team_m8fgrvax5eohjwj",
            name: "Development",
        },
    ],
    projects: [
        {
            id: "project_m8fgrvax5eohjwj",
            name: "Project 1",
        },
    ],
});

export const setOrganization = (organization: Organization) => {
    organizationStore.set(organization);
};