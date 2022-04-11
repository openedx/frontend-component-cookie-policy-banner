"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _paragon = require("@edx/paragon");

var _ = _interopRequireDefault(require("./"));

var _constants = require("../constants");

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.mock('../utilities');
jest.mock('../constants');
describe('CookiePolicyBanner', function () {
  var props;
  var mountedBanner;
  var isOpen;
  var onClose;
  var expectedTag = _constants.ENGLISH_IETF_TAG;
  var expectedLanguageCode = _constants.ENGLISH_LANGUAGE_CODE;
  var expectedWrapperAriaLabel = _constants.IETF_TAGS_TO_CONTAINER_ROLE_LABEL[expectedTag];
  var expectedPolicyHTML = 'foobar'; // eslint-disable-next-line

  var expectedDialog = /*#__PURE__*/_react["default"].createElement("span", {
    dangerouslySetInnerHTML: {
      __html: expectedPolicyHTML
    }
  });

  _utilities.createHasViewedCookieBanner.mockImplementation(function () {});

  _utilities.getIETFTag.mockImplementation(function () {
    return expectedTag;
  });

  _constants.getPolicyHTML.mockImplementation(function () {
    return expectedPolicyHTML;
  });

  _utilities.hasViewedCookieBanner.mockImplementation(function () {
    return !isOpen;
  });

  var isClosedBanner = function isClosedBanner() {
    expect(mountedBanner.state('open')).toBe(false);
    expect(mountedBanner.html()).toBeNull();
  };

  var isValidWrapperDiv = function isValidWrapperDiv(wrapperDiv) {
    expect(wrapperDiv.prop('lang')).toEqual(expectedLanguageCode);
    expect(wrapperDiv.prop('className')).toBe('edx-cookie-banner-wrapper');
    expect(wrapperDiv.prop('role')).toBe('complementary');
    expect(wrapperDiv.prop('aria-label')).toBe(expectedWrapperAriaLabel);
    expect(wrapperDiv.prop('aria-live')).toBe('polite');
  };

  var isValidStatusAlert = function isValidStatusAlert(_ref) {
    var statusAlert = _ref.statusAlert,
        open = _ref.open;
    expect(statusAlert.prop('className')).toEqual('edx-cookie-banner');
    expect(statusAlert.prop('open')).toEqual(open);
    expect(statusAlert.prop('dialog').type).toEqual(expectedDialog.type);
    expect(statusAlert.prop('dialog').props).toEqual(expectedDialog.props);
    expect(statusAlert.prop('onClose')).toEqual(mountedBanner.instance().onClose);
  };

  var isOpenBanner = function isOpenBanner() {
    expect(mountedBanner.state('open')).toBe(true);
    var wrapperDiv = mountedBanner.find('div').first();
    isValidWrapperDiv(wrapperDiv);
    var statusAlerts = mountedBanner.find(_paragon.StatusAlert);
    expect(statusAlerts.length).toBe(1);
    var statusAlert = statusAlerts.first();
    isValidStatusAlert({
      statusAlert: statusAlert,
      open: isOpen
    });
  };

  beforeEach(function () {
    props = {
      onClose: onClose
    };
    isOpen = undefined;

    _utilities.createHasViewedCookieBanner.mockClear();

    _utilities.getIETFTag.mockClear();

    _constants.getPolicyHTML.mockClear();

    _utilities.hasViewedCookieBanner.mockClear();
  });
  it('empty component when banner has already been viewed', function () {
    isOpen = false;
    mountedBanner = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    isClosedBanner();
  });
  it('banner component when open', function () {
    isOpen = true;
    mountedBanner = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    isOpenBanner();
  });
  it('toggles banner closed', function () {
    isOpen = true;
    onClose = jest.fn();
    props = {
      onClose: onClose
    };
    mountedBanner = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    isOpenBanner();
    mountedBanner.find(_paragon.StatusAlert).prop('onClose')();
    isClosedBanner();
    expect(_utilities.createHasViewedCookieBanner).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});