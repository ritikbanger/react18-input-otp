import React, { useState } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import OtpInput from '../index';

// Controlled wrapper, the way consumers use the component.
function Harness({ initialValue = '', onChange, ...props }) {
  const [otp, setOtp] = useState(initialValue);
  return (
    <OtpInput
      value={otp}
      onChange={(value) => {
        setOtp(value);
        if (onChange) onChange(value);
      }}
      {...props}
    />
  );
}

const setup = (props = {}) => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();
  const utils = render(<Harness onChange={onChange} onSubmit={onSubmit} {...props} />);
  const getInputs = () => Array.from(utils.container.querySelectorAll('input'));
  const values = () =>
    getInputs()
      .map((input) => input.value || '_')
      .join('');
  return { ...utils, onChange, onSubmit, getInputs, values };
};

const focus = (el) => act(() => el.focus());
const blur = (el) => act(() => el.blur());

// Browser autofill, password managers and iOS/Android "from Messages" suggestions
// write the whole code into a single input in one go.
const autofill = (el, value) => fireEvent.input(el, { target: { value } });

// Typing one character into the focused input.
const typeChar = (el, char) => fireEvent.input(el, { target: { value: char } });

const paste = (el, text) => fireEvent.paste(el, { clipboardData: { getData: () => text } });

const keyDown = (el, key, keyCode) => fireEvent.keyDown(el, { key, keyCode });

describe('OtpInput rendering', () => {
  it('renders numInputs inputs', () => {
    const { getInputs } = setup({ numInputs: 6 });
    expect(getInputs()).toHaveLength(6);
  });

  it('uses type "tel" for numeric inputs, "password" for secure inputs, "text" otherwise', () => {
    expect(setup({ isInputNum: true }).getInputs()[0].type).toBe('tel');
    expect(setup({ isInputSecure: true }).getInputs()[0].type).toBe('password');
    expect(setup().getInputs()[0].type).toBe('text');
  });

  it('renders the separator every separateAfter inputs, never after the last one', () => {
    const { container } = setup({ numInputs: 6, separator: <span className="sep">-</span>, separateAfter: 3 });
    expect(container.querySelectorAll('.sep')).toHaveLength(1);

    const { container: everyInput } = setup({ numInputs: 4, separator: <span className="sep">-</span> });
    expect(everyInput.querySelectorAll('.sep')).toHaveLength(3);
  });

  it('shows the value split across inputs', () => {
    const { values } = setup({ numInputs: 4, initialValue: '12' });
    expect(values()).toBe('12__');
  });

  it('applies a placeholder of matching length', () => {
    const { getInputs } = setup({ numInputs: 4, placeholder: 'abcd' });
    expect(getInputs().map((input) => input.placeholder)).toEqual(['a', 'b', 'c', 'd']);
  });

  it('sets aria labels, autoComplete="off" by default and indexed data-testid', () => {
    const { getInputs } = setup({ numInputs: 2, isInputNum: true, 'data-testid': 'otp' });
    const [first, second] = getInputs();
    expect(first.getAttribute('aria-label')).toBe('Please enter verification code. Digit 1');
    expect(second.getAttribute('aria-label')).toBe('Digit 2');
    expect(first.getAttribute('autocomplete')).toBe('off');
    expect(second.getAttribute('data-testid')).toBe('otp-1');
  });

  it('passes autoComplete through (e.g. "one-time-code")', () => {
    const { getInputs } = setup({ autoComplete: 'one-time-code' });
    expect(getInputs()[0].getAttribute('autocomplete')).toBe('one-time-code');
  });
});

describe('autofill / password managers (issue #41)', () => {
  describe('with isInputNum', () => {
    it('ignores the dash in "123-456" and fills all 6 digits', () => {
      const { getInputs, values, onChange } = setup({ numInputs: 6, isInputNum: true });
      focus(getInputs()[0]);
      autofill(getInputs()[0], '123-456');

      expect(onChange).toHaveBeenLastCalledWith('123456');
      expect(values()).toBe('123456');
      expect(document.activeElement).toBe(getInputs()[5]);
    });

    it('fills all digits when no input is focused', () => {
      const { getInputs, values, onChange } = setup({ numInputs: 6, isInputNum: true });
      focus(getInputs()[0]);
      blur(getInputs()[0]);
      autofill(getInputs()[0], '123-456');

      expect(onChange).toHaveBeenLastCalledWith('123456');
      expect(values()).toBe('123456');
    });

    it.each([
      ['spaces', '123 456'],
      ['dots', '123.456'],
      ['plain digits', '123456'],
    ])('handles %s', (_, code) => {
      const { getInputs, values } = setup({ numInputs: 6, isInputNum: true });
      focus(getInputs()[0]);
      autofill(getInputs()[0], code);
      expect(values()).toBe('123456');
    });

    it('truncates codes longer than numInputs', () => {
      const { getInputs, values } = setup({ numInputs: 6, isInputNum: true });
      focus(getInputs()[0]);
      autofill(getInputs()[0], '123-4567');
      expect(values()).toBe('123456');
    });

    it('fills from the focused input onwards', () => {
      const { getInputs, values } = setup({ numInputs: 6, isInputNum: true, initialValue: '12' });
      focus(getInputs()[2]);
      autofill(getInputs()[2], '3-4');
      expect(values()).toBe('1234__');
    });

    it('ignores a value with no digits', () => {
      const { getInputs, values, onChange } = setup({ numInputs: 6, isInputNum: true });
      focus(getInputs()[0]);
      autofill(getInputs()[0], 'ab');

      expect(onChange).not.toHaveBeenCalled();
      expect(values()).toBe('______');
    });
  });

  describe('without isInputNum', () => {
    it('fills alphanumeric codes as is', () => {
      const { getInputs, values, onChange } = setup({ numInputs: 6 });
      focus(getInputs()[0]);
      autofill(getInputs()[0], 'ab12cd');

      expect(onChange).toHaveBeenLastCalledWith('ab12cd');
      expect(values()).toBe('ab12cd');
    });

    it('keeps "-" as a valid character', () => {
      const { getInputs, values } = setup({ numInputs: 4 });
      focus(getInputs()[0]);
      autofill(getInputs()[0], 'a-b');
      expect(values()).toBe('a-b_');
    });
  });
});

