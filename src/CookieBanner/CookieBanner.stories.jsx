import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import CookieBanner from './index';
import styles from './CookieBanner.scss';

storiesOf('Cookie Banner', CookieBanner)
  .add('basic usage', () => (<CookieBanner />));
