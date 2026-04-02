<script>
	import Button from '../components/Button.svelte';
</script>

<main>
	<div class="container">
		<img src="/cv-bygger-v3.png" alt="cv-bygger Logo" class="logo-img" />
		<h2 class="logo-text">Fra palmtech</h2>
		<p class="logo-text">La oss hjelpe deg lage/oppdatere din cv</p>
		<Button text="Ny CV" href="/new"></Button>
	</div>
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #0b1f3a; /* navy blå */
	}

	.container {
		text-align: center; /* sørger for at bildet og teksten er sentrert */
	}

	.logo-img {
		width: 400px; /* juster størrelse på logo */
		height: auto;
		display: block; /* gjør at bildet oppfører seg som blokk-element */
		margin: 0 auto; /* sentrerer bildet horisontalt */
	}

	.logo-text {
		color: white; /* gjør teksten hvit */
		margin-top: 1rem; /* legger litt plass mellom bildet og teksten */
		font-size: 1.2rem;
	}
</style>
