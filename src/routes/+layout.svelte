<script>
	import Footer from '../components/Footer.svelte';
</script>

<div class="page">
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style lang="scss">
	.page {
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		background:
			radial-gradient(circle at 50% 0%, rgba(30, 132, 242, 0.2), transparent 34rem),
			linear-gradient(145deg, #06152b 0%, #0b1f3a 52%, #102b4d 100%);
		color: #eef5ff;
	}

	main {
		flex: 1;
		display: flex;
		width: 100%;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		font-family: Inter, 'Avenir Next', 'Segoe UI', Arial, sans-serif;
		background: #07182f;
	}

	:global(body) {
		min-width: 320px;
		margin: 0;
		background: #07182f;
		color: #eef5ff;
		line-height: 1.5;
	}

	:global(button),
	:global(input),
	:global(textarea) {
		font: inherit;
	}
</style>
