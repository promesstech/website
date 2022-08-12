<script lang="ts">
    import Modal from "../../../../../components/Modal.svelte";
    import DatePicker from "../../../../../components/date/DatePicker.svelte";
    import Document from "../../../../../components/Document.svelte";
    import DateInput from "../../../../../components/date/DateInput.svelte";
    import "../../../../../styles/dashboard/calendar.css";

    let activeModal: "reminder" | "event" | "";
    $: activeModal = "";
</script>

<Modal
    active={activeModal !== ""}
    on:minimize={() => activeModal = ""}
>
    <div class="bg-very-dark-primary h-6xx w-fit rounded-b-md flex flex-row">
        {#if activeModal === "event"}
            <div class="flex flex-row w-full h-full">
                <div class="flex flex-col w-5xx p-12">
                    <div class="flex flex-row items-center">
                        <div class="w-6 h-6 rounded-md bg-blue-1"></div>
                        <span class="ml-4 font-bold">Untitled Event</span>
                    </div>
                    <div class="flex flex-row items-center mt-4">
                        <div class="flex flex-row w-32">
                            <img
                                src="/icons/dashboard/assignees.svg"
                                alt="people"
                                class="w-6 h-6"
                            />
                            <span class="text-secondary ml-2 font-bold">People</span>
                        </div>
                        <div class="flex flex-row h-12 items-center">
                            <img
                                src="/images/assets/avatar.png"
                                alt="user"
                                class="h-8 w-8 rounded-sm"
                            />
                        </div>
                    </div>
                    <div class="flex flex-row items-center mt-2">
                        <div class="flex flex-row w-32">
                            <img
                                src="/icons/dashboard/dueby.svg"
                                alt="date"
                                class="w-6 h-6"
                            />
                            <span class="text-secondary ml-2 font-bold">Date</span>
                        </div>
                        <div class="flex flex-row h-12 items-center">
                            <DateInput showTime={false}/>
                        </div>
                    </div>
                    <div class="document mt-8 z-0">
                        <Document />
                    </div>
                    <div>
                        <span class="w-full h-10 flex items-center justify-center font-bold bg-accent rounded-md hover:cursor-pointer mt-4">Create Event</span>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</Modal>

<div class="flex flex-row w-full h-screen overflow-y-clip">
    <div class="flex flex-col w-full h-full">
        <div class="flex flex-row items-center justify-end h-20 py-8 px-16 border border-solid border-dark-primary border-x-0 border-t-0">
            <select class="p-2 border-2 border-solid border-secondary bg-inherit rounded-md w-28">
                <option value="schedule">Schedule</option>
                <option value="year">Year</option>
                <option value="month" selected>Month</option>
                <option value="week">Week</option>
                <option value="3day">3 Day</option>
                <option value="day">Day</option>
            </select>
        </div>
        <slot />
    </div>
    <div class="sidebar h-screen items-center flex flex-col justify-between border border-solid border-dark-primary border-y-0 border-r-0 p-8">
        <DatePicker time={false}/>
        <div class="flex flex-col w-full">
            <span
                class="add-button bg-accent"
                on:click={() => activeModal = "reminder"}
            >
                + Add Reminder
            </span>
            <span
                class="add-button bg-blue-6"
                on:click={() => activeModal = "event"}
            >
                + Add Event
            </span>
        </div>
    </div>
</div>

<style>
    .sidebar {
        max-width: 350px;
    }
    .document {
        height: 100%;
        max-height: 500px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>