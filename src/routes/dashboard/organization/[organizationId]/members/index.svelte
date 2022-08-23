<script lang="ts">
    import type { Member } from "promess";
    import { fly } from "svelte/transition";
    import { organizationStore } from "$lib/stores/organization";
    import Modal from "$lib/components/Modal.svelte";
    import "$lib/styles/dashboard/members.css";

    const members: Member[] = $organizationStore.members;

    let teams: { [key: string]: Member[] } = {};
    $: teams = {};
    
    $: if (members) members.forEach(member => {
        const team = member.team;

        if (!teams[team.name])
            teams = { ...teams, [team.name]: [ member ] };
        else
            teams = {
                ...teams,
                [team.name]: [ ...teams[team.name], member ],
            };
    });

    $: activeOptions = "";

    window.onclick = e => {
        if (!e.target) return;

        // @ts-ignore
        const id = e.target.id;
        if (activeOptions && id !== "options-menu") activeOptions = "";
    };

    $: addMemberModalIsActive = false;

    const openAddMemberModal = () => addMemberModalIsActive = true;
</script>

<Modal
    active={addMemberModalIsActive}
    on:minimize={() => addMemberModalIsActive = false}
>
    <div class="w-5xx bg-very-dark-primary flex flex-col items-center p-8 rounded-b-md">
        <img
            src="/icons/dashboard/invite.svg"
            alt="invite"
            class="w-8 h-8"
        />
        <span class="font-bold text-xl mt-2">Invite members to {$organizationStore.name}.</span>
        <div class="flex flex-col mt-12 w-full">
            <span class="text-secondary text-sm font-bold">Search by email or user id</span>
            <div class="flex flex-row w-full mt-1">
                <input
                    type="text"
                    class="w-full bg-inherit rounded-l-md px-2 h-8 text-xs border border-solid border-secondary border-r-0 font-bold"
                    placeholder="contact@email.com"
                />
                <span class="border border-solid border-secondary bg-secondary bg-opacity-10 font-bold px-4 rounded-r-md flex items-center justify-center text-sm hover:cursor-pointer">Add</span>
            </div>
        </div>
        <div class="flex flex-col w-full mt-8">
            <div class="flex flex-row w-full justify-between mb-2">
                <div class="flex flex-row items-center w-full">
                    <img
                        src="https://avatars.dicebear.com/api/avataaars/kilianmanh.svg?top[]=shortHair&style=circle"
                        alt="avatar"
                        class="h-6 w-6 rounded-md"
                    />
                    <span class="ml-2 font-bold mt-1">Kilian</span>
                    <span class="ml-1 text-xs text-secondary font-bold mt-1">kilianm@gmail.com</span>
                </div>
                <select class="bg-inherit text-sm font-bold">
                    <option value="employee" selected>Employee</option>
                </select>
            </div>
            <div class="flex flex-row w-full justify-between">
                <div class="flex flex-row items-center w-full">
                    <img
                        src="https://avatars.dicebear.com/api/avataaars/h.svg?style=circle"
                        alt="avatar"
                        class="h-6 w-6 rounded-md"
                    />
                    <span class="ml-2 font-bold mt-1">Hana</span>
                    <span class="ml-1 text-xs text-secondary font-bold mt-1">hanac@gmail.com</span>
                </div>
                <select class="bg-inherit text-sm font-bold">
                    <option value="employee" selected>Manager</option>
                </select>
            </div>
        </div>
        <div class="w-full flex flex-row justify-end h-8 mt-8">
            <span class="rounded-md px-4 bg-accent flex items-center justify-center font-bold">Invite Members</span>
        </div>
    </div>
</Modal>

<div class="flex flex-col w-full">
    <div class="flex flex-row w-full py-16 px-4 justify-center">
        <input
            type="text"
            placeholder="Search organization members"
            class="search"
        />
        <input
            type="text"
            placeholder="Invite member by email or Id"
            class="search"
            on:focus={openAddMemberModal}
        />
        <button
            class="bg-accent font-bold rounded-md px-12 ml-2"
            on:click={openAddMemberModal}
        >
            Invite
        </button>
    </div>
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
                            {#each member.roles as role}
                                <span class="role {role.level} flex items-center justify-center font-bold rounded-md h-10 w-32 text-sm mr-4">{role.name}</span>
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