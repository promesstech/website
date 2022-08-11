<script lang="ts">
    import { onMount, setContext } from "svelte";
    import { writable } from "svelte/store";
    import { page } from "$app/stores";
    import { userStore } from "../../stores/user";
    import CustomWebsocket from "../../utils/websocket";
    import Logo from "../../components/Logo.svelte";
    import Loading from "../../components/Loading.svelte";
    import "../../styles/dashboard.css";
    // this is super scuffed :skull:

    let ws: CustomWebsocket;
    $: ws;

    $: organizationId = "org_mc8fgruax5eohjwj";

    const websocketStore = writable();

    const createWebsocket = () => {
        ws = new CustomWebsocket();
    };

    // setContext can't be run inside onMount, so we need to run it later
    onMount(createWebsocket);

    // but we can't run it right outside as it's undefined while onMount is running
    // so we have to run it when ws changes
    const setWebsocket = (websocket: CustomWebsocket) => {
        if (!websocket) return;
        // at which point we can set the context if ws is defined
        setContext("websocket", websocket);
        websocketStore.set(websocket);
    };

    $: setWebsocket(ws);

    $: section = $page.routeId
        ?.replace(new RegExp(/dashboard\/|\[organizationId\]\/|organization\//, "g"), "")
        .split("/")[0];

    $: accountsDropdown = false;

    $: accounts = [ $userStore ];
</script>

<div class="flex flex-row w-screen max-h-screen overflow-y-hidden z-40">
    <div class="sidebar-container">
        <div class="relative w-full">
            <div
                class="h-20 w-full overflow-clip border border-solid border-dark-primary border-x-0 border-t-0 flex flex-row items-center px-4 hover:cursor-pointer"
                on:click={() => accountsDropdown = !accountsDropdown}
            >
                <!-- src="/images/assets/oscar.png" -->
                <img
                    src="https://avatars.dicebear.com/api/avataaars/fa.svg?translateY=-2&style=circle"
                    alt="avatar"
                    class="h-8 w-8 rounded-md"
                />
                <div class="flex flex-col w-32 h-12 overflow-clip ml-4 justify-center">
                    <span class="truncate font-black text-xs">Project Manager</span>
                    <span class="text-xs font-bold text-secondary truncate">oscar@gmail.com</span>
                </div>
                <img
                    src="/icons/navbar/dropdown.svg"
                    alt="dropdown"
                    class="w-8 h-8 ml-2"
                />
            </div>
            {#if accountsDropdown}
                <div class="absolute bg-very-dark-secondary m-2 rounded-md p-4">
                    {#each accounts as account}
                        <div class="flex flex-col w-48">
                            <div class="flex flex-row items-center pb-2 border border-solid border-secondary border-x-0 border-t-0">
                                <img 
                                    src={account.avatar.url}
                                    alt="avatar"
                                    class="w-8 h-8 rounded-md"
                                />
                                <div class="flex flex-col ml-2 mb-1 w-32">
                                    <span class="font-bold">{account.name}</span>
                                    <span class="font-bold text-tiny text-secondary">{account.email}</span>
                                </div>
                                <img 
                                    src="/icons/dashboard/options.svg" 
                                    alt="account-options"
                                    class="w-4 h-4 ml-2 hover:cursor-pointer"
                                />
                            </div>
                            <div class="mt-2">Org array</div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
        <div class="py-8 px-4 flex flex-col h-full">
            <span class="font-bold ml-4 mb-4">User</span>
            <a class="nav-link {section === "profile" && "active"}" href="/dashboard/profile"><img src="/icons/navbar/profile.svg" alt="profile"/>Profile</a>
            <a class="nav-link {section === "messages" && "active"}" href="/dashboard/messages"><img src="/icons/navbar/messages.svg" alt="messages"/>Messages</a>
            <a class="nav-link {section === "friends" && "active"}" href="/dashboard/friends"><img src="/icons/navbar/friends.svg" alt="friends"/>Friends</a>
            <span class="font-bold m-4 mt-8">Organization</span>
            <a class="nav-link {section === "" && "active"}" href="/dashboard/organization/{organizationId}"><img src="/icons/navbar/home.svg" alt="dashboard"/>Dashboard</a>
            <a class="nav-link {section === "members" && "active"}" href="/dashboard/organization/{organizationId}/members"><img src="/icons/navbar/members.svg" alt="members"/>Members</a>
            <a class="nav-link {section === "chats" && "active"}" href="/dashboard/organization/{organizationId}/chats"><img src="/icons/navbar/chats.svg" alt="chats"/>Chats</a>
            <a class="nav-link {section === "tasks" && "active"}" href="/dashboard/organization/{organizationId}/tasks"><img src="/icons/navbar/task.svg" alt="tasks"/>Tasks</a>
            <a class="nav-link {section === "calendar" && "active"}" href="/dashboard/organization/{organizationId}/calendar"><img src="/icons/navbar/calendar.svg" alt="calendar"/>Calendar</a>
            <a class="nav-link {section === "revenue" && "active"}" href="/dashboard/organization/{organizationId}/revenue"><img src="/icons/navbar/revenue.svg" alt="revenue"/>Revenue</a>
            <a class="nav-link {section === "files" && "active"}" href="/dashboard/organization/{organizationId}/files"><img src="/icons/navbar/file.svg" alt="files"/>Files</a>
            <a class="nav-link {section === "settings" && "active"}" href="/dashboard/organization/{organizationId}/settings"><img src="/icons/navbar/settings.svg" alt="settings"/>Settings</a>
        </div>
        <div class="flex flex-row items-center px-4 h-24 border border-solid border-dark-primary border-x-0 border-b-0">
            <Logo />
        </div>
    </div>
    <div class="w-full overflow-x-hidden">
        <Loading loading={!ws && true}>
            <slot />
        </Loading>
    </div>
</div>