<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	const currentYear = new Date().getFullYear();
	let isVisible = false;

	// Sjekk om brukeren har scrollet til bunnen
	const checkIfBottom = () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		isVisible = scrollTop + clientHeight >= scrollHeight - 2;
	};

	onMount(() => {
		checkIfBottom();

		window.addEventListener('scroll', checkIfBottom);
		window.addEventListener('resize', checkIfBottom);

		return () => {
			window.removeEventListener('scroll', checkIfBottom);
			window.removeEventListener('resize', checkIfBottom);
		};
	});
</script>

<footer class="footer" class:visible={isVisible}>
	<div class="footer-content">
		<!-- Korrekt bruk av {base} uten ekstra quotes -->
		<img src="{base}/palmtech.png" alt="Palmtech Logo" class="logo-img" />
		<p>&copy; {currentYear} Palmtech. All rights reserved.</p>
	</div>
</footer>

<style>
	.footer {
		background-color: #555;
		color: #fff;
		text-align: center;
		padding: 1rem 2rem;
		width: 100%;
		font-size: 1rem;
		box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;

		/* initial hidden state */
		transform: translateY(100%);
		transition: transform 0.3s ease;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.footer.visible {
		transform: translateY(0);
	}

	.footer-content {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.logo-img {
		width: 60px;
		height: auto;
	}
</style>
