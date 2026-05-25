<script lang="ts">
	import { name, phone, email, linkedIn, webpage } from '../stores/contactInfo';
	import type { Writable } from 'svelte/store';

	// Lokale verdier
	let localName = '';
	let localPhone = '';
	let localEmail = '';
	let localLinkedIn = '';
	let localWebpage = '';

	// Sync med store: abonnér direkte
	name.subscribe((v) => (localName = v));
	phone.subscribe((v) => (localPhone = v));
	email.subscribe((v) => (localEmail = v));
	linkedIn.subscribe((v) => (localLinkedIn = v));
	webpage.subscribe((v) => (localWebpage = v));

	// Oppdater store når input endres
	const updateStore = (store: Writable<string>, value: string) => store.set(value);
</script>

<div class="info-form">
	<label>
		<p>Navn</p>
		<input type="text" bind:value={localName} oninput={() => updateStore(name, localName)} />
	</label>

	<label>
		<p>Telefon</p>
		<input type="text" bind:value={localPhone} oninput={() => updateStore(phone, localPhone)} />
	</label>

	<label>
		<p>E-post</p>
		<input type="email" bind:value={localEmail} oninput={() => updateStore(email, localEmail)} />
	</label>

	<label>
		<p>LinkedIn</p>
		<input
			type="text"
			bind:value={localLinkedIn}
			oninput={() => updateStore(linkedIn, localLinkedIn)}
		/>
	</label>

	<label>
		<p>Webside</p>
		<input
			type="text"
			bind:value={localWebpage}
			oninput={() => updateStore(webpage, localWebpage)}
		/>
	</label>
</div>

<style lang="scss">
	.info-form {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		width: 100%;
		max-width: 46rem;
		margin: 0 auto;
		background: #ffffff;
		padding: clamp(1.1rem, 3vw, 1.7rem);
		border: 1px solid #e1ebf6;
		border-radius: 1.1rem;
		box-shadow: 0 0.65rem 1.8rem rgba(2, 18, 39, 0.14);
	}

	label {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-weight: 600;
		color: #0b1f3a;
		font-size: 0.9rem;
		width: 100%;
	}

	label p {
		margin: 0;
		width: 6.8rem;
		flex-shrink: 0;
		letter-spacing: 0.01em;
	}

	input {
		flex: 1;
		min-height: 2.75rem;
		padding: 0.65rem 0.85rem;
		border: 1px solid #ccd9e7;
		border-radius: 0.65rem;
		background: #f8fbff;
		color: #102640;
		font-size: 0.96rem;
		outline: none;
		width: 100%;
		transition:
			border-color 0.18s ease,
			box-shadow 0.18s ease,
			background 0.18s ease;
	}

	input:focus {
		border-color: #1282ed;
		background: #ffffff;
		box-shadow: 0 0 0 3px rgba(18, 130, 237, 0.13);
	}

	@media (max-width: 560px) {
		label {
			flex-direction: column;
			align-items: stretch;
			gap: 0.4rem;
		}

		label p {
			width: auto;
		}
	}
</style>
