import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardWrap = styled.div`
  position: relative;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.07);
  min-height: 60px;
  width: 600px;
  background: white;
  border-radius: 8px;
  display: flex;
  margin-bottom: 20px;
`;

const ItemImage = styled.div`
  background: ${props => (props.primary ? '#f0aa31' : '#aofa00')};
  height: 60px;
  width: 60px;
  margin-right: 12px;
`;

const Price = styled.span`
  font-size: 1.5em;
  margin-left: 60px;
`;

export default function ListItem({ name, price, primary }) {
  return (
    <CardWrap>
      <ItemImage primary={primary}>
        <div> {name}</div>
        <Price>{price}</Price>
      </ItemImage>
    </CardWrap>
  );
}

ListItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number
};

ListItem.defaultProps = {
  name: 'kazah',
  price: 123
};
