<script lang="ts">
  import Spinner from "./Spinner.svelte";
    export let loading: boolean;
</script>

{#if loading}
    <div class="flex flex-col items-center justify-center w-full h-full">
        <div class="w-1xx h-1xx">
            <Spinner />
        </div>
    </div>
{:else}
    <slot />
{/if}