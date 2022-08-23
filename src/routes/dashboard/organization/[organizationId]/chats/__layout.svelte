<script lang="ts">
    import { page } from "$app/stores";
    import { io } from "$lib/utils/ws";
    import Loading from "$lib/components/Loading.svelte";
    import { addMessage, chatsStore } from "$lib/stores/chats";

    $: loading = Object.values($chatsStore).length === 0;
    
    let { organizationId } = $page.params;

    io.on("messageCreate", message => {
        addMessage(message);
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