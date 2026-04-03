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
				} else {
					console.log('Keywords er ikke en PDFString:', keywordsObj);
				}
			}

			console.log('Keywords:', keywords);

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
	input[type='file'] {
		padding: 0.6rem 1rem;
		border-radius: 6px;
		border: 1px solid #ccc;
		background: #f8f8f8;
		color: #0b1f3a;
		cursor: pointer;
	}
	input[type='file']:hover {
		background: #e2e2e2;
	}
	label {
		font-weight: 500;
		margin-bottom: 0.3rem;
		display: inline-block;
	}
</style>
