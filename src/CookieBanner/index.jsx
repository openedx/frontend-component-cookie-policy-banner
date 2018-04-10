/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { StatusAlert } from '@edx/paragon';
import PropTypes from 'prop-types';

import {
  LANGUAGE_CODES_TO_CLOSE_BUTTON_LABEL,
  LANGUAGE_CODES_TO_CONTAINER_ROLE_LABEL,
  getPolicyHTML,
  DEFAULT_CONTAINER_ROLE_LABEL,
  DEFAULT_CLOSE_BUTTON_LABEL,
} from '../constants';
import { getLanguageCode, hasViewedCookieBanner, createHasViewedCookieBanner } from '../utilities';

class CookieBanner extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);

    this.state = { open: false };
  }

  componentDidMount() {
    if (hasViewedCookieBanner()) {
      this.toggleDisplay(false);
    } else {
      createHasViewedCookieBanner();
      this.toggleDisplay(true);
    }
  }

  onClose(event) {
    this.setState({ open: false });

    this.props.onClose(event);
  }

  toggleDisplay(open) {
    this.setState({ open });
  }

  render() {
    const { open } = this.state;
    const langCode = getLanguageCode();

    const containerRoleLabel = LANGUAGE_CODES_TO_CONTAINER_ROLE_LABEL[langCode]
      || DEFAULT_CONTAINER_ROLE_LABEL;
    const closeButtonLabel = LANGUAGE_CODES_TO_CLOSE_BUTTON_LABEL[langCode]
      || DEFAULT_CLOSE_BUTTON_LABEL;

    if (open) {
      return (
        <div
          className="edx-cookie-banner-wrapper"
          role="complementary"
          aria-label={containerRoleLabel}
          aria-live="polite"
        >
          <StatusAlert
            className={['edx-cookie-banner']}
            open={open}
            closeButtonAriaLabel={closeButtonLabel}
            dialog={(<span dangerouslySetInnerHTML={{ __html: getPolicyHTML(langCode) }} />)}
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
};

CookieBanner.propTypes = {
  onClose: PropTypes.func,
};

export default CookieBanner;
