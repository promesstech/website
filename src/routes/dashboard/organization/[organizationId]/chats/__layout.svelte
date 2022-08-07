<script lang="ts">
    import { page } from "$app/stores";
    import { getAllChats } from "../../../../../api/chats";
    import Loading from "../../../../../components/Loading.svelte";
    import { chatsStore, setChats } from "../../../../../stores/chats";

    $: loading = Object.values($chatsStore).length === 0;

    let { organizationId } = $page.params;

    $: if (loading) getAllChats(organizationId).then(res => {
        if (res.ok) setChats(res.data);
        loading = false;
    });
</script>

<Loading {loading}>
    <div class="flex flex-row w-full h-full">
        <slot />
        <div class="h-full w-3xx flex flex-col border border-solid border-dark-primary border-y-0 border-r-0 p-8">
            <span class="font-bold ml-2 mb-4">Chats</span>
            {#each Object.values($chatsStore) as chat}
                <a
                    class="font-bold text-gray-400 my-0.5 py-1 px-2 w-full hover:bg-light-secondary rounded-md transition-all {$page.params.channelId === chat.id ? "bg-light-secondary text-white" : ""}"
                    href="/dashboard/organization/{organizationId}/chats/{chat.id}"
                >
                    #{chat.name}
                </a>
            {/each}
        </div>
    </div>
</Loading>