import React from 'react';
import { storiesOf } from '@storybook/react';
import CookiePolicyBanner from './index';
import './_cookie-policy-banner.scss';

storiesOf('Cookie Policy Banner', CookiePolicyBanner)
  .add('basic usage', () => (<CookiePolicyBanner />));
