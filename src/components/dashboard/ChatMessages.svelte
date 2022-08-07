<script lang="ts">
    import type { Message } from "src/types/dashboard";
    // import { fly, slide } from "svelte/transition";
    import { formatDate } from "../../utils/dates";
    import MarkdownContent from "../MarkdownContent.svelte";

    export let messages: (Message & {
        pending?: boolean;
        error?: string;
    })[] | undefined;
</script>
{#if messages && messages.length > 0}
    {#each messages as message, i}
        {@const previousMessage = i > 0 && messages ? messages[i - 1] : null}
        {@const newMessageGroup = !previousMessage || previousMessage.authorId !== message.authorId || message.createdAt - previousMessage.createdAt > 1000 * 60 * 30}
        {@const isToday = formatDate(message.createdAt, "yyyy-{MM}-dd") === formatDate(new Date(), "yyyy-{MM}-dd")}
        {@const isNewDay = !previousMessage || message.createdAt - previousMessage.createdAt > 1000 * 60 * 60 * 24}
        <!-- transition:slide={{ duration: 200 }} -->
        <div
            class="message-container flex flex-col"
        >
            {#if isNewDay}
                <div class="date-divider flex flex-row w-full px-8 items-center my-4">
                    <hr />
                    <span class="w-84 text-center text-gray-400 text-xs">{formatDate(message.createdAt, "WEEKDAY, dSUFFIX MONTH")}</span>
                    <hr />
                </div>
            {/if}
            {#if newMessageGroup}
                <div class="message flex flex-row items-center mt-4">
                    <div class="flex flex-row">
                        <div class="w-24 flex flex-row justify-end pr-5 mt-1">
                            <img 
                                src={message.author?.avatar?.url || "/images/assets/discord_default_avatar.png"}
                                alt="avatar"
                                class="w-10 h-10 rounded-md"
                            />
                        </div>
                        <div class="flex flex-col">
                            <div class="flex flex-row">
                                <span class="font-bold flex flex-col">{message.author?.name || "UNKNOWN USER"}</span>
                                <span class="text-xs text-secondary font-bold ml-2 mt-1">{isToday ? `Today at ${formatDate(message.createdAt, "hh:mmAPM")}` : formatDate(message.createdAt, "dd/{MM}/yyyy")}</span>
                            </div>
                            <span class="content"><MarkdownContent string={message.content} /></span>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="message flex flex-row">
                    <span class="time flex flex-row justify-end text-opacity-0 text-tiny text-secondary w-24 pr-5">{formatDate(message.createdAt, "hh:mmAPM")}</span>
                    <span class="content"><MarkdownContent string={message.content} /></span>
                </div>
            {/if}
        </div>
    {/each}
{/if}