import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { setDefaults } from '@storybook/addon-info';

setDefaults({
  inline: false,
  header: true,
  source: true,
});

setTimeout(() => setOptions({
  name: 'EDX COOKIE BANNER',
  url: 'https://github.com/jaebradley/edx-cookie-banner',
  showAddonPanel: true,
  addonPanelInRight: true,
}), 1000);

function loadStories() {
  require('../src/CookieBanner/CookieBanner.stories.jsx');
}

configure(loadStories, module);
