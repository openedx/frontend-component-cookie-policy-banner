/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

process.env.COOKIE_POLICY_BANNER_VIEWED_NAME = 'edx-cookie-policy-viewed';
