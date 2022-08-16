<script lang="ts">
    export let name: string;
</script>
<a
    class="icon-container"
    href="/integrations/{name}"
>
    <span class="integration-name">{name}</span>
    <slot />
</a>