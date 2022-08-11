<script lang="ts">
    import { formatDate } from "../../utils/dates";
    import LineSvg from "./LineSvg.svelte";

    export let data: number[];
    export let data2: number[] = [];
    export let height: number;
    export let width: number;
    export let prefix: string = "";
    export let endDate: Date;

    const offset = 40;

    let hoveredX: number | undefined;
    $: hoveredX = undefined;
    let lastHoveredX: number | undefined;
    $: lastHoveredX = undefined;

    const dateEnd = new Date(endDate.getTime());
    const dateStart = new Date(dateEnd.setUTCHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000 * data.length);
 
    $: date = (dateEnd.getTime() - dateStart.getTime()) / data.length * (lastHoveredX || 0);

    let maxFactorOfTen = 10;
    
    data.forEach(d => {
        if (d < maxFactorOfTen) return;
        if (d > 10) maxFactorOfTen = 100;
        if (d > 100) maxFactorOfTen = 1000;
        if (d > 1000) maxFactorOfTen = 10000;
        if (d > 10000) maxFactorOfTen = 100000;
    });

    data2.forEach(d => {
        if (d < maxFactorOfTen) return;
        if (d > 10) maxFactorOfTen = 100;
        if (d > 100) maxFactorOfTen = 1000;
        if (d > 1000) maxFactorOfTen = 10000;
        if (d > 10000) maxFactorOfTen = 100000;
    });

    let maxValue = 0;

    data.forEach(value => {
        const upperBound = Math.ceil(value / maxFactorOfTen * 10) * (maxFactorOfTen / 10);
        if (upperBound > maxValue) maxValue = upperBound;
    });
    data2.forEach(value => {
        const upperBound = Math.ceil(value / maxFactorOfTen * 10) * (maxFactorOfTen / 10);
        if (upperBound > maxValue) maxValue = upperBound;
    });
</script>

<div class="flex flex-col w-full h-8 mb-12 ml-8">
    <span class=" font-bold">{prefix}{data[hoveredX || lastHoveredX || 0].toFixed(2)}</span>
    <span class="text-secondary font-bold text-sm">{formatDate(dateStart.getTime() + date, "WEEKDAY, dSUFFIX MONTH")}</span>
</div>
<svg
    width={width + offset * 2}
    {height}
>
    {#each data as _, i}
        {@const skip = data.length < 15 ? 1 : Math.ceil(data.length / 15)}
        {@const hovered = hoveredX  === i}
        {@const XValue = offset * 2 + width / data.length * i}
        {#if i % skip === 0 || hovered}
            <line 
                class="vertical {hovered && "active"}"
                x1={XValue}
                x2={XValue}
                y1={height - offset} 
                y2="0"
            ></line>
        {/if}
        <rect
            x={width / data.length * i - width / data.length / 2 + offset * 2}
            width={width/data.length}
            {height}
            class="rectangle"
            on:mouseenter={() => {
                hoveredX = i;
                lastHoveredX = i;
            }}
            on:mouseleave={() => hoveredX = undefined}
        >
        </rect>
    {/each}
    <LineSvg
        {data}
        {width}
        {height}
        {offset}
        {maxValue}
        color="#6366F1"
    />
    {#if data2}
        <LineSvg
            data={data2}
            {width}
            {height}
            {offset}
            {maxValue}
            color="#6B748033"
        />
    {/if}
    <line
        x1={offset * 2}
        x2={width + offset * 2}
        y1={height - offset}
        y2={height - offset}
        style="stroke: #6B7480"
    ></line>
    <text
        x={offset * 2}
        y={height - 15} 
        class="labels"
    >
        {formatDate(dateStart, "dSUFFIX, MONTH")}
    </text>
    <text
        x={offset * 2 + width / data.length * (data.length - 1) - 25}
        y={height - 15} 
        class="labels"
    >
        {formatDate(dateEnd, "dSUFFIX, MONTH")}
    </text>
    {#each new Array(11) as _, i}
        <!-- / 2 / 40 + 2 -->
        {@const dollarValue = maxValue / 10 * i}
        {#if i === 0 || i === 10 || i % 2.5 === 0}
            <text
                y={(height - offset) / 11 * (11 - i)}
                x="10"
                class="y-labels"
            >
                {prefix}{dollarValue}
            </text>
        {/if}
    {/each}
</svg>

<style lang="postcss">
    .vertical {
        fill: none;
        stroke: #6B7480;
        stroke-width: 0.2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 8;
    }
    .vertical.active {
        stroke-dasharray: 0;
        stroke: #6366F1;
        stroke-width: 1;
    }
    .vertical:hover {
        stroke-dasharray: 0;
    }
    .labels {
        @apply fill-white font-bold text-tiny opacity-50;
    }
    .rectangle {
        stroke: #00000000;
        fill: #00000000;
    }
    .y-labels {
        @apply fill-secondary font-bold text-xs opacity-50;
    }
</style>