/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { Alert } from '@edx/paragon';
import PropTypes from 'prop-types';

import {
  ENGLISH_IETF_TAG,
  SPANISH_IETF_TAG,
  IETF_TAGS_TO_CLOSE_BUTTON_LABEL,
  IETF_TAGS_TO_CONTAINER_ROLE_LABEL,
  IETF_TAGS_TO_LANGUAGE_CODE,
  getPolicyHTML,
} from '../constants';
import {
  getIETFTag,
  getIETFTagFromLanguageCode,
  hasViewedCookieBanner,
  createHasViewedCookieBanner,
} from '../utilities';

class CookieBanner extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);

    this.state = { open: false };
  }

  componentDidMount() {
    this.toggleDisplay(!hasViewedCookieBanner(this.props.isViewedCookieName));
  }

  componentDidUpdate() {
    if (this.state.open === true) {
      if (document.querySelectorAll('.edx-cookie-banner .btn') && document.querySelectorAll('.edx-cookie-banner .btn').length > 0) {
        document.querySelectorAll('.edx-cookie-banner .btn')[0].blur();
      }
    }
  }

  onClose(event) {
    this.setState({ open: false }, () => {
      createHasViewedCookieBanner(this.props.isViewedCookieName);
      this.props.onClose(event);
    });
  }

  toggleDisplay(open) {
    this.setState({ open });
  }

  render() {
    const { languageCode, policyText } = this.props;
    const { open } = this.state;
    const ietfTag = languageCode
      ? getIETFTagFromLanguageCode(languageCode) : getIETFTag();

    if (open) {
      return (
        <div
          lang={IETF_TAGS_TO_LANGUAGE_CODE[ietfTag]}
          className="edx-cookie-banner-wrapper"
          role="complementary"
          aria-label={IETF_TAGS_TO_CONTAINER_ROLE_LABEL[ietfTag]}
          aria-live="polite"
        >
          <Alert
            className="edx-cookie-banner"
            show={this.state.open}
            closeButtonAriaLabel={IETF_TAGS_TO_CLOSE_BUTTON_LABEL[ietfTag]}
            onClose={this.onClose}
          >
          <span dangerouslySetInnerHTML={{ __html: getPolicyHTML(ietfTag, policyText) }} />
          </Alert>
        </div>
      );
    }

    return false;
  }
}

CookieBanner.defaultProps = {
  onClose: () => {},
  languageCode: undefined,
  policyText: {},
  isViewedCookieName: null,
};

CookieBanner.propTypes = {
  onClose: PropTypes.func,
  languageCode: PropTypes.string,
  policyText: PropTypes.shape({
    [ENGLISH_IETF_TAG]: PropTypes.string,
    [SPANISH_IETF_TAG]: PropTypes.string,
  }),
  isViewedCookieName: PropTypes.string,
};

export default CookieBanner;
