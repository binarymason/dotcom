import React from 'react';
import styled from 'styled-components';
import MaskedInput from 'react-text-mask';

export const StyledInput = styled.input`
  background-color: rgba(0, 0, 0, 0.01);
  display: ${props => (props.inline ? 'flex' : 'block')};
  width: ${props => (props.inline ? '47%' : '100%')};
  height: 100%;
  border-radius: 5px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  text-indent: 2em;
  outline: none;
  box-shadow: ${props => (props.errors ? '0 0 0 1pt #EEADAD' : 'none')};
`;

const StyledInputMask = StyledInput.withComponent(MaskedInput);

export const PhoneInput = () => (
  <StyledInputMask
    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
    placeholder="Phone Number"
  />
);

export const ZipCodeInput = () => (
  <StyledInputMask
    mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
    placeholder="Zip Code"
  />
);
