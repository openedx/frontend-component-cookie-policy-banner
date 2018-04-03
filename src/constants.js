const ENGLISH_IETF_TAG = 'en';
const SPANISH_IETF_TAG = 'es-419';
const DEFAULT_IETF_TAG = ENGLISH_IETF_TAG;

const LANGUAGE_CODES = Object.freeze([ENGLISH_IETF_TAG, SPANISH_IETF_TAG]);

const getPolicyHTML = (tag) => {
  const linkClose = '</a>';

  if (tag === SPANISH_IETF_TAG) {
    const linkOpen = '<a href="https://edx.org/es/privacy-policy" class="policy-link">';
    return `By using the website, you consent to our use of cookies in accordance with the terms of the edX ${linkOpen} Privacy Policy ${linkClose}.`;
  }
  
  const linkOpen = '<a href="https://edx.org/privacy-policy" class="policy-link">';
  return `By using the website, you consent to our use of cookies in accordance with the terms of the edX ${linkOpen} Privacy Policy ${linkClose}.`;
}

export {
  DEFAULT_IETF_TAG,
  LANGUAGE_CODES,
  getPolicyHTML,
};
