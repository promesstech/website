<script>
    import Logo from "../Logo.svelte";
    // import data from "../../utils/data.ts";
    import "./footer.css";
</script>

<div class="footer-container xl:max-w-xs 2xs:items-center 2xs:text-center 2xs:w-max 2xs:pr-0 pr-4">
    <Logo />
    <p class="text-secondary my-4 2xs:text-sm xs:px-16">Mission control for your SaaS business</p>
    <a
        class="flex flex-row items-center"
        href="mailto:"
    >
        <img
            src="/icons/footer/email.svg"
            alt="email"
            class="w-5"
        />
        <span class="ml-2 font-bold">contact@promess.tech</span>
    </a>
    <span class="mt-4 font-bold text-secondary">Dev 0.1.0</span>
</div>