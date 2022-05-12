/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { StatusAlert } from '@edx/paragon';
import PropTypes from 'prop-types';

import {
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
    this.toggleDisplay(!hasViewedCookieBanner());
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
      createHasViewedCookieBanner();
      this.props.onClose(event);
    });
  }

  toggleDisplay(open) {
    this.setState({ open });
  }

  render() {
    const { languageCode } = this.props;
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
          <StatusAlert
            className="edx-cookie-banner"
            open={this.state.open}
            closeButtonAriaLabel={IETF_TAGS_TO_CLOSE_BUTTON_LABEL[ietfTag]}
            dialog={(<span dangerouslySetInnerHTML={{ __html: getPolicyHTML(ietfTag) }} />)}
            onClose={this.onClose}
          />
        </div>
      );
    }

    return false;
  }
}

CookieBanner.defaultProps = {
  onClose: () => {},
  languageCode: undefined,
};

CookieBanner.propTypes = {
  onClose: PropTypes.func,
  languageCode: PropTypes.string,
};

export default CookieBanner;
