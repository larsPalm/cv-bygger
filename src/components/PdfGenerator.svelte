<script lang="ts">
	import { get } from 'svelte/store';
	import { schools, education, work, vulentarely, other } from '../stores/cards';
	import { name, phone, email, linkedIn, webpage } from '../stores/contactInfo';
	import type { Card } from '../types/Card';
	import jsPDF from 'jspdf';

	const generatePDF = (): void => {
		const doc = new jsPDF({ unit: 'mm', format: 'a4' });
		let y = 20;
		const pageWidth = 210;
		const pageHeight = 297;
		const bottomMargin = 15;

		const addFooter = () => {
			const pageCount = doc.getNumberOfPages();
			for (let i = 1; i <= pageCount; i++) {
				doc.setPage(i);
				doc.setFont('helvetica', 'italic');
				doc.setFontSize(10);
				doc.text('generert med cv-bygger fra palmtech', pageWidth / 2, pageHeight - 10, {
					align: 'center'
				});
			}
		};

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
			doc.text('Kontaktinformasjon', pageWidth / 2, y, { align: 'center' });
			y += 10;

			doc.setFont('helvetica', 'normal');
			doc.setFontSize(12);
			contactFields.forEach(([label, value]) => {
				doc.text(`${label}: ${value}`, pageWidth / 2, y, { align: 'center' });
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

			const mainTitleWidth = 46;
			const valueX = 12 + mainTitleWidth + 3;

			list.forEach((card) => {
				const renderField = (title: string, value: string) => {
					if (!value.trim()) return;
					doc.setFont('helvetica', 'bold');
					doc.text(`${title}:`, 12, y);
					doc.setFont('helvetica', 'normal');
					const lines = doc.splitTextToSize(value, pageWidth - valueX - 10);
					lines.forEach((line, i) => doc.text(line, valueX, y + i * 6));
					y += lines.length * 6;
				};

				renderField(card.mainTitle, card.mainValue);
				renderField(card.secondaryTitle, card.secondaryValue);

				if (card.remarks.trim()) {
					const paragraphs = card.remarks.split('\n');
					doc.setFont('helvetica', 'italic');
					paragraphs.forEach((p) => {
						const lines = doc.splitTextToSize(p, pageWidth - 12);
						lines.forEach((line) => {
							doc.text(line, 12, y);
							y += 6;
						});
					});
					doc.setFont('helvetica', 'normal');
				}

				if (card.from.trim() || card.to.trim()) {
					const fromValue = card.from.trim() || '-';
					const toValue = card.to.trim() || '-';
					const periodLine = `Periode: ${fromValue} – ${toValue}`;
					doc.setFont('helvetica', 'italic');
					doc.text(periodLine, 12, y);
					doc.setFont('helvetica', 'normal');
					y += 6;
				}

				y += 4;
				if (y > pageHeight - bottomMargin) {
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

		addFooter();

		const jsonData = {
			contact: {
				name: get(name),
				phone: get(phone),
				email: get(email),
				linkedIn: get(linkedIn),
				webpage: get(webpage)
			},
			work: get(work),
			education: get(education),
			schools: get(schools),
			vulentarely: get(vulentarely),
			other: get(other)
		};

		doc.setProperties({ keywords: JSON.stringify(jsonData) });
		doc.setFontSize(0.1);
		doc.setTextColor(255, 255, 255);
		doc.text(JSON.stringify(jsonData), 1, 1);

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
		transform: scale(1.02);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
	}
</style>
