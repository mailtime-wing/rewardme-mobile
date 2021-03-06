import React from 'react';
import {Container, Text} from './style';

const Button = ({children, disabled, ...props}) => (
  <Container disabled={disabled} {...props}>
    <Text {...props}>{children}</Text>
  </Container>
);

export default Button;
