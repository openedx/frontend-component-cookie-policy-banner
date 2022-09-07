# frontend-component-cookie-policy-banner

[![Greenkeeper badge](https://badges.greenkeeper.io/edx/frontend-component-cookie-policy-banner.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/@edx/frontend-component-cookie-policy-banner.svg)](https://www.npmjs.com/package/@edx/frontend-component-cookie-policy-banner)
[![npm](https://img.shields.io/npm/dt/@edx/frontend-component-cookie-policy-banner.svg)](https://www.npmjs.com/package/@edx/frontend-component-cookie-policy-banner)
[![license](https://img.shields.io/npm/l/@edx/frontend-component-cookie-policy-banner.svg)](https://github.com/openedx/frontend-component-cookie-policy-banner.svg/blob/master/LICENSE)

We are not accepting public contributions to this repo at this time. 

## Introduction

edX cookie policy banner React component

## Installation

```bash
npm i --save @edx/frontend-component-cookie-policy-banner
```

## Usage

```jsx
import CookiePolicyBanner from '@edx/frontend-component-cookie-policy-banner';

// Can import sass file this way
// Or as an import in one of your sass files with other third party sass files
import '@edx/frontend-component-cookie-policy-banner/build/frontend-component-cookie-policy-banner.scss';

const SomeWrappingComponent = () => (
  <div>
    <span>Blahblablah</span>
    <CookiePolicyBanner />
  </div>
);
```

## Updating the Repo

We use [`semantic-release`](https://github.com/semantic-release/semantic-release) to update the package on NPM.

Please follow semantic-release guidelines on how to structure your commit message when merging a change.

### Styling

As noted in a comment in the previous code example, you can import the styles associated with the `CookiePolicyBanner` component directly (if this is supported by your `webpack` config) or by importing the sass file as part of one of your existing sass files (probably where your other third-party sass files are imported).


Requirement: | The `CookiePolicyBanner` sass file assumes the presence of an @edx/brand theme
:---: | :---

```sass
// base.scss
@import 'thirdPartySass';
@import 'anotherThirdPartySass';

// Theme styles
@import '@edx/brand/paragon/fonts';
@import '@edx/brand/paragon/variables';

// Cookie Policy Banner style
@import '@edx/frontend-component-cookie-policy-banner/build/frontend-component-cookie-policy-banner';
```
## Local Testing With Other Repositories
The current build is not included in the git repository so in order to test the component with dependent repositories, you will have to first build the component by running `npm run prepublishOnly`, then remove `build` and `build/Release` from `.gitignore` and commit the results to your branch. **Make sure to remove the change to .gitignore before merging!**

Once you've committed and pushed the build to your branch, you can bring it into a dependent repository's package.json by adding
```
"@edx/frontend-component-cookie-policy-banner": "git+https://github.com/openedx/frontend-component-cookie-policy-banner#<my_branch_name>"
```
and running `npm install`.

Note that whenever you make changes on your branch, you will have to rebuild, commit push the resulting build artifacts, and re-run `npm install` in the dependent repository.

## Storybook

![storybook](https://imgur.com/mZct2v5.png)

[`Storybook`](https://github.com/storybooks/storybook) is a useful tool for showcasing the expected and potential usage of components.

Executing

As of Nov 2020, Storybook isn't compatible with webpack 5, so before running change your webpack version to 4.44.1.

```bash
npm run start
```

locally builds the Storybook for the `CookiePolicyBanner` component on port `3003`.

## edX Code of Conduct
[`https://open.edx.org/code-of-conduct/`](https://open.edx.org/code-of-conduct/)

## Contact
You can contact the edx open-source team at oscm@edx.org.

## Security reporting information
Please do not report security issues in public. Send security concerns via email to security@edx.org.

