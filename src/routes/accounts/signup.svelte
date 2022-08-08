<script>
    import { page } from "$app/stores";

    $: email = $page.url.search.replace("?email=", "");
</script>
<span>Signup for project manager with email: {email}</span>