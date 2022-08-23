<svelte:head>
    <title>Promess</title>
</svelte:head>
<script>
    import { onMount } from "svelte";
    import "../app.css";
    
    onMount(() => {
        // @ts-ignore
        document.querySelector("body").classList.remove("overflow-hidden");
        // @ts-ignore
        document.querySelector("html").classList.remove("overflow-hidden");

        // @ts-ignore
        let domReady = (cb) => {
            document.readyState === 'interactive' || document.readyState === 'complete'
                ? cb()
                : document.addEventListener('DOMContentLoaded', cb);
        };

        domReady(() => {
            // Display body when DOM is loaded
            document.body.style.visibility = 'visible';
        });
    });
</script>

<slot />