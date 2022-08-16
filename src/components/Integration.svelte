<script lang="ts">
    export let name: string;
    export let main: boolean = false;
</script>
<a
    class="icon-container {!main ? "xs:hidden" : ""}"
    href="/integrations/{name}"
>
    <span class="integration-name">{name}</span>
    <slot />
</a>