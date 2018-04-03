import React, { Component } from 'react';
import { StatusAlert } from '@edx/paragon';
import PropTypes from 'prop-types';

import { getPolicyHTML } from '../constants';
import { getLanguageCode, hasViewedCookieBanner, createHasViewedCookieBanner } from '../utilities';

import styles from './CookieBanner.scss';

class CookieBanner extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);

    this.state = { open: false };
  }

  componentDidMount() {
    if (hasViewedCookieBanner()) {
      this.setState({ open: false });
    } else {
      createHasViewedCookieBanner();
      this.setState({ open: true });
    }
  }

  onClose(event) {
    this.setState({ open: false });

    this.props.onClose(event);
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
