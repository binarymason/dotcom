import React from 'react';
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
import ActionEdit from 'material-ui/svg-icons/content/create';
import { List, ListItem } from 'material-ui/List';
import Location from 'material-ui/svg-icons/communication/location-on';
import { Row, Col, Card, Title, CardContainer } from '../common';

// const Foo = styled.button`
//   height: 45px;
//   width: 100%;
//   background-color: #fafafa;
//   border-radius: 2px;
//   outline: none;
//   box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.24);
//   border: none;
//
//
//   &:before {
//     content: '+';
//     margin-right: 8px;
//     display: inline-block;
//     width: 18px;
//     height: 18px;
//     font-size: 12px;
//     font-weight: bold;
//     background-color: rgba(51, 152, 113, 0.15);
//     color: #379f77;
//     border: solid 1px #379f77;
//     border-radius: 100%;
//   }
// `;
//

const PickupForm = () => (
  <Card>

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

    <RaisedButton label="Save" style={{ margin: '20px 0 10px 0' }} primary fullWidth />
  </Card>
);


const shouldShow = !!window.localStorage.getItem('foo');

const FAB = styled.div`
  display: flex;
  justify-content: center;
`;

const Pickup = () => (
  <CardContainer>
    { shouldShow && <PickupForm /> }

    <Title>Pickup Locations</Title>

    <Divider inset />
    <List>
      <ListItem
        leftAvatar={<Avatar icon={<Location />} backgroundColor="orange" />}
        rightIcon={<ActionEdit />}
        primaryText="Atherton Market"
        secondaryText="456 Gingerbread Lane"
      />
      <ListItem
        leftAvatar={<Avatar icon={<Location />} backgroundColor="orange" />}
        rightIcon={<ActionEdit />}
        primaryText="The Farm"
        secondaryText="123 Foobar Ave"
      />
    </List>

    <FAB>
      <FloatingActionButton mini >
        <ContentAdd />
      </FloatingActionButton>
    </FAB>
  </CardContainer>
);

export default Pickup;
