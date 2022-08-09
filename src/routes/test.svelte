<script lang="ts">
    import { onMount } from "svelte";

    type blockType = "text" | "h1" | "h2" | "h3" // | "bulleted-list" | "numbered-list" | "check-list" | "toggle-list" | "table" | "divider";

    interface Block {
        content: string;
        type: blockType;
    };

    let blocks: { [id: string]: Block };
    $: blocks = {
        "block_22345678": { type: "h1", content: `This is a large heading` },
        "block_32345678": { type: "h2", content: `This is a medium heading` },
        "block_42345678": { type: "h3", content: `This is a small heading` },
        "block_12345678": { type: "text", content: `This is some text`  },
        "block_52345678": { type: "text", content: ``  },
    };

    onMount(() => {
        window.addEventListener("input", e => {
            // @ts-ignore
            if (!e.target || !e.target.isContentEditable) return;

            // @ts-ignore
            const id = e.target.id;
            const block = blocks[id];
            if (!block) return;

            blocks = {
                ...blocks,
                [id]: block
            };
        });
    });

    const blockStyles = {
        "h1": "font-bold text-3xl",
        "h2": "font-bold text-2xl",
        "h3": "font-bold text-xl",
        "text": "text-sm",
    };

    $: activeCommandBlockId = "block_52345678";
</script>

<div class="py-16 px-32 flex flex-col h-screen">
    <span class="font-bold text-xl mt-8">Notion</span>
    <div class="mt-8">
        {#each Object.entries(blocks) as [id, block], i}
            <div class="relative">
                {#if activeCommandBlockId === id}
                    <div class="absolute flex flex-col bottom-8 bg-dark-secondary p-4 rounded-md w-4xx">
                        <div class="slash-command">
                            <img
                                src="/icons/dashboard/h.svg"
                                alt="h1"
                                class="icon"
                            />
                            <span class="title">Heading 1</span>
                        </div>
                        <div class="slash-command">
                            <img
                                src="/icons/dashboard/h.svg"
                                alt="h2"
                                class="icon"
                            />
                            <span class="title">Heading 2</span>
                        </div>
                        <div class="slash-command">
                            <img
                                src="/icons/dashboard/h.svg"
                                alt="h3"
                                class="icon"
                            />
                            <span class="title">Heading 3</span>
                        </div>
                    </div>
                {/if}
                <div
                    contenteditable
                    class="focus:border-none focus:outline-none my-1 bg-opacity-10 p-1 relative {blockStyles[block.type]}"
                    bind:textContent={blocks[id].content}
                    on:keydown={e => {
                        const makeNewBlock = () => {
                            const newBlockId = `block_${Math.random()}`;
                            blocks = {
                                ...blocks,
                                [newBlockId]: {
                                    type: "text",
                                    content: "",
                                },
                            };
    
                            setTimeout(() => {
                                // move the caret to the start of the new block
                                const newBlock = document.getElementById(newBlockId);
                                if (!newBlock) return;
                                
                                newBlock.focus();
                            }, 1);
    
                        };
    
                        const selection = window.getSelection();
    
                        if (e.key === "Enter") {
                            activeCommandBlockId = "";
                            e.preventDefault();
                            if (!e.target) return;
                            if (!selection) return;
    
                            const blockHtml = document.getElementById(id);
                            if (!blockHtml) return;
    
                            // whether the caret is at the end of the block
                            // used to determine whether to make a new block
                            const isEndOfBlock = selection.type == "Caret" && selection?.focusOffset === blockHtml.innerText.length;
            
                            if (isEndOfBlock) makeNewBlock();
                        } else if (e.key === "ArrowUp") {
                            activeCommandBlockId = "";
                            const lastBlockId = Object.keys(blocks)[i - 1];
                            const lastBlock = document.getElementById(lastBlockId);
                            if (!lastBlock) return;
    
                            lastBlock?.focus();
                        } else if (e.key === "ArrowDown") {
                            activeCommandBlockId = "";
                            if (i >= Object.keys(blocks).length - 1) return;
                            const nextBlockId = Object.keys(blocks)[i + 1];
                            const nextBlock = document.getElementById(nextBlockId);
    
                            if (!nextBlock) makeNewBlock();
                            else nextBlock?.focus();
                        } else if (e.key === "Backspace") {
                                    activeCommandBlockId = "";
                            if (!selection) return;
                            // @ts-ignore
                            if (blocks[id].content.length === 0 || selection.focusOffset === 0) {
                                e.preventDefault();
                                
                                const blockContent = blocks[id].content;
                                
                                const newBlocks = {};
    
                                Object.entries(blocks).forEach(([blockId, block]) => {
                                    // @ts-ignore
                                    if (blockId !== id) newBlocks[blockId] = block;
                                });
    
                                blocks = newBlocks;
    
                                setTimeout(() => {
                                    // move the caret to the start of the new block
                                    const newBlock = document.getElementById(Object.keys(newBlocks)[Object.values(newBlocks).length - 1]);
                                    if (!newBlock) return;
                                    
                                    newBlock.focus();
    
                                    const [lastBlockId, lastBlock] = Object.entries(blocks)[i - 1];
                                    if (!lastBlock) return;
    
                                    blocks = {
                                        ...blocks,
                                        [lastBlockId]: {
                                            type: lastBlock.type,
                                            content: `${lastBlock.content}${blockContent}`,
                                        },
                                    };
                                }, 10);
    
                            };
                        } else if (e.key === "/") {
                            activeCommandBlockId = id;
                        } else if (e.key === "Enter" && activeCommandBlockId === id) {
                            e.preventDefault();
                            activeCommandBlockId = "";

                            // do some command action
                        } else if (e.key === " ") {
                            activeCommandBlockId = "";
                        };
                    }}
                    {id}
                ></div>
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">
    .slash-command {
        @apply flex flex-row items-center p-2 rounded-md hover:cursor-pointer hover:bg-secondary hover:bg-opacity-20;
    }
    .slash-command .icon {
        @apply border border-solid border-secondary rounded-sm;
    }
    .slash-command .title {
        @apply font-bold ml-2;
    }
</style>