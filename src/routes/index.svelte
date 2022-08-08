<script>
    import { goto } from "$app/navigation";
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
</script>

<div class="flex flex-col w-full min-h-screen bg-black">
    <div class="flex flex-col h-screen">
        <div class="flex flex-row p-8 w-full">
            <div class="w-96">
                <Logo />
            </div>
            <div class="flex flex-row w-full justify-center">
                <a class="nav-link" href="/dashboard">Dashboard</a>
                <a class="nav-link" href="/pricing">Pricing</a>
                <a class="nav-link" href="/">Support</a>
                <a class="nav-link" href="/">Resources</a>
            </div>
            <div class="login flex flex-row w-96">
                <a class="border-2 border-solid border-accent text-accent hover:bg-accent hover:text-white transition-all" href="/login">Login</a>
                <a class="bg-accent" href="/signup">Start for free</a>
            </div>
        </div>
        <div class="flex flex-col items-center pt-48 pb-84">
            <span class="text-4xl font-black">Mission control for your software business</span>
            <div class="flex flex-row text-2xl mt-12 font-bold">
                <span class="text-secondary">Manage your</span>
                <div class="flex flex-col items-center mt-0.5">
                    <div class="flex flex-row items-end justify-center h-8 w-28">
                        <span class="fancy-font p-1 text-accent text-3xl pl-2">{text}</span>
                        <div class="w-0.5 h-7 m-1 {cursor ? "bg-accent" : "bg-transparent"}"></div>
                    </div>
                    <img src="/icons/underline.svg" alt="underline" class="w-28"/>
                </div>
            </div>
            <form
                class="flex flex-row mt-24"
                on:submit|preventDefault={() => {
                    goto(`/accounts/signup?email=${email}`);
                    email = "";
                }}
            >
                <input
                    type="text"
                    class="font-bold bg-dark-secondary rounded-md p-4 w-84"
                    placeholder="Email address"
                    bind:value={email}
                    
                />
                <a href="/accounts/signup?email={email}" class="flex items-center justify-center bg-accent font-bold ml-4 rounded-md w-40">Sign Up</a>
            </form>
        </div>
    </div>
    <div class="flex flex-row items-center bg-secondary bg-opacity-10 w-screen h-screen mb-32">
        <img
            src="/images/dashboard-example.png"
            alt="dashboard-example"
            class="h-full"
        />
        <div class="w-1/2 flex flex-col pr-32">
            <span class="text-4xl font-bold">Projectize brings together all your project management needs into one app</span>
            <span class="text-xl text-secondary my-16">All of your work in one place: Tasks, files, chat, roadmaps and more</span>
            <a
                href="/signup"
                class="bg-accent p-4 rounded-md w-48 text-center font-bold"
            >
                Get started for free
            </a>
        </div>
    </div>
    <div>
        some other content
    </div>
</div>