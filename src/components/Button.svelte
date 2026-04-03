<!-- Button.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths'; // <-- hent base path

	// Hent props med $props()
	const props = $props();
	const text: string = props.text ?? 'Gå til side';
	const href: string = props.href ?? '/';

	const handleClick = async () => {
		await goto(`${base}${href}`);
	};
</script>

<button on:click={handleClick} class="nav-button">
	{text}
</button>

<style>
	.nav-button {
		background-color: white;
		color: #0b1f3a;
		padding: 0.6rem 1.2rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1rem;
		transition: background 0.3s;
	}

	.nav-button:hover {
		background-color: #b2b5b8;
	}
</style>
