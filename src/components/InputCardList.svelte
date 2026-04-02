<script lang="ts">
	import InputCard from './InputCard.svelte';
	import type { Writable } from 'svelte/store';
	import type { Card } from '../types/Card';

	// Hent props via $props() i runes mode
	const props = $props();

	const cardStore: Writable<Card[]> = props.cardStore;
	const addLabel: string = props.addLabel ?? 'Legg til kort';
	const title: string = props.title ?? '';
	const mainTitle: string = props.mainTitle ?? 'Main';
	const secondTitle: string = props.secondaryTitle ?? 'Second';

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
		<button on:click={addCard} class="add-button">{addLabel}</button>
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
		/>
	{/each}
</div>

<style lang="scss">
	.card-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: stretch;

		width: 750px; /* fast bredde */
		max-width: 90vw;
		margin: 0 auto; /* sentrerer hele kort-listen */

		background: white;
		padding: 2rem;
		border-radius: 16px;

		box-shadow:
			0 10px 25px rgba(0, 0, 0, 0.25),
			0 4px 10px rgba(0, 0, 0, 0.15);
	}

	.card-list-title {
		margin: 0;
		font-size: 1.3rem;
		color: #0b1f3a;
		font-weight: 600;
		text-align: center; /* sentrerer tittelen */
	}

	.button-wrapper {
		display: flex;
		justify-content: center; /* sentrerer knappen */
	}

	.add-button {
		padding: 0.6rem 1.2rem; /* litt mindre padding for å ikke bli for bred */
		background-color: #0b1f3a;
		color: white;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		font-size: 1rem;
		transition: background 0.2s ease;

		width: auto; /* knappen tar kun så mye plass som teksten */
		min-width: 120px; /* valgfri minimumsbredde for jevn knapp */
	}

	.add-button:hover {
		background-color: #14355b;
	}
</style>
