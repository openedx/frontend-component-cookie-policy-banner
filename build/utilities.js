"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isProduction = exports.getIETFTagFromLanguageCode = exports.getCookieCreationData = exports.firstMatchingStageEnvironment = exports.hasViewedCookieBanner = exports.createHasViewedCookieBanner = exports.getIETFTag = void 0;

var _universalCookie = _interopRequireDefault(require("universal-cookie"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firstMatchingStageEnvironment = function firstMatchingStageEnvironment() {
  var matches = Object.keys(_constants.STAGE_ENVIRONMENTS).filter(function (key) {
    return window.location.hostname.indexOf(_constants.STAGE_ENVIRONMENTS[key].baseURL) >= 0;
  });

  if (matches.length > 0) {
    return _constants.STAGE_ENVIRONMENTS[matches[0]];
  }

  return null;
}; // Setting path to '/' to be apply to all subdomains
// Setting maxAge to 2^31 -1
// because Number.SAFE_MAX_INTEGER does not get processed properly by the browser
// nor does the max Date defined in http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.1


exports.firstMatchingStageEnvironment = firstMatchingStageEnvironment;

var buildCookieCreationData = function buildCookieCreationData(_ref) {
  var prefix = _ref.prefix,
      domain = _ref.domain;
  return {
    cookieName: "".concat(prefix, "-").concat(_constants.COOKIE_POLICY_VIEWED_NAME),
    domain: domain,
    path: '/',
    maxAge: 2147483647
  };
};

var getCookieCreationData = function getCookieCreationData() {
  if (window.location.hostname.indexOf(_constants.LOCALHOST) >= 0) {
    return buildCookieCreationData({
      prefix: _constants.LOCALHOST,
      domain: _constants.LOCALHOST
    });
  }

  var stageEnvironment = firstMatchingStageEnvironment();

  if (stageEnvironment) {
    return buildCookieCreationData({
      prefix: stageEnvironment.prefix,
      domain: ".".concat(stageEnvironment.baseURL)
    });
  }

  if (window.location.hostname.indexOf('.edx.org') >= 0) {
    return buildCookieCreationData({
      prefix: 'prod',
      domain: '.edx.org'
    });
  }

  return null;
};

exports.getCookieCreationData = getCookieCreationData;

var isProduction = function isProduction() {
  return !firstMatchingStageEnvironment() && window.location.hostname.indexOf(_constants.LOCALHOST) < 0 && window.location.hostname.indexOf('.edx.org') >= 0;
};

exports.isProduction = isProduction;

var getIETFTag = function getIETFTag() {
  var cookie = new _universalCookie["default"]('edx.org');
  var ietfTag = isProduction() ? cookie.get('prod-edx-language-preference') : cookie.get('stage-edx-language-preference');

  if (!ietfTag || _constants.IETF_TAGS.indexOf(ietfTag) <= -1) {
    return _constants.DEFAULT_IETF_TAG;
  }

  return ietfTag;
};

exports.getIETFTag = getIETFTag;

var getIETFTagFromLanguageCode = function getIETFTagFromLanguageCode(languageCode) {
  var ietfTag = _constants.LANGUAGE_CODE_TO_IETF_TAGS[languageCode];

  if (!ietfTag || _constants.IETF_TAGS.indexOf(ietfTag) <= -1) {
    return _constants.DEFAULT_IETF_TAG;
  }

  return ietfTag;
};

exports.getIETFTagFromLanguageCode = getIETFTagFromLanguageCode;

var createHasViewedCookieBanner = function createHasViewedCookieBanner() {
  var cookieCreationData = getCookieCreationData();

  if (!!cookieCreationData && !!cookieCreationData.cookieName && !!cookieCreationData.domain && !!cookieCreationData.path && !!cookieCreationData.maxAge) {
    return new _universalCookie["default"]().set(cookieCreationData.cookieName, true, {
      domain: cookieCreationData.domain,
      path: cookieCreationData.path,
      maxAge: cookieCreationData.maxAge
    });
  }

  return false;
};

exports.createHasViewedCookieBanner = createHasViewedCookieBanner;

var hasViewedCookieBanner = function hasViewedCookieBanner() {
  var cookieCreationData = getCookieCreationData();
  return !!cookieCreationData && !!new _universalCookie["default"]().get(cookieCreationData.cookieName);
};

exports.hasViewedCookieBanner = hasViewedCookieBanner;