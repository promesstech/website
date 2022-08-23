<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { scale } from "svelte/transition";
    export let active: boolean;

    const dispatch = createEventDispatcher();

    const minimizeModal = () =>  dispatch("minimize");

    window.onclick = e => {
        if (!e.target) return;
        // @ts-ignore
        const id = e.target.id;

        console.log(e.target);

        if (id === "click-off-task") minimizeModal();
    };
</script>
{#if active}
    <div
        class="absolute w-screen h-screen left-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        id="click-off-task"
    >
        <div
            class="flex w-full h-full items-center justify-center"
            id="click-off-task"
            transition:scale={{ duration: 100 }}
        >
            <div class="flex flex-col h-full justify-center">
                <div class="flex justify-end py-3 px-6 border border-solid border-x-0 border-t-0 border-secondary bg-very-dark-primary rounded-t-md">
                    <span
                        class="flex items-center justify-center rounded-md h-6 w-6 bg-secondary font-bold hover:cursor-pointer"
                        on:click={minimizeModal}
                    >
                        <img
                            src="/icons/dashboard/x.svg"
                            alt="exit"
                        />
                    </span>
                </div>
                <slot />
            </div>
        </div>
    </div>
{/if}