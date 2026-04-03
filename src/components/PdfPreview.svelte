<script lang="ts">
	import { writable, get } from 'svelte/store';
	import { schools, education, work, vulentarely, other } from '../stores/cards';
	import { name, phone, email, linkedIn, webpage } from '../stores/contactInfo';
	import type { Card } from '../types/Card';
	import jsPDF from 'jspdf';

	const showModal = writable(false);
	let pdfUrl: string | null = null;

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
				if (card.mainValue.trim().length) {
					doc.setFont('helvetica', 'bold');
					doc.text(`${card.mainTitle}:`, 12, y);
					doc.setFont('helvetica', 'normal');
					const mainValueLines = doc.splitTextToSize(card.mainValue, pageWidth - valueX - 10);
					mainValueLines.forEach((line, i) => doc.text(line, valueX, y + i * 6));
					y += mainValueLines.length * 6;
				}
				if (card.secondaryValue.trim().length) {
					doc.setFont('helvetica', 'bold');
					doc.text(`${card.secondaryTitle}:`, 12, y);
					doc.setFont('helvetica', 'normal');
					const secValueLines = doc.splitTextToSize(card.secondaryValue, pageWidth - valueX - 10);
					secValueLines.forEach((line, i) => doc.text(line, valueX, y + i * 6));
					y += secValueLines.length * 6;
				}
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
				if (card.from.trim().length || card.to.trim().length) {
					const fromValue = card.from.trim() || '-';
					const toValue = card.to.trim() || '-';
					doc.setFont('helvetica', 'italic');
					doc.text(`Periode: ${fromValue} – ${toValue}`, 12, y);
					doc.setFont('helvetica', 'normal');
					y += 6;
				}
				y += 4;
				if (y > 280) {
					doc.addPage();
					y = 20;
				}
			});
			y += 6;
		};

		addSection('Arbeid', get(work));
		addSection('Utdanning', get(education));
		addSection('Skoler', get(schools));
		addSection('Frivillig arbeid', get(vulentarely));
		addSection('Annet', get(other));

		const blob = doc.output('blob');
		pdfUrl = URL.createObjectURL(blob);
		showModal.set(true);
	};
</script>

<button class="pdf-button" on:click={generatePDF}>Forhåndsvis PDF</button>

{#if $showModal}
	<div class="modal-backdrop" on:click={() => showModal.set(false)}>
		<div class="modal-content" on:click|stopPropagation>
			<iframe src={pdfUrl} width="100%" height="600px"></iframe>
			<button class="close-btn" on:click={() => showModal.set(false)}>Lukk</button>
		</div>
	</div>
{/if}

<style lang="scss">
	.pdf-button {
		padding: 0.7rem 1.4rem;
		background-color: white;
		color: #0b1f3a;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 500;
		transition: all 0.2s ease;
	}
	.pdf-button:hover {
		background-color: #d7d8d9;
	}

	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal-content {
		background: #fff;
		padding: 1rem;
		border-radius: 10px;
		width: 80%;
		max-width: 900px;
		position: relative;
	}
	.close-btn {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background-color: #0b1f3a;
		color: #fff;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}
</style>
