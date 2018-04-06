import React from 'react';
import { storiesOf } from '@storybook/react';
import CookieBanner from './index';
import './_cookie-banner.scss';

storiesOf('Cookie Banner', CookieBanner)
  .add('basic usage', () => (<CookieBanner />));
