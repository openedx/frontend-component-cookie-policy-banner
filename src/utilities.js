import Cookie from 'universal-cookie';

import {
  DEFAULT_IETF_TAG,
  IETF_TAGS,
  STAGE_ENVIRONMENTS,
  LANGUAGE_CODE_TO_IETF_TAGS,
  LOCALHOST,
  COOKIE_POLICY_VIEWED_NAME,
} from './constants';

const firstMatchingStageEnvironment = () => {
  const matches = Object.keys(STAGE_ENVIRONMENTS)
    .filter(key => window.location.hostname.indexOf(STAGE_ENVIRONMENTS[key].baseURL) >= 0);

  if (matches.length > 0) {
    return STAGE_ENVIRONMENTS[matches[0]];
  }

  return null;
};

// Setting path to '/' to be apply to all subdomains
// Setting maxAge to 2^31 -1
// because Number.SAFE_MAX_INTEGER does not get processed properly by the browser
// nor does the max Date defined in http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.1
const buildCookieCreationData = ({ prefix, domain }) => ({
  cookieName: `${prefix}-${COOKIE_POLICY_VIEWED_NAME}`,
  domain,
  path: '/',
  maxAge: 2147483647,
});

const getCookieCreationData = () => {
  if (window.location.hostname.indexOf(LOCALHOST) >= 0) {
    return buildCookieCreationData({
      prefix: LOCALHOST,
      domain: LOCALHOST,
    });
  }

  const stageEnvironment = firstMatchingStageEnvironment();

  if (stageEnvironment) {
    return buildCookieCreationData({
      prefix: stageEnvironment.prefix,
      domain: `.${stageEnvironment.baseURL}`,
    });
  }

  if (window.location.hostname.indexOf('.edx.org') >= 0) {
    return buildCookieCreationData({
      prefix: 'prod',
      domain: '.edx.org',
    });
  }

  return null;
};

const isProduction = () => !firstMatchingStageEnvironment()
  && window.location.hostname.indexOf(LOCALHOST) < 0
  && window.location.hostname.indexOf('.edx.org') >= 0;

const getIETFTag = () => {
  const cookie = new Cookie('edx.org');
  const ietfTag = isProduction() ? cookie.get('prod-edx-language-preference') : cookie.get('stage-edx-language-preference');

  if (!ietfTag || IETF_TAGS.indexOf(ietfTag) <= -1) {
    return DEFAULT_IETF_TAG;
  }

  return ietfTag;
};

const getIETFTagFromLanguageCode = (languageCode) => {
  const ietfTag = LANGUAGE_CODE_TO_IETF_TAGS[languageCode];

  if (!ietfTag || IETF_TAGS.indexOf(ietfTag) <= -1) {
    return DEFAULT_IETF_TAG;
  }

  return ietfTag;
};

const createHasViewedCookieBanner = () => {
  const cookieCreationData = getCookieCreationData();

  if (!!cookieCreationData
      && !!cookieCreationData.cookieName
      && !!cookieCreationData.domain
      && !!cookieCreationData.path
      && !!cookieCreationData.maxAge) {
    return new Cookie().set(
      cookieCreationData.cookieName,
      true,
      {
        domain: cookieCreationData.domain,
        path: cookieCreationData.path,
        maxAge: cookieCreationData.maxAge,
      },
    );
  }

  return false;
};

const hasViewedCookieBanner = () => {
  const cookieCreationData = getCookieCreationData();
  return !!cookieCreationData && !!new Cookie().get(cookieCreationData.cookieName);
};

export {
  getIETFTag,
  createHasViewedCookieBanner,
  hasViewedCookieBanner,
  firstMatchingStageEnvironment,
  getCookieCreationData,
  getIETFTagFromLanguageCode,
  isProduction,
};
