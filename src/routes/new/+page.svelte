<script lang="ts">
	import Button from '../../components/Button.svelte';
	import ConctactInfo from '../../components/ConctactInfo.svelte';
	import InputCardList from '../../components/InputCardList.svelte';
	import ListToggler from '../../components/ListToggler.svelte';
	import PdfGenerator from '../../components/PdfGenerator.svelte';
	import PdfPreview from '../../components/PdfPreview.svelte';
	import { education, schools, vulentarely, work } from '../../stores/cards';
	import { base } from '$app/paths';
</script>

<main>
	<div class="vertical-container">
		<img src={`${base}/cv-bygger-v3.png`} alt="cv-bygger Logo" class="logo-img" />
		<Button text="Tilbake til main" />
		<p class="logo-text">Lag din nye CV under:</p>
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
		background: #0b1f3a;
	}
	.vertical-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem 2rem;
		border-radius: 12px;
		align-items: center;
	}

	.horizontal-container {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem 2rem;
		border-radius: 12px;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.logo-text {
		color: white;
		margin-top: 1rem;
		font-size: 1.2rem;
		text-align: center;
	}

	.logo-img {
		width: 100px;
		height: auto;
		display: block;
		margin: 0 auto;
	}
</style>
