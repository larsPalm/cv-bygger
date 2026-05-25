<script lang="ts">
	import InputCardList from './InputCardList.svelte';
	import { writable } from 'svelte/store';
	import { schools, education, work, vulentarely } from '../stores/cards';
	import type { Writable } from 'svelte/store';
	import type { Card } from '../types/Card';

	// tabs definisjon
	const tabs: {
		title: string;
		addLabel: string;
		store: Writable<Card[]>;
		mainTitle: string;
		secondaryTitle: string;
	}[] = [
		{
			title: 'Skoler',
			addLabel: 'Legg til skole',
			store: schools,
			mainTitle: 'Skole',
			secondaryTitle: 'Hovedfokus'
		},
		{
			title: 'Høyere utdanning',
			addLabel: 'Legg til universitet/høyskole',
			store: education,
			mainTitle: 'Skole/universitet',
			secondaryTitle: 'Hovedfokus'
		},
		{
			title: 'Jobb',
			addLabel: 'Legg til Jobb',
			store: work,
			mainTitle: 'Firma',
			secondaryTitle: 'Hovedfokus'
		},
		{
			title: 'Frivillighet',
			addLabel: 'Legg til',
			store: vulentarely,
			mainTitle: 'Stiftelse/firma',
			secondaryTitle: 'Hovedfokus'
		}
	];

	// bruk writable for å gjøre fanen reaktiv i runes-modus
	const activeTabIndex = writable<number>(0);

	const setActive = (index: number) => {
		activeTabIndex.set(index);
	};
</script>

<div class="toggle-tabs">
	<div class="tab-buttons">
		{#each tabs as tab, i}
			<button onclick={() => setActive(i)} data-active={$activeTabIndex === i ? 'true' : 'false'}>
				{tab.title}
			</button>
		{/each}
	</div>

	<div class="tab-content">
		{#key $activeTabIndex}
			<InputCardList
				cardStore={tabs[$activeTabIndex].store}
				addLabel={tabs[$activeTabIndex].addLabel}
				title={tabs[$activeTabIndex].title}
				mainTitle={tabs[$activeTabIndex].mainTitle}
				secondaryTitle={tabs[$activeTabIndex].secondaryTitle}
			/>
		{/key}
	</div>
</div>

<style lang="scss">
	.toggle-tabs {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		justify-content: center;
	}

	.tab-buttons {
		display: flex;
		justify-content: center;
		gap: 0.45rem;
		flex-wrap: wrap;
		width: fit-content;
		max-width: 100%;
		margin: 0 auto;
		padding: 0.35rem;
		border: 1px solid rgba(101, 164, 226, 0.18);
		border-radius: 0.9rem;
		background: rgba(4, 17, 36, 0.36);
	}

	.tab-buttons button {
		min-height: 2.6rem;
		padding: 0.55rem 1rem;
		background: transparent;
		color: #d4e4f8;
		border: 1px solid transparent;
		border-radius: 0.62rem;
		cursor: pointer;
		font-size: 0.92rem;
		font-weight: 600;
		transition:
			background 0.2s ease,
			color 0.2s ease,
			box-shadow 0.2s ease;

		&[data-active='true'] {
			background: linear-gradient(135deg, #1684ed, #0965c9);
			color: white;
			box-shadow: 0 0.35rem 0.85rem rgba(4, 50, 106, 0.4);
		}

		&:hover:not([data-active='true']) {
			background: rgba(129, 182, 235, 0.12);
			color: #ffffff;
		}

		&:focus-visible {
			outline: 3px solid rgba(81, 198, 255, 0.45);
			outline-offset: 1px;
		}
	}

	.tab-content {
		width: 100%;
	}

	@media (max-width: 540px) {
		.tab-buttons {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
