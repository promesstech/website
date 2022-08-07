<script lang="ts">
    import { signup } from "../../api/users";

    const handleLogin = (e: any) => {
        const formData = new FormData(e.target);

        const data: {
            [key: string]: any;
        } = {};

        // @ts-ignore
        for (const [key, value] of formData) {
            data[key] = value;
        };

        signup(data).then(res => {
            console.log(res);
        });
    };
</script>

<form
    class="flex flex-col p-16"
    on:submit|preventDefault={handleLogin}
>
    <span class="label">Name <span class="required">*</span></span>
    <input type="text" name="name" placeholder="oscar"/>
    <span class="label">Email <span class="required">*</span></span>
    <input type="text" name="email" placeholder="oscarfal2006@gmail.com"/>
    <span class="label">Password <span class="required">*</span></span>
    <input type="password" name="password" placeholder="Password"/>
    <span class="label">Confirm Password <span class="required">*</span></span>
    <input type="password" name="confirmPassword" placeholder="Confirm Password"/>
    <button type="submit" class="w-72 mt-2 bg-accent rounded-md h-10">Sign Up</button>
</form>

<style lang="postcss">
    input {
        @apply w-72 bg-dark-primary rounded-md my-2 px-4 py-2 font-bold text-sm h-10;
    }
    .label {
        @apply font-bold text-gray-400 text-sm;
    }
    .label .required {
        @apply text-red-400 ml-0.5 text-sm;
    }
</style>