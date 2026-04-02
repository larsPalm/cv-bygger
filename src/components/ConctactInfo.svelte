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
		<input type="text" bind:value={localName} on:input={() => updateStore(name, localName)} />
	</label>

	<label>
		<p>Telefon</p>
		<input type="text" bind:value={localPhone} on:input={() => updateStore(phone, localPhone)} />
	</label>

	<label>
		<p>E-post</p>
		<input type="email" bind:value={localEmail} on:input={() => updateStore(email, localEmail)} />
	</label>

	<label>
		<p>LinkedIn</p>
		<input
			type="text"
			bind:value={localLinkedIn}
			on:input={() => updateStore(linkedIn, localLinkedIn)}
		/>
	</label>

	<label>
		<p>Webside</p>
		<input
			type="text"
			bind:value={localWebpage}
			on:input={() => updateStore(webpage, localWebpage)}
		/>
	</label>
</div>

<style lang="scss">
	.info-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 700px;
		margin: 0 auto;
		background: white;
		padding: 2rem;
		border-radius: 16px;
		box-shadow:
			0 10px 25px rgba(0, 0, 0, 0.25),
			0 4px 10px rgba(0, 0, 0, 0.15);
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		font-weight: 500;
		color: #0b1f3a;
		font-size: 0.95rem;
		width: 100%;
		box-sizing: border-box;
	}

	label p {
		margin: 0;
		width: 120px;
		flex-shrink: 0;
	}

	input {
		flex: 1;
		padding: 0.5rem 0.8rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		font-size: 1rem;
		outline: none;
		box-sizing: border-box;
		width: 100%;
	}

	input:focus {
		border-color: #0b1f3a;
	}
</style>
