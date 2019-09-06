import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { setDefaults } from '@storybook/addon-info';

setDefaults({
  inline: false,
  header: true,
  source: true,
});

setTimeout(() => setOptions({
  name: 'EDX COOKIE POLICY BANNER',
  url: 'https://github.com/edx/frontend-component-cookie-policy-banner',
  showAddonPanel: true,
  addonPanelInRight: true,
}), 1000);

function loadStories() {
  require('../src/CookiePolicyBanner/CookiePolicyBanner.stories.jsx');
}

configure(loadStories, module);
