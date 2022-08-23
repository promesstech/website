<script lang="ts">
    import type { Message } from "promess";
    import { page } from "$app/stores";
    import Chat from "$lib/components/dashboard/Chat.svelte";
    import Loading from "$lib/components/Loading.svelte";
    import { chatsStore } from "$lib/stores/chats";

    let messages: Message[] | undefined;
    $: messages = $chatsStore[$page.params.channelId].messages;
    
    $: loading = !messages;
</script>

<Loading {loading}>
    <div class="w-full h-screen flex flex-row">
        <Chat {messages} />
    </div>
</Loading>