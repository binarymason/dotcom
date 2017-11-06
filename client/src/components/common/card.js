import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const CardWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.24);
  margin: 8px 24px;
  min-height: 100%;

  @media (max-width: 700px) {
    margin: 2px 8px;
  }
`;

const Card = props => (
  <CardWrapper>
    { props.children }
  </CardWrapper>
);

Card.propTypes = ({
  children: PropTypes.node.isRequired,
});

export default Card;
