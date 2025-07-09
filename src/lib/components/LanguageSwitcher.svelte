<script lang="ts">
	import { _, locale } from 'svelte-i18n';

	const setLocale = (lang: string) => {
		locale.set(lang);
	};
</script>

<nav class="mb-8 flex justify-center gap-4">
	<button
		class="text-gray-600 hover:text-blue-600 disabled:font-bold disabled:text-blue-600"
		on:click={() => setLocale('zh-TW')}
		disabled={$locale === 'zh-TW'}>{$_('lang.zh-TW')}</button
	>
	<button
		class="text-gray-600 hover:text-blue-600 disabled:font-bold disabled:text-blue-600"
		on:click={() => setLocale('en')}
		disabled={$locale === 'en'}>{$_('lang.en')}</button
	>
	<button
		class="text-gray-600 hover:text-blue-600 disabled:font-bold disabled:text-blue-600"
		on:click={() => setLocale('ja')}
		disabled={$locale === 'ja'}>{$_('lang.ja')}</button
	>
</nav>
