import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { actions as basicsActions } from '../../interactions/CSAbasics';
import { nextStep } from '../../interactions/manageCSA';
// import styled from 'styled-components';
import { Title, CardContainer } from '../common';
import ContinueContainer from '../ContinueContainer';

let timer = 0;

const Basics = (props) => {
  const handleChange = (val, func) => {
    func(val);
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      props.saveCSABasics();
      timer = 0;
    }, 200);
  };

  return (
    <div>
      <CardContainer>
        <Title>Basic CSA Information</Title>

        <TextField
          floatingLabelText="CSA name"
          onChange={e => handleChange(e.target.value, props.updateCSAName)}
          value={props.name}
        />

        <DatePicker
          floatingLabelText="CSA start"
          autoOk
          value={props.startDate}
          onChange={(e, date) => handleChange(date, props.updateCSAStartDate)}
        />

        <DatePicker
          floatingLabelText="CSA end"
          autoOk
          minDate={new Date()}
          value={props.endDate}
          onChange={(e, date) => handleChange(date, props.updateCSAEndDate)}
        />

        <SelectField
          floatingLabelText="Pickup Frequency"
          value={props.frequency}
          onChange={(e, i, val) => handleChange(val, props.updateCSAFreq)}
        >
          <MenuItem value="weekly" primaryText="Weekly" />
          <MenuItem value="biweekly" primaryText="Bi-Weekly" />
          <MenuItem value="both" primaryText="Both" />
        </SelectField>
      </CardContainer>

      <div style={{ minHeight: '30px' }}>
        <ContinueContainer
          showIndicator={!!(props.id && props.name)}
          inProgress={props.asynchronous}
          disabled={!props.name}
          continue={props.continue}
          buttonComponent={<div />}
        />
      </div>
    </div>
  );
};

Basics.propTypes = ({
  updateCSAName: PropTypes.func.isRequired,
  updateCSAStartDate: PropTypes.func.isRequired,
  updateCSAEndDate: PropTypes.func.isRequired,
  updateCSAFreq: PropTypes.func.isRequired,
  continue: PropTypes.func.isRequired,
  saveCSABasics: PropTypes.func.isRequired, // eslint-disable-line
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  asynchronous: PropTypes.bool.isRequired,
  frequency: PropTypes.string.isRequired,
  startDate: PropTypes.shape({
    date: PropTypes.string,
  }).isRequired,
  endDate: PropTypes.shape({
    date: PropTypes.string,
  }).isRequired,
});

const mapStateToProps = state => ({
  ...state.CSAbasics,
  asynchronous: state.asynchronous,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(basicsActions, dispatch),
  continue: nextStep,
});

export default connect(mapStateToProps, mapDispatchToProps)(Basics);
