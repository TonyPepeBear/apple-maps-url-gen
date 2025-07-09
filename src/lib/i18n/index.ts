import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./en.json'));
register('ja', () => import('./ja.json'));
register('zh-TW', () => import('./zh-TW.json'));

init({
    fallbackLocale: 'zh-TW',
    initialLocale: getLocaleFromNavigator(),
});
