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
		<div class="workspace-header">
			<img src={`${base}/cv-bygger-v3.png`} alt="cv-bygger Logo" class="logo-img" />
			<p class="logo-text">Lag din nye CV under:</p>
			<Button text="Tilbake til main" />
		</div>
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
		<div class="editor-sections">
			<section class="editor-section">
				<ConctactInfo />
			</section>
			<section class="editor-section">
				<ListToggler />
			</section>
		</div>
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

	main > .vertical-container {
		display: flex;
		flex-direction: column;
		gap: 1.35rem;
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

	.editor-sections {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
	}

	.editor-section {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

	.action-panel {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: center;
		width: 100%;
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

	.logo-text {
		color: #d7e7fb;
		flex: 1;
		margin: 0;
		font-size: clamp(1.1rem, 3vw, 1.35rem);
		font-weight: 600;
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
