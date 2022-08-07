<script>
    import DatePicker from "../../../../../components/date/DatePicker.svelte";
    import "../../../../../styles/dashboard/calendar.css";
</script>

<div class="flex flex-row w-full h-screen overflow-y-clip">
    <div class="flex flex-col w-full h-full">
        <div class="flex flex-row items-center justify-end h-20 py-8 px-16 border border-solid border-dark-primary border-x-0 border-t-0">
            <select class="p-2 border-2 border-solid border-secondary bg-inherit rounded-md w-28">
                <option value="month">Month</option>
                <option value="month">Week</option>
                <option value="month">Day</option>
            </select>
        </div>
        <slot />
    </div>
    <div class="sidebar h-screen items-center flex flex-col justify-between border border-solid border-dark-primary border-y-0 border-r-0 p-8">
        <DatePicker time={false}/>
        <div class="flex flex-col w-full">
            <span class="add-button bg-accent">+ Add Reminder</span>
            <span class="add-button bg-blue-6">+ Add Event</span>
        </div>
    </div>
</div>

<style>
    .sidebar {
        max-width: 350px;
    }
</style>