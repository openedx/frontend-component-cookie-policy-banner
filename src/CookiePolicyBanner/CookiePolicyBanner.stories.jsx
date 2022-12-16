import React from 'react';
import { storiesOf } from '@storybook/react';
import CookiePolicyBanner from './index';
import { SPANISH_IETF_TAG, ENGLISH_IETF_TAG } from '../constants';

import './_storybook-styles.scss';

const policyText = {
  [SPANISH_IETF_TAG]: 'Hemos actualizado nuestra <a href="https://edx.org/es/edx-privacy-policy" class="policy-link" target = "_blank">Política de Privacidad</a> para mejor reflejar cómo coleccionamos, usamos y compartimos sus datos.',
  [ENGLISH_IETF_TAG]: 'We\'ve updated our <a href="https://edx.org/edx-privacy-policy" class="policy-link" target = "_blank">Privacy Policy</a> to better reflect how we collect, use and share your data.',
};
storiesOf('Cookie Policy Banner', CookiePolicyBanner)
  .add('basic usage', () => (<CookiePolicyBanner />))
  .add('overridden policy text', () => (<CookiePolicyBanner policyText={policyText} />))
  .add('languageCode "es" override', () => (<CookiePolicyBanner languageCode="es" />))
  .add('languageCode "es" overridden policy text', () => (<CookiePolicyBanner policyText={policyText} languageCode="es" />))
  .add('languageCode "en" override', () => (<CookiePolicyBanner languageCode="en" />))
  .add('languageCode "en" overridden policy text', () => (<CookiePolicyBanner policyText={policyText} languageCode="en" />))
  .add('languageCode override with unsupported language', () => (<CookiePolicyBanner languageCode="notsupported" />))
  .add('languageCode "notsupported" overridden policy text', () => (<CookiePolicyBanner policyText={policyText} languageCode="notsupported" />));
