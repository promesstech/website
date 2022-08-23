<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let value = '';
	export let minRows = 1;
	export let maxRows: number = 0;

    export let placeholder: string = "";
    export let style: string = "";
	
	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;

	const dispatch = createEventDispatcher();
</script>

<div class="container">
	<pre
		aria-hidden="true"
		style="min-height: {minHeight}; max-height: {maxHeight}"
        class="my-1"
	>{value + "\n"}</pre>

	<textarea
        bind:value
        class="{style}"
        {placeholder}
        on:keypress={e => {
            if (e.key === "Enter") {
				e.preventDefault();
				
				if (e.shiftKey) {
					if (!e.target) return;
					value += '\n';
				} else {
					dispatch("submit");
				};
            };
        }}
		on:focus={() => dispatch("focus")}
    ></textarea>	
</div>

<style>
	.container {
		position: relative;
        min-height: 32px;
	}
	
	pre, textarea {
		font-family: inherit;
		box-sizing: border-box;
		line-height: 1.2;
		overflow: hidden;
	}
	
	textarea {
		position: absolute;
		width: 100%;
		top: 0;
		resize: none;
	}
</style>