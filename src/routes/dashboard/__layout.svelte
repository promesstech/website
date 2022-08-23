<svelte:head>
    <title>Promess | Dashboard</title>
</svelte:head>

<script context="module">
    const dev = import.meta.env.DEV;
    export const load = () => {
        if (!dev) return {
            status: 301,
            redirect: "/newsletter",
        };
    };
</script>

<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { setUser, userStore } from "$lib/stores/user";
    import api from "$lib/api";
    import { io } from "$lib/utils/ws";
    import Logo from "$lib/components/Logo.svelte";
    import Loading from "$lib/components/Loading.svelte";
    import "$lib/styles/dashboard.css";

    $: organizationId = "org_mc8fgruax5eohjwj";
    $: isWsConnected = io.connected;
    $: loading = true;

    api.user.get().then(res => {
        if (res.ok) {
            setUser(res.data);
        };
        loading = false;
    });

    if (!dev) {
        goto("/newsletter");
        window.location.reload();
    };

    io.on("connected", () => {
        console.log("ws connected");
        isWsConnected = true;
    });

    $: section = $page
        .routeId
        ?.replace(new RegExp(/dashboard\/|\[organizationId\]\/|organization\//, "g"), "")
        .split("/")[0];

    $: accountsDropdown = false;

    $: accounts = [ $userStore ];
</script>

{#if dev}
    <div class="flex flex-row w-screen h-screen max-h-screen overflow-y-hidden z-40 bg-primary">
        <Loading {loading}>
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
                            <span class="truncate font-black text-xs">Promess</span>
                            <span class="text-xs font-bold text-secondary truncate">{$userStore.email}</span>
                        </div>
                        <img
                            src="/icons/dashboard/sidebar/dropdown.svg"
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
                <div class="py-8 px-4 flex flex-col h-full overflow-y-scroll overflow-x-hidden pr-8">
                    <span class="font-bold ml-4 mb-4">User</span>
                    <a class="nav-link {section === "profile" && "active"}" href="/dashboard/profile"><img src="/icons/dashboard/sidebar/profile.svg" alt="profile"/>Profile</a>
                    <a class="nav-link {section === "messages" && "active"}" href="/dashboard/messages"><img src="/icons/dashboard/sidebar/messages.svg" alt="messages"/>Messages</a>
                    <a class="nav-link {section === "friends" && "active"}" href="/dashboard/friends"><img src="/icons/dashboard/sidebar/friends.svg" alt="friends"/>Friends</a>
                    <span class="font-bold m-4 mt-8">Organization</span>
                    <a class="nav-link {section === "" && "active"}" href="/dashboard/organization/{organizationId}"><img src="/icons/dashboard/sidebar/home.svg" alt="dashboard"/>Dashboard</a>
                    <a class="nav-link {section === "members" && "active"}" href="/dashboard/organization/{organizationId}/members"><img src="/icons/dashboard/sidebar/members.svg" alt="members"/>Members</a>
                    <a class="nav-link {section === "chats" && "active"}" href="/dashboard/organization/{organizationId}/chats"><img src="/icons/dashboard/sidebar/chats.svg" alt="chats"/>Chats</a>
                    <a class="nav-link {section === "tasks" && "active"}" href="/dashboard/organization/{organizationId}/tasks"><img src="/icons/dashboard/sidebar/task.svg" alt="tasks"/>Tasks</a>
                    <a class="nav-link {section === "calendar" && "active"}" href="/dashboard/organization/{organizationId}/calendar"><img src="/icons/dashboard/sidebar/calendar.svg" alt="calendar"/>Calendar</a>
                    <a class="nav-link {section === "revenue" && "active"}" href="/dashboard/organization/{organizationId}/revenue"><img src="/icons/dashboard/sidebar/revenue.svg" alt="revenue"/>Revenue</a>
                    <a class="nav-link {section === "files" && "active"}" href="/dashboard/organization/{organizationId}/files"><img src="/icons/dashboard/sidebar/file.svg" alt="files"/>Files</a>
                    <a class="nav-link {section === "settings" && "active"}" href="/dashboard/organization/{organizationId}/settings"><img src="/icons/dashboard/sidebar/settings.svg" alt="settings"/>Settings</a>
                    <span class="font-bold m-4 mt-8">Tech</span>
                    <a class="nav-link {section === "" && "active"}" href="/dashboard/organization/{organizationId}/"><img src="/icons/dashboard/sidebar/server.svg" alt="settings"/>Infrastructure</a>
                    <a class="nav-link {section === "" && "active"}" href="/dashboard/organization/{organizationId}/"><img src="/icons/dashboard/sidebar/metrics.svg" alt="settings"/>Metrics</a>
                    <a class="nav-link {section === "" && "active"}" href="/dashboard/organization/{organizationId}/"><img src="/icons/dashboard/sidebar/analytics.svg" alt="settings"/>Analytics</a>
                    <a class="nav-link {section === "" && "active"}" href="/dashboard/organization/{organizationId}/"><img src="/icons/dashboard/sidebar/uptime.svg" alt="settings"/>Uptime</a>
                    <a class="nav-link {section === "" && "active"}" href="/dashboard/organization/{organizationId}/"><img src="/icons/dashboard/sidebar/logs.svg" alt="settings"/>Logs</a>
                    <a class="nav-link {section === "" && "active"}" href="/dashboard/organization/{organizationId}/"><img src="/icons/dashboard/sidebar/database.svg" alt="database"/>Database</a>
                </div>
                <div class="flex flex-row items-center px-4 h-24 border border-solid border-dark-primary border-x-0 border-b-0">
                    <Logo />
                </div>
            </div>
            <div class="w-full overflow-x-hidden">
                <Loading loading={!isWsConnected}>
                    <slot />
                </Loading>
            </div>
        </Loading>
    </div>
{:else}
    <span class="w-screen h-screen flex items-center justify-center font-bold text-5xl">Promess is still in development</span>
{/if}