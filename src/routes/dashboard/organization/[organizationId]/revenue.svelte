<script lang="ts">
    import Timeseries from "../../../../components/charts/Timeseries.svelte";
    import "../../../../styles/dashboard/revenue.css";

    $: activeKpi = "revenue";

    const data = [
        240,
        300,
        320,
        340,
        380,
        250,
        220,
        230,
        260,
        270,
        280,
        240,
        245,
        247,
        248,
        255,
        253,
        280,
        258,
        245,
        242,
        249,
        350,
        242,
        200,
        220,
        230,
        260,
    ];

    const data2 = data.map(d => d + Math.random() * 50);

    $: screenWidth = document.body.clientWidth;

    window.addEventListener("resize", () => {
        screenWidth = document.body.clientWidth;
    });

    const sidebarWidth = 250;
</script>
<div class="flex flex-col py-24 px-32 w-full">
    <div class="flex flex-row items-center pb-16">
        <div class="flex flex-row w-fit items-center text-center text-secondary bg-secondary bg-opacity-20 p-2 pr-4 font-bold rounded-md border-2 border-solid border-dark-secondary hover:cursor-pointer">
            <span class="text-sm ml-2">Last 28 Days</span>
            <img
                src="/icons/dashboard/down-arrow.svg"
                alt="time"
                class="w-5 h-5 mx-1"
            />
            <div class="flex flex-row items-center h-full pl-1 border-2 border-solid border-secondary border-y-0 border-r-0">
                <img
                    src="/icons/dashboard/time.svg"
                    alt="time"
                    class="w-4 h-4 ml-1"
                />
                <span class="ml-2">Jul 11th, Aug 7th</span>
            </div>
        </div>
        <span class="mx-4 font-bold text-secondary">Compared To</span>
        <div class="flex flex-row w-fit items-center text-center text-secondary bg-secondary bg-opacity-20 p-2 pr-4 font-bold rounded-md border-2 border-solid border-dark-secondary hover:cursor-pointer">
            <span class="text-sm ml-2">Previous Period</span>
            <img
                src="/icons/dashboard/down-arrow.svg"
                alt="time"
                class="w-5 h-5 ml-1"
            />
        </div>
    </div>
    <div class="flex flex-row w-full justify-between">
        <div
            class="kpi-container {activeKpi === "revenue" && "selected"}"
            on:click={() => activeKpi = "revenue"}
        >
            <div class="kpi-title">
                <span class="kpi-title-text">TOTAL REVENUE</span>
                <span class="kpi-title-percent">+15%</span>
            </div>
            <span class="kpi-value">$43,871</span>
            <span class="kpi-previous">Previous 28 Days: $32,442</span>
        </div>
        <div
            class="kpi-container {activeKpi === "mmr" && "selected"}"
            on:click={() => activeKpi = "mmr"}
        >
            <div class="kpi-title">
                <span class="kpi-title-text">TOTAL MRR</span>
                <span class="kpi-title-percent">+12.4%</span>
            </div>
            <span class="kpi-value">$7,412</span>
            <span class="kpi-previous">Previous 28 Days: $6,562</span>
        </div>
        <div
            class="kpi-container {activeKpi === "subscribers" && "selected"}"
            on:click={() => activeKpi = "subscribers"}
        >
            <div class="kpi-title">
                <span class="kpi-title-text">NEW SUBSCRIBERS</span>
                <span class="kpi-title-percent">+25%</span>
            </div>
            <span class="kpi-value">40</span>
            <span class="kpi-previous">Previous 28 Days: 32</span>
        </div>
        <div
            class="kpi-container {activeKpi === "churn" && "selected"}"
            on:click={() => activeKpi = "churn"}
        >
            <div class="kpi-title">
                <span class="kpi-title-text">CHURN RATE</span>
                <span class="kpi-title-percent">+33.3%</span>
            </div>
            <span class="kpi-value">20%</span>
            <span class="kpi-previous">Previous 28 Days: 15%</span>
        </div>
    </div>
    <div class="mt-32">
        <Timeseries
            {data}
            {data2}
            height={300}
            width={screenWidth - sidebarWidth - 400}
            prefix="$"
            endDate={new Date()}
        />
    </div>
    <div class="flex flex-col mt-16 p-8 rounded-md border border-solid border-secondary border-opacity-20">
        <div class="flex flex-row items-center justify-between border border-solid border-secondary border-x-0 border-t-0 pb-4 border-opacity-20">
            <div class="flex flex-row">
                <span class="table-header">Customers</span>
                <span class="table-header active">Payments</span>
                <span class="table-header">Recepits</span>
                <span class="table-header">Invoices</span>
            </div>
            <div class="flex flex-row">
                <input
                    class="bg-dark-secondary p-2 rounded-md font-bold border border-solid border-secondary"
                    placeholder="Search"
                    type="text"
                />
                <span class="flex items-center justify-center font-bold ml-4 bg-accent rounded-md px-4 hover:cursor-pointer">+ Add Payment</span>
            </div>
        </div>
        <div class="flex flex-col mt-4 w-full">
            <div class="w-full flex flex-row items-center mt-4 p-2 px-4 bg-dark-secondary bg-opacity-30 h-10 rounded-md">
                <div class="flex flex-row w-full">
                    <div class="flex flex-row items-center w-64">
                        <span class="font-bold">Amount</span>
                    </div>
                    <span class="font-bold w-64">Customer</span>
                    <span class="font-bold">Description</span>
                </div>
                <div class="flex flex-row items-center w-56">
                    <span class="text-xs w-32 font-bold">Date</span>
                </div>
            </div>
            <div class="w-full flex flex-row items-center mt-4 p-2 px-4">
                <div class="flex flex-row w-full">
                    <div class="flex flex-row items-center w-64">
                        <span class="font-bold opacity-50">20.00 USD</span>
                        <span class="flex items-center ml-2 px-1 h-4 font-bold text-xs rounded-sm bg-green-400 bg-opacity-50 text-green-300">Succeeded</span>
                    </div>
                    <span class="font-bold w-64 text-sm hover:cursor-pointer">cus_1234567890123456</span>
                    <span class="font-bold">Some description</span>
                </div>
                <div class="flex flex-row items-center justify-between w-56">
                    <span class="text-xs font-bold">August, 7 12:06PM</span>
                    <span class="ml-4 relative">
                        <img 
                            src="/icons/dashboard/options.svg"
                            alt="receipt"
                            class="w-6 h-6 hover:cursor-pointer"
                        />
                        <!-- <div class="absolute flex flex-col w-48 bg-dark-secondary p-2 rounded-md -right-1 top-8">
                            <span class="">View Payment</span>
                            <span class="">View Customer</span>
                        </div> -->
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>