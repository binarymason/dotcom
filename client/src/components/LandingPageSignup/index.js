import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Row, Button, Glyphicon } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { StyledInput } from '../StyledInputs';
import {
  updateField,
  signup,
  PASSWORD_MINIMUM_LENGTH,
} from '../../interactions/signup';

const SignupText = styled.div`
  margin: 1.5em 0.5em 0.25em 0.5em;
  opacity: 0.5;
  font-size: 24px;
  font-weight: 300;
  line-height: 1.42;
  letter-spacing: -0.5px;
  text-align: center;
  color: #353535;
`;

const InputRow = styled.div`
  height: 60px;
  margin: 1.5em 0;
  position: relative;
`;

const FlexRow = InputRow.extend`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const IconWrapper = styled.span`
  position: absolute;
  right: 2em;
  color: ${props => (props.theme.errorColor)};
  font-size: 16px;
  top: 30%;
`;

const InputError = () => (
  <IconWrapper>
    <Glyphicon glyph="exclamation-sign" />
  </IconWrapper>
);

const LandingPageSignup = (props) => {
  const handleChange = (e) => {
    const key = e.target.dataset.key;
    const value = e.target.value;
    props.updateField(key, value);

    if (key === 'password' && value.length === PASSWORD_MINIMUM_LENGTH) {
      ReactTooltip.hide();
    }
  };

  if (props.verificationStatus === 'pending') {
    return (
      <Redirect to="/signup-confirmation" />
    );
  }

  if (props.verificationStatus === 'verified') {
    return (
      <Redirect to="/verified" />
    );
  }

  return (
    <div>
      <Row>
        <SignupText>
          CSA management made easy.
          <br />
          Enter your information below to get early access.
        </SignupText>
      </Row>
      <FlexRow>
        <StyledInput
          inline
          placeholder="First Name"
          data-key="firstName"
          type="text"
          value={props.firstName}
          errors={props.errors.firstName}
          onChange={e => handleChange(e)}
        />
        <StyledInput
          inline
          placeholder="Last Name"
          data-key="lastName"
          type="text"
          value={props.lastName}
          errors={props.errors.lastName}
          onChange={e => handleChange(e)}
        />
      </FlexRow>

      <InputRow>
        <StyledInput
          placeholder="Farm Name"
          data-key="farmName"
          type="text"
          value={props.farmName}
          errors={props.errors.farmName}
          onChange={e => handleChange(e)}
        />
      </InputRow>
      <InputRow>
        <StyledInput
          placeholder="Email"
          data-key="email"
          data-tip
          data-for="email"
          type="text"
          value={props.email}
          errors={props.errors.email}
          onChange={e => handleChange(e)}
        />
        <InputError />

        <ReactTooltip id="email" place="left" type="error" effect="solid">
          This email is already in use
        </ReactTooltip>
      </InputRow>
      <InputRow>
        <StyledInput
          placeholder="Password"
          data-key="password"
          data-tip
          data-for="password"
          type="password"
          value={props.password}
          errors={props.errors.password}
          onChange={e => handleChange(e)}
        />

        <InputError />
        <ReactTooltip id="password" place="left" type="error" effect="solid">
          Must be at least 6 characters
        </ReactTooltip>
      </InputRow>

      <Button
        bsStyle="primary"
        bsSize="large"
        block
        onClick={() => props.signup()}
      >
      Create Account
      </Button>
    </div>
  );
};

LandingPageSignup.propTypes = {
  updateField: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  verificationStatus: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  farmName: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.arrayOf(PropTypes.string),
    password: PropTypes.arrayOf(PropTypes.string),
    firstName: PropTypes.arrayOf(PropTypes.string),
    lastName: PropTypes.arrayOf(PropTypes.string),
    farmName: PropTypes.arrayOf(PropTypes.string),
  }),
};

LandingPageSignup.defaultProps = {
  email: '',
  password: '',
  errors: {},
};

const mapStateToProps = state => ({
  ...state.signup,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateField, signup }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageSignup);
