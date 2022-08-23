<script lang="ts">
    export let string: string;

    /**
     * DONE: \n (new line)
     * DONE: **string** (bold)
     * TODO ~~string~~ (strike through)
     * TODO `code` (code)
     * TODO ```code block``` (code block)
     * TODO [string](url) (hyperlink)
     * TODO _string_ (italic)
     * TODO __string__ (underline)
     * TODO ___string___ (monospace)
     * TODO ??string?? (upside down)
     * TODO > string (quote) 
     * TODO ||string|| (hidden)
    */
</script>

<div class="content flex flex-row">
    <!-- {#each string.split("\n") as line, i}
        <p class="h-6">{line}</p>
    {/each} -->
    {#each string.split("**") as line, i}
        {#if i % 2 === 0}
            {line}
        {:else}
            <span class="font-black mx-1">{line}</span>
        {/if}
    {/each}
</div>

<style lang="postcss">
    .content {
        @apply font-medium text-sm text-gray-200;
    }
</style>