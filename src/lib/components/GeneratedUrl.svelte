<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let generatedUrl: string;
	export let copyButtonTextKey: string;
	export let copyToClipboard: () => void;
</script>

<div class="space-y-2">
	<h2 class="text-xl font-semibold text-gray-900">{$_('section.generatedUrl')}</h2>
	<div class="flex items-center space-x-2">
		<input
			type="text"
			readonly
			value={generatedUrl}
			class="w-full rounded-md border border-gray-300 bg-gray-200 p-3 font-mono text-sm text-gray-800"
		/>
		<button
			on:click={copyToClipboard}
			class="rounded-md bg-blue-600 px-6 py-3 font-bold whitespace-nowrap text-white transition-colors duration-200 ease-in-out hover:bg-blue-700"
			>{$_(copyButtonTextKey)}</button
		>
	</div>
</div>
