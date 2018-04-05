import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import CookieBanner from './index';
import styles from './_cookie-banner.scss';

storiesOf('Cookie Banner', CookieBanner)
  .add('basic usage', () => (<CookieBanner />));
