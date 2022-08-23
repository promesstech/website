<script context="module">
    const dev = import.meta.env.DEV;
    export const load = () => {
        if (!dev) return {
            status: 301,
            redirect: "/newsletter",
        };
    };
</script>
<slot />