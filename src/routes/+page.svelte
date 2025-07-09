<script lang="ts">
    import { _, locale } from 'svelte-i18n';
    import { onMount, onDestroy } from 'svelte';
    import type { Map, Marker } from 'leaflet';

    // --- Leaflet --- 
    let L: typeof import('leaflet');
    import('leaflet/dist/leaflet.css');

    // --- Base URL for Apple Maps ---
	const BASE_URL = 'https://maps.apple.com/';

	// --- Reactive variables for form inputs ---
	let ll = ''; // Latitude,Longitude
	let q = ''; // Query
	let address = ''; // Address
	let sll = ''; // Search Location
	let z = 16; // Zoom
	let t = ''; // Map Type
	let dirflg = ''; // Direction Flag
	let daddr = ''; // Destination Address
	let saddr = ''; // Start Address
	let near = ''; // Near a location
	let action = ''; // Action type

    // --- UI State ---
    let isLoading = false;
    let pasteError = '';

    // --- Map State ---
    let mapContainer: HTMLElement;
    let mapInstance: Map;
    let markerInstance: Marker;

    onMount(async () => {
        L = (await import('leaflet')).default;
        mapInstance = L.map(mapContainer).setView([25.0339, 121.5645], 16); // Taipei 101
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(mapInstance);
        markerInstance = L.marker(mapInstance.getCenter()).addTo(mapInstance);
        mapInstance.on('click', (e) => {
            const newCoords = e.latlng;
            markerInstance.setLatLng(newCoords);
            ll = `${newCoords.lat.toFixed(5)},${newCoords.lng.toFixed(5)}`;
        });
    });

    onDestroy(() => {
        if (mapInstance) mapInstance.remove();
    });

    // --- Reactive Sync Logic ---
    $: if (ll && mapInstance) {
        const parts = ll.split(',').map(s => parseFloat(s.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            const newLatLng = L.latLng(parts[0], parts[1]);
            mapInstance.setView(newLatLng, mapInstance.getZoom() || 13);
            if (markerInstance) markerInstance.setLatLng(newLatLng);
        }
    }

	// --- Generated URL Logic ---
	$: generatedUrl = (() => {
		const params = new URLSearchParams();
		if (ll) params.set('ll', ll);
		if (q) params.set('q', q);
		if (address) params.set('address', address);
		if (sll) params.set('sll', sll);
		if (z) params.set('z', z.toString());
		if (t) params.set('t', t);
		if (dirflg) params.set('dirflg', dirflg);
		if (daddr) params.set('daddr', daddr);
		if (saddr) params.set('saddr', saddr);
		if (near) params.set('near', near);
		if (action) params.set('action', action);
		const paramString = params.toString();
		return paramString ? `${BASE_URL}?${paramString}` : BASE_URL;
	})();

    // --- UI Logic ---
    let copyButtonTextKey = 'button.copy';
	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(generatedUrl);
			copyButtonTextKey = 'button.copied';
			setTimeout(() => { copyButtonTextKey = 'button.copy'; }, 2000);
		} catch (err) {
			copyButtonTextKey = 'button.copyFailed';
		}
	}
    const setLocale = (lang: string) => { locale.set(lang); };

    async function handlePaste(event: ClipboardEvent) {
        const pastedText = event.clipboardData?.getData('text');
        if (pastedText && (pastedText.includes('maps.app.goo.gl') || pastedText.includes('goo.gl/maps'))) {
            event.preventDefault();
            isLoading = true;
            pasteError = '';
            try {
                const response = await fetch('/api/resolve-url', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: pastedText })
                });

                if (!response.ok) {
                    const errorBody = await response.json();
                    throw new Error(errorBody.message || 'Failed to resolve URL');
                }

                const data = await response.json();
                q = data.name;
                ll = data.ll;

            } catch (error: any) {
                console.error('Paste handler error:', error);
                pasteError = error.message;
                setTimeout(() => { pasteError = ''; }, 5000); // Clear error after 5s
            } finally {
                isLoading = false;
            }
        }
    }
</script>

