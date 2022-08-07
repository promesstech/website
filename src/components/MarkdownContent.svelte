<script lang="ts">
    export let string: string;
</script>

<div class="flex flex-col">
    {#each string.split("\n") as line, i}
        <p class="h-6">{line}</p>
    {/each}
</div>