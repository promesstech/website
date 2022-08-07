<script lang="ts">    
    // import type CustomWebsocket from "src/utils/websocket";
    // import { getContext } from "svelte";
    import { goto } from "$app/navigation";

    // let websocket: CustomWebsocket;
    // $: websocket = getContext("websocket");

    goto("/dashboard/messages");
</script>