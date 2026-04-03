<script>
	import Button from '../../components/Button.svelte';
	import ConctactInfo from '../../components/ConctactInfo.svelte';
	import InputCardList from '../../components/InputCardList.svelte';
	import ListToggler from '../../components/ListToggler.svelte';
	import PdfGenerator from '../../components/PdfGenerator.svelte';
	import PdfPreview from '../../components/PdfPreview.svelte';
	import { education, schools, vulentarely, work } from '../../stores/cards';
</script>

<main>
	<div class="vertical-container">
		<img src="/cv-bygger-v3.png" alt="cv-bygger Logo" class="logo-img" />
		<Button text="Tilbake til main" />
		<p class="logo-text">Lag din nye cv under:</p>
		<div class="horizontal-container">
			<PdfGenerator />
			<PdfPreview />
		</div>
		<div class="vertical-container">
			<ConctactInfo />
			<ListToggler />
		</div>
	</div>
</main>

<style lang="scss">
	main {
		min-height: 50vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #0b1f3a; /* navy blå */
	}
	.vertical-container {
		display: flex;
		flex-direction: column; // stable elementene vertikalt
		gap: 1rem;
		padding: 1rem 2rem;
		border-radius: 12px;
		align-items: center; // sentrerer innhold horisontalt
	}

	.horizontal-container {
		display: flex;
		flex-direction: row; // elementene side-ved-side
		gap: 1rem;
		padding: 1rem 2rem;
		border-radius: 12px;
		justify-content: center; // sentrerer horisontalt
		align-items: center; // sentrerer vertikalt
	}

	.logo-text {
		color: white; /* gjør teksten hvit */
		margin-top: 1rem; /* legger litt plass mellom bildet og teksten */
		font-size: 1.2rem;
	}
	.logo-img {
		width: 100px; /* juster størrelse på logo */
		height: auto;
		display: block; /* gjør at bildet oppfører seg som blokk-element */
		margin: 0 auto; /* sentrerer bildet horisontalt */
	}
</style>
