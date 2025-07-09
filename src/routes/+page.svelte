<script lang="ts">
    import { _, locale } from 'svelte-i18n';

	// Base URL for Apple Maps
	const BASE_URL = 'https://maps.apple.com/';

	// --- Reactive variables for form inputs ---
	let ll = ''; // Latitude,Longitude
	let q = ''; // Query
	let address = ''; // Address
	let sll = ''; // Search Location
	let z = 15; // Zoom
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
            <!-- Generated URL Display -->
			<div class="mb-10">
				<h2 class="text-xl font-semibold mb-2 text-gray-900">{$_('section.generatedUrl')}</h2>
				<div class="flex items-center space-x-2">
					<input type="text" readonly value={generatedUrl} class="w-full bg-gray-200 text-gray-800 rounded-md p-3 border border-gray-300 font-mono text-sm">
					<button on:click={copyToClipboard} class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out whitespace-nowrap">
						{$_(copyButtonTextKey)}
					</button>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
				
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
						<input type="number" id="z" bind:value={z} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
                        <p class="mt-1 text-xs text-gray-500">{$_('placeholder.zoom')}</p>
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
				</div>

                <!-- Map Type -->
                <div class="space-y-2 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700">{$_('label.mapType')}</label>
                    <div class="isolate inline-flex rounded-md shadow-sm w-full">
                        <button on:click={() => t = ''} class="relative inline-flex items-center justify-center w-1/4 rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={t===''} class:text-white={t===''} class:hover:bg-blue-700={t===''} class:text-gray-900={t!==''} class:hover:bg-gray-100={t!==''}>{$_('option.default')}</button>
                        <button on:click={() => t = 'm'} class="relative -ml-px inline-flex items-center justify-center w-1/4 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={t==='m'} class:text-white={t==='m'} class:hover:bg-blue-700={t==='m'} class:text-gray-900={t!=='m'} class:hover:bg-gray-100={t!=='m'}>{$_('option.standard')}</button>
                        <button on:click={() => t = 'k'} class="relative -ml-px inline-flex items-center justify-center w-1/4 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={t==='k'} class:text-white={t==='k'} class:hover:bg-blue-700={t==='k'} class:text-gray-900={t!=='k'} class:hover:bg-gray-100={t!=='k'}>{$_('option.satellite')}</button>
                        <button on:click={() => t = 'h'} class="relative -ml-px inline-flex items-center justify-center w-1/4 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={t==='h'} class:text-white={t==='h'} class:hover:bg-blue-700={t==='h'} class:text-gray-900={t!=='h'} class:hover:bg-gray-100={t!=='h'}>{$_('option.hybrid')}</button>
                    </div>
                </div>

                <!-- Navigation Mode -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">{$_('label.navMode')}</label>
                    <div class="isolate inline-flex rounded-md shadow-sm w-full">
                        <button on:click={() => dirflg = ''} class="relative inline-flex items-center justify-center w-1/4 rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={dirflg===''} class:text-white={dirflg===''} class:hover:bg-blue-700={dirflg===''} class:text-gray-900={dirflg!==''} class:hover:bg-gray-100={dirflg!==''}>{$_('option.unspecified')}</button>
                        <button on:click={() => dirflg = 'd'} class="relative -ml-px inline-flex items-center justify-center w-1/4 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={dirflg==='d'} class:text-white={dirflg==='d'} class:hover:bg-blue-700={dirflg==='d'} class:text-gray-900={dirflg!=='d'} class:hover:bg-gray-100={dirflg!=='d'}>{$_('option.driving')}</button>
                        <button on:click={() => dirflg = 'w'} class="relative -ml-px inline-flex items-center justify-center w-1/4 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={dirflg==='w'} class:text-white={dirflg==='w'} class:hover:bg-blue-700={dirflg==='w'} class:text-gray-900={dirflg!=='w'} class:hover:bg-gray-100={dirflg!=='w'}>{$_('option.walking')}</button>
                        <button on:click={() => dirflg = 'r'} class="relative -ml-px inline-flex items-center justify-center w-1/4 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={dirflg==='r'} class:text-white={dirflg==='r'} class:hover:bg-blue-700={dirflg==='r'} class:text-gray-900={dirflg!=='r'} class:hover:bg-gray-100={dirflg!=='r'}>{$_('option.transit')}</button>
                    </div>
                </div>

                <!-- Action -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">{$_('label.action')}</label>
                    <div class="isolate inline-flex rounded-md shadow-sm w-full">
                        <button on:click={() => action = ''} class="relative inline-flex items-center justify-center w-1/3 rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={action===''} class:text-white={action===''} class:hover:bg-blue-700={action===''} class:text-gray-900={action!==''} class:hover:bg-gray-100={action!==''}>{$_('option.default')}</button>
                        <button on:click={() => action = 'map'} class="relative -ml-px inline-flex items-center justify-center w-1/3 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={action==='map'} class:text-white={action==='map'} class:hover:bg-blue-700={action==='map'} class:text-gray-900={action!=='map'} class:hover:bg-gray-100={action!=='map'}>{$_('option.showMap')}</button>
                        <button on:click={() => action = 'directions'} class="relative -ml-px inline-flex items-center justify-center w-1/3 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={action==='directions'} class:text-white={action==='directions'} class:hover:bg-blue-700={action==='directions'} class:text-gray-900={action!=='directions'} class:hover:bg-gray-100={action!=='directions'}>{$_('option.showDirections')}</button>
                    </div>
                </div>
			</div>

		</main>
	</div>
</div>
