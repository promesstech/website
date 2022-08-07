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

        // const jess = {
        //     id: "user_1",
        //     name: "Jessica",
        //     email: "jess@gmail.com",
        //     avatar: {
        //         id: "av_1234567890123456",
        //         url: "https://avatars.dicebear.com/api/avataaars/.svg?style=circle&top[]=longHair",
        //     },
        // };

        // const amy = {
        //     id: "user_3",
        //     name: "Amy",
        //     email: "amy@gmail.com",
        //     avatar: {
        //         id: "av_1234567890123456",
        //         url: "https://avatars.dicebear.com/api/avataaars/a.svg?translateY=-2&style=circle",
        //     },
        // };

        // const paul = {
        //     id: "user_4",
        //     name: "Paul",
        //     email: "paul@gmail.com",
        //     avatar: {
        //         id: "av_1234567890123456",
        //         url: "https://avatars.dicebear.com/api/avataaars/paulchucweme.svg?translateY=-2&style=circle",
        //     },
        // };

        // const users = [
        //     jess,
        //     amy,
        //     paul,
        // ];

        // let i = 0;

        // let messages = [
        //     "Hey, is everyone ready for the meeting?",
        //     "I'm on it.",
        //     "Yep!",
        // ];

        // const sendUserMessage = (user: any) => {
        //     if (i === users.length) return;
        //     setTimeout(() => {
        //         addMessage({
        //             author: user,
        //             authorId: user.id,
        //             channelId: "channel_korpyyvg4a0jjq39",
        //             content: messages[i],
        //             createdAt: Date.now(),
        //             id: `msg_${i}234567890123456`,
        //         });

        //         i += 1;
        //         sendUserMessage(users[i]);
        //     }, 1000);
        // };
        // setTimeout(() => {
        //     sendUserMessage(users[i]);
        // }, 3000);
    };
</script>

<Loading {loading}>
    <div class="w-full h-screen flex flex-row">
        <Chat {messages} />
    </div>
</Loading>