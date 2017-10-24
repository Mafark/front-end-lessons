import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListItem from '../ListItem';

export default function List({ title, data, children }) {
  return (
    <div>
      <h1>{title}</h1>
      {data.map((dataFields, index) => <ListItem key={index} primary={index % 2 === 0} {...dataFields} />)}
      {children}
    </div>
  );
}
