<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Card as CardType } from '../types/Card';

	const props = $props();

	const index: number = props.index;
	const cardsStore: Writable<CardType[]> = props.store;

	let cardData: CardType = {
		id: props.id ?? crypto.randomUUID(),
		mainTitle: props.mainTitle ?? 'Main',
		mainValue: props.mainValue ?? '',
		secondaryTitle: props.secondaryTitle ?? 'Secondary',
		secondaryValue: props.secondaryValue ?? '',
		from: props.from ?? '',
		to: props.to ?? '',
		remarks: props.remarks ?? ''
	};

	const MAX_LENGTH = 500;

	const updateCard = (): void => {
		cardsStore.update((list) => {
			list[index] = {
				id: cardData.id.slice(0, MAX_LENGTH),
				mainTitle: cardData.mainTitle.slice(0, MAX_LENGTH),
				mainValue: cardData.mainValue.slice(0, MAX_LENGTH),
				secondaryTitle: cardData.secondaryTitle.slice(0, MAX_LENGTH),
				secondaryValue: cardData.secondaryValue.slice(0, MAX_LENGTH),
				from: cardData.from.slice(0, MAX_LENGTH),
				to: cardData.to.slice(0, MAX_LENGTH),
				remarks: cardData.remarks.slice(0, MAX_LENGTH)
			};
			return list;
		});
	};

	const removeCard = (): void => {
		cardsStore.update((list) => list.filter((c) => c.id !== cardData.id));
	};
</script>

<div class="card">
	<button class="delete-btn" on:click={removeCard}>×</button>

	<label>
		<p>{cardData.mainTitle}</p>
		<input type="text" bind:value={cardData.mainValue} on:input={updateCard} />
	</label>

	<label>
		<p>{cardData.secondaryTitle}</p>
		<input type="text" bind:value={cardData.secondaryValue} on:input={updateCard} />
	</label>

	<div class="date-row">
		<label>
			<p>Fra</p>
			<input type="text" bind:value={cardData.from} on:input={updateCard} />
		</label>

		<label>
			<p>Til</p>
			<input type="text" bind:value={cardData.to} on:input={updateCard} />
		</label>
	</div>

	<label class="remarks">
		<p>kommentar</p>
		<textarea rows="3" bind:value={cardData.remarks} on:input={updateCard} />
	</label>
</div>

<style lang="scss">
	.card {
		position: relative;
		background-color: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

		display: flex;
		flex-direction: column;
		gap: 0.8rem;

		width: 100%;
		box-sizing: border-box;
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.6rem;

		font-weight: 500;
		color: #0b1f3a;
		font-size: 0.9rem;
	}

	label p {
		margin: 0;
		width: 110px;
		flex-shrink: 0;
	}

	input,
	textarea {
		flex: 1;
		min-width: 0;

		padding: 0.5rem 0.8rem;

		border: 1px solid #ccc;
		border-radius: 8px;

		font-size: 0.95rem;
		outline: none;

		box-sizing: border-box;
		width: 100%;
	}

	input:focus,
	textarea:focus {
		border-color: #0b1f3a;
	}

	/* Fra/Til som kolonne */
	.date-row {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.date-row label {
		flex: unset; /* tillater at labelene tilpasser høyde */
	}

	.remarks {
		align-items: flex-start;
	}

	textarea {
		resize: vertical;
	}

	.delete-btn {
		position: absolute;
		top: 8px;
		right: 8px;

		background: transparent;
		border: none;

		font-size: 1.2rem;
		font-weight: bold;

		cursor: pointer;
		color: #ff4d4f;

		transition: color 0.2s;
	}

	.delete-btn:hover {
		color: #ff0000;
	}
</style>
