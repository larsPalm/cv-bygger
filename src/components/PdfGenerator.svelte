<script lang="ts">
	import { get } from 'svelte/store';
	import { schools, education, work, vulentarely, other } from '../stores/cards';
	import { name, phone, email, linkedIn, webpage } from '../stores/contactInfo';
	import type { Card } from '../types/Card';
	import jsPDF from 'jspdf';

	// Helper: sjekk at verdi ikke er tom eller whitespace
	const notEmpty = (value: string): boolean => value?.trim().length > 0;

	const generatePDF = (): void => {
		const doc = new jsPDF();
		let y = 10;

		// --- Kontaktinformasjon ---
		const contactFields = [
			['Navn', get(name)],
			['Telefon', get(phone)],
			['E-post', get(email)],
			['LinkedIn', get(linkedIn)],
			['Webside', get(webpage)]
		].filter(([_, value]) => notEmpty(value));

		if (contactFields.length > 0) {
			doc.setFontSize(16);
			doc.text('Kontaktinformasjon', 10, y);
			y += 8;

			doc.setFontSize(12);
			contactFields.forEach(([label, value]) => {
				doc.text(`${label}: ${value}`, 10, y);
				y += 6;
			});

			y += 6; // mellom kontakt og neste seksjon
		}

		// --- Funksjon for vanlige Card-seksjoner ---
		const addSection = (title: string, list: Card[]) => {
			if (list.length === 0) return;

			doc.setFontSize(16);
			doc.text(title, 10, y);
			y += 8;

			list.forEach((card) => {
				doc.setFontSize(12);

				if (notEmpty(card.mainValue)) {
					doc.text(`${card.mainTitle}: ${card.mainValue}`, 10, y);
					y += 6;
				}

				if (notEmpty(card.secondaryValue)) {
					doc.text(`${card.secondaryTitle}: ${card.secondaryValue}`, 10, y);
					y += 6;
				}

				if (notEmpty(card.from) || notEmpty(card.to)) {
					const period = `${card.from ?? ''}${card.from && card.to ? ' - ' : ''}${card.to ?? ''}`;
					if (notEmpty(period)) {
						doc.text(`Periode: ${period}`, 10, y);
						y += 6;
					}
				}

				if (notEmpty(card.remarks)) {
					const lines = doc.splitTextToSize(card.remarks, 180);
					doc.text(lines, 10, y);
					y += lines.length * 6;
				}

				y += 4; // mellom cards
			});

			y += 6; // mellom seksjoner
		};

		// Legg til Card-seksjoner
		addSection('Skoler', get(schools));
		addSection('Utdanning', get(education));
		addSection('Arbeid', get(work));
		addSection('Frivillig arbeid', get(vulentarely));
		addSection('Annet', get(other));

		doc.save('cv.pdf');
	};
</script>

<button class="pdf-button" on:click={generatePDF}> Generer PDF </button>

<style lang="scss">
	.pdf-button {
		padding: 0.7rem 1.4rem;
		background-color: white;
		color: #0b1f3a;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		font-size: 1rem;
	}

	.pdf-button:hover {
		background-color: rgb(199, 198, 198);
	}
</style>
