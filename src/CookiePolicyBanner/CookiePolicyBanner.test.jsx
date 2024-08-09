import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { StatusAlert } from '@edx/paragon';

import CookiePolicyBanner from '.';
import {
  ENGLISH_IETF_TAG,
  ENGLISH_LANGUAGE_CODE,
  IETF_TAGS_TO_CONTAINER_ROLE_LABEL,
  getPolicyHTML,
} from '../constants';
import {
  getIETFTag,
  hasViewedCookieBanner,
  createHasViewedCookieBanner,
} from '../utilities';

jest.mock('../utilities');
jest.mock('../constants');

describe('CookiePolicyBanner', () => {
  let props;
  let isOpen;
  let onClose;

  const expectedTag = ENGLISH_IETF_TAG;
  const expectedLanguageCode = ENGLISH_LANGUAGE_CODE;
  const expectedWrapperAriaLabel = IETF_TAGS_TO_CONTAINER_ROLE_LABEL[expectedTag];
  const expectedPolicyHTML = 'foobar';
  const expectedDialog = <span dangerouslySetInnerHTML={{ __html: expectedPolicyHTML }} />;

  createHasViewedCookieBanner.mockImplementation(() => {});
  getIETFTag.mockImplementation(() => expectedTag);
  getPolicyHTML.mockImplementation(() => expectedPolicyHTML);
  hasViewedCookieBanner.mockImplementation(() => !isOpen);

  const isClosedBanner = () => {
    expect(screen.queryByRole('complementary')).toBeNull();
  };

  const isValidWrapperDiv = (wrapperDiv) => {
    expect(wrapperDiv).toHaveAttribute('lang', expectedLanguageCode);
    expect(wrapperDiv).toHaveClass('edx-cookie-banner-wrapper');
    expect(wrapperDiv).toHaveAttribute('role', 'complementary');
    expect(wrapperDiv).toHaveAttribute('aria-label', expectedWrapperAriaLabel);
    expect(wrapperDiv).toHaveAttribute('aria-live', 'polite');
  };

  const isValidStatusAlert = ({ statusAlert, open }) => {
    expect(statusAlert).toHaveClass('edx-cookie-banner');
    expect(statusAlert).toHaveAttribute('role', 'alert');
    expect(statusAlert).toContainElement(screen.getByText('foobar'));
  };

  const isOpenBanner = () => {
    const wrapperDiv = screen.getByRole('complementary');
    isValidWrapperDiv(wrapperDiv);

    const statusAlert = screen.getByRole('alert');
    isValidStatusAlert({ statusAlert, open: isOpen });
  };

  beforeEach(() => {
    props = { onClose };
    isOpen = undefined;

    createHasViewedCookieBanner.mockClear();
    getIETFTag.mockClear();
    getPolicyHTML.mockClear();
    hasViewedCookieBanner.mockClear();
  });

  it('empty component when banner has already been viewed', () => {
    isOpen = false;

    render(<CookiePolicyBanner {...props} />);

    isClosedBanner();
  });

  it('banner component when open', () => {
    isOpen = true;

    render(<CookiePolicyBanner {...props} />);

    isOpenBanner();
  });

  it('toggles banner closed', () => {
    isOpen = true;
    onClose = jest.fn();
    props = { onClose };

    render(<CookiePolicyBanner {...props} />);

    isOpenBanner();

    userEvent.click(screen.getByRole('button', { name: /close/i }));

    isClosedBanner();

    expect(createHasViewedCookieBanner).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
