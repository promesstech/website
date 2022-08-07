<script lang="ts">
    import { chatsStore } from "../../../../../stores/chats";
    import { goto } from "$app/navigation";

    $: firstChat = Object.values($chatsStore)[0];
    $: if (firstChat)
        goto(`/dashboard/organization/${firstChat.organizationId}/chats/${firstChat.id}`);
</script>
<div class="w-full p-16 font-bold">No chats found</div>