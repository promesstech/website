<script lang="ts">
    export let data: any[];
    export let width: number;
    export let height: number;
    export let offset: number;
    export let color: string;
    export let maxValue: number;
</script>

{#each data as d, i}
    {@const chartHeight = height - offset}
    {@const startValueProportion = d / maxValue}
    {@const endValueProportion = data[i + 1] / maxValue}
    {#if i < data.length - 1}
        <line
            class="value-line"
            x1={(i === 0 ? 0 : width / data.length * i) + offset * 2}
            x2={(width / data.length * (i + 1)) + offset * 2}
            y1={chartHeight - chartHeight * startValueProportion}
            y2={chartHeight - chartHeight * endValueProportion}
            style="stroke: {color}"
            fill="#fff"
        ></line>
    {/if}
{/each}

<style lang="postcss">
    .value-line {
        fill: none;
        stroke: black;
        stroke-width: 1;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
</style>
<!-- y1="{(i === 0 ? height - (d/(height/d)) : height - (data[i]/(height/data[i]))) - offset}"
y2="{height - (data[i + 1] / (height/data[i + 1])) - offset}" -->
