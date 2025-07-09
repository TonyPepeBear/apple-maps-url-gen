<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let q: string;
	export let ll: string;
	export let z: number;
	export let address: string;
	export let isLoading: boolean;
	export let pasteError: string;
	export let handlePaste: (event: ClipboardEvent) => void;
</script>

<div class="space-y-6 border-t pt-4">
	<h2 class="text-xl font-semibold text-gray-900">{$_('section.general')}</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<div class="sm:col-span-2">
			<label for="q" class="mb-1 block text-sm font-medium text-gray-700"
				>{$_('label.locationName')}</label
			>
			<div class="relative">
				<input
					on:paste={handlePaste}
					type="text"
					id="q"
					bind:value={q}
					placeholder="貼上 Google Maps 短網址或輸入地點"
					class="w-full rounded-md border-gray-300 bg-gray-50 p-2 transition-opacity focus:border-blue-500 focus:ring-blue-500"
					class:opacity-50={isLoading}
					disabled={isLoading}
				/>
				{#if isLoading}
					<div class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
						讀取中...
					</div>
				{/if}
			</div>
			{#if pasteError}
				<p class="mt-1 text-xs text-red-600">{pasteError}</p>
			{/if}
		</div>
		<div>
			<label for="ll" class="mb-1 block text-sm font-medium text-gray-700"
				>{$_('label.latlon')}</label
			>
			<input
				type="text"
				id="ll"
				bind:value={ll}
				placeholder={$_('placeholder.latlon')}
				class="w-full rounded-md border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring-blue-500"
			/>
		</div>
		<div>
			<label for="z" class="mb-1 block text-sm font-medium text-gray-700">{$_('label.zoom')}</label>
			<input
				type="number"
				id="z"
				bind:value={z}
				class="w-full rounded-md border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring-blue-500"
			/>
			<p class="mt-1 text-xs text-gray-500">{$_('placeholder.zoom')}</p>
		</div>
		<div class="sm:col-span-2">
			<label for="address" class="mb-1 block text-sm font-medium text-gray-700"
				>{$_('label.address')}</label
			>
			<input
				type="text"
				id="address"
				bind:value={address}
				placeholder={$_('placeholder.address')}
				class="w-full rounded-md border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring-blue-500"
			/>
		</div>
	</div>
</div>
