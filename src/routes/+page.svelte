<script lang="ts">
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

	// --- Copy to clipboard functionality ---
	let copyButtonText = '複製連結';
	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(generatedUrl);
			copyButtonText = '已複製！';
			setTimeout(() => {
				copyButtonText = '複製連結';
			}, 2000);
		} catch (err) {
			copyButtonText = '複製失敗';
			console.error('Failed to copy: ', err);
		}
	}
</script>

<svelte:head>
    <title>Apple Maps URL 產生器</title>
    <meta name="description" content="一個用來產生 Apple Maps URL 的工具，可以自訂地點、路線、地圖類型等參數。" />
</svelte:head>

<div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-10 px-4">
	<div class="w-full max-w-4xl">
		<header class="text-center mb-10">
			<h1 class="text-4xl font-bold text-blue-600">Apple Maps URL 產生器</h1>
			<p class="text-gray-600 mt-2">輕鬆建立自訂的 Apple Maps 連結</p>
		</header>

		<main class="bg-white p-8 rounded-xl shadow-lg">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				
				<!-- General Settings -->
				<div class="space-y-6">
					<h2 class="text-2xl font-semibold border-b-2 border-blue-500 pb-2 text-gray-900">基本地圖設定</h2>
					<div>
						<label for="q" class="block text-sm font-medium text-gray-700 mb-1">地點名稱</label>
						<input type="text" id="q" bind:value={q} placeholder="例如：Taipei 101" class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
					</div>
					<div>
						<label for="ll" class="block text-sm font-medium text-gray-700 mb-1">中心經緯度</label>
						<input type="text" id="ll" bind:value={ll} placeholder="緯度,經度 (例如：25.033,121.564)" class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
					</div>
					<div>
						<label for="address" class="block text-sm font-medium text-gray-700 mb-1">地址</label>
						<input type="text" id="address" bind:value={address} placeholder="例如：台北市信義區市府路45號" class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
					</div>
					<div>
						<label for="z" class="block text-sm font-medium text-gray-700 mb-1">縮放等級</label>
						<input type="number" id="z" bind:value={z} placeholder="例如：16 (數值越大越近)" class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
					</div>
					<div>
						<label for="t" class="block text-sm font-medium text-gray-700 mb-1">地圖樣式</label>
						<select id="t" bind:value={t} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
							<option value="">預設</option>
							<option value="m">標準 (Standard)</option>
							<option value="k">衛星 (Satellite)</option>
							<option value="h">混合 (Hybrid)</option>
						</select>
					</div>
				</div>

				<!-- Navigation Settings -->
				<div class="space-y-6">
					<h2 class="text-2xl font-semibold border-b-2 border-blue-500 pb-2 text-gray-900">導航設定</h2>
					<div>
						<label for="saddr" class="block text-sm font-medium text-gray-700 mb-1">起點</label>
						<input type="text" id="saddr" bind:value={saddr} placeholder="Current Location 或地址/經緯度" class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
					</div>
					<div>
						<label for="daddr" class="block text-sm font-medium text-gray-700 mb-1">目的地</label>
						<input type="text" id="daddr" bind:value={daddr} placeholder="地址或經緯度" class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
					</div>
					<div>
						<label for="dirflg" class="block text-sm font-medium text-gray-700 mb-1">導航模式</label>
						<select id="dirflg" bind:value={dirflg} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
							<option value="">未指定</option>
							<option value="d">駕車 (Driving)</option>
							<option value="w">步行 (Walking)</option>
							<option value="r">大眾運輸 (Transit)</option>
						</select>
					</div>
					<div>
						<label for="action" class="block text-sm font-medium text-gray-700 mb-1">動作</label>
						<select id="action" bind:value={action} class="w-full bg-gray-50 border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
							<option value="">預設</option>
							<option value="map">顯示地圖 (map)</option>
							<option value="directions">顯示路線 (directions)</option>
						</select>
					</div>
				</div>
			</div>

			<!-- Generated URL Display -->
			<div class="mt-10">
				<h2 class="text-xl font-semibold mb-2 text-gray-900">產生的連結</h2>
				<div class="flex items-center space-x-2">
					<input type="text" readonly value={generatedUrl} class="w-full bg-gray-200 text-gray-800 rounded-md p-3 border border-gray-300 font-mono text-sm">
					<button on:click={copyToClipboard} class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out whitespace-nowrap">
						{copyButtonText}
					</button>
				</div>
			</div>
		</main>

		<footer class="text-center mt-10 text-gray-500">
			<p>由 Gemini 為您打造 ✨</p>
		</footer>
	</div>
</div>
