/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { StatusAlert } from '@edx/paragon';
import PropTypes from 'prop-types';

import { getPolicyHTML } from '../constants';
import { getLanguageCode, hasViewedCookieBanner, createHasViewedCookieBanner } from '../utilities';

// import styles from './CookieBanner.scss';

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
    const bannerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'inherit',
      border: 'none',
    };

    return (
      <div
        className="edx-cookie-banner-wrapper"
        style={{ background: '#f2f8fd' }}
        aria-live="polite"
      >
        <StatusAlert
          className={['edx-cookie-banner']}
          style={bannerStyle}
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
