<script lang="ts">
	import InputCard from './InputCard.svelte';
	import type { Writable } from 'svelte/store';
	import type { Card } from '../types/Card';

	let {
		cardStore,
		addLabel = 'Legg til kort',
		title = '',
		mainTitle = 'Main',
		secondaryTitle: secondTitle = 'Second'
	}: {
		cardStore: Writable<Card[]>;
		addLabel?: string;
		title?: string;
		mainTitle?: string;
		secondaryTitle?: string;
	} = $props();

	// Legg til nytt Card med unik ID
	const addCard = (): void => {
		const newCard: Card = {
			id: crypto.randomUUID(),
			mainTitle: mainTitle,
			mainValue: '',
			secondaryTitle: secondTitle,
			secondaryValue: '',
			from: '',
			to: '',
			remarks: ''
		};
		cardStore.update((list) => [newCard, ...list]);
	};
</script>

<div class="card-list">
	{#if title}
		<h3 class="card-list-title">{title}</h3>
	{/if}

	<div class="button-wrapper">
		<button onclick={addCard} class="add-button">{addLabel}</button>
	</div>

	{#each $cardStore as card, i (card.id)}
		<InputCard
			index={i}
			store={cardStore}
			id={card.id}
			mainTitle={card.mainTitle}
			mainValue={card.mainValue}
			secondaryTitle={card.secondaryTitle}
			secondaryValue={card.secondaryValue}
			from={card.from}
			to={card.to}
			remarks={card.remarks}
		/>
	{/each}
</div>

<style lang="scss">
	.card-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: stretch;
		width: min(100%, 48rem);
		margin: 0 auto;
		background: #ffffff;
		padding: clamp(1.05rem, 3vw, 1.6rem);
		border: 1px solid #e1ebf6;
		border-radius: 1.1rem;
		box-shadow: 0 0.65rem 1.8rem rgba(2, 18, 39, 0.14);
	}

	.card-list-title {
		margin: 0;
		font-size: clamp(1.1rem, 3vw, 1.3rem);
		color: #0b1f3a;
		font-weight: 650;
		text-align: center;
	}

	.button-wrapper {
		display: flex;
		justify-content: center;
		padding-bottom: 0.3rem;
	}

	.add-button {
		min-height: 2.75rem;
		padding: 0.62rem 1.2rem;
		border: 1px solid rgba(11, 83, 155, 0.15);
		border-radius: 0.68rem;
		background: #e9f3ff;
		color: #0754a4;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			color 0.2s ease;
	}

	.add-button:hover {
		background: #d7eaff;
		border-color: #9bc9f7;
		color: #063e78;
	}

	.add-button:focus-visible {
		outline: 3px solid rgba(18, 130, 237, 0.18);
		outline-offset: 2px;
	}

	@media (max-width: 480px) {
		.add-button {
			width: 100%;
		}
	}
</style>
