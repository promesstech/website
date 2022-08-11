<script lang="ts">
    import { page } from "$app/stores";
    import "../../../../../styles/dashboard/files.css";

    let { organizationId } = $page.params;

    const handleFileUpload = (files: FileList) => {
        // @ts-ignore
        for (const file of files) {
            console.log(file.name);
        };
    };

    let files: FileList;
    $: files;

    $: if(files?.length > 0) handleFileUpload(files);
</script>

<div class="flex flex-row w-full h-full">
    <div class="relative w-full">
        <slot />
        <input
            type="file"
            bind:files={files}
            class="hidden"
            id="file-uploader"
            accept="image/*"
            multiple
        />
        <div
            class="absolute flex items-center justify-center rounded-full w-12 h-12 bg-accent right-8 bottom-8 text-3xl font-bold hover:cursor-pointer"
            on:click={() => {
                const fileUploader = document.getElementById("file-uploader");
                if (!fileUploader) return;
                
                fileUploader.click();
            }}
        >
            +
        </div>
    </div>
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