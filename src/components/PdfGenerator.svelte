<script lang="ts">
	import { get } from 'svelte/store';
	import { schools, education, work, vulentarely, other } from '../stores/cards';
	import { name, phone, email, linkedIn, webpage } from '../stores/contactInfo';
	import type { Card } from '../types/Card';
	import jsPDF from 'jspdf';

	const generatePDF = (): void => {
		const doc = new jsPDF({ unit: 'mm', format: 'a4' });
		let y = 20;

		// --- Kontaktinformasjon ---
		const contactFields = [
			['Navn', get(name)],
			['Telefon', get(phone)],
			['E-post', get(email)],
			['LinkedIn', get(linkedIn)],
			['Webside', get(webpage)]
		].filter(([_, value]): value is string => value.trim().length > 0);

		if (contactFields.length) {
			doc.setFont('helvetica', 'bold');
			doc.setFontSize(18);
			doc.text('Kontaktinformasjon', 105, y, { align: 'center' });
			y += 10;

			doc.setFont('helvetica', 'normal');
			doc.setFontSize(12);
			contactFields.forEach(([label, value]) => {
				doc.text(`${label}: ${value}`, 105, y, { align: 'center' });
				y += 6;
			});

			y += 8;
		}

		const addSection = (title: string, list: Card[]) => {
			if (!list.length) return;

			doc.setFont('helvetica', 'bold');
			doc.setFontSize(16);
			doc.text(title, 10, y);
			y += 8;

			const pageWidth = 190;
			const mainTitleWidth = 46;
			const valueX = 12 + mainTitleWidth + 3;

			list.forEach((card) => {
				// --- Hovedfelt ---
				if (card.mainValue.trim().length) {
					doc.setFont('helvetica', 'bold');
					doc.text(`${card.mainTitle}:`, 12, y);
					doc.setFont('helvetica', 'normal');
					const mainValueLines = doc.splitTextToSize(card.mainValue, pageWidth - valueX - 10);
					mainValueLines.forEach((line, i) => doc.text(line, valueX, y + i * 6));
					y += mainValueLines.length * 6;
				}

				// --- Sekundært felt ---
				if (card.secondaryValue.trim().length) {
					doc.setFont('helvetica', 'bold');
					doc.text(`${card.secondaryTitle}:`, 12, y);
					doc.setFont('helvetica', 'normal');
					const secValueLines = doc.splitTextToSize(card.secondaryValue, pageWidth - valueX - 10);
					secValueLines.forEach((line, i) => doc.text(line, valueX, y + i * 6));
					y += secValueLines.length * 6;
				}

				// --- Remarks (multi-linje med avsnitt) ---
				if (card.remarks.trim().length) {
					const paragraphs = card.remarks.split('\n');
					doc.setFont('helvetica', 'italic');
					paragraphs.forEach((paragraph) => {
						const lines = doc.splitTextToSize(paragraph, pageWidth - 12);
						lines.forEach((line) => {
							doc.text(line, 12, y);
							y += 6;
						});
					});
					doc.setFont('helvetica', 'normal');
				}

				// --- Fra–Til nederst ---
				if (card.from.trim().length || card.to.trim().length) {
					const fromValue = card.from.trim() || '-';
					const toValue = card.to.trim() || '-';
					const periodLine = `Periode: ${fromValue} – ${toValue}`;
					doc.setFont('helvetica', 'italic');
					doc.text(periodLine, 12, y);
					doc.setFont('helvetica', 'normal');
					y += 6;
				}

				y += 4; // mellom kort
				if (y > 280) {
					doc.addPage();
					y = 20;
				}
			});

			y += 6; // mellom seksjoner
		};

		// Legg til seksjoner
		addSection('Arbeid', get(work));
		addSection('Utdanning', get(education));
		addSection('Skoler', get(schools));
		addSection('Frivillig arbeid', get(vulentarely));
		addSection('Annet', get(other));

		doc.save('CV.pdf');
	};
</script>

<button class="pdf-button" on:click={generatePDF}>Generer PDF</button>

<style lang="scss">
	.pdf-button {
		padding: 0.7rem 1.4rem;
		background-color: #f8f8f8;
		color: #0b1f3a;
		border: 1px solid #ccc;
		border-radius: 10px;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.pdf-button:hover {
		background-color: #e2e2e2;
		color: #0b1f3a;
		transform: scale(1.02);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
	}
</style>
