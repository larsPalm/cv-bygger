<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Card as CardType } from '../types/Card';

	let {
		index,
		store: cardsStore,
		id = crypto.randomUUID(),
		mainTitle = 'Main',
		mainValue = '',
		secondaryTitle = 'Secondary',
		secondaryValue = '',
		from = '',
		to = '',
		remarks = ''
	}: {
		index: number;
		store: Writable<CardType[]>;
		id?: string;
		mainTitle?: string;
		mainValue?: string;
		secondaryTitle?: string;
		secondaryValue?: string;
		from?: string;
		to?: string;
		remarks?: string;
	} = $props();

	const MAX_LENGTH = 250;

	const updateCard = (): void => {
		cardsStore.update((list) => {
			list[index] = {
				id: id.slice(0, MAX_LENGTH),
				mainTitle: mainTitle.slice(0, 50),
				mainValue: mainValue.slice(0, 50),
				secondaryTitle: secondaryTitle.slice(0, 50),
				secondaryValue: secondaryValue.slice(0, 50),
				from: from.slice(0, 10),
				to: to.slice(0, 10),
				remarks: remarks.slice(0, MAX_LENGTH)
			};
			return list;
		});
	};

	const removeCard = (): void => {
		cardsStore.update((list) => list.filter((c) => c.id !== id));
	};
</script>

<div class="card">
	<button class="delete-btn" onclick={removeCard}>×</button>

	<label>
		<p>{mainTitle}</p>
		<input type="text" bind:value={mainValue} oninput={updateCard} />
	</label>

	<label>
		<p>{secondaryTitle}</p>
		<input type="text" bind:value={secondaryValue} oninput={updateCard} />
	</label>

	<div class="date-row">
		<label>
			<p>Fra</p>
			<input type="text" bind:value={from} oninput={updateCard} />
		</label>

		<label>
			<p>Til</p>
			<input type="text" bind:value={to} oninput={updateCard} />
		</label>
	</div>

	<label class="remarks">
		<p>kommentar</p>
		<textarea rows="3" bind:value={remarks} oninput={updateCard}></textarea>
	</label>
</div>

<style lang="scss">
	.card {
		position: relative;
		background: #f7faff;
		padding: clamp(1rem, 3vw, 1.45rem);
		padding-top: clamp(2.4rem, 5vw, 2.6rem);
		border: 1px solid #dde8f4;
		border-radius: 0.9rem;
		box-shadow: 0 0.2rem 0.65rem rgba(7, 27, 50, 0.05);
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		width: 100%;
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		font-weight: 600;
		color: #0b1f3a;
		font-size: 0.9rem;
	}

	label p {
		margin: 0;
		width: 6.5rem;
		flex-shrink: 0;
	}

	input,
	textarea {
		flex: 1;
		min-width: 0;
		padding: 0.62rem 0.8rem;
		border: 1px solid #ccd9e7;
		border-radius: 0.6rem;
		background: #ffffff;
		color: #102640;
		font-size: 0.95rem;
		outline: none;
		width: 100%;
		transition:
			border-color 0.18s ease,
			box-shadow 0.18s ease;
	}

	input:focus,
	textarea:focus {
		border-color: #1282ed;
		box-shadow: 0 0 0 3px rgba(18, 130, 237, 0.12);
	}

	.date-row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.8rem;
		margin-left: calc(6.5rem + 0.85rem);
	}

	.date-row label {
		flex-direction: column;
		align-items: stretch;
		gap: 0.4rem;
		min-width: 0;
	}

	.date-row label p {
		width: auto;
	}

	.remarks {
		align-items: flex-start;
	}

	textarea {
		min-height: 5.6rem;
		resize: vertical;
	}

	.delete-btn {
		position: absolute;
		top: 0.65rem;
		right: 0.7rem;
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 1px solid transparent;
		border-radius: 999px;
		background: #fff1f2;
		font-size: 1.15rem;
		font-weight: 600;
		cursor: pointer;
		color: #c7293e;
		transition:
			color 0.2s ease,
			background 0.2s ease,
			border-color 0.2s ease;
	}

	.delete-btn:hover {
		color: #a31930;
		background: #ffe3e7;
		border-color: #f8bac4;
	}

	.delete-btn:focus-visible {
		outline: 3px solid rgba(199, 41, 62, 0.2);
		outline-offset: 1px;
	}

	@media (max-width: 620px) {
		label,
		.date-row label {
			flex-direction: column;
			align-items: stretch;
			gap: 0.4rem;
		}

		label p {
			width: auto;
		}

		.date-row {
			margin-left: 0;
		}
	}
</style>
