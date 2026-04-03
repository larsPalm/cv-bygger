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
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #0b1f3a;
		padding: 2rem;
	}

	.container {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		max-width: 500px;
		width: 100%;
	}

	.logo-img {
		width: 80%;
		max-width: 400px;
		height: auto;
		border-radius: 12px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	}

	.logo-text {
		color: #fff;
		font-size: 2rem;
		margin: 0;
	}

	.subtext {
		color: #ddd;
		font-size: 1.2rem;
		margin: 0;
	}

	.button-group {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		margin-top: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
