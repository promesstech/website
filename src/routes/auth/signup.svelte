<svelte:head>
    <title>Promess | Signup</title>
</svelte:head>

<script lang="ts">
    import { parseFormData } from "$lib/utils/core";
    import api from "$lib/api";
    import { goto } from "$app/navigation";

    const handleSignup = (e: any) => {
        const data = parseFormData(e.target);

        api.user.signup(data).then(res => {
            if (res.status === 201) {
                goto("/dashboard");
            };
        });
    };
</script>

<form
    class="flex flex-col w-screen h-screen items-center justify-center"
    on:submit|preventDefault={handleSignup}
>
    <!-- <span class="label">Name <span class="required">*</span></span> -->
    <input type="text" name="name" placeholder="Username"/>
    <!-- <span class="label">Email <span class="required">*</span></span> -->
    <input type="text" name="email" placeholder="Email"/>
    <!-- <span class="label">Password <span class="required">*</span></span> -->
    <input type="password" name="password" placeholder="Password"/>
    <!-- <span class="label">Confirm Password <span class="required">*</span></span> -->
    <input type="password" name="confirmPassword" placeholder="Confirm Password"/>
    <button type="submit" class="w-72 mt-2 bg-accent rounded-md h-10 font-bold">Sign Up</button>
    <a href="/auth/login" class="text-accent mt-2">Or login</a>
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