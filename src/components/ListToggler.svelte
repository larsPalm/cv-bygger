<script lang="ts">
	import InputCardList from './InputCardList.svelte';
	import { writable, get } from 'svelte/store';
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
			<button on:click={() => setActive(i)} data-active={$activeTabIndex === i ? 'true' : 'false'}>
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
		gap: 1rem;
	}

	.tab-buttons {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tab-buttons button {
		padding: 0.5rem 1rem;
		background-color: #f0f0f0;
		border: none;
		border-radius: 12px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

		&[data-active='true'] {
			background-color: green;
			color: white;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		}

		&:hover:not([data-active='true']) {
			background-color: #dcdcdc;
		}
	}

	.tab-content {
		width: 100%;
	}
</style>