<svelte:head>
    <title>{$_('title')}</title>
    <meta name="description" content={$_('subtitle')} />
</svelte:head>

<div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-10 px-4">
	<div class="w-full max-w-7xl">
        <nav class="flex justify-center gap-4 mb-8">
            <button class="text-gray-600 hover:text-blue-600 disabled:text-blue-600 disabled:font-bold" on:click={() => setLocale('zh-TW')} disabled={$locale === 'zh-TW'}>{$_('lang.zh-TW')}</button>
            <button class="text-gray-600 hover:text-blue-600 disabled:text-blue-600 disabled:font-bold" on:click={() => setLocale('en')} disabled={$locale === 'en'}>{$_('lang.en')}</button>
            <button class="text-gray-600 hover:text-blue-600 disabled:text-blue-600 disabled:font-bold" on:click={() => setLocale('ja')} disabled={$locale === 'ja'}>{$_('lang.ja')}</button>
        </nav>

		<header class="text-center mb-10">
			<h1 class="text-4xl font-bold text-blue-600">{$_('title')}</h1>
			<p class="text-gray-600 mt-2">{$_('subtitle')}</p>
		</header>

		<main class="bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <!-- Left Column: Controls -->
                <div class="flex flex-col space-y-6">
                    <!-- Generated URL -->
                    <div class="space-y-2">
                        <h2 class="text-xl font-semibold text-gray-900">{$_('section.generatedUrl')}</h2>
                        <div class="flex items-center space-x-2">
                            <input type="text" readonly value={generatedUrl} class="w-full bg-gray-200 text-gray-800 rounded-md p-3 border border-gray-300 font-mono text-sm">
                            <button on:click={copyToClipboard} class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out whitespace-nowrap">{$_(copyButtonTextKey)}</button>
                        </div>
                    </div>

                    <!-- General Settings -->
                    <div class="space-y-6 pt-4 border-t">
                        <h2 class="text-xl font-semibold text-gray-900">{$_('section.general')}</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="sm:col-span-2">
                                <label for="q" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.locationName')}</label>
                                <div class="relative">
                                    <input on:paste={handlePaste} type="text" id="q" bind:value={q} placeholder="貼上 Google Maps 短網址或輸入地點" class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-opacity" class:opacity-50={isLoading} disabled={isLoading}>
                                    {#if isLoading}
                                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">讀取中...</div>
                                    {/if}
                                </div>
                                {#if pasteError}
                                    <p class="mt-1 text-xs text-red-600">{pasteError}</p>
                                {/if}
                            </div>
                            <div>
                                <label for="ll" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.latlon')}</label>
                                <input type="text" id="ll" bind:value={ll} placeholder={$_('placeholder.latlon')} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
                            </div>
                             <div>
                                <label for="z" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.zoom')}</label>
                                <input type="number" id="z" bind:value={z} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
                                <p class="mt-1 text-xs text-gray-500">{$_('placeholder.zoom')}</p>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="address" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.address')}</label>
                                <input type="text" id="address" bind:value={address} placeholder={$_('placeholder.address')} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
                            </div>
                        </div>
                    </div>

                     <!-- Navigation Settings -->
                    <div class="space-y-6 pt-4 border-t">
                        <h2 class="text-xl font-semibold text-gray-900">{$_('section.navigation')}</h2>
                         <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="saddr" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.startPoint')}</label>
                                <input type="text" id="saddr" bind:value={saddr} placeholder={$_('placeholder.startPoint')} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
                            </div>
                            <div>
                                <label for="daddr" class="block text-sm font-medium text-gray-700 mb-1">{$_('label.destination')}</label>
                                <input type="text" id="daddr" bind:value={daddr} placeholder={$_('placeholder.destination')} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
                            </div>
                        </div>
                    </div>

                    <!-- Button Controls -->
                    <div class="space-y-4 pt-4 border-t">
                         <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">{$_('label.mapType')}</label>
                            <div class="isolate inline-flex rounded-md shadow-sm w-full">
                                <button on:click={() => t = ''} class="relative inline-flex items-center justify-center flex-1 rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={t===''} class:text-white={t===''} class:hover:bg-blue-700={t===''} class:text-gray-900={t!==''} class:hover:bg-gray-100={t!==''}>{$_('option.default')}</button>
                                <button on:click={() => t = 'm'} class="relative -ml-px inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={t==='m'} class:text-white={t==='m'} class:hover:bg-blue-700={t==='m'} class:text-gray-900={t!=='m'} class:hover:bg-gray-100={t!=='m'}>{$_('option.standard')}</button>
                                <button on:click={() => t = 'k'} class="relative -ml-px inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={t==='k'} class:text-white={t==='k'} class:hover:bg-blue-700={t==='k'} class:text-gray-900={t!=='k'} class:hover:bg-gray-100={t!=='k'}>{$_('option.satellite')}</button>
                                <button on:click={() => t = 'h'} class="relative -ml-px inline-flex items-center justify-center flex-1 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={t==='h'} class:text-white={t==='h'} class:hover:bg-blue-700={t==='h'} class:text-gray-900={t!=='h'} class:hover:bg-gray-100={t!=='h'}>{$_('option.hybrid')}</button>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">{$_('label.navMode')}</label>
                                <div class="isolate inline-flex rounded-md shadow-sm w-full">
                                    <button on:click={() => dirflg = ''} class="relative inline-flex items-center justify-center flex-1 rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={dirflg===''} class:text-white={dirflg===''} class:hover:bg-blue-700={dirflg===''} class:text-gray-900={dirflg!==''} class:hover:bg-gray-100={dirflg!==''}>{$_('option.unspecified')}</button>
                                    <button on:click={() => dirflg = 'd'} class="relative -ml-px inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={dirflg==='d'} class:text-white={dirflg==='d'} class:hover:bg-blue-700={dirflg==='d'} class:text-gray-900={dirflg!=='d'} class:hover:bg-gray-100={dirflg!=='d'}>{$_('option.driving')}</button>
                                    <button on:click={() => dirflg = 'w'} class="relative -ml-px inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={dirflg==='w'} class:text-white={dirflg==='w'} class:hover:bg-blue-700={dirflg==='w'} class:text-gray-900={dirflg!=='w'} class:hover:bg-gray-100={dirflg!=='w'}>{$_('option.walking')}</button>
                                    <button on:click={() => dirflg = 'r'} class="relative -ml-px inline-flex items-center justify-center flex-1 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={dirflg==='r'} class:text-white={dirflg==='r'} class:hover:bg-blue-700={dirflg==='r'} class:text-gray-900={dirflg!=='r'} class:hover:bg-gray-100={dirflg!=='r'}>{$_('option.transit')}</button>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">{$_('label.action')}</label>
                                <div class="isolate inline-flex rounded-md shadow-sm w-full">
                                    <button on:click={() => action = ''} class="relative inline-flex items-center justify-center flex-1 rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={action===''} class:text-white={action===''} class:hover:bg-blue-700={action===''} class:text-gray-900={action!==''} class:hover:bg-gray-100={action!==''}>{$_('option.default')}</button>
                                    <button on:click={() => action = 'map'} class="relative -ml-px inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={action==='map'} class:text-white={action==='map'} class:hover:bg-blue-700={action==='map'} class:text-gray-900={action!=='map'} class:hover:bg-gray-100={action!=='map'}>{$_('option.showMap')}</button>
                                    <button on:click={() => action = 'directions'} class="relative -ml-px inline-flex items-center justify-center flex-1 rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 transition-colors duration-150" class:bg-blue-600={action==='directions'} class:text-white={action==='directions'} class:hover:bg-blue-700={action==='directions'} class:text-gray-900={action!=='directions'} class:hover:bg-gray-100={action!=='directions'}>{$_('option.showDirections')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Map -->
                <div bind:this={mapContainer} class="min-h-[400px] lg:min-h-full w-full rounded-lg shadow-inner border border-gray-200 bg-gray-100" id="map-container">
                    <!-- Leaflet Map Renders Here -->
                </div>
            </div>
		</main>
	</div>
</div>
