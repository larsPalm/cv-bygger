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
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: #0b1f3a;
	}

	main {
		flex: 1;
		padding: 1rem;
	}
</style>
