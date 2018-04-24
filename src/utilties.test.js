import {
  isLocalhost,
  firstMatchingStageEnvironment,
  isStage,
  getCookieDomain,
} from './utilities';
import {
  STAGE_ENVIRONMENTS,
  LOCALHOST,
} from './constants';

describe('utilities', () => {
  describe('#isLocalhost', () => {
    it('should be true when window.location.hostname contains localhost', () => {
      jsdom.reconfigure({ url: `http://${LOCALHOST}:8080/` });
      expect(isLocalhost()).toBe(true);
    });

    it('should be false when window.location.hostname does not contain localhost', () => {
      jsdom.reconfigure({ url: 'https://www.edx.org/' });
      expect(isLocalhost()).toBe(false);
    });
  });

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
      const stageEnvironment = STAGE_ENVIRONMENTS[0];
      jsdom.reconfigure({ url: `https://www.${stageEnvironment}` });
      expect(firstMatchingStageEnvironment()).toEqual(stageEnvironment);
    });
  });

  describe('#isStage', () => {
    it('false for localhost', () => {
      jsdom.reconfigure({ url: `http://${LOCALHOST}:8080/` });
      expect(isStage()).toBe(false);
    });

    it('false for edx.org', () => {
      jsdom.reconfigure({ url: 'https://www.edx.org/' });
      expect(isStage()).toBe(false);
    });

    it('true for stage environment', () => {
      const stageEnvironment = STAGE_ENVIRONMENTS[0];
      jsdom.reconfigure({ url: `https://www.${stageEnvironment}` });
      expect(isStage()).toBe(true);
    });
  });
});
