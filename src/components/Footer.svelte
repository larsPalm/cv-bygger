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
		<img src="{base}/palmtech.png" alt="Palmtech Logo" class="logo-img" />
		<p>&copy; {currentYear} Palmtech. All rights reserved.</p>
		<a href={`${base}/personvern`}>Personvern</a>
	</div>
</footer>

<style>
	.footer {
		z-index: 10;
		background: rgba(5, 17, 35, 0.94);
		color: #cdddf1;
		text-align: center;
		padding: 0.8rem 1.25rem;
		width: 100%;
		font-size: 0.88rem;
		border-top: 1px solid rgba(116, 177, 237, 0.16);
		box-shadow: 0 -0.65rem 1.7rem rgba(0, 8, 22, 0.2);
		backdrop-filter: blur(10px);
		display: flex;
		justify-content: center;
		align-items: center;
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
		gap: 0.75rem;
	}

	.footer-content p {
		margin: 0;
	}

	.footer-content a {
		color: #dbeeff;
		text-decoration-color: rgba(219, 238, 255, 0.55);
		text-underline-offset: 0.2em;
	}

	.footer-content a:hover {
		color: #ffffff;
	}

	.footer-content a:focus-visible {
		outline: 2px solid rgba(81, 198, 255, 0.65);
		outline-offset: 3px;
		border-radius: 0.15rem;
	}

	.logo-img {
		width: 3.1rem;
		height: auto;
	}

	@media (max-width: 420px) {
		.footer-content {
			flex-direction: column;
			gap: 0.2rem;
		}
	}
</style>
