"use strict";

var _utilities = require("./utilities");

var _constants = require("./constants");

describe('utilities', function () {
  describe('#firstMatchingStageEnvironment', function () {
    it('null matching stage environment for localhost', function () {
      jsdom.reconfigure({
        url: "http://".concat(_constants.LOCALHOST, ":8080/")
      });
      expect((0, _utilities.firstMatchingStageEnvironment)()).toBeNull();
    });
    it('null matching stage environment for edx.org', function () {
      jsdom.reconfigure({
        url: 'https://www.edx.org/'
      });
      expect((0, _utilities.firstMatchingStageEnvironment)()).toBeNull();
    });
    it('non-null matching stage environment', function () {
      var stageEnvironment = _constants.STAGE_ENVIRONMENTS.STAGE;
      jsdom.reconfigure({
        url: "https://www.".concat(stageEnvironment.baseURL)
      });
      expect((0, _utilities.firstMatchingStageEnvironment)()).toEqual(stageEnvironment);
    });
  });
  describe('#isProduction', function () {
    it('false for localhost', function () {
      jsdom.reconfigure({
        url: "http://".concat(_constants.LOCALHOST, ":8080/")
      });
      expect((0, _utilities.isProduction)()).toBe(false);
    });
    it('true for edx.org', function () {
      jsdom.reconfigure({
        url: 'https://www.edx.org/'
      });
      expect((0, _utilities.isProduction)()).toBe(true);
    });
    it('false for stage environment', function () {
      var stageEnvironment = _constants.STAGE_ENVIRONMENTS.STAGE;
      jsdom.reconfigure({
        url: "https://www.".concat(stageEnvironment.baseURL)
      });
      expect((0, _utilities.isProduction)()).toBe(false);
    });
  });
  describe('#getCookieCreationData', function () {
    it('localhost cookie creation data', function () {
      jsdom.reconfigure({
        url: "http://".concat(_constants.LOCALHOST, ":8080/")
      });
      var expected = {
        cookieName: 'localhost-edx-cookie-policy-viewed',
        domain: 'localhost',
        path: '/',
        maxAge: 2147483647
      };
      expect((0, _utilities.getCookieCreationData)()).toEqual(expected);
    });
    it('stage cookie creation data', function () {
      var stageEnvironment = _constants.STAGE_ENVIRONMENTS.STAGE;
      jsdom.reconfigure({
        url: "https://www.".concat(stageEnvironment.baseURL)
      });
      var expected = {
        cookieName: 'stage-edx-cookie-policy-viewed',
        domain: '.stage.edx.org',
        path: '/',
        maxAge: 2147483647
      };
      expect((0, _utilities.getCookieCreationData)()).toEqual(expected);
    });
    it('prod cookie creation data', function () {
      jsdom.reconfigure({
        url: 'https://www.edx.org/'
      });
      var expected = {
        cookieName: 'prod-edx-cookie-policy-viewed',
        domain: '.edx.org',
        path: '/',
        maxAge: 2147483647
      };
      expect((0, _utilities.getCookieCreationData)()).toEqual(expected);
    });
  });
  describe('#getIETFTagFromLanguageCode', function () {
    it('returns the Spanish ieftTag when passed "es"', function () {
      expect((0, _utilities.getIETFTagFromLanguageCode)('es')).toEqual(_constants.SPANISH_IETF_TAG);
    });
    it('returns the English ieftTag when passed "en"', function () {
      expect((0, _utilities.getIETFTagFromLanguageCode)('en')).toEqual(_constants.ENGLISH_IETF_TAG);
    });
    it('returns the Default ieftTag when passed an unsupported languageCode', function () {
      expect((0, _utilities.getIETFTagFromLanguageCode)('de')).toEqual(_constants.DEFAULT_IETF_TAG);
    });
  });
});