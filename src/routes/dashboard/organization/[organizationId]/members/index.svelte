<script lang="ts">
    import type { Member } from "src/types/dashboard";
    import "../../../../../styles/dashboard/members.css";
    import { fly } from "svelte/transition";

    const members: Member[] = [
        {
            id: "user_oscar",
            name: "oscar",
            email: "oscarfal2006@gmail.com",
            role: [ "Owner", "Manager", "Employee" ],
            avatar: {
                id: "av_1",
                url: "/images/assets/oscar.png",
            },
            team: "Development",
        },
        {
            id: "user_hasan",
            name: "hasan",
            email: "hasan@gmail.com",
            role: [ "Manager" ],
            avatar: {
                id: "av_2",
                url: "/images/assets/avatar-2.png",
            },
            team: "Development",
        },
        {
            id: "user_jess",
            name: "jess",
            email: "jess@gmail.com",
            role:[ "Employee" ],
            avatar: {
                id: "av_3",
                url: "/images/assets/avatar.png",
            },
            team: "Development",
        },
        {
            id: "user_izzy",
            name: "izzy",
            email: "izzy@gmail.com",
            role: [ "Manager", "Employee" ],
            avatar: {
                id: "av_4",
                url: "/images/assets/avatar-3.png",
            },
            team: "Operations",
        },
        {
            id: "user_abdullah",
            name: "abdullah",
            email: "abdullah@gmail.com",
            role: [ "Employee" ],
            avatar: {
                id: "av_5",
                url: "/images/assets/avatar-5.png",
            },
            team: "Operations",
        },
        {
            id: "user_kilian",
            name: "kilian",
            email: "kilian@gmail.com",
            role: [ "Intern" ],
            avatar: {
                id: "av_6",
                url: "/images/assets/avatar-4.png",
            },
            team: "Operations",
        },
    ];

    let teams: { [key: string]: Member[] } = {};
    $: teams = {};
    
    $: if (members) members.forEach(member => {
        const team = member.team;

        if (!teams[team])
            teams = { ...teams, [team]: [ member ] };
        else
            teams = {
                ...teams,
                [team]: [ ...teams[team], member ],
            };
    });

    const roleTypes = {
        Owner: "c-role",
        Founder: "c-role",
        CTO: "c-role",
        Manager: "manager",
        Director: "manager",
        Employee: "staff",
        Intern: "beginner",
    };

    $: activeOptions = "";

    window.onclick = e => {
        if (!e.target) return;

        // @ts-ignore
        const id = e.target.id;
        if (activeOptions && id !== "options-menu") activeOptions = "";
    };
</script>

<div class="flex flex-col w-full">
    <form class="flex flex-row w-full py-16 px-4 justify-center">
        <input type="text" placeholder="Search organization members" class="search"/>
        <input type="text" placeholder="Invite member by email or Id" class="search"/>
        <button class="bg-accent font-bold rounded-md px-12 ml-2">Invite</button>
    </form>
    <div class="flex flex-col px-24 pt-8">
        <span class="font-bold text-sm text-secondary mb-8">{members.length} Members in organization</span>
        {#each Object.entries(teams) as [teamName, teamMembers]}
            <div class="mb-8 flex flex-col">
                <span class="font-bold mb-8">{teamName} - {teamMembers.length}</span>
                {#each teamMembers as member}
                    <div class="flex flex-row justify-between mb-6">
                        <div class=" flex flex-row">
                            <div class="flex flex-row w-72">
                                <img
                                    src={member.avatar.url}
                                    alt="avatar"
                                    class="w-12 h-12 rounded-md"
                                />
                                <div class="ml-4 flex flex-col">
                                    <span class="font-bold text-xl">{member.name}</span>
                                    <span class="text-secondary text-sm font-bold">{member.email}</span>
                                </div>
                            </div>
                            {#each member.role as role}
                                {@const roleType = roleTypes[role]}
                                <span class="role {roleType} flex items-center justify-center font-bold rounded-md h-10 w-32 text-sm mr-4">{role}</span>
                            {/each}
                        </div>
                        <span
                            class="bg-dark-secondary rounded-full h-8 w-8 flex items-center justify-center hover:cursor-pointer"
                            on:click={() => {
                                if (activeOptions === member.id) activeOptions = "";
                                else activeOptions = member.id;
                            }}
                            id="options-menu"
                        >
                            <img
                                src="/icons/dashboard/options.svg"
                                alt="options"
                                id="options-menu"
                            />
                            {#if activeOptions === member.id}
                                <div
                                    class="menu flex flex-col justify-between w-48 h-fit px-4 py-2 bg-light-secondary absolute translate-y-32 -translate-x-20 rounded-md"
                                    transition:fly="{{ duration: 200, x: 20 }}"
                                    id="options-menu"
                                >
                                    <a
                                        class="item"
                                        href="/dashboard/user/{member.id}"
                                    >
                                        Profile
                                    </a>
                                    <span class="item">Edit Member</span>
                                    <a
                                        class="item"
                                        href="/dashboard/user/{member.id}/message"
                                    >
                                        Message
                                    </a>
                                    <div class="px-2 my-1"><hr class="w-full opacity-20"/></div>
                                    <span
                                        class="item"
                                        on:click={() => navigator.clipboard.writeText(member.id)}
                                    >
                                        Copy Id
                                    </span>
                                    <span class="item danger">Kick Member</span>
                                </div>
                            {/if}
                        </span>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>