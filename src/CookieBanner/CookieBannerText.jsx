import React from 'react';
import { Hyperlink } from '@edx/paragon';

const CookieBannerText = ({ nonPrivacyPolicyText, privacyPolicyText, privacyPolicyDestination }) => {
  return (
    <span>
      { nonPrivacyPolicyText }
      <Hyperlink content={privacyPolicyText} destination={privacyPolicyDestination} />
      { '.' }
    </span>
  );
};

export default CookieBannerText;
