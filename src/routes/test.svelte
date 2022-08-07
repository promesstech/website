<script lang="ts">
    import { onMount } from "svelte";

    type blockType = "text" | "h1" | "h2" | "h3" // | "bulleted-list" | "numbered-list" | "check-list" | "toggle-list" | "table" | "divider";

    interface Block {
        content: string;
        type: blockType;
    };

    let blocks: { [id: string]: Block };
    $: blocks = {
        "block_22345678": { type: "h1", content: `<span class="font-bold text-3xl">This is a large heading</span>` },
        "block_32345678": { type: "h2", content: `<span class="font-bold text-2xl">This is a medium heading</span>` },
        "block_42345678": { type: "h3", content: `<span class="font-bold text-xl">This is a small heading</span>` },
        "block_12345678": { type: "text", content: `<span class="font-bold text-sm">This is some text</span>`  },
    };

    onMount(() => {
        window.addEventListener("input", e => {
            // @ts-ignore
            if (!e.target || !e.target.isContentEditable) return;

            // @ts-ignore
            const id = e.target.id;
            const block = blocks[id];
            if (!block) return;

            const style = {
                "h1": "text-3xl",
                "h2": "text-2xl",
                "h3": "text-xl",
                "text": "text-sm",
            };

            // @ts-ignore
            const innerText = e.target.innerText;

            block.content = `<span class="font-bold ${style[block.type]}">${innerText || ""}</span>`;

            blocks = {
                ...blocks,
                [id]: block
            };
        });
    });
</script>

<div class="py-16 px-32 flex flex-col h-screen">
    <span class="font-bold text-xl mt-8">Notion</span>
    <div class="mt-8">
        {#each Object.entries(blocks) as [id, block], i}
            <div
                contenteditable
                class="focus:border-none focus:outline-none my-1 bg-opacity-10 p-1 bg-black"
                bind:innerHTML={blocks[id].content}
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

                    if (e.key === "Enter") {
                        e.preventDefault();
                        if (!e.target) return;

                        const selection = window.getSelection();
                        if (!selection) return;

                        const block = blocks[id];

                        const blockHtml = document.getElementById(id);
                        if (!blockHtml) return;

                        // whether the caret is at the end of the block
                        // used to determine whether to make a new block
                        const isEndOfBlock = selection.type == "Caret" && selection?.focusOffset === blockHtml.innerText.length;
        
                        if (isEndOfBlock) makeNewBlock();
                    } else if (e.key === "ArrowUp") {
                        const lastBlockId = Object.keys(blocks)[i - 1];
                        const lastBlock = document.getElementById(lastBlockId);
                        if (!lastBlock) return;

                        lastBlock?.focus();
                    } else if (e.key === "ArrowDown") {
                        if (i >= Object.keys(blocks).length - 1) return;
                        const nextBlockId = Object.keys(blocks)[i + 1];
                        const nextBlock = document.getElementById(nextBlockId);

                        if (!nextBlock) makeNewBlock();
                        else nextBlock?.focus();
                    } else if (e.key === "Backspace") {
                        // @ts-ignore
                        if (blocks[id].content.length === 0) {
                            e.preventDefault();
                            
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
                            }, 10);
                        };
                    };
                }}
                {id}
            ></div>
        {/each}
    </div>
</div>