<script>
    import { onMount } from "svelte";
    import "../app.css";
    
    onMount(() => {
        // @ts-ignore
        document.querySelector("body").classList.remove("overflow-hidden");
        // @ts-ignore
        document.querySelector("html").classList.remove("overflow-hidden");
    });
</script>

<slot />