// https://en.wikipedia.org/wiki/IETF_language_tag
const ENGLISH_IETF_TAG = 'en';
const SPANISH_IETF_TAG = 'es-419';
const DEFAULT_IETF_TAG = ENGLISH_IETF_TAG;
const ENGLISH_LANGUAGE_CODE = 'en';
const SPANISH_LANGUAGE_CODE = 'es';
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

const IETF_TAGS = Object.freeze([ENGLISH_IETF_TAG, SPANISH_IETF_TAG]);
const LANGUAGE_CODES = Object.freeze([ENGLISH_LANGUAGE_CODE, SPANISH_LANGUAGE_CODE]);

const IETF_TAGS_TO_CONTAINER_ROLE_LABEL = Object.freeze({
  [ENGLISH_IETF_TAG]: 'Notice about use of cookies on edx.org.',
  [SPANISH_IETF_TAG]: 'Aviso sobre el uso de cookies en edx.org.',
});
const IETF_TAGS_TO_CLOSE_BUTTON_LABEL = Object.freeze({
  [ENGLISH_IETF_TAG]: 'Close the notice about use of cookies on edx.org.',
  [SPANISH_IETF_TAG]: 'Cerrar aviso sobre el uso de cookies en edx.org.',
});
const IETF_TAGS_TO_LANGUAGE_CODE = Object.freeze({
  [ENGLISH_IETF_TAG]: ENGLISH_LANGUAGE_CODE,
  [SPANISH_IETF_TAG]: SPANISH_LANGUAGE_CODE,
});

const getPolicyHTML = (tag) => {
  const linkClose = '</a>';

  if (tag === SPANISH_IETF_TAG) {
    const linkOpen = '<a href="https://edx.org/es/edx-privacy-policy" class="policy-link">';
    return `EdX y sus Miembros usan cookies y otras tecnologías de seguimiento para fines de rendimiento, análisis y marketing. Al usar este sitio web, aceptas este uso. Obtén más información sobre estas tecnologías en la ${linkOpen}Política de privacidad${linkClose}.`;
  }

  const linkOpen = '<a href="https://edx.org/edx-privacy-policy" class="policy-link">';
  return `EdX and its Members use cookies and other tracking technologies for performance, analytics, and marketing purposes. By using this website, you accept this use. Learn more about these technologies in the ${linkOpen}Privacy Policy${linkClose}.`;
};

const COOKIE_POLICY_VIEWED_NAME = 'edx-cookie-policy-viewed';

export {
  DEFAULT_IETF_TAG,
  LANGUAGE_CODES,
  IETF_TAGS,
  IETF_TAGS_TO_CONTAINER_ROLE_LABEL,
  IETF_TAGS_TO_CLOSE_BUTTON_LABEL,
  IETF_TAGS_TO_LANGUAGE_CODE,
  getPolicyHTML,
  LOCALHOST,
  COOKIE_POLICY_VIEWED_NAME,
  STAGE_ENVIRONMENTS,
};
