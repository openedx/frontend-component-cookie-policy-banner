import Cookie from 'universal-cookie';

import {
  DEFAULT_IETF_TAG,
  LANGUAGE_CODES,
  STAGE_ENVIRONMENTS,
  LOCALHOST,
  COOKIE_POLICY_VIEWED_NAME,
} from './constants';

const isLocalhost = () => window.location.hostname.indexOf(LOCALHOST) >= 0;

const firstMatchingStageEnvironment = () => {
  const matches = STAGE_ENVIRONMENTS
    .filter(environment => window.location.hostname.indexOf(environment) >= 0);

  if (matches.length > 0) {
    return matches[0];
  }

  return null;
};

const isStage = () => !!firstMatchingStageEnvironment();

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

  if (isLocalhost()) {
    return new Cookie().set(
      COOKIE_POLICY_VIEWED_NAME,
      true,
      { domain: LOCALHOST, path, maxAge },
    );
  }

  if (isStage()) {
    return new Cookie().set(
      COOKIE_POLICY_VIEWED_NAME,
      true,
      { domain: `.${firstMatchingStageEnvironment()}`, path, maxAge },
    );
  }

  if (isProduction()) {
    return new Cookie().set(
      COOKIE_POLICY_VIEWED_NAME,
      true,
      { domain: '.edx.org', path, maxAge },
    );
  }

  return false;
};

const hasViewedCookieBanner = () => {
  const cookie = new Cookie().get(COOKIE_POLICY_VIEWED_NAME);

  return !!cookie;
};

export {
  getLanguageCode,
  createHasViewedCookieBanner,
  hasViewedCookieBanner,
  isLocalhost,
  firstMatchingStageEnvironment,
  isStage,
};
