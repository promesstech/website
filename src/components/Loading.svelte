<script lang="ts">
    export let loading: boolean;
</script>

{#if loading}
    <div class="flex flex-col items-center justify-center w-full h-full">
        <div class="w-1xx h-1xx rotate-45">
            <svg width="100" height="100" viewBox="0 0 300 300">
                <defs>
                  <linearGradient id="gradient-fill" gradientUnits="userSpaceOnUse" x1="0" y1="300" x2="300" y2="0">
                    <stop offset="0%">
                      <animate attributeName="stop-color" values="#3CFFFF;#3F3CFF;#3CFFFF" dur="5s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%">
                      <animate attributeName="stop-color" values="#7331FF;#400E73;#7331FF" dur="8s" repeatCount="indefinite" />
                    </stop>
                  </linearGradient>
                  <clipPath id="clip">
                    <rect class="square s1" x="0" y="0" rx="12" ry="12" height="90" width="90"></rect>
                    <rect class="square s2" x="100" y="0" rx="12" ry="12" height="90" width="90"></rect>
                    <rect class="square s3" x="200" y="0" rx="12" ry="12" height="90" width="90"></rect>
                    <rect class="square s4" x="0" y="100" rx="12" ry="12" height="90" width="90"></rect>
                    <rect class="square s5" x="200" y="100" rx="12" ry="12" height="90" width="90"></rect>
                    <rect class="square s6" x="0" y="200" rx="12" ry="12" height="90" width="90"></rect>
                    <rect class="square s7" x="100" y="200" rx="12" ry="12" height="90" width="90"></rect>
                  </clipPath>
                </defs>
                <rect class="gradient" clip-path="url('#clip')" height="300" width="300"></rect>
            </svg>
        </div>
    </div>
{:else}
    <slot />
{/if}

<style>
    .gradient {
        animation-iteration-count: infinite;
        animation-duration: 1s;
        fill: url('#gradient-fill');
    }
    .square {
        animation-iteration-count: infinite;
        animation-duration: 2s;
        transition-timing-function: ease-in-out;
    }

    .s1 {
        animation-name: slide-1;
    }

    .s2 {
        animation-name: slide-2;
    }

    .s3 {
        animation-name: slide-3;
    }

    .s4 {
        animation-name: slide-4;
    }

    .s5 {
        animation-name: slide-5;
    }

    .s6 {
        animation-name: slide-6;
    }

    .s7 {
        animation-name: slide-7;
    }

    @keyframes slide-1 {
        37.5% {
            transform: translateX(0px);
        }
        50% {
            transform: translateX(100px);
        }
        100% {
            transform: translateX(100px);
        }
    }

    @keyframes slide-2 {
        25% {
            transform: translateX(0px);
        }
        37.5% {
            transform: translateX(100px);
        }
        100% {
            transform: translateX(100px);
        }
    }

    @keyframes slide-3 {
        12.5% {
            transform: translateY(0px);
        }
        25% {
            transform: translateY(100px);
        }
        100% {
            transform: translateY(100px);
        }
    }

    @keyframes slide-4 {
        50% {
            transform: translateY(0px);
        }
        62.5% {
            transform: translateY(-100px);
        }
        100% {
            transform: translateY(-100px);
        }
    }

    @keyframes slide-5 {
        12.5% {
            transform: translate(-100px, 0px);
        }
        87.5% {
            transform: translate(-100px, 0px);
        }
        100% {
            transform: translate(-100px, 100px);
        }
    }

    @keyframes slide-6 {
        62.5% {
            transform: translateY(0px);
        }
        75% {
            transform: translateY(-100px);
        }
        100% {
            transform: translateY(-100px);
        }
    }

    @keyframes slide-7 {
        75%  {
            transform: translateX(0px);
        }
        87.5% {
            transform: translateX(-100px);
        }
        100% {
            transform: translateX(-100px);
        }
    }
</style>