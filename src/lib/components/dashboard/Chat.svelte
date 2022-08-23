<script lang="ts">
    import type { Message, PartialMessage } from "promess";
    import { slide } from "svelte/transition";
    import { page } from "$app/stores";
    import { userStore } from "../../stores/user";
    import { io } from "../../utils/ws";
    import TextAreaAutoResize from "../TextAreaAutoResize.svelte";
    import ChatMessages from "./ChatMessages.svelte";
    import "../../styles/dashboard/chats.css";
                        
    export let messages: Message[] | undefined;

    $: content = "";

    const sendMessage = () => {
        if (!content) return;
        
        const message: PartialMessage = {
            authorId: $userStore.id,
            content,
            chatId: $page.params.channelId,
        };

        io.emit("messageCreate", message);

        content = "";
    };

    const handleFileUpload = (files: FileList) => {
        // @ts-ignore
        for (const file of files) {
            console.log(file.name);
        };
    };

    let files: FileList;
    $: files;

    $: if(files?.length > 0) handleFileUpload(files);
</script>

<div class="chat-container w-full flex justify-between h-screen">
    <div class="messages-container h-full pt-8 flex-auto flex flex-col-reverse overflow-y-scroll">
        <div transition:slide={{ duration: 200 }}>
            <span class="ml-8 opacity-40">Welcome to the start of the #general channel</span>
            <ChatMessages {messages} />
        </div>
    </div>
    <div class="message-form-container flex flex-row items-center px-8 pb-4 pt-8">
        <div class="p-1 bg-light-secondary w-full rounded-md">
            <form class="message-content-form w-full h-fit rounded-md bg-light-secondary flex flex-row">
                <span class="flex flex-col items-center justify-start pt-2.5 w-14">
                    <img
                        src="/icons/dashboard/file.svg"
                        alt="attach-file"
                        class="hover:cursor-pointer"
                        on:click={() => {
                            const fileUploader = document.getElementById("file-uploader");
                            if (!fileUploader) return;
                            
                            fileUploader.click();
                        }}
                    />
                    <input
                        type="file"
                        bind:files={files}
                        class="hidden"
                        id="file-uploader"
                        accept="image/*"
                        multiple
                    />
                </span>
                <TextAreaAutoResize
                    bind:value={content}
                    placeholder="Send a message in #chat_name"
                    style="bg-light-secondary font-bold rounded-r-md py-3 h-full overflow-y-scroll text-sm"
                    minRows={1}
                    maxRows={16}
                    on:submit={sendMessage}
                />
            </form>
        </div>
    </div>
</div>