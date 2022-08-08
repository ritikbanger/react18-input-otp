import React, { Component } from "react";
import { render } from "react-dom";

import OtpInput from "../../lib";
import "./styles.css";

function ShowError(props) {
  return <p> {props.message} </p>;
}

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: "",
      numInputs: 4,
      separateAfter: 1,
      separator: "-",
      isDisabled: false,
      hasErrored: false,
      isInputNum: false,
      isInputSecure: false,
      minLength: 0,
      maxLength: 40,
      placeholder: "",
      errorMessage: "",
    };
  }

  handleOtpChange = (otp) => {
    this.setState({ otp });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleNumInputsChange = (e) => {
    let numInputs = e.target.value;
    const { minLength, maxLength } = this.state;

    if (numInputs < minLength || numInputs > maxLength) {
      numInputs = 4;
      this.setState({
        hasErrored: true,
        errorMessage: `Please enter a value between ${minLength} and ${maxLength}`,
      });
      console.error(
        `Please enter a value between ${minLength} and ${maxLength}`
      );
    } else {
      this.setState({ hasErrored: false, errorMessage: "" });
    }

    this.setState({ [e.target.name]: parseInt(numInputs, 10) });
  };

  clearOtp = () => {
    this.setState({ otp: "" });
  };

  handleCheck = (e) => {
    const { name } = e.target;
    this.setState((prevState) => ({ [name]: !prevState[name] }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.hasErrored && !this.state.errorMsg) {
      try {
        alert(this.state.otp);
        this.setState({ hasErrored: false, errorMsg: "" });
      } catch (error) {
        this.setState({
          hasErrored: true,
          errorMsg: "Error Occurred, Please try again.",
        });
      }
    }
  };

  render() {
    const {
      otp,
      numInputs,
      separator,
      separateAfter,
      isDisabled,
      hasErrored,
      isInputNum,
      isInputSecure,
      minLength,
      maxLength,
      placeholder,
      errorMessage,
    } = this.state;

    return (
      <div className="container">
        <div className="side-bar">
          <a
            href="https://github.com/ritikbanger/react18-input-otp"
            target="_blank"
            rel="noreferrer"
          >
            <div className="side-bar__segment side-bar__segment--header">
              <h2>react18-input-otp</h2>
            </div>
          </a>
          <div className="side-bar__segment">
            <label htmlFor="num-inputs">
              numInputs
              <input
                id="num-inputs"
                name="numInputs"
                type="number"
                value={numInputs}
                onChange={this.handleNumInputsChange}
                min={minLength}
                max={maxLength}
              />
            </label>
          </div>
          <div className="side-bar__segment">
            <label htmlFor="separator">
              separator
              <input
                id="separator"
                maxLength={1}
                name="separator"
                type="text"
                value={separator}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="side-bar__segment">
            <label htmlFor="separateAfter">
              separate after
              <input
                id="separateAfter"
                maxLength={1}
                name="separateAfter"
                type="text"
                value={separateAfter}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="side-bar__segment">
            <label htmlFor="value">
              value
              <input
                id="value"
                maxLength={numInputs}
                name="otp"
                type="text"
                value={otp}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="side-bar__segment">
            <label htmlFor="placeholder">
              placeholder
              <input
                id="placeholder"
                name="placeholder"
                type="text"
                value={placeholder}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="side-bar__segment">
            <label htmlFor="disabled">
              <input
                id="disabled"
                name="isDisabled"
                type="checkbox"
                checked={isDisabled}
                onChange={this.handleCheck}
              />
              isDisabled
            </label>
          </div>
          <div className="side-bar__segment">
            <label htmlFor="hasErrored">
              <input
                id="hasErrored"
                name="hasErrored"
                type="checkbox"
                checked={hasErrored}
                onChange={this.handleCheck}
              />
              hasErrored
            </label>
          </div>
          <div className="side-bar__segment">
            <label htmlFor="isInputNum">
              <input
                id="isInputNum"
                name="isInputNum"
                type="checkbox"
                checked={isInputNum}
                onChange={this.handleCheck}
              />
              isInputNum
            </label>
          </div>
          <div className="side-bar__segment">
            <label htmlFor="isInputSecure">
              <input
                id="isInputSecure"
                name="isInputSecure"
                type="checkbox"
                checked={isInputSecure}
                onChange={this.handleCheck}
              />
              isInputSecure
            </label>
          </div>
          <div className="side-bar__segment side-bar__segment--bottom">
            <a href="https://github.com/ritikbanger/react18-input-otp">
              Documentation and Source
            </a>
          </div>
        </div>
        <div className="view">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="otp-input-0">Enter verification code</label>
              <div className="margin-top--small">
                <OtpInput
                  id="otp-input"
                  autoComplete="one-time-code"
                  inputStyle="inputStyle"
                  numInputs={numInputs}
                  isDisabled={isDisabled}
                  separateAfter={separateAfter}
                  hasErrored={hasErrored}
                  errorStyle="error"
                  onChange={this.handleOtpChange}
                  separator={<span>{separator}</span>}
                  isInputNum={isInputNum}
                  isInputSecure={isInputSecure}
                  shouldAutoFocus
                  value={otp}
                  placeholder={placeholder}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "red",
                }}
              >
                {hasErrored && errorMessage && (
                  <ShowError message={errorMessage} />
                )}
              </div>
              <div className="btn-row">
                {this.state.otp === "" ? (
                  <button
                    className="btn margin-top--large"
                    type="button"
                    disabled={isDisabled}
                    onClick={this.clearOtp}
                  >
                    Clear
                  </button>
                ) : (
                  <button
                    className="btn margin-top--large"
                    type="button"
                    disabled
                    onClick={this.clearOtp}
                  >
                    Clear
                  </button>
                )}
                <button
                  className="btn margin-top--large"
                  disabled={otp.length < numInputs}
                >
                  Get OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

render(<Demo />, document.getElementById("app"));
