import {
  firstMatchingStageEnvironment,
  isProduction,
  getCookieCreationData,
  getIETFTagFromLanguageCode,
} from './utilities';
import {
  ENGLISH_IETF_TAG,
  SPANISH_IETF_TAG,
  DEFAULT_IETF_TAG,
  STAGE_ENVIRONMENTS,
  LOCALHOST,
} from './constants';

describe('utilities', () => {
  describe('#firstMatchingStageEnvironment', () => {
    it('null matching stage environment for localhost', () => {
      jsdom.reconfigure({ url: `http://${LOCALHOST}:8080/` });
      expect(firstMatchingStageEnvironment()).toBeNull();
    });

    it('null matching stage environment for edx.org', () => {
      jsdom.reconfigure({ url: 'https://www.edx.org/' });
      expect(firstMatchingStageEnvironment()).toBeNull();
    });

    it('non-null matching stage environment', () => {
      const stageEnvironment = STAGE_ENVIRONMENTS.STAGE;
      jsdom.reconfigure({ url: `https://www.${stageEnvironment.baseURL}` });
      expect(firstMatchingStageEnvironment()).toEqual(stageEnvironment);
    });
  });

  describe('#isProduction', () => {
    it('false for localhost', () => {
      jsdom.reconfigure({ url: `http://${LOCALHOST}:8080/` });
      expect(isProduction()).toBe(false);
    });

    it('true for edx.org', () => {
      jsdom.reconfigure({ url: 'https://www.edx.org/' });
      expect(isProduction()).toBe(true);
    });

    it('false for stage environment', () => {
      const stageEnvironment = STAGE_ENVIRONMENTS.STAGE;
      jsdom.reconfigure({ url: `https://www.${stageEnvironment.baseURL}` });
      expect(isProduction()).toBe(false);
    });
  });

  describe('#getCookieCreationData', () => {
    it('localhost cookie creation data', () => {
      jsdom.reconfigure({ url: `http://${LOCALHOST}:8080/` });
      const expected = {
        cookieName: 'localhost-edx-cookie-policy-viewed',
        domain: 'localhost',
        path: '/',
        maxAge: 2147483647,
      };
      expect(getCookieCreationData()).toEqual(expected);
    });

    it('stage cookie creation data', () => {
      const stageEnvironment = STAGE_ENVIRONMENTS.STAGE;
      jsdom.reconfigure({ url: `https://www.${stageEnvironment.baseURL}` });
      const expected = {
        cookieName: 'stage-edx-cookie-policy-viewed',
        domain: '.stage.edx.org',
        path: '/',
        maxAge: 2147483647,
      };
      expect(getCookieCreationData()).toEqual(expected);
    });

    it('prod cookie creation data', () => {
      jsdom.reconfigure({ url: 'https://www.edx.org/' });
      const expected = {
        cookieName: 'prod-edx-cookie-policy-viewed',
        domain: '.edx.org',
        path: '/',
        maxAge: 2147483647,
      };
      expect(getCookieCreationData()).toEqual(expected);
    });
  });

  describe('#getIETFTagFromLanguageCode', () => {
    it('returns the Spanish ieftTag when passed "es"', () => {
      expect(getIETFTagFromLanguageCode('es')).toEqual(SPANISH_IETF_TAG);
    });

    it('returns the English ieftTag when passed "en"', () => {
      expect(getIETFTagFromLanguageCode('en')).toEqual(ENGLISH_IETF_TAG);
    });

    it('returns the Default ieftTag when passed an unsupported languageCode', () => {
      expect(getIETFTagFromLanguageCode('de')).toEqual(DEFAULT_IETF_TAG);
    });
  });
});
