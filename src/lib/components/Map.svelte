<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Map, Marker, LatLng } from 'leaflet';

	export let ll: string;
	export let mapInstance: Map | undefined;
	export let markerInstance: Marker | undefined;

	let L: typeof import('leaflet');
	let mapContainer: HTMLElement;

	onMount(async () => {
		L = (await import('leaflet')).default;
		const map = L.map(mapContainer).setView([25.0339, 121.5645], 16); // Taipei 101
		L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
		}).addTo(map);
		const marker = L.marker(map.getCenter()).addTo(map);
		map.on('click', (e) => {
			const newCoords = e.latlng;
			marker.setLatLng(newCoords);
			ll = `${newCoords.lat.toFixed(5)},${newCoords.lng.toFixed(5)}`;
		});
		mapInstance = map;
		markerInstance = marker;
	});

	onDestroy(() => {
		if (mapInstance) {
			mapInstance.remove();
		}
	});

	$: if (ll && mapInstance && L && markerInstance) {
		const parts = ll.split(',').map((s) => parseFloat(s.trim()));
		if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
			const newLatLng = L.latLng(parts[0], parts[1]);
			mapInstance.setView(newLatLng, mapInstance.getZoom() || 13);
			markerInstance.setLatLng(newLatLng);
		}
	}
</script>

<div
	bind:this={mapContainer}
	class="min-h-[400px] w-full rounded-lg border border-gray-200 bg-gray-100 shadow-inner lg:min-h-full"
	id="map-container"
>
	<!-- Leaflet Map Renders Here -->
</div>
