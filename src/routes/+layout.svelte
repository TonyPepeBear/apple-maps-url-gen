<script>
    import "../app.css";
    import { locale, waitLocale } from 'svelte-i18n';
    import '$lib/i18n'; // Import to initialize
</script>

{#await waitLocale()}
    <!-- You can add a loading spinner here -->
{:then}
    <div lang={$locale ?? 'zh-TW'}>
        <slot />
    </div>
{/await}