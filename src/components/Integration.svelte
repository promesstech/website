<script lang="ts">
    export let name: string;
    export let main: boolean = false;
</script>
<!-- href="/integrations/{name}" -->
<a
    class="icon-container {!main ? "xs:hidden" : ""}"
    href="/newsletter"
>
    <span class="integration-name">{name}</span>
    <slot />
</a>