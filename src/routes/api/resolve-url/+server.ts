import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as { url?: string };
	const { url: shortUrl } = body;

	if (!shortUrl || !(shortUrl.includes('maps.app.goo.gl') || shortUrl.includes('goo.gl/maps'))) {
		throw error(400, 'Invalid Google Maps short URL');
	}

	try {
		// Use HEAD request with manual redirect to capture the Location header efficiently
		const response = await fetch(shortUrl, { method: 'HEAD', redirect: 'manual' });
		const fullUrl = response.headers.get('location');

		if (!fullUrl) {
			// Fallback for some URL types that might not respond to HEAD
			const getResponse = await fetch(shortUrl, { redirect: 'manual' });
			const fullUrlFromGet = getResponse.headers.get('location');
			if (!fullUrlFromGet) {
				throw error(500, 'Could not resolve the short URL.');
			}
			return parseFullUrl(fullUrlFromGet);
		}

		return parseFullUrl(fullUrl);
	} catch (e) {
		console.error(e);
		if (e instanceof Error) {
			throw error(500, `An error occurred: ${e.message}`);
		}
		throw error(500, 'An unknown error occurred while resolving the URL.');
	}
};

function parseFullUrl(fullUrl: string) {
	// Regex for precise coordinates from the data block: !3d<lat>!4d<lon>
	const preciseCoordsRegex = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;
	// Regex for viewport coordinates as a fallback: @<lat>,<lon>
	const viewportCoordsRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
	// Regex for the place name
	const placeRegex = /place\/([^\/]+)\//;

	const placeMatch = fullUrl.match(placeRegex);
	const preciseCoordsMatch = fullUrl.match(preciseCoordsRegex);
	const viewportCoordsMatch = fullUrl.match(viewportCoordsRegex);

	let lat: string, lon: string;

	if (preciseCoordsMatch) {
		// Prefer the precise coordinates if available
		lat = preciseCoordsMatch[1];
		lon = preciseCoordsMatch[2];
	} else if (viewportCoordsMatch) {
		// Fallback to viewport coordinates
		lat = viewportCoordsMatch[1];
		lon = viewportCoordsMatch[2];
	} else {
		throw error(500, 'Could not parse coordinates from the full URL.');
	}

	let placeName = '';
	if (placeMatch && placeMatch[1]) {
		placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
	} else {
		placeName = 'Pasted Location'; // Default name if only coordinates are found
	}

	return json({
		name: placeName,
		ll: `${parseFloat(lat).toFixed(5)},${parseFloat(lon).toFixed(5)}`
	});
}
