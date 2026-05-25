<script lang="ts">
	import { name, phone, email, linkedIn, webpage } from '../stores/contactInfo';
	import { schools, education, work, vulentarely, other } from '../stores/cards';
	import type { Writable } from 'svelte/store';
	import type { Card } from '../types/Card';
	import { PDFDocument, PDFName, PDFString } from 'pdf-lib';

	const { uploadedStore } = $props<{ uploadedStore: Writable<boolean> }>();
	let importError = $state('');

	const handleFile = async (event: Event) => {
		const input = event.currentTarget as HTMLInputElement;
		if (!input.files?.length) return;
		const file = input.files[0];
		importError = '';

		try {
			const arrayBuffer = await file.arrayBuffer();
			const pdfDoc = await PDFDocument.load(arrayBuffer);

			// Hent trailerInfo
			const trailerInfo = (pdfDoc as any).context?.trailerInfo;

			let keywords: string | undefined;

			if (trailerInfo?.Info) {
				const infoDict = (pdfDoc as any).context.lookup(trailerInfo.Info); // PDFDict
				const keywordsObj = infoDict.get(PDFName.of('Keywords'));
				if (keywordsObj instanceof PDFString) {
					keywords = keywordsObj.decodeText();
				}
			}

			if (!keywords) {
				uploadedStore.set(false);
				importError = 'PDF-en inneholder ikke CV-data som kan importeres her.';
				return;
			}

			const jsonData = JSON.parse(keywords);

			// Oppdater contact stores
			const contact = jsonData.contact ?? {};
			name.set(contact.name ?? '');
			phone.set(contact.phone ?? '');
			email.set(contact.email ?? '');
			linkedIn.set(contact.linkedIn ?? '');
			webpage.set(contact.webpage ?? '');

			const loadCards = (store: any, key: string) => {
				if (Array.isArray(jsonData[key])) store.set(jsonData[key] as Card[]);
			};

			loadCards(work, 'work');
			loadCards(education, 'education');
			loadCards(schools, 'schools');
			loadCards(vulentarely, 'vulentarely');
			loadCards(other, 'other');

			uploadedStore.set(true);
		} catch {
			uploadedStore.set(false);
			importError = 'PDF-en kunne ikke leses. Kontroller filen og prøv igjen.';
		} finally {
			setTimeout(() => (input.value = ''), 0);
		}
	};
</script>

<div>
	<label for="pdf-upload">Last opp PDF for import:</label>
	<input id="pdf-upload" type="file" accept="application/pdf" onchange={handleFile} />
	{#if importError}
		<p class="error-message" role="alert">{importError}</p>
	{/if}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		width: min(100%, 28rem);
		padding: clamp(1rem, 3vw, 1.4rem);
		border: 1px dashed #b6cfe9;
		border-radius: 1rem;
		background: #ffffff;
		box-shadow: 0 0.65rem 1.8rem rgba(2, 18, 39, 0.14);
	}

	label {
		font-weight: 600;
		font-size: 0.94rem;
		color: #0b1f3a;
		letter-spacing: 0.01em;
	}

	input[type='file'] {
		width: 100%;
		padding: 0.55rem;
		border-radius: 0.7rem;
		border: 1px solid #d4e1ef;
		background: #f7faff;
		color: #0b1f3a;
		cursor: pointer;
		font-size: 0.88rem;
		transition:
			background 0.15s ease,
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	input[type='file']::file-selector-button {
		margin-right: 0.7rem;
		padding: 0.55rem 0.8rem;
		border-radius: 0.52rem;
		border: none;
		background: #075fc0;
		color: white;
		font-size: 0.84rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	input[type='file']::file-selector-button:hover {
		background: #084d96;
	}

	input[type='file']:hover {
		background: #ffffff;
		border-color: #a8c9eb;
	}

	input[type='file']:focus-visible {
		outline: none;
		border-color: #1282ed;
		box-shadow: 0 0 0 3px rgba(18, 130, 237, 0.13);
	}

	.error-message {
		margin: 0.25rem 0 0;
		padding: 0.65rem 0.75rem;
		border: 1px solid #f3b7bf;
		border-radius: 0.6rem;
		background: #fff1f2;
		color: #a31930;
		font-size: 0.88rem;
		line-height: 1.45;
	}
</style>
