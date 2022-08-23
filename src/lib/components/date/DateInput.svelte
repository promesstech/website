<script lang="ts">
    import { formatDate } from "../../utils/dates";
    import { createEventDispatcher } from "svelte";
    import DatePicker from "./DatePicker.svelte";

    export let showTime: boolean;

    const dispatch = createEventDispatcher();

    $: active = false;

    $: date = undefined;
</script>

<div class="relative z-40">
    <span
        class="hover:cursor-pointer font-bold ml-1 text-tiny"
        on:click={() => active = !active}
    >
        {date ? formatDate(date, "WEEKDAY dSUFFIX, MONTH hh:mm") : "None"}
    </span>
    {#if active}
        <div class="absolute">
            <DatePicker
                time={showTime}
                on:change={e => {
                    dispatch("change", e);
                    active = false;
                    date = e.detail;
                }}
            />
        </div>
    {/if}
</div>