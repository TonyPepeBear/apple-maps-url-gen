<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let t: string;
	export let dirflg: string;
	export let action: string;
</script>

<div class="space-y-4 border-t pt-4">
	<div class="space-y-2" role="group" aria-labelledby="map-type-label">
		<div id="map-type-label" class="block text-sm font-medium text-gray-700">
			{$_('label.mapType')}
		</div>
		<div class="isolate inline-flex w-full rounded-md shadow-sm">
			<button
				on:click={() => (t = '')}
				class="relative inline-flex flex-1 items-center justify-center rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 transition-colors duration-150 ring-inset focus:z-10"
				class:bg-blue-600={t === ''}
				class:text-white={t === ''}
				class:hover:bg-blue-700={t === ''}
				class:text-gray-900={t !== ''}
				class:hover:bg-gray-100={t !== ''}>{$_('option.default')}</button
			>
			<button
				on:click={() => (t = 'm')}
				class="relative -ml-px inline-flex flex-1 items-center justify-center px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 transition-colors duration-150 ring-inset focus:z-10"
				class:bg-blue-600={t === 'm'}
				class:text-white={t === 'm'}
				class:hover:bg-blue-700={t === 'm'}
				class:text-gray-900={t !== 'm'}
				class:hover:bg-gray-100={t !== 'm'}>{$_('option.standard')}</button
			>
			<button
				on:click={() => (t = 'k')}
				class="relative -ml-px inline-flex flex-1 items-center justify-center px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 transition-colors duration-150 ring-inset focus:z-10"
				class:bg-blue-600={t === 'k'}
				class:text-white={t === 'k'}
				class:hover:bg-blue-700={t === 'k'}
				class:text-gray-900={t !== 'k'}
				class:hover:bg-gray-100={t !== 'k'}>{$_('option.satellite')}</button
			>
			<button
				on:click={() => (t = 'h')}
				class="relative -ml-px inline-flex flex-1 items-center justify-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 transition-colors duration-150 ring-inset focus:z-10"
				class:bg-blue-600={t === 'h'}
				class:text-white={t === 'h'}
				class:hover:bg-blue-700={t === 'h'}
				class:text-gray-900={t !== 'h'}
				class:hover:bg-gray-100={t !== 'h'}>{$_('option.hybrid')}</button
			>
		</div>
	</div>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<div class="space-y-2" role="group" aria-labelledby="nav-mode-label">
			<div id="nav-mode-label" class="block text-sm font-medium text-gray-700">
				{$_('label.navMode')}
			</div>
			<div class="isolate inline-flex w-full rounded-md shadow-sm">
				<button
					on:click={() => (dirflg = '')}
					class="relative inline-flex flex-1 items-center justify-center rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 transition-colors duration-150 ring-inset focus:z-10"
					class:bg-blue-600={dirflg === ''}
					class:text-white={dirflg === ''}
					class:hover:bg-blue-700={dirflg === ''}
					class:text-gray-900={dirflg !== ''}
					class:hover:bg-gray-100={dirflg !== ''}>{$_('option.unspecified')}</button
				>
				<button
					on:click={() => (dirflg = 'd')}
					class="relative -ml-px inline-flex flex-1 items-center justify-center px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 transition-colors duration-150 ring-inset focus:z-10"
					class:bg-blue-600={dirflg === 'd'}
					class:text-white={dirflg === 'd'}
					class:hover:bg-blue-700={dirflg === 'd'}
					class:text-gray-900={dirflg !== 'd'}
					class:hover:bg-gray-100={dirflg !== 'd'}>{$_('option.driving')}</button
				>
				<button
					on:click={() => (dirflg = 'w')}
					class="relative -ml-px inline-flex flex-1 items-center justify-center px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 transition-colors duration-150 ring-inset focus:z-10"
					class:bg-blue-600={dirflg === 'w'}
					class:text-white={dirflg === 'w'}
					class:hover:bg-blue-700={dirflg === 'w'}
					class:text-gray-900={dirflg !== 'w'}
					class:hover:bg-gray-100={dirflg !== 'w'}>{$_('option.walking')}</button
				>
				<button
					on:click={() => (dirflg = 'r')}
					class="relative -ml-px inline-flex flex-1 items-center justify-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 transition-colors duration-150 ring-inset focus:z-10"
					class:bg-blue-600={dirflg === 'r'}
					class:text-white={dirflg === 'r'}
					class:hover:bg-blue-700={dirflg === 'r'}
					class:text-gray-900={dirflg !== 'r'}
					class:hover:bg-gray-100={dirflg !== 'r'}>{$_('option.transit')}</button
				>
			</div>
		</div>
		<div class="space-y-2" role="group" aria-labelledby="action-label">
			<div id="action-label" class="block text-sm font-medium text-gray-700">
				{$_('label.action')}
			</div>
			<div class="isolate inline-flex w-full rounded-md shadow-sm">
				<button
					on:click={() => (action = '')}
					class="relative inline-flex flex-1 items-center justify-center rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 transition-colors duration-150 ring-inset focus:z-10"
					class:bg-blue-600={action === ''}
					class:text-white={action === ''}
					class:hover:bg-blue-700={action === ''}
					class:text-gray-900={action !== ''}
					class:hover:bg-gray-100={action !== ''}>{$_('option.default')}</button
				>
				<button
					on:click={() => (action = 'map')}
					class="relative -ml-px inline-flex flex-1 items-center justify-center px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 transition-colors duration-150 ring-inset focus:z-10"
					class:bg-blue-600={action === 'map'}
					class:text-white={action === 'map'}
					class:hover:bg-blue-700={action === 'map'}
					class:text-gray-900={action !== 'map'}
					class:hover:bg-gray-100={action !== 'map'}>{$_('option.showMap')}</button
				>
				<button
					on:click={() => (action = 'directions')}
					class="relative -ml-px inline-flex flex-1 items-center justify-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 transition-colors duration-150 ring-inset focus:z-10"
					class:bg-blue-600={action === 'directions'}
					class:text-white={action === 'directions'}
					class:hover:bg-blue-700={action === 'directions'}
					class:text-gray-900={action !== 'directions'}
					class:hover:bg-gray-100={action !== 'directions'}>{$_('option.showDirections')}</button
				>
			</div>
		</div>
	</div>
</div>
