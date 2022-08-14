<script lang="ts">
    import type { Message } from "src/types/dashboard";
    import { page } from "$app/stores";
    import Chat from "../../../../../components/dashboard/Chat.svelte";
    import Loading from "../../../../../components/Loading.svelte";
    import { getChatMessages } from "../../../../../api/chats";
    import { chatsStore, addMessage } from "../../../../../stores/chats";

    let messages: Message[] | undefined;
    $: messages = $chatsStore[$page.params.channelId].messages;
    
    $: loading = !messages || messages.length === 0;

    $: if($page.params.channelId || loading) {
        getChatMessages($page.params.channelId).then(res => {
            if(res.ok)
                res.data.forEach((message: Message) => addMessage(message));
            loading = false;
        });
    };
</script>

<Loading {loading}>
    <div class="w-full h-screen flex flex-row">
        <Chat {messages} />
    </div>
</Loading>