<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import { writable, get } from 'svelte/store';
	import { schools, education, work, vulentarely, other } from '../stores/cards';
	import { name, phone, email, linkedIn, webpage } from '../stores/contactInfo';
	import type { Card } from '../types/Card';
	import jsPDF from 'jspdf';

	const showModal = writable(false);
	let pdfUrl: string | null = null;
	let previewButton: HTMLButtonElement;
	let closeButton: HTMLButtonElement;
	let previouslyFocused: HTMLElement | null = null;

	const releasePdfUrl = (): void => {
		if (pdfUrl) {
			URL.revokeObjectURL(pdfUrl);
			pdfUrl = null;
		}
	};

	const closeModal = (): void => {
		showModal.set(false);
		releasePdfUrl();
		previouslyFocused?.focus();
		previouslyFocused = null;
	};

	const handleModalKeydown = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeModal();
		}
	};

	onDestroy(releasePdfUrl);

	const generatePDF = (): void => {
		const doc = new jsPDF({ unit: 'mm', format: 'a4' });
		let y = 20;

		// --- Kontaktinformasjon ---
		const allContactFields: [string, string][] = [
			['Navn', get(name)],
			['Telefon', get(phone)],
			['E-post', get(email)],
			['LinkedIn', get(linkedIn)],
			['Webside', get(webpage)]
		];
		const contactFields = allContactFields.filter(([, value]) => value.trim().length > 0);

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
					const mainValueLines = doc.splitTextToSize(
						card.mainValue,
						pageWidth - valueX - 10
					) as string[];
					mainValueLines.forEach((line, i) => doc.text(line, valueX, y + i * 6));
					y += mainValueLines.length * 6;
				}
				if (card.secondaryValue.trim().length) {
					doc.setFont('helvetica', 'bold');
					doc.text(`${card.secondaryTitle}:`, 12, y);
					doc.setFont('helvetica', 'normal');
					const secValueLines = doc.splitTextToSize(
						card.secondaryValue,
						pageWidth - valueX - 10
					) as string[];
					secValueLines.forEach((line, i) => doc.text(line, valueX, y + i * 6));
					y += secValueLines.length * 6;
				}
				if (card.remarks.trim().length) {
					const paragraphs = card.remarks.split('\n');
					doc.setFont('helvetica', 'italic');
					paragraphs.forEach((paragraph) => {
						const lines = doc.splitTextToSize(paragraph, pageWidth - 12) as string[];
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
		releasePdfUrl();
		pdfUrl = URL.createObjectURL(blob);
		previouslyFocused =
			document.activeElement instanceof HTMLElement ? document.activeElement : previewButton;
		showModal.set(true);
		void tick().then(() => closeButton?.focus());
	};
</script>

<button bind:this={previewButton} class="pdf-button" onclick={generatePDF}>Forhåndsvis PDF</button>

{#if $showModal}
	<div class="modal-backdrop">
		<button
			type="button"
			class="backdrop-dismiss"
			aria-label="Lukk PDF-forhåndsvisning"
			tabindex="-1"
			onclick={closeModal}
		></button>
		<div
			class="modal-content"
			role="dialog"
			aria-modal="true"
			aria-label="Forhåndsvisning av PDF"
			tabindex="-1"
			onkeydown={handleModalKeydown}
		>
			<iframe title="Forhåndsvisning av CV som PDF" src={pdfUrl} width="100%" height="600px"
			></iframe>
			<button bind:this={closeButton} class="close-btn" onclick={closeModal}>Lukk</button>
		</div>
	</div>
{/if}

<style lang="scss">
	.pdf-button {
		min-height: 3rem;
		padding: 0.7rem 1.35rem;
		background: rgba(245, 250, 255, 0.98);
		color: #0754a4;
		border: 1px solid #c8def5;
		border-radius: 0.8rem;
		cursor: pointer;
		font-size: 0.98rem;
		font-weight: 600;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.pdf-button:hover {
		background: #ffffff;
		border-color: #83baf0;
		transform: translateY(-1px);
	}

	.pdf-button:active {
		transform: translateY(0);
	}

	.pdf-button:focus-visible {
		outline: 3px solid rgba(81, 198, 255, 0.45);
		outline-offset: 2px;
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 20;
		padding: clamp(0.7rem, 3vw, 1.5rem);
		background: rgba(2, 10, 24, 0.74);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.backdrop-dismiss {
		position: absolute;
		inset: 0;
		border: none;
		background: transparent;
		cursor: default;
	}

	.modal-content {
		z-index: 1;
		background: #fff;
		padding: clamp(0.65rem, 2vw, 1rem);
		border: 1px solid #d9e5f1;
		border-radius: 1rem;
		width: min(100%, 60rem);
		height: min(90svh, 48rem);
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		box-shadow: 0 1.5rem 4rem rgba(0, 8, 24, 0.4);
	}

	iframe {
		flex: 1;
		min-height: 0;
		height: auto;
		border: 1px solid #d9e5f1;
		border-radius: 0.55rem;
	}

	.close-btn {
		align-self: flex-end;
		min-height: 2.55rem;
		padding: 0.5rem 1.15rem;
		background: #0b1f3a;
		color: #fff;
		border: 1px solid #0b1f3a;
		border-radius: 0.62rem;
		cursor: pointer;
		font-weight: 600;
		transition: background 0.2s ease;
	}

	.close-btn:hover {
		background: #143e6c;
	}

	.close-btn:focus-visible {
		outline: 3px solid rgba(18, 130, 237, 0.26);
		outline-offset: 2px;
	}

	@media (max-width: 560px) {
		.pdf-button {
			width: 100%;
		}

		.modal-content {
			height: calc(100svh - 1.4rem);
		}
	}
</style>
