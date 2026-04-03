<script lang="ts">
	import { onMount } from 'svelte';

	const currentYear = new Date().getFullYear();

	let isVisible = false;

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
		<img src={'/palmtech.png'} alt="Palmtech Logo" class="logo-img" />
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
