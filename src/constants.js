const ENGLISH_IETF_TAG = 'en';
const SPANISH_IETF_TAG = 'es-419';
const DEFAULT_IETF_TAG = ENGLISH_IETF_TAG;
const LOCALHOST = 'localhost';
const ACCEPTANCE = 'ACCEPTANCE';
const DEV = 'DEV';
const EXTRA = 'EXTRA';
const QA = 'QA';
const STAGE = 'STAGE';
const GH_PAGES = 'GH_PAGES';
const STAGE_ENVIRONMENTS = Object.freeze({
  [ACCEPTANCE]: { baseURL: 'acceptance.edx.org', prefix: 'acceptance' },
  [DEV]: { baseURL: 'dev.edx.org', prefix: 'dev' },
  [EXTRA]: { baseURL: 'extra.edx.org', prefix: 'extra' },
  [QA]: { baseURL: 'qa.edx.org', prefix: 'qa' },
  [STAGE]: { baseURL: 'stage.edx.org', prefix: 'stage' },
  [GH_PAGES]: { baseURL: 'edx.github.io/cookie-policy-banner', prefix: 'gh-pages' },
});

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
    return `EdX and its Members use cookies and other tracking technologies for performance, analytics, and marketing purposes. By using this website, you accept this use. Learn more about these technologies in the ${linkOpen}Privacy Policy${linkClose}.`;
  }

  const linkOpen = '<a href="https://edx.org/edx-privacy-policy" class="policy-link">';
  return `EdX and its Members use cookies and other tracking technologies for performance, analytics, and marketing purposes. By using this website, you accept this use. Learn more about these technologies in the ${linkOpen}Privacy Policy${linkClose}.`;
};

const COOKIE_POLICY_VIEWED_NAME = 'edx-cookie-policy-viewed';

export {
  DEFAULT_IETF_TAG,
  LANGUAGE_CODES,
  LANGUAGE_CODES_TO_CLOSE_BUTTON_LABEL,
  LANGUAGE_CODES_TO_CONTAINER_ROLE_LABEL,
  getPolicyHTML,
  LOCALHOST,
  COOKIE_POLICY_VIEWED_NAME,
  STAGE_ENVIRONMENTS,
};
