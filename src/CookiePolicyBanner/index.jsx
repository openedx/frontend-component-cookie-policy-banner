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
  hasViewedCookieBanner,
  createHasViewedCookieBanner,
} from '../utilities';

import './_cookie-policy-banner.scss';

class CookieBanner extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);

    this.state = { open: false };
  }

  componentDidMount() {
    this.toggleDisplay(!hasViewedCookieBanner());
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
    const ietfTag = getIETFTag();
    const { open } = this.state;

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
            className={['edx-cookie-banner']}
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
};

CookieBanner.propTypes = {
  onClose: PropTypes.func,
};

export default CookieBanner;
