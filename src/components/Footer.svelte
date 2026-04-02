<script lang="ts">
	import { onMount } from 'svelte';

	const currentYear = new Date().getFullYear(); // Get current year dynamically

	let footer: HTMLDivElement | null = null;
	let isVisible = false; // Track footer visibility

	// Function to check if user has reached the bottom of the page
	const checkIfBottom = () => {
		if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
			isVisible = true;
		} else {
			isVisible = false;
		}
	};

	// Mount the event listener when component loads
	onMount(() => {
		window.addEventListener('scroll', checkIfBottom); // Add scroll listener
		return () => {
			window.removeEventListener('scroll', checkIfBottom); // Cleanup event listener on destroy
		};
	});
</script>

<footer class="footer" class:visible={isVisible}>
	<div class="footer-content">
		<img src={'/palmtech.png'} alt="Palmtech Logo" class="logo-img" />
		<p>&copy; {currentYear} Palmtech. All rights reserved.</p>
	</div>
</footer>

<style>
	.footer {
		background-color: #555;
		color: #fff;
		text-align: center;
		padding: 10px;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		font-size: 1rem;
		box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
		transform: translateY(100%); /* Initially hidden */
		transition: transform 0.3s ease;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer.visible {
		transform: translateY(0); /* Shows footer when scrolled to the bottom */
	}

	.footer-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo-img {
		width: 60px; /* Adjust logo size */
		height: auto;
		margin-right: 10px; /* Space between logo and text */
	}
</style>
