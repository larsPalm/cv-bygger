<script lang="ts">
	import Button from '../components/Button.svelte';
	import { base } from '$app/paths';
</script>

<main>
	<div class="container">
		<img src={`${base}/cv-bygger-v3.png`} alt="cv-bygger Logo" class="logo-img" />
		<h2 class="logo-text">Fra Palmtech</h2>
		<p class="subtext">La oss hjelpe deg lage/oppdatere din CV</p>
		<div class="button-group">
			<Button text="Ny CV" href="/new" />
			<Button text="Endre CV" href="/edit" />
		</div>
	</div>
</main>

<style>
	main {
		min-height: 100svh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: clamp(1.25rem, 5vw, 3.5rem);
	}

	.container {
		position: relative;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.15rem;
		max-width: 58rem;
		width: 100%;
		padding: clamp(1.25rem, 4vw, 2.5rem);
		border: 1px solid rgba(119, 179, 239, 0.18);
		border-radius: 1.5rem;
		background: rgba(7, 22, 44, 0.42);
		box-shadow: 0 1.5rem 4rem rgba(0, 7, 22, 0.34);
		backdrop-filter: blur(10px);
	}

	.logo-img {
		width: min(100%, 44rem);
		height: auto;
		aspect-ratio: 3 / 2;
		object-fit: cover;
		border-radius: 1.1rem;
		box-shadow:
			0 1rem 2.5rem rgba(0, 6, 20, 0.4),
			0 0 0 1px rgba(70, 172, 255, 0.12);
	}

	.logo-text {
		margin: 0.6rem 0 0;
		color: #56c7ff;
		font-size: clamp(0.82rem, 1.4vw, 0.9rem);
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.subtext {
		max-width: 32rem;
		color: #eaf3ff;
		font-size: clamp(1.18rem, 2.8vw, 1.55rem);
		font-weight: 500;
		margin: 0;
	}

	.button-group {
		display: flex;
		gap: 0.85rem;
		margin-top: 0.65rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	@media (max-width: 480px) {
		.button-group {
			width: 100%;
			flex-direction: column;
		}
	}
</style>
