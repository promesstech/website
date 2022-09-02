<script lang="ts">
    import { addCommasToNumbers } from "$lib/utils/core";
    import { formatDate } from "$lib/utils/dates";
    import Timeseries from "$lib/components/charts/Timeseries.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import "$lib/styles/dashboard/revenue.css";

    $: activeKpi = "revenue";

    const currentMonth = [
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

    const previousMonth = currentMonth.map(d => d + Math.random() * -20);

    $: screenWidth = document.body.clientWidth;

    window.addEventListener("resize", () => {
        screenWidth = document.body.clientWidth;
    });

    const sidebarWidth = 250;

    const currentMonthTotal = currentMonth.reduce((a, b) => a + b, 0);
    const previousMonthTotal = previousMonth.reduce((a, b) => a + b, 0);

    const payments = [
        { id: "pay_7RCDTp2uWdUILNUN", amount: 2000, status: "Succeeded", customerId: "cus_95TIMH75eGQ3sQPP", description: "Project manager premium", date: new Date("2022-08-11").setUTCHours(18, 17, 12, 512), },
        { id: "pay_cQOxeeTB2UZW2o6l", amount: 2000, status: "Succeeded", customerId: "cus_QWnfKVXbVIWnpjzg", description: "Project manager premium", date: new Date("2022-08-11").setUTCHours(18, 12, 12, 512), },
        { id: "pay_Tut1ZqcXQdZpj1GV", amount: 2000, status: "Succeeded", customerId: "cus_lSLGz10NvYTJWMbn", description: "Project manager premium", date: new Date("2022-08-11").setUTCHours(18, 4, 12, 512), },
        { id: "pay_IgKqqHTpAKlILnY1", amount: 2000, status: "Succeeded", customerId: "cus_T62BbPtf1ioHoEgW", description: "Project manager premium", date: new Date("2022-08-11").setUTCHours(17, 43, 12, 512), },
        { id: "pay_gopndZxa5KoYpCsf", amount: 2000, status: "Succeeded", customerId: "cus_asJHbyjZd3lY3HV8", description: "Project manager premium", date: new Date("2022-08-11").setUTCHours(17, 12, 12, 512), },
        { id: "pay_YvwmsKqsbueq4ebC", amount: 2000, status: "Succeeded", customerId: "cus_Q4L0dWBiLcynkvx2", description: "Project manager premium", date: new Date("2022-08-11").setUTCHours(16, 58, 12, 512), },
        // { id: "pay_jrzFtH4eXn80eQ8R", amount: 2000, status: "Succeeded", customerId: "cus_9FdEWZaiU22L3poZ", description: "Project manager premium", date: new Date("2022-08-11").setUTCHours(16, 56, 12, 512), },
        // { id: "pay_3lbyoeKyoQp5HDJs", amount: 2000, status: "Succeeded", customerId: "cus_ulERaFNUe8eJP7V7", description: "Project manager premium", date: new Date("2022-08-11").setUTCHours(16, 24, 12, 512), },
        // { id: "pay_3J4AoOfCfsqmu7E4", amount: 2000, status: "Succeeded", customerId: "cus_VWjj8iuTfWGEACH0", description: "Project manager premium", date: new Date("2022-08-11").setUTCHours(16, 18, 12, 512), },
        // { id: "pay_8ueKI1zczCpVrzIv", amount: 2000, status: "Succeeded", customerId: "cus_MktUPhTLQeVyoUb9", description: "Project manager premium", date: new Date("2022-08-11").setUTCHours(16, 2, 12, 512), },
        // { id: "pay_TIcyCWssiFsAn8OI", amount: 2000, status: "Succeeded", customerId: "cus_FRZaHM8Cw6XcufpG", description: "Project manager premium", date: new Date("2022-08-11").setUTCHours(15, 45, 12, 512), },
        // { id: "pay_XFwZxqWZ8Kt3LoUk", amount: 2000, status: "Succeeded", customerId: "cus_zFiUufj0s1emXCk0", description: "Project manager premium", date: new Date("2022-08-11").setUTCHours(15, 32, 12, 512), },
    ];

    let activeModal: "customer" | "payment" | "recepit" | "invoice" | "";
    $: activeModal = "";

    $: activeOptionsMenu = "";
</script>

<Modal
    active={activeModal !== ""}
    on:minimize={() => activeModal = ""}
>
    <div class="bg-very-dark-primary w-4xx h-2/3 rounded-b-md">
        add payment
    </div>
</Modal>
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
                <span class="ml-2">Jul 15th, Aug 12th</span>
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
                <span class="kpi-title-percent">+{((currentMonthTotal - previousMonthTotal) / currentMonthTotal * 100).toFixed(1)}%</span>
            </div>
            <span class="kpi-value">${addCommasToNumbers(currentMonthTotal)}</span>
            <span class="kpi-previous">Previous 28 Days: ${addCommasToNumbers(previousMonthTotal)}</span>
        </div>
        <div
            class="kpi-container {activeKpi === "mmr" && "selected"}"
            on:click={() => activeKpi = "mmr"}
        >
            <div class="kpi-title">
                <span class="kpi-title-text">TOTAL MRR</span>
                <span class="kpi-title-percent">+2.4%</span>
            </div>
            <span class="kpi-value">$7,812</span>
            <span class="kpi-previous">Previous 28 Days: $7,622</span>
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
                <span class="kpi-title-percent negative">+33.3%</span>
            </div>
            <span class="kpi-value">20%</span>
            <span class="kpi-previous">Previous 28 Days: 15%</span>
        </div>
    </div>
    <div class="mt-32">
        <Timeseries
            data={currentMonth}
            data2={previousMonth}
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
                <span
                    class="flex items-center justify-center font-bold ml-4 bg-accent rounded-md px-4 hover:cursor-pointer"
                    on:click={() => activeModal = "payment"}
                >
                    + Add Payment
                </span>
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
            {#each payments as payment}
                <div class="w-full flex flex-row items-center mt-4 p-2 px-4">
                    <div class="flex flex-row w-full">
                        <div class="flex flex-row items-center w-64">
                            <span class="font-bold opacity-50">{(payment.amount / 100).toFixed(2)} USD</span>
                            <span class="flex items-center ml-2 px-1 h-4 font-bold text-xs rounded-sm bg-green-400 bg-opacity-50 text-green-300">{payment.status}</span>
                        </div>
                        <span class="font-bold w-64 text-sm hover:cursor-pointer">{payment.customerId}</span>
                        <span class="font-bold">{payment.description}</span>
                    </div>
                    <div class="flex flex-row items-center justify-between w-56">
                        <span class="text-xs font-bold">{formatDate(payment.date, "MONTH, dd hh:mmAPM")}</span>
                        <span class="ml-4 relative">
                            <img 
                                src="/icons/dashboard/options.svg"
                                alt="receipt"
                                class="w-6 h-6 hover:cursor-pointer"
                                on:click={() => activeOptionsMenu = activeOptionsMenu ? "" : payment.id}
                            />
                            {#if activeOptionsMenu === payment.id}
                                <div class="absolute flex flex-col w-48 bg-dark-secondary p-2 rounded-md -right-1 top-8 z-10">
                                    <span class="">View Payment</span>
                                    <span class="">View Customer</span>
                                </div>
                            {/if}
                        </span>
                    </div>
                </div>
            {/each}
            <div class="flex flex-row w-full justify-end mt-8">
                <span class="flex items-center justify-center h-8 w-24 rounded-md mr-2 bg-very-dark-secondary font-bold hover:cursor-pointer">Previous</span>
                <span class="flex items-center justify-center h-8 w-24 rounded-md mr-2 bg-secondary font-bold hover:cursor-pointer">Next</span>
            </div>
        </div>
    </div>
</div>