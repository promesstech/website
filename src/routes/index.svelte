<script>
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { goto } from "$app/navigation";
    import Integration from "$lib/components/Integration.svelte";
    import Logo from "$lib/components/Logo.svelte";
    import Footer from "$lib/components/footer/Footer.svelte";
    import "$lib/styles/index.css";

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
            description: "Manage your tasks and assign them to your team members. It's all in one place - and your whole team gets notified every time a task is assigned or completed.",
        },
        {
            name: "Members",
            description: "Form a team of members with different roles and permissions and add them to different teams within your organization.",
        },
        {
            name: "Chats",
            description: "Communicate with your team in a 1-to-1 chat, group discussions or brainstorms. Create chats for different topics, with customizable permissions to limit chats to the whole organization or just members of a specific team.",
        },
        {
            name: "Calendar",
            description: "Create events and reminders to plan out a schedule for your organization. View in different time frames and assign to specific members or teams. Add relevant documents to an event to stay organized.",
        },
    ];

    $: feature = "tasks";

    $: menuIsActive = false;

    const toggleMenu = () => {
        menuIsActive = !menuIsActive;
        if (!document) return;
        // @ts-ignore
        document.querySelector("body").classList.toggle("overflow-hidden");
        // @ts-ignore
        document.querySelector("html").classList.toggle("overflow-hidden");
    };

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

    const techFeatures = [
        {
            name: "View your infrastructure",
            description: "Get an overview of your entire tech infrastructure with data taken from Google Cloud, AWS, Azure and more.",
            icon: "server",
        },
        {
            name: "Track your analytics",
            description: "Assess the performance of your website and gain data-driven insights to improve it. Identify bottlenecks in the customer journey and find ways to improve conversions.",
            icon: "analytics",
        },
        {
            name: "Measure your metrics",
            description: "See inside your tech infrastructure to spot performance issues and identify opportunities to improve your site's performance. Be aware of your resource usage at all times to avoid overusing or under-utilizing your resources, saving money in the process.",
            icon: "metrics",
        },
        {
            name: "Administer your database",
            description: "Visualize and manage your MySQL, SQLite, PostgreSQL, MongoDB, Redis and other data sources. Track your data's growth over time to stay on top of your storage and get the most from your database.",
            icon: "database",
        },
        {
            name: "Manage your logs",
            description: "Collect logs from your applications to identify possible errors. Query logs to quickly obtain the information you need to troubleshoot a problem and get answers quickly.",
            icon: "logs",
        },
        {
            name: "Monitor your applications",
            description: "Setup monitors for your application and a page to view their status and past downtimes. Receive notifications when there's any problem with your service or application and stay alerted at all times.",
            icon: "uptime",
        },
    ];
</script>

