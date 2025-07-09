<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let q: string;
	export let ll: string;
	export let z: number;
	export let address: string;
	export let isLoading: boolean;
	export let pasteError: string;
	export let readFromClipboard: () => Promise<void>;
</script>

<div class="space-y-6 border-t pt-4">
	<h2 class="text-xl font-semibold text-gray-900">{$_('section.general')}</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<div class="sm:col-span-2">
			<label for="q" class="mb-1 block text-sm font-medium text-gray-700"
				>{$_('label.locationName')}</label
			>
			<div class="flex gap-2">
				<div class="relative flex-1">
					<input
						type="text"
						id="q"
						bind:value={q}
						placeholder={$_('placeholder.locationName')}
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
				<button
					type="button"
					on:click={readFromClipboard}
					disabled={isLoading}
					class="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					title={$_('button.pasteFromClipboard')}
				>
					<svg
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						></path>
					</svg>
					<span class="ml-1 hidden sm:inline">{$_('button.pasteFromClipboard')}</span>
				</button>
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
