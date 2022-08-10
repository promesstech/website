<script lang="ts">
import type { stringify } from "postcss";

    import { onMount } from "svelte";
    import "../styles/document.css";

    type blockType = "text" | "h1" | "h2" | "h3" // | "bulleted-list" | "numbered-list" | "check-list" | "toggle-list" | "table" | "divider";

    interface Block {
        content: string;
        type: blockType;
    };

    let blocks: { [id: string]: Block };
    $: blocks = {
        "block_start": { type: "text", content: "" },
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
        "h1": "my-4 font-black text-3xl",
        "h2": "my-4 font-black text-2xl",
        "h3": "my-4 font-black text-xl",
        "text": "my-2 text-sm",
    };


    interface BlockType {
        type: blockType;
        title: string;
        icon: string;
    };

    const blockTypes: BlockType[] = [
        { type: "h1", title: "Heading 1", icon: "/icons/dashboard/h.svg" },
        { type: "h2", title: "Heading 2", icon: "/icons/dashboard/h.svg" },
        { type: "h3", title: "Heading 3", icon: "/icons/dashboard/h.svg" },
    ];

    $: activeCommandBlockId = "";
    let selectedSlashCommand: blockType | undefined;
    $: selectedSlashCommand = undefined;

    const setBlockType = (id: string, blockType: blockType) => {
        activeCommandBlockId = "";
        blocks[id].type = blockType;
        blocks[id].content = "";

        const blockHtml = document.getElementById(id);
        if (blockHtml) blockHtml.focus();
    };
</script>

<div class="w-full h-full">
    {#each Object.entries(blocks) as [id, block], i}
        <div class="relative">
            {#if activeCommandBlockId === id}
                <div class="absolute flex flex-col top-8 bg-dark-secondary p-4 rounded-md w-4xx">
                    {#each blockTypes as blockType}
                        <div
                            class="slash-command {selectedSlashCommand === blockType.type && "bg-secondary bg-opacity-20"}"
                            on:click={() => {setBlockType(id, blockType.type)}}
                            on:mouseover={() => {
                                selectedSlashCommand = blockType.type;
                            }}
                            on:focus={() => {
                                selectedSlashCommand = blockType.type;
                            }}
                        >
                            <img
                                src={blockType.icon}
                                alt={blockType.title}
                                class="icon"
                            />
                            <span class="title">{blockType.title}</span>
                        </div>
                    {/each}
                </div>
            {/if}
            {#if !block.content}
                {#each blockTypes as blockType}
                    {#if block.type === blockType.type}
                        <div class="absolute w-full h-full flex items-center pl-2 font-black opacity-10 {blockStyles[block.type]} my-0">{blockType.title}</div>
                    {:else if block.type === "text"}
                        <div class="absolute w-full h-full flex items-center text-sm pl-2 font-bold opacity-10">Type '/' for commands</div>
                    {/if}
                {/each}
            {/if}
            <div
                contenteditable
                class="focus:border-none focus:outline-none bg-opacity-10 px-1 relative {blockStyles[block.type]}"
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

                    if (e.key === "Enter" && activeCommandBlockId !== id) {
                        activeCommandBlockId = "";
                        e.preventDefault();
                        if (!e.target) return;
                        if (!selection) return;

                        const blockHtml = document.getElementById(id);
                        if (!blockHtml) return;

                        // whether the caret is at the end of the block
                        // used to determine whether to make a new block
                        const isEndOfBlock = selection.type == "Caret" && selection?.focusOffset === blockHtml.innerText.trim().length;
        
                        if (isEndOfBlock) makeNewBlock();
                    } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        if(activeCommandBlockId) {
                            const blockTypeIndex = blockTypes.findIndex(blockType => blockType.type === selectedSlashCommand);
                            const previousTypeIndex = blockTypeIndex > 0  ? blockTypeIndex - 1 : blockTypes.length - 1;

                            selectedSlashCommand = blockTypes[previousTypeIndex].type;
                        } else {
                            const lastBlockId = Object.keys(blocks)[i - 1];
                            const lastBlock = document.getElementById(lastBlockId);
                            if (!lastBlock) return;

                            lastBlock?.focus();
                        };
                    } else if (e.key === "ArrowDown") {
                        e.preventDefault();
                        if(activeCommandBlockId) {
                            const blockTypeIndex = blockTypes.findIndex(blockType => blockType.type === selectedSlashCommand);
                            const nextTypeIndex = blockTypeIndex < blockTypes.length - 1  ? blockTypeIndex + 1 : 0;

                            selectedSlashCommand = blockTypes[nextTypeIndex].type;
                        } else {
                            if (i >= Object.keys(blocks).length - 1) return;
                            const nextBlockId = Object.keys(blocks)[i + 1];
                            const nextBlock = document.getElementById(nextBlockId);

                            if (!nextBlock) makeNewBlock();
                            else nextBlock?.focus();
                        };
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
                        selectedSlashCommand = blockTypes[0].type;
                        activeCommandBlockId = id;
                    } else if (e.key === "Enter" && activeCommandBlockId === id) {
                        e.preventDefault();
                        activeCommandBlockId = "";
                        setBlockType(id, selectedSlashCommand || "text");

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