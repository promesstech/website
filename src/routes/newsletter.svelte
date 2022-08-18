<svelte:head>
    <title>Promess | Newsletter</title>
</svelte:head>
<script>
    import { page } from "$app/stores";
    import Logo from "../components/Logo.svelte";
</script>

<div class="absolute h-screen flex p-8 md:pt-2 xs:pb-2 flex-row items-end justify-center">
    <Logo />
    <a
        href="https://twitter.com/promesstech"
        class="ml-4 w-8 h-8 mb-1"
    >
        <img
            src="/icons/twitter.svg"
            alt="twitter"
        />
    </a>
</div>
<div class="flex flex-row w-screen h-screen bg-black md:flex-col-reverse">
    <div class="flex flex-col w-1/2 bg-black items-center justify-center md:w-full md:h-1/2 sm:justify-start sm:pt-16">
        <div class="flex flex-col w-4xx lg:w-3xx md:w-2/3 sm:w-5/6">
            <span class="font-black text-3xl sm:text-2xl">Signup for the newsletter</span>
            <input
                type="text"
                class="mt-4 border border-solid border-secondary p-3 rounded-md font-bold text-xl bg-inherit md:p-2 md:text-sm"
                placeholder="Your email"
                value={$page.url.searchParams.get("email") || ""}
            />
            <span class="flex items-center justify-center bg-accent rounded-md p-3 mt-4 font-bold text-xl md:p-2 md:text-sm hover:cursor-pointer">Signup</span>
        </div>
    </div>
    <div class="flex flex-col w-1/2 bg-secondary bg-opacity-10 items-center justify-center px-1/12 md:w-full md:px-16 md:h-1/2 md:items-start xs:px-8">
        <span class="text-5xl font-black lg:text-3xl 2xs:text-xl">Promess is still in development</span>
        <span class="text-secondary font-bold mt-8 2xs:text-sm">We will be working hard in the next few months to deliver <span class="italic text-secondary font-black">the</span> project management software for your SaaS business.</span>
        <span class="text-secondary font-bold mt-4 2xs:text-sm"> In the mean time, subscribe to the newsletter and follow us on twitter to receive regular updates about our progress in development.</span>
    </div>
</div>