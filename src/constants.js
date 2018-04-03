const ENGLISH_IETF_TAG = 'en';
const SPANISH_IETF_TAG = 'es-419';
const DEFAULT_IETF_TAG = ENGLISH_IETF_TAG;

const LANGUAGE_CODES = Object.freeze([ENGLISH_IETF_TAG, SPANISH_IETF_TAG]);

const LANGUAGE_CODES_TO_CONTENT = Object.freeze({
  [ENGLISH_IETF_TAG]: 'By using the website, you consent to our use of cookies in accordance with the terms of the edX Privacy Policy',
  [SPANISH_IETF_TAG]: 'Spanish',
});

export {
  DEFAULT_IETF_TAG,
  LANGUAGE_CODES,
  LANGUAGE_CODES_TO_CONTENT,
};
