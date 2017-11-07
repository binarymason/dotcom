import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TimePicker from 'material-ui/TimePicker';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Location from 'material-ui/svg-icons/communication/location-on';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Trash from 'material-ui/svg-icons/action/delete';
import Pencil from 'material-ui/svg-icons/content/create';
import { grey500 } from 'material-ui/styles/colors';
import { Row, Col, Title, CardContainer } from '../common';
import { createPickup, editPickup, stopEditing } from '../../interactions/CSApickups';

const EditPickup = styled.div`
  width: 106%;
  background-color: #fff;
  margin-left: -3%;
  padding: 0 20px 20px 20px;
  border-radius: 2px;
  box-shadow: 0 0 6px rgba(0,0,0,.16), 0 6px 12px rgba(0,0,0,.32)
`;

const deleteButtonElement = (
  <IconButton>
    <Trash color={grey500} />
  </IconButton>
);

const PickupForm = props => (
  <EditPickup {...props} >
    <Row>
      <Col>
        <TextField floatingLabelText="Pickup Name" hintText="At the farm" />
      </Col>


      <Col>
        <SelectField
          floatingLabelText="Pickup Frequency"
          value=""
          multiple
        >
          <MenuItem value={1} primaryText="Weekly" />
          <MenuItem value={2} primaryText="Bi-Weekly" />
        </SelectField>
      </Col>
    </Row>


    <Row>
      <Col>
        <TimePicker
          floatingLabelText="Start time"
          autoOk
        />
      </Col>
      <Col>
        <TimePicker
          floatingLabelText="End time"
          autoOk
        />
      </Col>
    </Row>

    <Row>
      <TextField floatingLabelText="Address" fullWidth />
    </Row>

    <Row>
      <TextField floatingLabelText="Notes to Customer" fullWidth />
    </Row>


    <Row style={{ marginTop: '12px' }}>
      <IconMenu
        iconButtonElement={deleteButtonElement}
      >
        <MenuItem>
          Confirm
        </MenuItem>
      </IconMenu>

      <RaisedButton label="Save and Close" style={{ alignSelf: 'flex-end' }} primary />
    </Row>
  </EditPickup>
);


const shouldShow = !!window.localStorage.getItem('foo');

const FAB = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

const iconButtonElement = (
  <IconButton>
    <MoreVertIcon color={grey500} />
  </IconButton>
);

const ListItemContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Pickup = (props) => {
  const rightIconMenu = (
    <IconMenu
      iconButtonElement={iconButtonElement}
      onClick={() => (props.editing && props.stopEditing())}
    >
      <MenuItem leftIcon={<Pencil />}>Edit</MenuItem>
      <MenuItem leftIcon={<Trash />}>Delete</MenuItem>
    </IconMenu>
  );


  const isEditing = props.editing !== false;

  return (
    <div>

      <CardContainer>
        { shouldShow && <PickupForm /> }

        <Title>Pickup Locations</Title>

        <List style={{ paddingBottom: '0' }}>
          {
            props.pickups.map((p, i) => (
              props.editing === i ? (
                <PickupForm key={p.id} />
              ) : (
                <ListItemContainer
                  key={p.id}
                  onClick={() => (isEditing && props.stopEditing())}
                >
                  <ListItem
                    leftAvatar={<Avatar icon={<Location />} backgroundColor="orange" />}
                    primaryText={p.name}
                    secondaryText={p.address}
                    rightIconButton={rightIconMenu}
                    disabled={isEditing}
                    onClick={() => (isEditing ? props.stopEditing() : props.editPickup(i))}
                  />

                  { props.pickups.length - 1 !== i && (<Divider inset />) }
                </ListItemContainer>
              )
            ))
          }

        </List>
      </CardContainer>

      {
        props.editing === false && (
          <FAB>
            <FloatingActionButton mini onClick={() => props.createPickup()}>
              <ContentAdd />
            </FloatingActionButton>
          </FAB>
        )
      }
    </div>
  );
};

Pickup.propTypes = ({
  pickups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  })).isRequired,
  editing: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  stopEditing: PropTypes.func.isRequired,
  createPickup: PropTypes.func.isRequired,
  editPickup: PropTypes.func.isRequired, // eslint-disable-line
});


const mapStateToProps = state => ({
  ...state.CSApickups,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createPickup, editPickup, stopEditing }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pickup);
