<script context="module">
    const dev = false // import.meta.env.DEV;
    export const load = () => {
        if (!dev) return {
            status: 301,
            redirect: "/newsletter",
        };
    };
</script>