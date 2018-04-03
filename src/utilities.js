import Cookie from 'universal-cookie';

import { DEFAULT_IETF_TAG, LANGUAGE_CODES } from './constants';

const getLanguageCode = () => {
  const cookie = new Cookie('edx.org');
  const languageCode = cookie.get('prod-edx-language-preference');

  if (!!languageCode || LANGUAGE_CODES.indexOf(languageCode) <= -1) {
    return DEFAULT_IETF_TAG;
  }

  return languageCode;
};

const createHasViewedCookieBanner = () => new Cookie('edx.org').set('has-viewed-cookie', true);

const hasViewedCookieBanner = () => !!new Cookie('edx.org').get('has-viewed-cookie');

export {
  getLanguageCode,
  createHasViewedCookieBanner,
  hasViewedCookieBanner,
};
