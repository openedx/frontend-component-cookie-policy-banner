import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import CookieBanner from './index';

storiesOf('Cookie Banner', CookieBanner)
  .add('basic usage', () => (<CookieBanner />));
