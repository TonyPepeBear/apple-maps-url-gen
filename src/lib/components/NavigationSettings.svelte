<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let saddr: string;
	export let daddr: string;
</script>

<div class="space-y-6 border-t pt-4">
	<h2 class="text-xl font-semibold text-gray-900">{$_('section.navigation')}</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<div>
			<label for="saddr" class="mb-1 block text-sm font-medium text-gray-700"
				>{$_('label.startPoint')}</label
			>
			<input
				type="text"
				id="saddr"
				bind:value={saddr}
				placeholder={$_('placeholder.startPoint')}
				class="w-full rounded-md border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring-blue-500"
			/>
		</div>
		<div>
			<label for="daddr" class="mb-1 block text-sm font-medium text-gray-700"
				>{$_('label.destination')}</label
			>
			<input
				type="text"
				id="daddr"
				bind:value={daddr}
				placeholder={$_('placeholder.destination')}
				class="w-full rounded-md border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring-blue-500"
			/>
		</div>
	</div>
</div>
