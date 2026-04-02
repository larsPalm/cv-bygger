<script lang="ts">
	import { writable } from 'svelte/store';
	import { schools, education, work, vulentarely, other } from '../stores/cards';
	import { name, phone, email, linkedIn, webpage } from '../stores/contactInfo';
	import type { Card } from '../types/Card';
	import { PDFDocument } from 'pdf-lib';

	// Bindable prop (runes mode)
	let { uploadedStore } = $props();

	const uploadError = writable<string | null>(null);
	const uploading = writable(false);

	const handlePDFUpload = async (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) return;

		const file = input.files[0];
		uploadError.set(null);
		uploading.set(true);

		try {
			const arrayBuffer = await file.arrayBuffer();
			const pdfDoc = await PDFDocument.load(arrayBuffer);

			// NB: pdf-lib gir normalt ikke tekstuttrekk
			// derfor fallback til tom streng hvis ikke mulig
			let fullText = '';

			for (const page of pdfDoc.getPages()) {
				const text = (page as any).getTextContent?.();
				if (text) fullText += text + '\n';
			}

			parsePDF(fullText || '');

			// signaliser til parent at PDF er lastet
			uploadedStore = true;
		} catch (err) {
			uploadError.set('Kunne ikke lese PDF: ' + err);
			console.error(err);
		} finally {
			uploading.set(false);
		}
	};

	const parsePDF = (text: string) => {
		// --- Kontaktinfo ---
		const contactMap: Record<string, any> = {
			Navn: name,
			Telefon: phone,
			'E-post': email,
			LinkedIn: linkedIn,
			Webside: webpage
		};

		Object.keys(contactMap).forEach((label) => {
			const regex = new RegExp(`${label}:\\s*(.+)`, 'i');
			const match = text.match(regex);
			contactMap[label].set(match ? match[1].trim() : '');
		});

		// --- Seksjoner ---
		const sectionNames = [
			{ name: 'Arbeid', store: work },
			{ name: 'Utdanning', store: education },
			{ name: 'Skoler', store: schools },
			{ name: 'Frivillig arbeid', store: vulentarely },
			{ name: 'Annet', store: other }
		];

		sectionNames.forEach(({ name: secName, store }) => {
			const secRegex = new RegExp(
				`${secName}\\s*([\\s\\S]*?)(?=(Arbeid|Utdanning|Skoler|Frivillig arbeid|Annet|$))`,
				'i'
			);

			const secMatch = text.match(secRegex);

			if (secMatch) {
				store.set(parseCards(secMatch[1].trim()));
			} else {
				store.set([]); // overskriv gamle data
			}
		});
	};

	const parseCards = (text: string): Card[] => {
		const lines = text
			.split('\n')
			.map((l) => l.trim())
			.filter(Boolean);

		const cards: Card[] = [];
		let currentCard: Partial<Card> = {};

		const flushCard = () => {
			if (currentCard.mainTitle && currentCard.mainValue) {
				cards.push({
					id: crypto.randomUUID(),
					mainTitle: currentCard.mainTitle || '',
					mainValue: currentCard.mainValue || '',
					secondaryTitle: currentCard.secondaryTitle || '',
					secondaryValue: currentCard.secondaryValue || '',
					from: currentCard.from || '',
					to: currentCard.to || '',
					remarks: currentCard.remarks || ''
				});

				currentCard = {};
			}
		};

		lines.forEach((line) => {
			if (/Periode:/i.test(line)) {
				const match = line.match(/Periode:\s*(.+?)\s*–\s*(.+)/);

				if (match) {
					currentCard.from = match[1].trim();
					currentCard.to = match[2].trim();
				}

				flushCard();
			} else if (/^\w+:/.test(line)) {
				const [title, ...rest] = line.split(':');
				const value = rest.join(':').trim();

				if (!currentCard.mainTitle) {
					currentCard.mainTitle = title;
					currentCard.mainValue = value;
				} else if (!currentCard.secondaryTitle) {
					currentCard.secondaryTitle = title;
					currentCard.secondaryValue = value;
				} else {
					currentCard.remarks = (currentCard.remarks ? currentCard.remarks + '\n' : '') + line;
				}
			} else {
				currentCard.remarks = (currentCard.remarks ? currentCard.remarks + '\n' : '') + line;
			}
		});

		flushCard();
		return cards;
	};
</script>

<div class="upload-container">
	{#if !uploadedStore}
		<label class="upload-label">
			<input type="file" accept="application/pdf" on:change={handlePDFUpload} />
			<span class="upload-btn">Last opp PDF</span>
		</label>
	{/if}

	{#if $uploading}
		<p class="upload-status">Laster opp...</p>
	{/if}

	{#if $uploadError}
		<p class="upload-error">{$uploadError}</p>
	{/if}
</div>

<style lang="scss">
	.upload-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin: 1rem 0;
		font-family: 'Arial', sans-serif;
	}

	.upload-label {
		position: relative;
		cursor: pointer;
	}

	input[type='file'] {
		display: none;
	}

	.upload-btn {
		background-color: white;
		color: rgb(33, 11, 81);
		padding: 0.6rem 1.2rem;
		border-radius: 8px;
		font-weight: 600;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	.upload-btn:hover {
		background-color: rgb(221, 218, 218);
		transform: scale(1.02);
	}

	.upload-status {
		margin-top: 0.5rem;
		color: #0b1f3a;
		font-weight: 500;
	}

	.upload-error {
		margin-top: 0.5rem;
		color: #d9534f;
		font-weight: 500;
	}
</style>
