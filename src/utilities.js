import Cookie from 'universal-cookie';

import { DEFAULT_IETF_TAG, LANGUAGE_CODES, STAGE_ENVIRONMENTS } from './constants';

const isStage = () => {
  const host = window.location.hostname;

  return STAGE_ENVIRONMENTS.filter(environment => host.indexOf(environment) > -1).length > 0;
};

const isProduction = () => {
  const host = window.location.hostname;

  return !isStage() && host.indexOf('.edx.org') !== -1;
};

const getLanguageCode = () => {
  const cookie = new Cookie('edx.org');
  const languageCode = isProduction() ? cookie.get('prod-edx-language-preference') : cookie.get('stage-edx-language-preference');

  if (!!languageCode || LANGUAGE_CODES.indexOf(languageCode) <= -1) {
    return DEFAULT_IETF_TAG;
  }

  return languageCode;
};

const createHasViewedCookieBanner = () => {
  const path = '/';

  // Setting maxAge to 2^31 -1
  // because Number.SAFE_MAX_INTEGER does not get processed properly by the browser
  // nor does the max Date defined in http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.1
  const maxAge = 2147483647;

  if (isStage()) {
    return new Cookie().set('edx-cookie-policy-viewed', true, { domain: '.stage.edx.org', path, maxAge });
  } else if (isProduction()) {
    return new Cookie().set('edx-cookie-policy-viewed', true, { domain: '.edx.org', path, maxAge });
  }

  return false;
};

const hasViewedCookieBanner = () => {
  const cookie = new Cookie().get('edx-cookie-policy-viewed');

  return !!cookie;
};

export {
  getLanguageCode,
  createHasViewedCookieBanner,
  hasViewedCookieBanner,
};
