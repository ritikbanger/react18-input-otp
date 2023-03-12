# react18-input-otp

[![npm version](https://badge.fury.io/js/react18-input-otp.svg)](https://badge.fury.io/js/react18-input-otp) [![npm](https://img.shields.io/npm/dm/react18-input-otp.svg?logo=npm)](https://www.npmjs.com/package/react18-input-otp) [![npm](https://img.shields.io/bundlephobia/minzip/react18-input-otp)](https://www.npmjs.com/package/react18-input-otp)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

A fully customizable, one-time password (OTP) and phone number with separator input component for the web built with React. Tested on Web, Android, and iOS. This package supports all react versions.

![see here](https://github.com/ritikbanger/react18-input-otp/blob/main/src/demo/demo.gif)

[Live Demo](https://ritikbanger.github.io/react18-input-otp)

[CodeSandbox](https://codesandbox.io/s/react18-input-otp-0nxzx7?file=/src/App.js)

## Features

- A fully customisable OTP input package with support of React 18 and Typescript.
- It works great on both react and ionic app. Works like a charm on mobile too.
- You can specify only numeric inputs with inputNum prop.
- Works perfectly with clipboard paste feature on web and mobile.
- The only OTP input package on npm that supports 'enter' key to submit.
- Zero OTP paste issues on Android.
- Easy paste on iOS chrome, read from SMS feature.
- Supports onSubmit optional prop. You do not even need a button to submit.
- You can use this package for phone number inputs too.
- You can use this package for passcode fields too with inputSecure prop.
- You can provide custom css as well as input props to the React18-input-otp.
- 0 dependencies.
- Minzipped size only 3.6 kb.
- No open issues.
- No security bugs.

## Installation

[![NPM](https://nodei.co/npm/react18-input-otp.png?compact=true)](https://nodei.co/npm/react18-input-otp/)

#### To install the latest stable version:

```
npm install --save react18-input-otp
```

#### Basic usage:

##### As class component

```jsx
import React, { Component } from 'react';
import OtpInput from 'react18-input-otp';

export default class App extends Component {
  state = { otp: '' };

  handleChange = (otp) => this.setState({ otp });

  render() {
    return <OtpInput value={this.state.otp} onChange={this.handleChange} numInputs={6} separator={<span>-</span>} />;
  }
}
```

##### As functional component with hooks

```jsx
import React, { useState } from 'react';
import OtpInput from 'react18-input-otp';
export default function ReactOtpInput() {
  const [otp, setOtp] = useState('');
  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  return <OtpInput value={otp} onChange={handleChange} numInputs={6} separator={<span>-</span>} />;
}
```

## API

<table>
  <tr>
    <th>Name<br/></th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
   <tr>
    <td>id</td>
    <td>string</td>
    <td>false</td>
    <td>none</td>
    <td>Provide unique id for your OTP input.</td>
  </tr>
  <tr>
    <td>numInputs</td>
    <td>number</td>
    <td>true</td>
    <td>4</td>
    <td>Number of OTP inputs to be rendered.</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>function</td>
    <td>true</td>
    <td>console.log</td>
    <td>Returns OTP code typed in inputs.</td>
  </tr>
   <tr>
    <td>onSubmit</td>
    <td>function</td>
    <td>false</td>
    <td>console.log</td>
    <td>Returns OTP code on submit. This allows to submit the OTP on enter key too.</td>
  </tr>
  <tr>
    <td>value</td>
    <td>string / number</td>
    <td>true</td>
    <td>''</td>
    <td>The value of the OTP passed into the component.</td>
  </tr>
    <tr>
     <td>placeholder</td>
     <td>string</td>
     <td>false</td>
     <td>none</td>
     <td>Specify an expected value of each input. The length of this string should be equal to <code>numInputs</code>.</td>
   </tr>
  <tr>
    <td>separator</td>
    <td>component<br/></td>
    <td>false</td>
    <td>none</td>
    <td>Provide a custom separator between inputs by passing a component. For instance, <code>&lt;span&gt;-&lt;/span&gt;</code> would add <code>-</code> between each input.</td>
  </tr>
  <tr>
    <td>separateAfter</td>
    <td>number<br/></td>
    <td>false</td>
    <td>1</td>
    <td>Provide the count to set the separater after every input. For instance, <code>3</code> would add <code>-</code> after every third input.</td>
  </tr>
  <tr>
    <td>autoComplete</td>
    <td>string<br/></td>
    <td>false</td>
    <td>off</td>
    <td>Provide the autocomplete feature for the input. Now, supports <code>one-time-code</code> as autoComplete.</td>
  </tr>
   <tr>
    <td>ariaLabelOverride</td>
    <td>string<br/></td>
    <td>false</td>
    <td>none</td>
    <td>Provide the custom arialabel for the input.</td>
  </tr>
  <tr>
    <td>containerStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to container of inputs.</td>
  </tr>
  <tr>
    <td>inputStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input.</td>
  </tr>
  <tr>
    <td>focusStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to inputs on focus.</td>
  </tr>
  <tr>
    <td>isDisabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Disables all the inputs.</td>
  </tr>
  <tr>
    <td>disabledStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input when disabled.</td>
  </tr>
  <tr>
    <td>hasErrored</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Indicates there is an error in the inputs.</td>
  </tr>
  <tr>
    <td>errorStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input when errored.</td>
  </tr>
  <tr>
    <td>isSuccessed</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Indicates there is success with the inputs..</td>
  </tr>
  <tr>
    <td>successStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input when success.</td>
  </tr>
  <tr>
    <td>shouldAutoFocus</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Auto focuses input on initial page load.</td>
  </tr>
  <tr>
    <td>isInputNum</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Restrict input to only numbers.</td>
  </tr>
  <tr>
    <td>isInputSecure</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Masks input characters.</td>
  </tr>
  <tr>
    <td>data-cy</td>
    <td>string</td>
    <td>false</td>
    <td>-</td>
    <td>Test attribute passed to the inputs.</td>
  </tr>
  <tr>
    <td>data-testid</td>
    <td>string</td>
    <td>false</td>
    <td>-</td>
    <td>Test attribute passed to the inputs.</td>
  </tr>
  <tr>
    <td>custom-test-id</td>
    <td>string</td>
    <td>false</td>
    <td>-</td>
    <td>Custom test attribute passed to the inputs.</td>
  </tr>
  <tr>
    <td>custom-test-attr</td>
    <td>string</td>
    <td>false</td>
    <td>-</td>
    <td>Custom test attribute passed to the inputs.</td>
  </tr>
   <tr>
    <td>inputProps</td>
    <td>InputHTMLAttributes | InputHTMLAttributes[]</td>
    <td>false</td>
    <td>-</td>
    <td>Custom input props.</td>
  </tr>
</table>

## Development

#### To run the development server:

```
npm run dev
```

## Checklist

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat&logo=github)](https://github.com/ritikbanger/react18-input-otp/pulls) [![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ritikbanger/react18-input-otp)

- [x] Add flowtypes
- [x] Add ESLint, Prettier for code quality
- [x] Add styling support for states including focus/disabled
- [ ] Write tests

## Contributing

[![GitHub issues](https://img.shields.io/github/issues-raw/ritikbanger/react18-input-otp?logo=github)](https://github.com/ritikbanger/react18-input-otp/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/ritikbanger/react18-input-otp?logo=git)](https://github.com/ritikbanger/react18-input-otp/pulls)

Feel free to open [issues](https://github.com/ritikbanger/react18-input-otp/issues/new/choose) and [pull requests](https://github.com/ritikbanger/react18-input-otp/pulls)!

## License

[![NPM](https://img.shields.io/npm/l/react18-input-otp)](https://github.com/ritikbanger/react18-input-otp/blob/master/LICENSE)

Special Thanks to [devfolioco](https://github.com/devfolioco/react-otp-input). This project is build on top of [react-otp-input](https://github.com/devfolioco/react-otp-input).

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
