<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
    import { getWeeksOfMonth, monthLengths, months, times } from "../../utils/dates";

    export let time: boolean;

	const dispatch = createEventDispatcher();

    // code is looking shocking currently
    // will rewrite soon
    // can probably get it below 100 lines haha (from 216)

    const today = new Date();

    $: selectedDay = today.getDate();
    $: selectedMonth = today.getMonth();
    $: selectedYear = today.getFullYear();

    $: currentDay = selectedDay;
    $: currentMonth = selectedMonth;
    $: currentYear = selectedYear;
    
    $: date = new Date(currentYear, currentMonth, currentDay);

    $: monthLength = 0;
    $: offset = 0;

    let days: number[];
    $: days = [];

    $: if (date) {
        const weeks = getWeeksOfMonth(date, 6);

        monthLength = weeks.monthLength;
        offset = weeks.offset;
        days = weeks.days;
    };

    $: hour = today.getHours();
    $: minute = today.getMinutes();
    $: ampm = hour >= 12 ? "PM" : "AM";

    $: focused = false;

    onMount(() => { 
        window.addEventListener("click", e => {
            if (!e.target) return;

            // @ts-ignore
            const id = e.target.id;
            if (id === "input-time") return;

            if (times.find(time => time === id)) {
                const [hourValue, minuteValue] = id.replace(/AM|PM/, "").split(":");
            
                hour = parseInt(hourValue) + (id.includes("PM") ? 12 : 0);
                minute = parseInt(minuteValue);

                const timeInput = document.getElementById("input-time");
                if (!timeInput) return;

                // @ts-ignore
                timeInput.value = id.replace(/AM|PM/, "");
            };

            focused = false;
        });
    });

    $: if (selectedDay && selectedMonth && selectedYear) {
        dispatch("change", new Date(selectedYear, selectedMonth, selectedDay));
    };
</script>

<div class="date-container flex flex-col w-3xx rounded-md p-4">
    <div class="flex flex-row w-full justify-between py-2 font-bold items-center">
        <img
            src="/icons/left-arrow.svg"
            alt="left-arrow"
            class="w-8 h-8 hover:cursor-pointer"
            on:click={() => {
                if (currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) return;

                if (currentMonth === 0) {
                    currentMonth = 11
                    currentYear -= 1
                } else {
                    currentMonth -= 1
                };
            }}
        />
        <span>{months[date.getMonth()]} {date.getFullYear()}</span>
        <img
            src="/icons/right-arrow.svg"
            alt="left-arrow"
            class="w-8 h-8 hover:cursor-pointer"
            on:click={() => {
                if (currentMonth === 11) {
                    currentMonth = 0
                    currentYear += 1
                } else {
                    currentMonth += 1
                };
            }}
        />
    </div>
    <div class="flex flex-col w-full font-bold px-2">
        <div class="flex flex-row w-full justify-between py-2">
            <span class="day-of-week">Sun</span>
            <span class="day-of-week">Mon</span>
            <span class="day-of-week">Tue</span>
            <span class="day-of-week">Wed</span>
            <span class="day-of-week">Thu</span>
            <span class="day-of-week">Fri</span>
            <span class="day-of-week">Sat</span>
        </div>
        <div class="grid grid-cols-7">
            {#each days as day, i}
                <span
                    class="
                        flex items-center justify-center text-sm p-2 hover:cursor-pointer rounded-full w-8 h-8 my-0.5
                        {(i < offset || (i - offset + 1) > monthLength) && "text-secondary text-opacity-50"} 
                        {(
                            currentDay === selectedDay && 
                            selectedDay === day && 
                            currentMonth === (i < offset ? selectedMonth - 1 : i - offset >= monthLengths[selectedMonth] ? selectedMonth + 1 : selectedMonth) && 
                            currentYear === selectedYear && 
                            i - offset <= monthLengths[selectedMonth]
                        ) && "bg-accent"}
                    "
                    on:click={() => {
                        const isPreviousMonth = i < offset;
                        const isNextMonth = i - offset >= monthLengths[selectedMonth];

                        let newMonth = currentMonth;
                        let newYear = currentYear;

                        if (currentMonth === 0 && isPreviousMonth) {
                            newMonth = 11;
                            newYear -= 1;
                        } else if (currentMonth === 11 && isNextMonth) {
                            newMonth = 0;
                            newYear += 1;
                        } else if (isPreviousMonth) {
                            newMonth -= 1;
                        } else if (isNextMonth) {
                            newMonth += 1;
                        };

                        selectedDay = day;
                        selectedMonth = newMonth;
                        selectedYear = newYear;
                    }}
                >
                    {day}
                </span>
            {/each}
        </div>
        {#if time}
            <div class="relative">
                <input
                    type="text"
                    placeholder="Add time (hh:mm)"
                    class="my-2 bg-inherit text-xs"
                    on:input={e => {
                        if (!e.target) return;
                        // @ts-ignore
                        const value = e.target.value;
                        // @ts-ignore
                        if (/[a-zA-Z]/i.test(value)) return e.target.value = "";

                        const [hourValue, minuteValue] = value.split(":");
        
                        if (hourValue && minuteValue) {
                            if (hour < 23) hour = parseInt(hourValue);
                            if (minute < 59) minute = parseInt(minuteValue);
                        };
                    }}
                    on:focus={() => {
                        focused = true;
                    }}
                    id="input-time"
                />
                {#if focused}
                    <div class="absolute bg-very-dark-primary p-2 rounded-md flex flex-col h-48 overflow-scroll">
                        {#each times as time}
                            <span
                                class="text-sm p-2 hover:cursor-pointer hover:bg-dark-secondary rounded-md"
                                id={time}
                            >
                                {time}
                            </span>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
        <span
            class="mt-2 text-xs text-secondary hover:cursor-pointer"
            on:click={() => {
                currentDay = selectedDay;
                currentMonth = selectedMonth;
                currentYear = selectedYear;
            }}
        >
            {selectedDay}/{selectedMonth + 1}/{selectedYear} at {hour !== undefined && minute !== undefined ? `${hour > 12 ? hour - 12 : hour === 0 ? "00" : hour}:${minute.toString().padStart(2, "0")} ${ampm}` : ""}
        </span>
    </div>
</div>

<style lang="postcss">
    .date-container {
        background-color: #222630;
    }
    .day-of-week {
        @apply text-accent w-8 text-xs text-center;
    }
</style>