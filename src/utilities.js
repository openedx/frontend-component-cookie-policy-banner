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

const createHasViewedCookieBanner = () => {
  const host = window.location.hostname;

  // edx.org uses different subdomains so use a root domain to match across services
  if (host.indexOf('stage.edx.org') !== -1 ||
      host.indexOf('dev.edx.org') !== -1 ||
      host.indexOf('acceptance.edx.org') !== -1 ||
      host.indexOf('qa.edx.org') !== -1) {
    return new Cookie('edx.org').set('edx-cookie-policy-viewed', true, { domain: '.stage.edx.org' });
  } else if (host.indexOf('.edx.org') !== -1) {
    return new Cookie('edx.org').set('edx-cookie-policy-viewed', true, { domain: '.edx.org' });
  }

  return false;
};

const hasViewedCookieBanner = () => !!new Cookie('edx.org').get('edx-cookie-policy-viewed');

export {
  getLanguageCode,
  createHasViewedCookieBanner,
  hasViewedCookieBanner,
};
