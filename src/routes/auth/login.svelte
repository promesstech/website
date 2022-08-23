<svelte:head>
    <title>Promess | Login</title>
</svelte:head>

<script lang="ts">
    import { parseFormData } from "$lib/utils/core";   
    import api from "$lib/api";
    import { goto } from "$app/navigation";

    const handleLogin = (e: any) => {
        const data = parseFormData(e.target);

        api.user.login(data).then(res => {
            if (res.status === 200) {
                goto("/dashboard");
            };
        });
    };
</script>

<form
    class="flex flex-col w-screen py-32 items-center justify-center"
    on:submit|preventDefault={handleLogin}
    autocomplete="off"
>
    <!-- <span class="label">Email <span class="required">*</span></span> -->
    <input type="text" name="email" placeholder="Your Email"/>
    <!-- <span class="label">Password <span class="required">*</span></span> -->
    <input type="password" name="password" placeholder="Password"/>
    <button type="submit" class="w-72 mt-2 bg-accent rounded-md h-10 font-bold">Login</button>
    <a
        class="pointer-events-none opacity-20 w-72 mt-2 bg-inherit border-2 border-solid border-accent text-accent rounded-md h-10 font-bold flex items-center justify-center hover:bg-accent hover:text-white transition-all"
        href="http://localhost:50451/v1/user/auth/google"
    >
        Login with Google
    </a>
    <a href="/auth/signup" class="text-secondary mt-2">Or signup</a>
</form>

<style lang="postcss">
    input {
        @apply w-72 bg-dark-primary rounded-md my-2 px-4 py-2 font-bold text-sm h-10;
    }
    /* .label {
        @apply font-bold text-gray-400 text-sm;
    }
    .label .required {
        @apply text-red-400 ml-0.5 text-sm;
    } */
</style>