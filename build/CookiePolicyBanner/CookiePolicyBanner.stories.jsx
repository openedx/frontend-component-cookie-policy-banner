import React from 'react';
import { storiesOf } from '@storybook/react';
import CookiePolicyBanner from './index';

import './_storybook-styles.scss';

storiesOf('Cookie Policy Banner', CookiePolicyBanner)
  .add('basic usage', () => (<CookiePolicyBanner />))
  .add('languageCode "es" override', () => (<CookiePolicyBanner languageCode="es" />))
  .add('languageCode "en" override', () => (<CookiePolicyBanner languageCode="en" />))
  .add('languageCode override with unsupported language', () => (<CookiePolicyBanner languageCode="notsupported" />));
