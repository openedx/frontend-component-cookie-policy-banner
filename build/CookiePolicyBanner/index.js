"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _paragon = require("@edx/paragon");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../constants");

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CookieBanner = /*#__PURE__*/function (_Component) {
  _inherits(CookieBanner, _Component);

  var _super = _createSuper(CookieBanner);

  function CookieBanner(props) {
    var _this;

    _classCallCheck(this, CookieBanner);

    _this = _super.call(this, props);
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
    _this.state = {
      open: false
    };
    return _this;
  }

  _createClass(CookieBanner, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.toggleDisplay(!(0, _utilities.hasViewedCookieBanner)());
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.open === true) {
        if (document.querySelectorAll('.edx-cookie-banner .btn') && document.querySelectorAll('.edx-cookie-banner .btn').length > 0) {
          document.querySelectorAll('.edx-cookie-banner .btn')[0].blur();
        }
      }
    }
  }, {
    key: "onClose",
    value: function onClose(event) {
      var _this2 = this;

      this.setState({
        open: false
      }, function () {
        (0, _utilities.createHasViewedCookieBanner)();

        _this2.props.onClose(event);
      });
    }
  }, {
    key: "toggleDisplay",
    value: function toggleDisplay(open) {
      this.setState({
        open: open
      });
    }
  }, {
    key: "render",
    value: function render() {
      var languageCode = this.props.languageCode;
      var open = this.state.open;
      var ietfTag = languageCode ? (0, _utilities.getIETFTagFromLanguageCode)(languageCode) : (0, _utilities.getIETFTag)();

      if (open) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          lang: _constants.IETF_TAGS_TO_LANGUAGE_CODE[ietfTag],
          className: "edx-cookie-banner-wrapper",
          role: "complementary",
          "aria-label": _constants.IETF_TAGS_TO_CONTAINER_ROLE_LABEL[ietfTag],
          "aria-live": "polite"
        }, /*#__PURE__*/_react["default"].createElement(_paragon.StatusAlert, {
          className: "edx-cookie-banner",
          open: this.state.open,
          closeButtonAriaLabel: _constants.IETF_TAGS_TO_CLOSE_BUTTON_LABEL[ietfTag],
          dialog: /*#__PURE__*/_react["default"].createElement("span", {
            dangerouslySetInnerHTML: {
              __html: (0, _constants.getPolicyHTML)(ietfTag)
            }
          }),
          onClose: this.onClose
        }));
      }

      return false;
    }
  }]);

  return CookieBanner;
}(_react.Component);

CookieBanner.defaultProps = {
  onClose: function onClose() {},
  languageCode: undefined
};
CookieBanner.propTypes = {
  onClose: _propTypes["default"].func,
  languageCode: _propTypes["default"].string
};
var _default = CookieBanner;
exports["default"] = _default;