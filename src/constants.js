const ENGLISH_IETF_TAG = 'en';
const SPANISH_IETF_TAG = 'es-419';
const DEFAULT_IETF_TAG = ENGLISH_IETF_TAG;

const LANGUAGE_CODES = Object.freeze([ENGLISH_IETF_TAG, SPANISH_IETF_TAG]);


const LANGUAGE_CODES_TO_CONTAINER_ROLE_LABEL = Object.freeze({
  [ENGLISH_IETF_TAG]: 'Notice about use of cookies on edx.org.',
  [SPANISH_IETF_TAG]: 'Notice about use of cookies on edx.org.',
});
const LANGUAGE_CODES_TO_CLOSE_BUTTON_LABEL = Object.freeze({
  [ENGLISH_IETF_TAG]: 'Close the notice about use of cookies on edx.org.',
  [SPANISH_IETF_TAG]: 'Close the notice about use of cookies on edx.org.',
});

const getPolicyHTML = (tag) => {
  const linkClose = '</a>';

  if (tag === SPANISH_IETF_TAG) {
    const linkOpen = '<a href="https://edx.org/es/edx-privacy-policy" class="policy-link">';
    return `EdX and its Members use cookies and other tracking technologies for performance, analytics, and marketing purposes. By using this website, you accept this use. Learn more about these technologies in the ${linkOpen} Privacy Policy ${linkClose}.`;
  }

  const linkOpen = '<a href="https://edx.org/edx-privacy-policy" class="policy-link">';
  return `EdX and its Members use cookies and other tracking technologies for performance, analytics, and marketing purposes. By using this website, you accept this use. Learn more about these technologies in the ${linkOpen} Privacy Policy ${linkClose}.`;
};

export {
  DEFAULT_IETF_TAG,
  LANGUAGE_CODES,
  LANGUAGE_CODES_TO_CLOSE_BUTTON_LABEL,
  LANGUAGE_CODES_TO_CONTAINER_ROLE_LABEL,
  getPolicyHTML,
};
