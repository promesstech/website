<script>
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { goto } from "$app/navigation";
    import Integration from "../components/Integration.svelte";
    import Logo from "../components/Logo.svelte";
    import "../styles/index.css";

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
    <div class="w-screen bg-very-dark-secondary bg-opacity-20 flex flex-col items-center">
        <img src="/images/assets/example-desktop.svg" alt="gradient" class="main-example-image xs:hidden"/>
        <img src="/images/assets/example-mobile.svg" alt="gradient" class="main-example-image hidden xs:flex"/>
    </div>
    <div class="w-screen flex flex-col items-center pt-48 pb-24 px-1/12 text-center">
        <span class="text-5xl font-black md:text-3xl 2xs:text-2xl">Promess brings together all your project management needs into one app </span>
        <span class="text-secondary font-bold text-2xl mt-8 md:text-lg 2xs:text-base">All of your work in one place: Tasks, files, chat, roadmaps and more</span>
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
    <div class="integrations flex flex-row my-32 py-24 bg-secondary bg-opacity-10 items-center justify-between px-1/12 lg:flex-col">
        <div class="flex flex-col w-1/2 lg:items-center lg:text-center lg:w-2/3 sm:w-full">
            <span class="text-4xl font-bold">Will it work with my other tools?</span>
            <span class="text-lg font-bold text-secondary my-12">Promess integrates with various services to bring together data from your favourite external services to display in a clean UI.</span>
            <a  
                class="font-bold bg-accent rounded-md w-48 text-center py-2"
                href="/integrations"
            >
                Explore integrations
            </a>
        </div>
        <div class="grid grid-cols-5 lg:mt-16 xs:grid-cols-3">
            <Integration main name="Stripe"><img class="icon" src="/images/integrations/stripe.jpg" alt="stripe" /></Integration>
            <Integration main name="Google Calendar"><img class="icon" src="/images/integrations/google-calendar.png" alt="google-calendar" /></Integration>
            <Integration main name="Google Drive"><img class="icon" src="/images/integrations/google-drive.png" alt="google-drive" /></Integration>
            <Integration main name="Dropbox"><img class="icon" src="/images/integrations/dropbox.png" alt="dropbox" /></Integration>
            <Integration main name="Notion"><img class="icon" src="/images/integrations/notion.svg" alt="notion" /></Integration>
            <Integration main name="Zapier"><img class="icon" src="/images/integrations/zapier.svg" alt="zapier" /></Integration>
            <Integration main name="Slack"><img class="icon" src="/images/integrations/slack.webp" alt="slack" /></Integration>
            <Integration main name="Airtable"><img class="icon" src="/images/integrations/airtable.png" alt="airtable" /></Integration>
            <Integration main name="Calendly"><img class="icon" src="/images/integrations/calendly.png" alt="calendly" /></Integration>
            <Integration name="Facebook"><img class="icon" src="/images/integrations/facebook.webp" alt="facebook" /></Integration>
            <Integration name="Github"><img class="icon" src="/images/integrations/github.webp" alt="github" /></Integration>
            <Integration name="Instagram"><img class="icon" src="/images/integrations/instagram.webp" alt="instagram" /></Integration>
            <Integration name="Twitter"><img class="icon" src="/images/integrations/twitter.webp" alt="twitter" /></Integration>
            <Integration name="Reddit"><img class="icon" src="/images/integrations/reddit.png" alt="reddit" /></Integration>
            <Integration name="YouTube"><img class="icon" src="/images/integrations/youtube.png" alt="youtube" /></Integration>
            <Integration name="Pinterest"><img class="icon" src="/images/integrations/pinterest.svg" alt="pinterest" /></Integration>
            <Integration name="Paddle"><img class="icon" src="/images/integrations/paddle.webp" alt="paddle" /></Integration>
            <Integration name="Plaid"><img class="icon" src="/images/integrations/plaid.svg" alt="plaid" /></Integration>
            <Integration name="Square"><img class="icon" src="/images/integrations/square.png" alt="square" /></Integration>
            <Integration name="Google Analytics"><img class="icon" src="/images/integrations/google-analytics.svg" alt="google-analytics" /></Integration>
            <Integration name="Plausible"><img class="icon" src="/images/integrations/plausible.svg" alt="plausible" /></Integration>
            <Integration name="Netlify"><img class="icon" src="/images/integrations/netlify.png" alt="netlify" /></Integration>
            <Integration name="Vercel"><img class="icon" src="/images/integrations/vercel.svg" alt="vercel" /></Integration>
            <Integration name="Heroku"><img class="icon" src="/images/integrations/heroku.svg" alt="heroku" /></Integration>
            <Integration name="Prometheus"><img class="icon" src="/images/integrations/prometheus.png" alt="prometheus" /></Integration>
        </div>
    </div>
    <div>Newletter signup</div>
    <div>Footer</div>
</div>