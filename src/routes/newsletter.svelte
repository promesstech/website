<svelte:head>
    <title>Promess | Newsletter</title>
</svelte:head>
<script>
    import { page } from "$app/stores";
    import Logo from "$lib/components/Logo.svelte";
</script>


<div class="flex flex-col h-screen bg-black">
    <div class="flex flex-row w-screen h-full bg-black md:flex-col-reverse overflow-y-scroll">
        <div class="flex flex-col w-1/2 bg-black items-center justify-center md:w-full md:h-auto md:py-8 sm:justify-start sm:pt-16">
            <div class="flex flex-col w-4xx md:px-16 lg:w-3xx md:w-full xs:px-8">
                <!-- Begin Mailchimp Signup Form -->
                <div id="mc_embed_signup">
                    <form action="https://app.us12.list-manage.com/subscribe/post?u=b966927854e7d5e99b916fd0f&amp;id=3c7f98d23a&amp;f_id=00f653e0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                        <div id="mc_embed_signup_scroll">
                            <span class="font-black text-3xl 2xs:text-xl">Signup for the newsletter</span>
                            <div class="mc-field-group">
                                <input
                                    type="email"
                                    name="EMAIL"
                                    class="required email mt-4 border border-solid border-secondary p-3 rounded-md font-bold text-xl bg-inherit md:p-2 md:text-sm w-full"
                                    placeholder="Your email"
                                    value={$page.url.searchParams.get("email") || ""}
                                    id="mce-EMAIL"
                                    required
                                >
                                <span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span>
                            </div>
                            <div
                                id="mce-responses"
                                class="clear foot"
                            >
                                <div class="response" id="mce-error-response" style="display:none"></div>
                                <div class="response" id="mce-success-response" style="display:none"></div>
                            </div>
                            <div    
                                style="position: absolute; left: -5000px;"
                                aria-hidden="true"
                            >
                                <input
                                    type="text"
                                    name="b_b966927854e7d5e99b916fd0f_3c7f98d23a"
                                    tabindex="-1" value=""
                                />
                            </div>
                            <div class="optionalParent">
                                <div class="clear foot">
                                    <input
                                        type="submit"
                                        value="Subscribe"
                                        name="subscribe"
                                        id="mc-embedded-subscribe"
                                        class="button flex items-center justify-center bg-accent rounded-md p-3 mt-4 font-bold text-xl md:p-2 md:text-sm  hover:cursor-pointer w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
                <!--End mc_embed_signup-->
            </div>
        </div>
        <div class="flex flex-col w-1/2 bg-secondary bg-opacity-10 items-center justify-center px-1/12 md:w-full md:p-16 md:items-start md:h-full xs:p-8">
            <span class="text-5xl font-black lg:text-3xl 2xs:text-xl">Promess is still in development</span>
            <span class="text-secondary font-bold mt-8 2xs:text-sm">We will be working hard in the next few months to deliver <span class="italic text-secondary font-black">the</span> project management software for your SaaS business.</span>
            <span class="text-secondary font-bold mt-4 2xs:text-sm"> In the mean time, subscribe to the newsletter and follow us on twitter to receive regular updates about our progress in development.</span>
        </div>
    </div>
    <div class="flex px-8 py-4 bg-secondary bg-opacity-5 flex-row items-end justify-start lg:pt-2 sm:pt-1">
        <Logo />
        <a
            href="https://twitter.com/promesstech"
            class="ml-4 w-8 h-8 mb-1"
        >
            <img
                src="/icons/twitter.svg"
                alt="twitter"
            />
        </a>
    </div>
</div>