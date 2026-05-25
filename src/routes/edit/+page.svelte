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
		<div class="workspace-header">
			<img src={`${base}/cv-bygger-v3.png`} alt="cv-bygger Logo" class="logo-img" />
			<Button text="Tilbake til main" />
		</div>

		<!-- Only show PdfToStores if PDF hasn't been uploaded yet -->
		{#if !$pdfUploaded}
			<section class="upload-panel">
				<p class="logo-text">Til info, kun CV-er generert av denne nettsiden vil fungere</p>
				<PdfToStores uploadedStore={pdfUploaded} />
				<p class="privacy-note">
					PDF-en leses lokalt i nettleseren og lastes ikke opp av appen.
					<a href={`${base}/personvern`}>Les om personvern</a>.
				</p>
			</section>
		{/if}

		<!-- Show ListToggler only if any store has items -->
		{#if $pdfUploaded}
			<section class="action-panel">
				<div class="horizontal-container">
					<PdfGenerator />
					<PdfPreview />
				</div>
				<p class="privacy-note">
					Opplysningene behandles lokalt i nettleseren. Nedlastet PDF inneholder CV-data som gjør at
					den kan importeres her igjen.
					<a href={`${base}/personvern`}>Les om personvern</a>.
				</p>
			</section>
			<section class="editor-section">
				<ConctactInfo />
			</section>
			<section class="editor-section">
				<ListToggler />
			</section>
		{/if}
	</div>
</main>

<style lang="scss">
	main {
		width: 100%;
		min-height: 100svh;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: clamp(1rem, 3vw, 2.25rem) clamp(1rem, 3vw, 2.25rem) clamp(5.75rem, 9vw, 6.5rem);
	}

	.logo-text {
		max-width: 32rem;
		color: #d7e7fb;
		margin: 0;
		font-size: clamp(0.96rem, 2.5vw, 1.05rem);
		font-weight: 500;
		line-height: 1.6;
		text-align: center;
	}

	main > .vertical-container {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		width: min(100%, 64rem);
		padding: clamp(1rem, 4vw, 2.25rem);
		border: 1px solid rgba(107, 172, 237, 0.16);
		border-radius: 1.5rem;
		align-items: center;
		background: rgba(6, 21, 42, 0.36);
		box-shadow: 0 1.25rem 3.5rem rgba(0, 7, 22, 0.24);
	}

	.workspace-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.15rem;
		width: 100%;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(107, 172, 237, 0.16);
	}

	.horizontal-container {
		display: flex;
		gap: 0.8rem;
		width: 100%;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.action-panel,
	.editor-section,
	.upload-panel {
		width: 100%;
	}

	.action-panel {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: center;
		padding: 0.8rem clamp(0.85rem, 3vw, 1.25rem);
		border: 1px solid rgba(107, 172, 237, 0.16);
		border-radius: 0.95rem;
		background: rgba(6, 21, 42, 0.34);
	}

	.privacy-note {
		max-width: 42rem;
		color: #c7d9ef;
		font-size: 0.86rem;
		line-height: 1.55;
		text-align: center;
		margin: 0;
	}

	.privacy-note a {
		color: #8cd5ff;
		text-underline-offset: 0.2em;
	}

	.privacy-note a:hover {
		color: #c6ecff;
	}

	.editor-section,
	.upload-panel {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.7rem;
	}

	.logo-img {
		width: clamp(8.5rem, 20vw, 11rem);
		height: auto;
		display: block;
		border-radius: 0.7rem;
		box-shadow: 0 0.7rem 1.8rem rgba(0, 8, 24, 0.35);
	}

	@media (max-width: 560px) {
		.workspace-header {
			flex-direction: column;
			align-items: stretch;
			text-align: center;
		}

		.logo-img {
			margin: 0 auto;
		}

		.action-panel {
			flex-direction: column;
			align-items: stretch;
		}

		.horizontal-container {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
