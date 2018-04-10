/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { StatusAlert } from '@edx/paragon';
import PropTypes from 'prop-types';

import {
  LANGUAGE_CODES_TO_CLOSE_BUTTON_LABEL,
  LANGUAGE_CODES_TO_CONTAINER_ROLE_LABEL,
  getPolicyHTML,
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
    const langCode = getLanguageCode();
    const { open } = this.state;

    if (open) {
      return (
        <div
          className="edx-cookie-banner-wrapper"
          role="complementary"
          aria-label={LANGUAGE_CODES_TO_CONTAINER_ROLE_LABEL[langCode]}
          aria-live="polite"
        >
          <StatusAlert
            className={['edx-cookie-banner']}
            open={this.state.open}
            closeButtonAriaLabel={LANGUAGE_CODES_TO_CLOSE_BUTTON_LABEL[langCode]}
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
