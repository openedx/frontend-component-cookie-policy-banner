import React from 'react';
import { mount } from 'enzyme';
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
  let mountedBanner;
  let isOpen;
  let onClose;

  const expectedTag = ENGLISH_IETF_TAG;
  const expectedLanguageCode = ENGLISH_LANGUAGE_CODE;
  const expectedWrapperAriaLabel = IETF_TAGS_TO_CONTAINER_ROLE_LABEL[expectedTag];
  const expectedPolicyHTML = 'foobar';
  // eslint-disable-next-line
  const expectedDialog = <span dangerouslySetInnerHTML={{ __html: expectedPolicyHTML }} />;

  createHasViewedCookieBanner.mockImplementation(() => {});
  getIETFTag.mockImplementation(() => expectedTag);
  getPolicyHTML.mockImplementation(() => expectedPolicyHTML);
  hasViewedCookieBanner.mockImplementation(() => !isOpen);

  const isClosedBanner = () => {
    expect(mountedBanner.state('open')).toBe(false);
    expect(mountedBanner.html()).toBeNull();
  };

  const isValidWrapperDiv = (wrapperDiv) => {
    expect(wrapperDiv.prop('lang')).toEqual(expectedLanguageCode);
    expect(wrapperDiv.prop('className')).toBe('edx-cookie-banner-wrapper');
    expect(wrapperDiv.prop('role')).toBe('complementary');
    expect(wrapperDiv.prop('aria-label')).toBe(expectedWrapperAriaLabel);
    expect(wrapperDiv.prop('aria-live')).toBe('polite');
  };

  const isValidStatusAlert = ({ statusAlert, open }) => {
    expect(statusAlert.prop('className')).toEqual('edx-cookie-banner');
    expect(statusAlert.prop('open')).toEqual(open);
    expect(statusAlert.prop('dialog').type).toEqual(expectedDialog.type);
    expect(statusAlert.prop('dialog').props).toEqual(expectedDialog.props);
    expect(statusAlert.prop('onClose')).toEqual(mountedBanner.instance().onClose);
  };

  const isOpenBanner = () => {
    expect(mountedBanner.state('open')).toBe(true);

    const wrapperDiv = mountedBanner.find('div').first();
    isValidWrapperDiv(wrapperDiv);

    const statusAlerts = mountedBanner.find(StatusAlert);
    expect(statusAlerts.length).toBe(1);

    const statusAlert = statusAlerts.first();
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

    mountedBanner = mount(<CookiePolicyBanner {...props} />);

    isClosedBanner();
  });

  it('banner component when open', () => {
    isOpen = true;

    mountedBanner = mount(<CookiePolicyBanner {...props} />);

    isOpenBanner();
  });

  it('toggles banner closed', () => {
    isOpen = true;
    onClose = jest.fn();
    props = { onClose };

    mountedBanner = mount(<CookiePolicyBanner {...props} />);

    isOpenBanner();

    mountedBanner.find(StatusAlert).prop('onClose')();

    isClosedBanner();

    expect(createHasViewedCookieBanner).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
