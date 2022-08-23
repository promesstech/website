<script>
    import { page } from "$app/stores";
    let { organizationId } = $page.params;

    const files = [
        {
            name: "avatar-2.png",
            extension: "png",
            url: "/images/assets/avatar-2.png",
            date: Date.now(),
        },
    ];

    const folders = [
        "Logos",
        // "Icons",
        // "Videos",
        // "Contracts",
        // "Invoices",
        // "Receipts",
        // "Payments",
    ];
</script>
<div class="w-full flex flex-col py-16">
    <div class="flex flex-col px-24">
        <span class="text-xl font-black mb-8">Recent</span>
        <div class="flex flex-row mb-16">
            {#each files as file}
                <div class="relative rounded-md border border-solid border-secondary w-36 mr-8">
                    <img
                        src={file.url}
                        alt={file.name}
                        class="rounded-md"
                    />
                    <div class="absolute flex flex-row items-center justify-center w-full bottom-0 bg-very-light-secondary border border-solid border-secondary h-8 rounded-b-md">
                        <img
                            src="/icons/dashboard/files/{file.extension}.svg"
                            alt={file.extension}
                            class="w-5 h-5"
                        />
                        <span class="font-bold ml-1 text-sm">{file.name}</span>
                    </div>
                </div>
            {/each}
        </div>
        <span class="text-xl font-black mb-8">Folders</span>
        <div class="grid grid-cols-5">
            {#each folders as folder}
                <a
                    class="flex flex-row p-2 w-48 mb-8 rounded-md border border-solid border-secondary"
                    href="/dashboard/organization/{organizationId}/files/{folder}"
                >
                    <img src="/icons/dashboard/files/folder.svg" alt="folder" />
                    <span class="ml-2 text-white font-bold">{folder}</span>
                </a>
            {/each}
        </div>
    </div>
</div>