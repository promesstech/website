<script>
    import { page } from "$app/stores";
    import "../../../../../styles/dashboard/files.css";

    let { organizationId } = $page.params;
</script>

<div class="flex flex-row w-full h-full">
    <slot />
    <div class="h-full w-3xx flex flex-col border border-solid border-dark-primary border-y-0 border-r-0 p-8">
        <span class="sidebar-title">Media</span>
        <a class="sidebar-link" href="/dashboard/organization/{organizationId}/files/logos">Logos</a>
        <a class="sidebar-link" href="/dashboard/organization/{organizationId}/files/icons">Icons</a>
        <a class="sidebar-link" href="/dashboard/organization/{organizationId}/files/videos">Videos</a>
        <span class="sidebar-title">Documents</span>
        <a class="sidebar-link" href="/dashboard/organization/{organizationId}/files/contracts">Contracts</a>
        <a class="sidebar-link" href="/dashboard/organization/{organizationId}/files/invoices">Invoices</a>
        <a class="sidebar-link" href="/dashboard/organization/{organizationId}/files/receipts">Receipts</a>
        <a class="sidebar-link" href="/dashboard/organization/{organizationId}/files/payments">Payments</a>
    </div>
</div>