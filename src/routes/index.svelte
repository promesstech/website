<script>
    import { fade, fly } from "svelte/transition";
    import { goto } from "$app/navigation";
    import Logo from "../components/Logo.svelte";
    import "../styles/index.css";
import { onMount } from "svelte";

    $: email = "";

    const endTextArray = [
        "revenue",
        "staff",
        "tasks",
        "events",
        "files",
    ];

    $: started = false;
    $: text = endTextArray[0];
    let i = 0;
    let j = 1;

    const typeWrite = () => {
        if (!started) text = "";
        if (i < endTextArray[j].length) {
            text += endTextArray[j][i];
            i += 1;
            setTimeout(typeWrite, 100);
        } else {
            setTimeout(() => {
                if (j < endTextArray.length - 1) {
                    text = "";
                    i = 0;
                    j += 1;
                    setTimeout(typeWrite, 100);
                } else {
                    text = "";
                    i = 0;
                    j = 0;
                    setTimeout(typeWrite, 100);
                };
            }, 2000);
        };
    };

    setTimeout(() => {
        typeWrite();
        started = true;
    }, 3000);

    $: cursor = true;

    const blink = () => {
        cursor = !cursor;
        setTimeout(blink, 500);
    };

    blink();

    const featureBorders = [
        "border-r border-b",
        "border-l border-b",
        "border-r border-t",
        "border-l border-t",
    ]

    const features = [
        {
            name: "Tasks",
            description: "Manage your tasks and assign them to your team members.",
        },
        {
            name: "Members",
            description: "Manage your tasks and assign them to your team members.",
        },
        {
            name: "Chats",
            description: "Manage your tasks and assign them to your team members.",
        },
        {
            name: "Calendar",
            description: "Manage your tasks and assign them to your team members.",
        },
    ];

    $: feature = "tasks";

    $: menuIsActive = false;

    $: featureFlyTransition = {
        duration: 300,
        x: -200,
    };

    onMount(() => {
        featureFlyTransition = {
            duration: 300,
            x: document.body.clientWidth > 1100 ? 700 : -200,
        };
    });
</script>

<div class="flex flex-col w-full min-h-screen bg-black">
    <div class="flex flex-col h-screen">
        <div class="flex flex-row p-8 w-full items-center xs:py-0 xs:pt-4">
            <div class="w-96 mb-4">
                <Logo />
            </div>
            <div class="flex flex-row w-full justify-center lg:hidden">
                <a class="nav-link" href="/dashboard">Dashboard</a>
                <a class="nav-link" href="/pricing">Pricing</a>
                <a class="nav-link" href="/">Support</a>
                <a class="nav-link" href="/">Resources</a>
            </div>
            <div class="login flex flex-row w-96 lg:hidden">
                <a class="border-2 border-solid border-accent text-accent hover:bg-accent hover:text-white transition-all" href="/login">Login</a>
                <a class="bg-accent" href="/signup">Start for free</a>
            </div>
            <div class="hidden lg:flex flex-row w-full justify-end">
                <img
                    src="/icons/navbar/menu.svg"
                    alt="menu"
                    class="w-8 hover:cursor-pointer"
                    on:click={() => { menuIsActive = !menuIsActive; }}
                />
            </div>
        </div>
        <div class="flex flex-col items-center h-full justify-center xs:py-16">
            <span class="text-4xl font-black text-center md:text-3xl px-4">Mission control for your software business</span>
            <div class="flex flex-row text-2xl mt-12 font-bold md:text-xl">
                <span class="text-secondary">Manage your</span>
                <div class="flex flex-col items-center mt-0.5">
                    <div class="flex flex-row items-end justify-center h-8 w-28">
                        <span class="fancy-font p-1 text-accent text-3xl pl-2 md:text-2xl">{text}</span>
                        <div class="w-0.5 h-7 m-1 {cursor ? "bg-accent" : "bg-transparent"}"></div>
                    </div>
                    <img src="/icons/underline.svg" alt="underline" class="w-28 md:w-24"/>
                </div>
            </div>
            <form
                class="flex flex-row mt-24 tiny:flex-col"
                on:submit|preventDefault={() => {
                    goto(`/accounts/signup?email=${email}`);
                    email = "";
                }}
            >
                <input
                    type="text"
                    class="font-bold bg-dark-secondary rounded-md p-4 w-84 sm:w-64 sm:p-3 sm:px-3 2xs:w-48 2xs:text-xs"
                    placeholder="Email address"
                    bind:value={email}
                />
                <a href="/accounts/signup?email={email}" class="flex items-center justify-center bg-accent font-bold ml-4 rounded-md w-40 sm:w-32 2xs:w-24 2xs:text-xs tiny:w-full tiny:mt-2 tiny:ml-0 tiny:h-8">Sign Up</a>
            </form>
        </div>
    </div>
    <div class="w-screen bg-very-dark-secondary bg-opacity-20">
        <img
            src="/images/assets/example2.svg"
            alt="gradient"
            class="z-0"
        />
    </div>
    <div class="flex flex-row items-center min-h-screen px-16 relative lg:flex-col py-32 sm:py-8">
        <img
            src="/icons/features/blob.svg"
            alt="blob"
            class="absolute w-1/2 left-1/2 -translate-x-1/2 z-0 lg:top-1xx md:top-2xx sm:hidden"
        />
        <div class="feature-grid grid grid-cols-2 w-1/2 z-10 lg:w-full sm:grid-cols-1 sm:w-screen sm:px-8">
            {#each features as featureElement, i}
            {@const borders = featureBorders[i]}
                <div
                    class="feature {borders}"
                    on:mouseover={() => feature = featureElement.name.toLowerCase()}
                    on:focus={() => feature = featureElement.name.toLowerCase()}
                >
                    <div class="flex flex-row items-center">
                        <img src="/icons/features/{featureElement.name.toLowerCase()}.svg" alt="icon" class="w-12 h-12"/>
                        <span class="text-3xl font-black ml-4">{featureElement.name}</span>
                    </div>
                    <span class="mt-4 text-secondary text-xs font-bold">{featureElement.description}</span>
                    <span class="mt-4 text-accent font-bold">Discover {featureElement.name} ></span>
                </div>
            {/each}
        </div>
        {#if feature === "tasks"}
            <img
                src="/images/features/tasks.png"
                alt="example"
                class="example-image"
                in:fly={featureFlyTransition}
                out:fade={{ duration: 100 }}
            />
        {:else if feature === "members"}
            <img
                src="/images/features/members.jpg"
                alt="example"
                class="example-image"
                in:fly={featureFlyTransition}
                out:fade={{ duration: 100 }}
            />
        {:else if feature === "chats"}
            <img
                src="/images/features/chats.jpg"
                alt="example"
                class="example-image"
                in:fly={featureFlyTransition}
                out:fade={{ duration: 100 }}
            />
        {:else if feature === "calendar"}
            <img
                src="/images/features/calendar.jpg"
                alt="example"
                class="example-image"
                in:fly={featureFlyTransition}
                out:fade={{ duration: 100 }}
            />
        {/if}
    </div>
</div>