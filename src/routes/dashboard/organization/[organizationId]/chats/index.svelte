<script lang="ts">
    import { chatsStore } from "$lib/stores/chats";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(() => {
        const firstChat = Object.values($chatsStore)[0];
        if (firstChat)
            goto(`/dashboard/organization/${firstChat.organizationId}/chats/${firstChat.id}`);
    });
</script>
<div class="w-full p-16 font-bold">No chats found</div>