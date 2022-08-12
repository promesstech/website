<script lang="ts">
    import { getWeeksOfMonth, daysOfWeek } from "../../../../../utils/dates";

    const today = new Date();

    const {
        days,
        monthLength,
        offset,
    } = getWeeksOfMonth(today, 6);
</script>
<div class="w-full h-full grid grid-cols-7 grid-rows-6">
    {#each days as day, i}
        {@const isNextMonth = i - 1 + offset > monthLength}
        {@const isPreviousMonth = i < offset}
        {@const isSelected = i + 1 - offset === today.getDate()}
        <div class="w-full flex flex-col h-full items-center pt-4 font-bold border border-solid border-opacity-10 border-secondary">
            {#if i < 7}
                <span class="text-secondary">{daysOfWeek[i].substring(0, 3)}</span>
            {/if}
            <span class="flex items-center justify-center rounded-full p-2 h-8 w-8 {isSelected && "bg-accent"} {(isNextMonth || isPreviousMonth) && "text-secondary text-opacity-50"}">{day}</span>
            <div class="flex flex-col overflow-y-scroll w-full">
                <div class="flex flex-col w-full mt-2 pr-2">
                    {#if i === 15}
                        <span class="flex items-center rounded-md bg-blue-2 text-xs font-bold px-2 h-6 truncate mb-2 hover:cursor-pointer">Product Release</span>
                    {/if}
                    {#if i === 23}
                        <span class="flex items-center rounded-md bg-blue-4 text-xs font-bold px-2 h-6 truncate mb-2 hover:cursor-pointer">New product showcase</span>
                    {/if}
                </div>
                <div class="flex flex-col pl-2">
                    {#if i === 19}
                        <div class="flex flex-row items-start w-fit hover:cursor-pointer">
                            <span class="w-4 h-4 rounded-md bg-blue-6"></span>
                            <span class="text-xs ml-1 text-secondary text-opacity-50 font-bold">12:00am</span>
                            <span class="custom-scrollbar ml-1 font-bold text-xs w-fit truncate">Team meeting</span>
                        </div>
                    {/if}
                    {#if i === 23}
                        <div class="flex flex-row items-start w-fit hover:cursor-pointer">
                            <span class="w-4 h-4 rounded-md bg-blue-8"></span>
                            <span class="text-xs ml-1 text-secondary text-opacity-50 font-bold">2:00pm</span>
                            <span class="custom-scrollbar ml-1 font-bold text-xs w-fit truncate">Team evaluation</span>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {/each}
</div>