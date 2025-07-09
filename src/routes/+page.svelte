<script lang="ts">
    import { _, locale } from 'svelte-i18n';

	// Base URL for Apple Maps
	const BASE_URL = 'https://maps.apple.com/';

	// --- Reactive variables for form inputs ---
	let ll = ''; // Latitude,Longitude
	let q = ''; // Query
	let address = ''; // Address
	let sll = ''; // Search Location
	let z = ''; // Zoom
	let t = ''; // Map Type
	let dirflg = ''; // Direction Flag
	let daddr = ''; // Destination Address
	let saddr = ''; // Start Address
	let near = ''; // Near a location
	let action = ''; // Action type

	// --- Reactive derived variable for the generated URL ---
	$: generatedUrl = (() => {
		const params = new URLSearchParams();

		if (ll) params.set('ll', ll);
		if (q) params.set('q', q);
		if (address) params.set('address', address);
		if (sll) params.set('sll', sll);
		if (z) params.set('z', z);
		if (t) params.set('t', t);
		if (dirflg) params.set('dirflg', dirflg);
		if (daddr) params.set('daddr', daddr);
		if (saddr) params.set('saddr', saddr);
		if (near) params.set('near', near);
		if (action) params.set('action', action);
		
		const paramString = params.toString();
		return paramString ? `${BASE_URL}?${paramString}` : BASE_URL;
	})();

    let copyButtonTextKey = 'button.copy';
	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(generatedUrl);
			copyButtonTextKey = 'button.copied';
			setTimeout(() => {
				copyButtonTextKey = 'button.copy';
			}, 2000);
		} catch (err) {
			copyButtonTextKey = 'button.copyFailed';
			console.error('Failed to copy: ', err);
		}
	}

    const setLocale = (lang) => {
        locale.set(lang);
    }
</script>

<svelte:head>
    <title>{$_('title')}</title>
    <meta name="description" content={$_('subtitle')} />
</svelte:head>

<div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-10 px-4">
	<div class="w-full max-w-4xl">
        <nav class="flex justify-center gap-4 mb-8">
            <button class="text-gray-600 hover:text-blue-600 disabled:text-blue-600 disabled:font-bold" on:click={() => setLocale('zh-TW')} disabled={$locale === 'zh-TW'}>{$_('lang.zh-TW')}</button>
            <button class="text-gray-600 hover:text-blue-600 disabled:text-blue-600 disabled:font-bold" on:click={() => setLocale('en')} disabled={$locale === 'en'}>{$_('lang.en')}</button>
            <button class="text-gray-600 hover:text-blue-600 disabled:text-blue-600 disabled:font-bold" on:click={() => setLocale('ja')} disabled={$locale === 'ja'}>{$_('lang.ja')}</button>
        </nav>

		<header class="text-center mb-10">
			<h1 class="text-4xl font-bold text-blue-600">{$_('title')}</h1>
			<p class="text-gray-600 mt-2">{$_('subtitle')}</p>
		</header>

		<main class="bg-white p-8 rounded-xl shadow-lg">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				
				<!-- General Settings -->
				<div class="space-y-6">
					<h2 class="text-2xl font-semibold border-b-2 border-blue-500 pb-2 text-gray-900">{$_('section.general')}</h2>
					<div>
						<label for="q" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.locationName')}</label>
						<input type="text" id="q" bind:value={q} placeholder={$_('placeholder.locationName')} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
					</div>
					<div>
						<label for="ll" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.latlon')}</label>
						<input type="text" id="ll" bind:value={ll} placeholder={$_('placeholder.latlon')} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
					</div>
					<div>
						<label for="address" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.address')}</label>
						<input type="text" id="address" bind:value={address} placeholder={$_('placeholder.address')} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
					</div>
					<div>
						<label for="z" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.zoom')}</label>
						<input type="number" id="z" bind:value={z} placeholder={$_('placeholder.zoom')} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
					</div>
					<div>
						<label for="t" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.mapType')}</label>
						<select id="t" bind:value={t} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
							<option value="">{$_('option.default')}</option>
							<option value="m">{$_('option.standard')}</option>
							<option value="k">{$_('option.satellite')}</option>
							<option value="h">{$_('option.hybrid')}</option>
						</select>
					</div>
				</div>

				<!-- Navigation Settings -->
				<div class="space-y-6">
					<h2 class="text-2xl font-semibold border-b-2 border-blue-500 pb-2 text-gray-900">{$_('section.navigation')}</h2>
					<div>
						<label for="saddr" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.startPoint')}</label>
						<input type="text" id="saddr" bind:value={saddr} placeholder={$_('placeholder.startPoint')} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
					</div>
					<div>
						<label for="daddr" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.destination')}</label>
						<input type="text" id="daddr" bind:value={daddr} placeholder={$_('placeholder.destination')} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
					</div>
					<div>
						<label for="dirflg" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.navMode')}</label>
						<select id="dirflg" bind:value={dirflg} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
							<option value="">{$_('option.unspecified')}</option>
							<option value="d">{$_('option.driving')}</option>
							<option value="w">{$_('option.walking')}</option>
							<option value="r">{$_('option.transit')}</option>
						</select>
					</div>
					<div>
						<label for="action" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.action')}</label>
						<select id="action" bind:value={action} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
							<option value="">{$_('option.default')}</option>
							<option value="map">{$_('option.showMap')}</option>
							<option value="directions">{$_('option.showDirections')}</option>
						</select>
					</div>
				</div>
			</div>

			<!-- Generated URL Display -->
			<div class="mt-10">
				<h2 class="text-xl font-semibold mb-2 text-gray-900">{$_('section.generatedUrl')}</h2>
				<div class="flex items-center space-x-2">
					<input type="text" readonly value={generatedUrl} class="w-full bg-gray-200 text-gray-800 rounded-md p-3 border border-gray-300 font-mono text-sm">
					<button on:click={copyToClipboard} class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out whitespace-nowrap">
						{$_(copyButtonTextKey)}
					</button>
				</div>
			</div>
		</main>

		<footer class="text-center mt-10 text-gray-500">
			<p>{$_('footer.credit')}</p>
		</footer>
	</div>
</div>