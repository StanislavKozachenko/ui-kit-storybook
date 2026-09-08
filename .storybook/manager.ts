import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

const applyManagerTheme = (theme: unknown) => {
    addons.setConfig({
        theme: theme === 'dark' ? themes.dark : themes.light,
    });
};

addons.setConfig({
    theme: themes.light,
});

const channel = addons.getChannel();

channel.on('setGlobals', ({ globals }: { globals?: Record<string, unknown> }) => {
    if (globals && 'theme' in globals) applyManagerTheme(globals.theme);
});

channel.on('globalsUpdated', ({ globals }: { globals?: Record<string, unknown> }) => {
    if (globals && 'theme' in globals) applyManagerTheme(globals.theme);
});
