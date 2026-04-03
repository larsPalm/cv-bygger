<script lang="ts">
	import Button from '../../components/Button.svelte';
	import ConctactInfo from '../../components/ConctactInfo.svelte';
	import ListToggler from '../../components/ListToggler.svelte';
	import PdfGenerator from '../../components/PdfGenerator.svelte';
	import PdfPreview from '../../components/PdfPreview.svelte';
	import PdfToStores from '../../components/PdfToStores.svelte';
	import { writable } from 'svelte/store';
	import { base } from '$app/paths';

	// Track whether PDF has been uploaded
	const pdfUploaded = writable(false);
</script>

<main>
	<div class="vertical-container">
		<img src={`${base}/cv-bygger-v3.png`} alt="cv-bygger Logo" class="logo-img" />
		<Button text="Tilbake til main" />

		<!-- Only show PdfToStores if PDF hasn't been uploaded yet -->
		{#if !$pdfUploaded}
			<p class="logo-text">Til info, kun CV-er generert av denne nettsiden vil fungere</p>
			<PdfToStores uploadedStore={pdfUploaded} />
		{/if}

		<!-- Show ListToggler only if any store has items -->
		{#if $pdfUploaded}
			<div class="horizontal-container">
				<PdfGenerator />
				<PdfPreview />
			</div>
			<ConctactInfo />
			<ListToggler />
		{/if}
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

	.logo-text {
		color: white;
		margin-top: 1rem;
		font-size: 1.2rem;
		text-align: center;
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

	.logo-img {
		width: 100px;
		height: auto;
		display: block;
		margin: 0 auto;
	}
</style>
