<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Map, Marker } from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	import Header from '$lib/components/Header.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import GeneratedUrl from '$lib/components/GeneratedUrl.svelte';
	import GeneralSettings from '$lib/components/GeneralSettings.svelte';
	import NavigationSettings from '$lib/components/NavigationSettings.svelte';
	import ButtonControls from '$lib/components/ButtonControls.svelte';
	import MapComponent from '$lib/components/Map.svelte';

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
	let mapInstance: Map | undefined;
	let markerInstance: Marker | undefined;

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
			setTimeout(() => {
				copyButtonTextKey = 'button.copy';
			}, 2000);
		} catch (err) {
			copyButtonTextKey = 'button.copyFailed';
		}
	}

	async function handlePaste(event: ClipboardEvent) {
		const pastedText = event.clipboardData?.getData('text');
		if (
			pastedText &&
			(pastedText.includes('maps.app.goo.gl') || pastedText.includes('goo.gl/maps'))
		) {
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
					const errorBody = (await response.json()) as { message?: string };
					throw new Error(errorBody.message || 'Failed to resolve URL');
				}

				const data = (await response.json()) as { name: string; ll: string };
				q = data.name;
				ll = data.ll;
			} catch (error: any) {
				console.error('Paste handler error:', error);
				pasteError = error.message;
				setTimeout(() => {
					pasteError = '';
				}, 5000); // Clear error after 5s
			} finally {
				isLoading = false;
			}
		}
	}

	async function readFromClipboard() {
		try {
			const clipboardText = await navigator.clipboard.readText();
			if (
				clipboardText &&
				(clipboardText.includes('maps.app.goo.gl') || clipboardText.includes('goo.gl/maps'))
			) {
				isLoading = true;
				pasteError = '';
				try {
					const response = await fetch('/api/resolve-url', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ url: clipboardText })
					});

					if (!response.ok) {
						const errorBody = (await response.json()) as { message?: string };
						throw new Error(errorBody.message || 'Failed to resolve URL');
					}

					const data = (await response.json()) as { name: string; ll: string };
					q = data.name;
					ll = data.ll;
				} catch (error: any) {
					console.error('Clipboard read error:', error);
					pasteError = error.message;
					setTimeout(() => {
						pasteError = '';
					}, 5000); // Clear error after 5s
				} finally {
					isLoading = false;
				}
			} else {
				pasteError = '剪貼簿中沒有有效的 Google Maps 網址';
				setTimeout(() => {
					pasteError = '';
				}, 3000);
			}
		} catch (error: any) {
			console.error('Clipboard access error:', error);
			pasteError = '無法存取剪貼簿，請確認瀏覽器權限';
			setTimeout(() => {
				pasteError = '';
			}, 3000);
		}
	}
</script>

<svelte:head>
	<title>{$_('title')}</title>
	<meta name="description" content={$_('subtitle')} />
</svelte:head>

<div class="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-10 text-gray-800">
	<div class="w-full max-w-7xl">
		<LanguageSwitcher />
		<Header />

		<main class="rounded-xl bg-white p-6 shadow-lg md:p-8">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
				<!-- Left Column: Controls -->
				<div class="flex flex-col space-y-6">
					<GeneratedUrl {generatedUrl} {copyButtonTextKey} {copyToClipboard} />
					<GeneralSettings
						bind:q
						bind:ll
						bind:z
						bind:address
						{isLoading}
						{pasteError}
						{readFromClipboard}
					/>
					<NavigationSettings bind:saddr bind:daddr />
					<ButtonControls bind:t bind:dirflg bind:action />
				</div>

				<!-- Right Column: Map -->
				<MapComponent bind:ll bind:mapInstance bind:markerInstance />
			</div>
		</main>
	</div>
</div>
