<script lang="ts">
	import Button from '../../components/Button.svelte';
</script>

<svelte:head>
	<title>Personvern | CV-bygger</title>
	<meta
		name="description"
		content="Informasjon om hvordan CV-bygger fra Palmtech behandler personopplysninger."
	/>
</svelte:head>

<main>
	<article class="privacy-page">
		<header>
			<p class="eyebrow">Palmtech</p>
			<h1>Personvern for CV-bygger</h1>
			<p class="updated">Sist oppdatert: 25. mai 2026</p>
		</header>

		<section>
			<h2>Kort forklart</h2>
			<p>
				CV-bygger lar deg opprette og redigere en CV direkte i nettleseren. Opplysningene du skriver
				inn, eller importerer fra en PDF, sendes ikke til Palmtech av appen og lagres ikke i en
				database av tjenesten.
			</p>
		</section>

		<section>
			<h2>Hvem er ansvarlig?</h2>
			<p>
				Palmtech er ansvarlig for CV-bygger. Spørsmål om personvern kan meldes via
				<a href="https://github.com/larsPalm/cv-bygger">prosjektets offentlige GitHub-side</a>.
			</p>
		</section>

		<section>
			<h2>Opplysninger du kan bruke i tjenesten</h2>
			<p>
				Du kan skrive inn opplysninger som navn, telefonnummer, e-postadresse, LinkedIn, webside,
				utdanning, arbeidserfaring, frivillig arbeid og andre CV-opplysninger.
			</p>
			<p>
				Formålet med behandlingen er bare å la deg opprette, forhåndsvise, laste ned og redigere din
				egen CV.
			</p>
		</section>

		<section>
			<h2>Hvordan opplysningene behandles</h2>
			<ul>
				<li>Opplysninger du fyller inn holdes midlertidig i nettleseren mens du bruker siden.</li>
				<li>En PDF du velger for import, leses lokalt i nettleseren for å hente ut CV-data.</li>
				<li>
					Når du genererer en PDF, legges CV-opplysningene også inn som strukturerte data i filen
					slik at den senere kan importeres til CV-bygger igjen.
				</li>
			</ul>
			<p>
				Den nedlastede PDF-filen kan derfor inneholde personopplysninger utover det som er synlig på
				siden. Du er selv ansvarlig for hvor filen lagres og hvem den deles med.
			</p>
		</section>

		<section>
			<h2>Lagring, cookies og statistikk</h2>
			<p>
				Appen bruker ikke cookies, lokal nettleserlagring eller analyseverktøy for å lagre eller
				spore CV-innholdet ditt. Opplysninger du ikke laster ned i en PDF, forsvinner når appens
				midlertidige tilstand avsluttes, for eksempel ved ny innlasting av siden.
			</p>
		</section>

		<section>
			<h2>Publisering av nettstedet</h2>
			<p>
				CV-bygger publiseres som et statisk nettsted gjennom GitHub Pages. GitHub kan behandle
				tekniske opplysninger om besøk til nettstedet, for eksempel IP-adresse og
				forespørselslogger, i samsvar med
				<a
					href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
				>
					GitHubs personvernerklæring</a
				>.
			</p>
		</section>

		<section>
			<h2>Dine valg og rettigheter</h2>
			<p>
				Siden Palmtech ikke mottar eller lagrer CV-opplysningene gjennom appen, kan du kontrollere
				disse ved å endre informasjonen på siden, lukke eller laste inn siden på nytt, og slette
				PDF-filer du har lastet ned.
			</p>
			<p>
				Dersom du mener at behandling av personopplysninger ikke er i tråd med personvernreglene,
				kan du kontakte Palmtech eller klage til
				<a href="https://www.datatilsynet.no/">Datatilsynet</a>.
			</p>
		</section>

		<div class="back-action">
			<Button text="Tilbake til forsiden" />
		</div>
	</article>
</main>

<style lang="scss">
	main {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: clamp(1rem, 4vw, 2.5rem) clamp(1rem, 4vw, 2.5rem) clamp(6rem, 9vw, 7rem);
	}

	.privacy-page {
		width: min(100%, 52rem);
		padding: clamp(1.25rem, 4vw, 2.5rem);
		border: 1px solid rgba(107, 172, 237, 0.16);
		border-radius: 1.5rem;
		background: rgba(6, 21, 42, 0.48);
		box-shadow: 0 1.25rem 3.5rem rgba(0, 7, 22, 0.24);
	}

	header {
		padding-bottom: clamp(1rem, 3vw, 1.5rem);
		margin-bottom: clamp(1.25rem, 4vw, 1.8rem);
		border-bottom: 1px solid rgba(107, 172, 237, 0.18);
	}

	.eyebrow {
		color: #56c7ff;
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		margin: 0 0 0.5rem;
	}

	h1 {
		color: #f1f7ff;
		font-size: clamp(1.7rem, 5vw, 2.35rem);
		line-height: 1.2;
		margin: 0 0 0.55rem;
	}

	.updated {
		color: #a9c2df;
		margin: 0;
		font-size: 0.92rem;
	}

	section + section {
		margin-top: clamp(1.2rem, 3vw, 1.65rem);
	}

	h2 {
		color: #eef5ff;
		font-size: clamp(1.08rem, 3vw, 1.25rem);
		margin: 0 0 0.55rem;
	}

	p,
	li {
		color: #d0dfef;
		font-size: 0.98rem;
		line-height: 1.7;
	}

	p {
		margin: 0.5rem 0 0;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		padding-left: 1.25rem;
		margin: 0.6rem 0 0;
	}

	a {
		color: #8cd5ff;
		text-underline-offset: 0.2em;
	}

	a:hover {
		color: #c6ecff;
	}

	a:focus-visible {
		outline: 2px solid rgba(81, 198, 255, 0.65);
		outline-offset: 3px;
		border-radius: 0.15rem;
	}

	.back-action {
		display: flex;
		justify-content: flex-start;
		margin-top: clamp(1.75rem, 5vw, 2.4rem);
	}
</style>