describe('paste', () => {
  it('drops non-digits when isInputNum is set', () => {
    const { getInputs, values, onChange } = setup({ numInputs: 6, isInputNum: true });
    focus(getInputs()[0]);
    paste(getInputs()[0], '123-456');

    expect(onChange).toHaveBeenLastCalledWith('123456');
    expect(values()).toBe('123456');
  });

  it('pastes from the focused input onwards and moves focus', () => {
    const { getInputs, values } = setup({ numInputs: 6, isInputNum: true, initialValue: '12' });
    focus(getInputs()[2]);
    paste(getInputs()[2], '34');

    expect(values()).toBe('1234__');
    expect(document.activeElement).toBe(getInputs()[4]);
  });

  it('keeps every character when isInputNum is not set', () => {
    const { getInputs, values } = setup({ numInputs: 4 });
    focus(getInputs()[0]);
    paste(getInputs()[0], 'a-bc');
    expect(values()).toBe('a-bc');
  });

  it('does nothing when disabled', () => {
    const { getInputs, onChange } = setup({ numInputs: 4, isDisabled: true });
    paste(getInputs()[0], '1234');
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('typing and keyboard', () => {
  it('moves focus to the next input after each character', () => {
    const { getInputs, values } = setup({ numInputs: 4, isInputNum: true });
    focus(getInputs()[0]);

    for (const char of '1234') {
      typeChar(document.activeElement, char);
    }

    expect(values()).toBe('1234');
    expect(document.activeElement).toBe(getInputs()[3]);
  });

  it('rejects non-digits when isInputNum is set', () => {
    const { getInputs, values, onChange } = setup({ numInputs: 4, isInputNum: true });
    focus(getInputs()[0]);
    typeChar(getInputs()[0], 'a');

    expect(onChange).not.toHaveBeenCalled();
    expect(values()).toBe('____');
    expect(document.activeElement).toBe(getInputs()[0]);
  });

  it('Backspace clears the current input and moves focus back', () => {
    const { getInputs, values } = setup({ numInputs: 4, initialValue: '12' });
    focus(getInputs()[1]);
    keyDown(getInputs()[1], 'Backspace', 8);

    expect(values()).toBe('1___');
    expect(document.activeElement).toBe(getInputs()[0]);
  });

  it('Delete clears the current input and keeps focus', () => {
    const { getInputs, values } = setup({ numInputs: 4, initialValue: '123' });
    focus(getInputs()[2]);
    keyDown(getInputs()[2], 'Delete', 46);

    expect(values()).toBe('12__');
    expect(document.activeElement).toBe(getInputs()[2]);
  });

  it('arrow keys move focus', () => {
    const { getInputs } = setup({ numInputs: 4, initialValue: '1234' });
    focus(getInputs()[1]);

    keyDown(getInputs()[1], 'ArrowRight', 39);
    expect(document.activeElement).toBe(getInputs()[2]);

    keyDown(getInputs()[2], 'ArrowLeft', 37);
    expect(document.activeElement).toBe(getInputs()[1]);
  });

  it('Enter calls onSubmit', () => {
    const { getInputs, onSubmit } = setup({ numInputs: 4 });
    keyDown(getInputs()[0], 'Enter', 13);
    expect(onSubmit).toHaveBeenCalled();
  });

  it('moves focus back to the first input when the value is cleared', () => {
    const onChange = jest.fn();
    const { container, rerender } = render(<OtpInput numInputs={4} value="12" onChange={onChange} />);
    const inputs = container.querySelectorAll('input');
    focus(inputs[2]);

    rerender(<OtpInput numInputs={4} value="" onChange={onChange} />);
    expect(document.activeElement).toBe(inputs[0]);
  });
});
