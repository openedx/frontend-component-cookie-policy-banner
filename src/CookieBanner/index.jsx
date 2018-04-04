/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { StatusAlert } from '@edx/paragon';
import PropTypes from 'prop-types';

import { getPolicyHTML } from '../constants';
import { getLanguageCode, hasViewedCookieBanner, createHasViewedCookieBanner } from '../utilities';

class CookieBanner extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);

    // this.state = { open: false };
    this.state = { open: true };
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
    // this.setState({ open });
  }

  render() {
    return (
      <div className="edx-cookie-banner-wrapper" aria-live="polite">
        <StatusAlert
          className={['edx-cookie-banner']}
          open={this.state.open}
          dialog={(<span dangerouslySetInnerHTML={{ __html: getPolicyHTML(getLanguageCode()) }} />)}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

CookieBanner.defaultProps = {
  onClose: () => {},
};

CookieBanner.propTypes = {
  onClose: PropTypes.func,
};

export default CookieBanner;
