<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let generatedUrl: string;
	export let copyButtonTextKey: string;
	export let copyToClipboard: () => void;
</script>

<div class="space-y-2">
	<h2 class="text-xl font-semibold text-gray-900">{$_('section.generatedUrl')}</h2>
	<div class="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
		<input
			type="text"
			readonly
			value={generatedUrl}
			class="flex-grow rounded-md border border-gray-300 bg-gray-200 p-3 font-mono text-sm text-gray-800"
		/>
		<button
			on:click={copyToClipboard}
			class="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-bold text-white transition-colors duration-200 ease-in-out hover:bg-blue-700"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="h-5 w-5"
				><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
					d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
				/></svg
			>
			<span>{$_(copyButtonTextKey)}</span></button
		>
		<button
			on:click={() => window.open(generatedUrl, '_blank')}
			class="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 font-bold text-white transition-colors duration-200 ease-in-out hover:bg-green-700"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="h-5 w-5"
				><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
					points="15 3 21 3 21 9"
				/><line x1="10" x2="21" y1="14" y2="3" /></svg
			>
			<span>{$_('button.openInNewWindow')}</span></button
		>
	</div>
</div>