<div class="flex flex-col min-w-screen bg-black">
    <div class="flex flex-col h-screen w-full relative">
        <div class="navbar flex flex-row px-8 w-full h-48 items-center {menuIsActive ? "active" : ""}">
            <div class="w-96 mb-4">
                <Logo />
            </div>
            <div class="flex flex-row w-full justify-center lg:hidden">
                <a class="nav-link" href="/dashboard">Dashboard</a>
                <a class="nav-link" href="/newsletter">Pricing</a>
                <a class="nav-link" href="/newsletter">Support</a>
                <a class="nav-link" href="/newsletter">Resources</a>
            </div>
            <div class="login flex flex-row w-96 lg:hidden">
                <a
                    class="border-2 border-solid border-accent text-accent hover:bg-accent hover:text-white transition-all"
                    href="/auth/login"
                >
                    Login
                </a>
                <a
                    class="bg-accent"
                    href="/auth/signup"
                >
                    Start for free
                </a>
            </div>
            <div class="hidden lg:flex flex-row w-full justify-end">
                <img
                    src="/icons/navbar/menu.svg"
                    alt="menu"
                    class="w-8 hover:cursor-pointer"
                    on:click={toggleMenu}
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
                    // goto(`/auth/signup?email=${email}`);
                    // email = "";
                    goto("#newsletter")
                }}
            >
                <input
                    type="text"
                    class="font-bold bg-dark-secondary rounded-md p-4 w-84 sm:w-64 sm:p-3 sm:px-3 2xs:w-48 2xs:text-xs"
                    placeholder="Email address"
                    bind:value={email}
                />
                <!-- href="/accoauthunts/signup?email={email}" -->
                <a href="#newsletter" class="flex items-center justify-center bg-accent font-bold ml-4 rounded-md w-40 sm:w-32 2xs:w-24 2xs:text-xs tiny:w-full tiny:mt-2 tiny:ml-0 tiny:h-8">Sign Up</a>
            </form>
        </div>
        {#if menuIsActive}
            <div
                class="absolute bg-black h-screen w-screen z-50 top-24 hidden lg:flex bg-opacity-90"
                transition:fade={{ duration: 300 }}
            >
                <div
                    class="bg-black w-full h-fit"
                    transition:fly={{ duration: 300, x: 200 }}
                >
                    <div class="flex flex-col w-full h-full bg-secondary bg-opacity-10 p-8">
                        <a class="nav-link start" href="/dashboard">Dashboard</a>
                        <a class="nav-link start" href="/newsletter">Pricing</a>
                        <a class="nav-link start" href="/newsletter">Support</a>
                        <a class="nav-link start" href="/newsletter">Resources</a>
                        <div class="login mobile flex flex-row w-full pt-8 sm:flex-col">
                            <a
                                class="border-2 border-solid border-accent text-accent hover:bg-accent hover:text-white transition-all mr-4 sm:mb-4"
                                href="/auth/login"
                            >
                                Login
                            </a>
                            <a
                                class="bg-accent ml-4"
                                href="/auth/signup"
                            >
                                Start for free
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
    <div class="w-screen bg-secondary bg-opacity-10 flex flex-col items-center">
        <img src="/images/assets/example-desktop.svg" alt="main-example-desktop" class="main-example-image xs:hidden"/>
        <img src="/images/assets/example-mobile.svg" alt="main-example-mobile" class="main-example-image hidden xs:flex"/>
    </div>
    <div class="w-screen flex flex-col items-center pt-48 pb-24 px-1/12 text-center">
        <span class="text-5xl font-black md:text-3xl 2xs:text-2xl">Promess brings together all your project management needs into one dashboard</span>
        <span class="text-secondary font-bold text-2xl mt-8 md:text-lg 2xs:text-base">All of your work in one place: Tasks, files, chat, calendar, revenue and more.</span>
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
                <a
                    class="feature {borders}"
                    on:mouseover={() => feature = featureElement.name.toLowerCase()}
                    on:focus={() => feature = featureElement.name.toLowerCase()}
                    href="/newsletter"
                >
                    <div class="flex flex-row items-center">
                        <img src="/icons/features/{featureElement.name.toLowerCase()}.svg" alt="icon" class="w-12 h-12"/>
                        <span class="text-3xl font-black ml-4">{featureElement.name}</span>
                    </div>
                    <span class="mt-4 text-secondary text-xs font-bold">{featureElement.description}</span>
                    <span class="mt-4 text-accent font-bold">Discover {featureElement.name} ></span>
                </a>
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
                href="/newsletter"
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
    <div class="tech-features-container flex flex-col pt-32">
        <img src="/images/WaveTop.svg" alt="wave-bottom" />
        <div class="flex flex-col items-center bg-secondary bg-opacity-10 pb-12 pt-24 md:px-4">
            <span class="text-4xl font-bold text-center 2xs:text-3xl">Manage your tech</span>
            <span class="font-bold text-secondary mt-4 text-center 2xs:text-xs">With promess you can administer and monitor the tech side of your business.</span>
            <div class="grid grid-cols-3 w-12xx mt-8 2lg:w-5/6 md:w-full md:grid-cols-2 2xs:grid-cols-1">
                {#each techFeatures as techFeature}
                    <div class="tech-feature">
                        <img src="/icons/features/tech/{techFeature.icon}.svg" alt="infrastructure" class="icon"/>
                        <span class="title">{techFeature.name}</span>
                        <span class="description">{techFeature.description}</span>
                    </div>
                {/each}
            </div>
        </div>
        <img src="/images/WaveBottom.svg" alt="wave-bottom" />
    </div>
    <div class="flex flex-col w-full items-center py-48 mb-24 lg:py-32 lg:mb-12 2xs:mb-0">
        <div class="flex flex-col w-1/2 items-center text-center md:w-full md:px-8">
            <span class="font-black text-5xl md:text-4xl">Promess is still in development</span>
            <span class="text-secondary my-8 font-bold">Subscribe to our newsletter to get weekly updates and get notified when we go into beta.</span>
            <form
                class="flex flex-row w-5xx 2xs:w-5/6 xs:flex-col"
                on:submit|preventDefault={() => { goto("#newsletter") }}
            >
                <input
                    placeholder="Your email"
                    type="text"
                    class="rounded-l-md bg-inherit border border-solid border-secondary p-3 border-r-0 font-bold w-full md:py-2 md:text-sm xs:border-r xs:rounded-r-md"
                    id="newsletter"
                    bind:value={email}
                />
                <a
                    class="bg-accent rounded-r-md px-4 font-bold flex items-center justify-center w-48 2xs:text-sm md:w-32 xs:w-full xs:rounded-l-md xs:mt-4 xs:h-8"
                    href="/newsletter?email={email}"
                >
                    Subscribe
                </a>
            </form>
        </div>
    </div>
    <div class="mt-16 bg-secondary bg-opacity-10 2xs:mt-8">
        <Footer />
    </div>
</div>