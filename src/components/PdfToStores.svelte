<script lang="ts">
	import { name, phone, email, linkedIn, webpage } from '../stores/contactInfo';
	import { schools, education, work, vulentarely, other } from '../stores/cards';
	import type { Writable } from 'svelte/store';
	import type { Card } from '../types/Card';
	import { PDFDocument, PDFName, PDFString } from 'pdf-lib';

	const { uploadedStore } = $props<{ uploadedStore: Writable<boolean> }>();

	const handleFile = async (event: Event) => {
		const input = event.currentTarget as HTMLInputElement;
		if (!input.files?.length) return;
		const file = input.files[0];

		try {
			const arrayBuffer = await file.arrayBuffer();
			const pdfDoc = await PDFDocument.load(arrayBuffer);

			// Print pdfDoc og context keys
			console.log(`${Object.keys(pdfDoc)}`);
			console.log(`${Object.keys(pdfDoc.context)}`);

			// Hent trailerInfo
			const trailerInfo = (pdfDoc as any).context?.trailerInfo;
			console.log(`${Object.keys(trailerInfo)}`);
			console.log(`${trailerInfo.Info}`);

			let keywords: string | undefined;

			if (trailerInfo?.Info) {
				const infoDict = (pdfDoc as any).context.lookup(trailerInfo.Info); // PDFDict
				const keywordsObj = infoDict.get(PDFName.of('Keywords'));
				if (keywordsObj instanceof PDFString) {
					keywords = keywordsObj.decodeText();
				}
			}

			//console.log('Keywords:', keywords);

			if (!keywords) {
				uploadedStore.set(false);
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
		} catch (err) {
			console.error(err);
			uploadedStore.set(false);
		}

		setTimeout(() => (input.value = ''), 0);
	};
</script>

<div>
	<label for="pdf-upload">Last opp PDF for import:</label>
	<input id="pdf-upload" type="file" accept="application/pdf" on:change={handleFile} />
</div>

<style>
	div {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		max-width: 340px;
	}

	label {
		font-weight: 600;
		font-size: 0.9rem;
		color: #0b1f3a;
		letter-spacing: 0.02em;
	}

	input[type='file'] {
		padding: 0.65rem 0.85rem;
		border-radius: 8px;
		border: 1px solid #d6d6d6;
		background: #fafafa;
		color: #0b1f3a;
		cursor: pointer;
		font-size: 0.85rem;
		transition: all 0.15s ease;
	}

	input[type='file']::file-selector-button {
		margin-right: 0.6rem;
		padding: 0.45rem 0.7rem;
		border-radius: 6px;
		border: none;
		background: #0b1f3a;
		color: white;
		font-size: 0.8rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	input[type='file']::file-selector-button:hover {
		background: #16335e;
	}

	input[type='file']:hover {
		background: #f3f3f3;
		border-color: #c9c9c9;
	}

	input[type='file']:focus {
		outline: none;
		border-color: #4a7cff;
		box-shadow: 0 0 0 2px rgba(74, 124, 255, 0.15);
	}
</style>
