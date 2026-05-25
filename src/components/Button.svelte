<!-- Button.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths'; // <-- hent base path

	let { text = 'Gå til side', href = '/' }: { text?: string; href?: string } = $props();

	const handleClick = async () => {
		await goto(`${base}${href}`);
	};
</script>

<button onclick={handleClick} class="nav-button">
	{text}
</button>

<style>
	.nav-button {
		min-height: 3rem;
		padding: 0.72rem 1.45rem;
		border: 1px solid rgba(72, 183, 255, 0.42);
		border-radius: 0.8rem;
		background: linear-gradient(135deg, #1583ec 0%, #0864c8 100%);
		color: #ffffff;
		cursor: pointer;
		font-size: 0.98rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		box-shadow: 0 0.5rem 1.1rem rgba(2, 52, 115, 0.28);
		transition:
			background 0.2s ease,
			box-shadow 0.2s ease,
			transform 0.2s ease;
	}

	.nav-button:hover {
		background: linear-gradient(135deg, #2894f5 0%, #0870da 100%);
		box-shadow: 0 0.75rem 1.4rem rgba(2, 52, 115, 0.42);
		transform: translateY(-1px);
	}

	.nav-button:active {
		transform: translateY(0);
	}

	.nav-button:focus-visible {
		outline: 3px solid rgba(81, 198, 255, 0.55);
		outline-offset: 2px;
	}

	@media (max-width: 480px) {
		.nav-button {
			width: 100%;
		}
	}
</style>
